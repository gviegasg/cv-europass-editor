const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const script = fs.readFileSync(path.join(__dirname, '../editor.js'), 'utf8');

function element() {
    let text = '';
    return {
        value: '', hidden: false, checked: false, dataset: {}, attributes: {},
        get textContent() { return text; },
        set textContent(value) { text = value; },
        get innerText() { return text; },
        set innerText(value) { text = value; },
        classList: {
            values: new Set(['hidden']),
            add(value) { this.values.add(value); },
            remove(value) { this.values.delete(value); },
            contains(value) { return this.values.has(value); },
            toggle(value, force) {
                if (force) this.values.add(value);
                else this.values.delete(value);
            }
        },
        setAttribute(name, value) { this.attributes[name] = value; },
        removeAttribute(name) { delete this[name]; },
        scrollIntoView() {},
        focus() {}
    };
}

function editor({ width = 300, height = 400 } = {}) {
    let now = 0;
    const ids = ['respostaInput', 'cargoAlvo', 'resumoTexto', 'cv-sheet', 'editorStatus', 'aiPanel',
        'aiOutputText', 'aiResultBox', 'marginControl', 'fontControl', 'fontSizeControl', 'cvPhoto',
        'includePhoto', 'photoColumn', 'personalData', 'controlStatus', 'sessionWarning', 'pageWarning',
        'cvAtualInput', 'jobDescriptionInput', 'promptOutput', 'backupUpload', 'cvFileUpload', 'jobFileUpload', 'photoUpload',
        'promptBox', 'languageControl', 'donationNotice', 'donationLink'];
    const elements = Object.fromEntries(ids.map(id => [id, element()]));
    const labels = ['address', 'email', 'phone', 'summary', 'skills', 'experience', 'education']
        .map(key => Object.assign(element(), { dataset: { cvLabel: key } }));
    elements['cv-sheet'].querySelectorAll = () => labels;
    const fields = ['nome', 'cargo', 'resumo', 'morada', 'email', 'telefone',
        ...Array.from({ length: 6 }, (_, i) => `competencia${i + 1}`),
        ...Array.from({ length: 3 }, (_, i) => ['Cargo', 'Data', 'Empresa', 'Detalhes']
            .map(suffix => `experiencia${i + 1}${suffix}`)).flat(),
        ...Array.from({ length: 3 }, (_, i) => `educacao${i + 1}`)]
        .map(key => Object.assign(element(), { dataset: { field: key } }));
    elements.cargoAlvo = fields[1];
    elements.resumoTexto = fields[2];
    elements.marginControl.value = '10';
    elements.fontControl.value = 'Arial, Helvetica, sans-serif';
    elements.fontSizeControl.value = '10';
    elements.languageControl.value = 'pt-PT';
    const storage = new Map();
    const context = vm.createContext({
        document: {
            addEventListener() {},
            getElementById: id => elements[id] || null,
            querySelectorAll: selector => selector === '#cv-sheet [data-field]' ? fields : [],
            querySelector: selector => fields.find(field => selector === `[data-field="${field.dataset.field}"]`) || null,
            documentElement: { style: { setProperty() {} } }
        },
        localStorage: {
            getItem(key) { return storage.get(key) || null; },
            removeItem(key) { storage.delete(key); }
        },
        Image: class {
            constructor() { this.naturalWidth = width; this.naturalHeight = height; }
            set src(value) { this.onload(); }
        },
        Date: class extends Date { static now() { return now; } },
        URL,
        atob,
        setTimeout() { return 1; },
        clearTimeout() {},
        console: { error() {} },
        confirm: () => true
    });
    vm.runInContext(script, context);
    context.verificarPagina = () => false;
    context.ajustarEntradas = () => {};
    return { context, elements, fields, labels, storage, setTime(value) { now = value; } };
}

function resposta() {
    return {
        cargo: 'Cargo adaptado',
        resumo: 'Resumo adaptado',
        competencias: Array.from({ length: 6 }, (_, i) => ({ titulo: `Competência ${i + 1}`, descricao: 'Descrição' }))
    };
}

function backup(fields) {
    return {
        formato: 'cv-editor',
        versao: 1,
        campos: Object.fromEntries(fields.map(field => [field.dataset.field, ''])),
        configuracao: { margem: 10, fonte: 'Arial, Helvetica, sans-serif', tamanho: 10 },
        fotografia: null
    };
}

test('carrega o CV e a vaga a partir de ficheiros de texto', () => {
    const { context, elements } = editor();
    context.FileReader = class {
        readAsText(file) {
            this.result = file.text;
            this.onload();
            this.onloadend();
        }
    };
    for (const [field, text] of [['cvAtualInput', 'CV de teste'], ['jobDescriptionInput', 'Vaga de teste']]) {
        const target = { files: [{ text }], value: 'ficheiro' };
        context.carregarTextoFicheiro({ target }, field, 'teste');
        assert.equal(elements[field].value, text);
        assert.equal(target.value, '');
    }
});

test('aplica resposta válida como texto e mantém campos editáveis', () => {
    const { context, elements, fields } = editor();
    const data = resposta();
    data.cargo = '<strong>Cargo</strong>';
    elements.respostaInput.value = `\`\`\`json\n${JSON.stringify(data)}\n\`\`\``;
    context.aplicarResposta();
    assert.equal(elements.cargoAlvo.textContent, data.cargo);
    assert.equal(elements.resumoTexto.textContent, data.resumo);
    assert.match(fields.find(field => field.dataset.field === 'competencia1').textContent, /Competência 1/);
    assert.equal(elements.aiPanel.classList.contains('hidden'), true);
    assert.match(elements.editorStatus.textContent, /nesta sessão/);
});

for (const [label, raw] of [
    ['vazia', ''], ['texto livre', 'Resposta em texto'], ['JSON truncado', '{"cargo":'],
    ['campos ausentes', '{}'], ['resumo inválido', JSON.stringify({ ...resposta(), resumo: {} })],
    ['menos de seis competências', JSON.stringify({ ...resposta(), competencias: resposta().competencias.slice(0, 5) })],
    ['competência inválida', JSON.stringify({ ...resposta(), competencias: [...resposta().competencias.slice(0, 5), null] })]
]) {
    test(`rejeita resposta ${label} sem alteração parcial`, () => {
        const { context, elements } = editor();
        elements.cargoAlvo.textContent = 'Original';
        elements.respostaInput.value = raw;
        context.aplicarResposta();
        assert.equal(elements.cargoAlvo.textContent, 'Original');
        assert.match(elements.aiOutputText.textContent, /^⚠️/);
    });
}

test('valida o backup e impede campos, configurações e fotos inválidos', async () => {
    const { context, fields } = editor();
    const valid = backup(fields);
    assert.equal(await context.validateBackup(valid), valid);
    const invalidFields = { ...valid.campos };
    delete invalidFields.nome;
    await assert.rejects(context.validateBackup({ ...valid, campos: invalidFields }), /campos esperados/);
    await assert.rejects(context.validateBackup({ ...valid, configuracao: { ...valid.configuracao, margem: 0 } }), /inválidas/);
    await assert.rejects(context.validateBackup({ ...valid, fotografia: { dados: 'javascript:alert(1)', incluir: true } }), /JPEG ou PNG/);
});

test('backup repõe texto e configurações sem interpretar HTML', () => {
    const { context, fields, elements } = editor();
    const data = backup(fields);
    data.campos.nome = '<img src=x onerror=alert(1)>';
    data.configuracao.margem = 8;
    context.applyBackup(data);
    assert.equal(fields[0].textContent, data.campos.nome);
    assert.equal(elements.marginControl.value, 8);
    assert.equal(elements.languageControl.value, 'pt-PT');
});

test('idiomas alteram a apresentação sem modificar os textos e são restaurados do backup', async () => {
    const { context, elements, fields, labels } = editor();
    const data = backup(fields);
    data.campos.nome = 'Nome preservado';
    data.configuracao.idioma = 'es';
    await context.validateBackup(data);
    context.applyBackup(data);
    assert.equal(elements['cv-sheet'].lang, 'es');
    assert.equal(labels[0].textContent, 'Dirección:');
    assert.equal(fields[0].textContent, 'Nome preservado');
    assert.equal(fields[0].dataset.placeholder, 'Escribe tu nombre completo');
    assert.equal(fields.find(field => field.dataset.field === 'experiencia2Cargo').attributes['aria-label'], 'Puesto de la experiencia 2');

    for (const [idioma, address] of [['pt-BR', 'Endereço:'], ['en', 'Address:'], ['pt-PT', 'Morada:']]) {
        context.applySettings({ ...data.configuracao, idioma });
        assert.equal(labels[0].textContent, address);
        assert.equal(fields[0].textContent, 'Nome preservado');
    }
    await assert.rejects(context.validateBackup({ ...data, configuracao: { ...data.configuracao, idioma: 'fr' } }), /inválidas/);
});

test('backups anteriores com modelo mantêm dados e idioma usando o formato único', async () => {
    const { context, elements, fields } = editor();
    for (const modelo of ['atual', 'europass']) {
        const data = backup(fields);
        data.campos.nome = 'Nome preservado';
        data.configuracao.modelo = modelo;
        data.configuracao.idioma = 'en';
        await context.validateBackup(data);
        context.applyBackup(data);
        assert.equal(fields[0].textContent, 'Nome preservado');
        assert.equal(elements.languageControl.value, 'en');
        assert.equal(Object.hasOwn(context.sessionSettings(), 'modelo'), false);
    }
});

test('o prompt pede a resposta no idioma selecionado', () => {
    const { context, elements } = editor();
    elements.cvAtualInput.value = 'CV de teste';
    elements.jobDescriptionInput.value = 'Vaga de teste';
    elements.languageControl.value = 'en';
    context.gerarPrompt('adaptar');
    assert.match(elements.promptOutput.value, /Escreve em inglês/);
});

test('convite de apoio aparece apenas com link HTTPS configurado', () => {
    const { context, elements } = editor();
    context.mostrarApoio();
    assert.equal(elements.donationNotice.classList.contains('hidden'), true);
    context.mostrarApoio('http://example.test/doar');
    assert.equal(elements.donationNotice.classList.contains('hidden'), true);
    assert.match(elements.controlStatus.textContent, /indisponível/);
    context.mostrarApoio('https://example.test/doar');
    assert.equal(elements.donationNotice.classList.contains('hidden'), false);
    assert.equal(elements.donationLink.href, 'https://example.test/doar');
});

test('backup suporta várias experiências e rejeita uma entrada incompleta', async () => {
    const { context, fields } = editor();
    const data = backup(fields);
    for (const suffix of ['Cargo', 'Data', 'Empresa', 'Detalhes']) {
        data.campos[`experiencia4${suffix}`] = suffix;
    }
    data.campos.educacao4 = 'Curso adicional';
    await context.validateBackup(data);
    assert.equal(context.entryCounts(data.campos).experiences, 4);
    assert.equal(context.entryCounts(data.campos).education, 4);
    delete data.campos.experiencia4Cargo;
    await assert.rejects(context.validateBackup(data), /campos esperados/);
});

test('fotografia exige JPEG/PNG e pelo menos 300 × 400 pixels', async () => {
    const valid = editor();
    await valid.context.validarFoto('data:image/png;base64,iVBORw0KGgo=');
    await assert.rejects(valid.context.validarFoto('data:image/svg+xml;base64,AAAA'), /JPEG ou PNG/);
    await assert.rejects(valid.context.validarFoto('data:image/png;base64,AAAA'), /conteúdo da foto/);
    const small = editor({ width: 299, height: 400 });
    await assert.rejects(small.context.validarFoto('data:image/png;base64,iVBORw0KGgo='), /300 × 400/);
});

test('inatividade avisa antes de duas horas e apaga CV, prompt e foto após o prazo', () => {
    const { context, elements, fields, setTime } = editor();
    fields[0].textContent = 'Dados temporários';
    elements.respostaInput.value = 'resposta';
    elements.cvPhoto.src = 'data:image/png;base64,AAAA';
    elements.includePhoto.checked = true;
    setTime(115 * 60 * 1000);
    context.scheduleSession();
    assert.equal(elements.sessionWarning.classList.contains('hidden'), false);
    assert.equal(fields[0].textContent, 'Dados temporários');
    setTime(120 * 60 * 1000);
    context.scheduleSession();
    assert.equal(fields[0].textContent, '');
    assert.equal(elements.respostaInput.value, '');
    assert.equal(elements.cvPhoto.src, undefined);
    assert.equal(elements.includePhoto.checked, false);
    assert.match(elements.controlStatus.textContent, /inatividade/);
});

test('atividade antes do prazo renova a sessão de inatividade', () => {
    const { context, fields, setTime } = editor();
    fields[0].textContent = 'Rascunho';
    setTime(119 * 60 * 1000);
    context.registrarAtividade();
    setTime(121 * 60 * 1000);
    context.scheduleSession();
    assert.equal(fields[0].textContent, 'Rascunho');
});

test('operação iniciada antes do fim da sessão não repõe dados depois do prazo', () => {
    const { context, fields, setTime } = editor();
    fields[0].textContent = 'Rascunho';
    setTime(120 * 60 * 1000);
    assert.throws(() => context.checkSession(0), /sessão terminou/);
    assert.equal(fields[0].textContent, '');
});
