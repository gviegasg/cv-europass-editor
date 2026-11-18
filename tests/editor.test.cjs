const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const JSZip = require('jszip');
const mammothContext = vm.createContext({ TextDecoder, Uint8Array, ArrayBuffer, setTimeout, clearTimeout, console });
mammothContext.self = mammothContext;
vm.runInContext(fs.readFileSync(path.join(__dirname, '../vendor/mammoth.browser.js'), 'utf8'), mammothContext);
const mammoth = mammothContext.mammoth;

const script = fs.readFileSync(path.join(__dirname, '../editor.js'), 'utf8');
const interfaceScript = fs.readFileSync(path.join(__dirname, '../interface.js'), 'utf8');

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
        'cvAtualInput', 'jobDescriptionInput', 'promptOutput', 'cvFileUpload', 'jobFileUpload', 'photoUpload',
        'promptBox', 'languageControl', 'donationNotice', 'donationOffer', 'donationLink', 'feedbackAfterPdf', 'feedbackFooter'];
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
    const clickedLinks = [];
    const context = vm.createContext({
        document: {
            addEventListener() {},
            getElementById: id => elements[id] || null,
            querySelectorAll: selector => selector === '#cv-sheet [data-field]' ? fields : [],
            querySelector: selector => fields.find(field => selector === `[data-field="${field.dataset.field}"]`) || null,
            createElement() {
                return { href: '', click() { clickedLinks.push(this.href); } };
            },
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
    vm.runInContext(interfaceScript, context);
    vm.runInContext(script, context);
    context.verificarPagina = () => false;
    context.ajustarEntradas = () => {};
    return { context, elements, fields, labels, storage, clickedLinks, setTime(value) { now = value; } };
}

function resposta() {
    return {
        cargo: 'Cargo adaptado',
        resumo: 'Resumo adaptado',
        competencias: Array.from({ length: 6 }, (_, i) => ({ titulo: `Competência ${i + 1}`, descricao: 'Descrição' }))
    };
}

function draft(fields) {
    return {
        formato: 'cv-editor',
        versao: 1,
        campos: Object.fromEntries(fields.map(field => [field.dataset.field, ''])),
        configuracao: { margem: 10, fonte: 'Arial, Helvetica, sans-serif', tamanho: 10 },
        fotografia: null
    };
}

async function docxDeTeste() {
    const zip = new JSZip();
    zip.file('[Content_Types].xml', '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');
    zip.file('_rels/.rels', '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
    zip.file('word/document.xml', '<?xml version="1.0"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>Currículo de teste</w:t></w:r></w:p><w:p><w:r><w:t>Segunda linha</w:t></w:r></w:p></w:body></w:document>');
    return zip.generateAsync({ type: 'arraybuffer' });
}

test('carrega TXT e DOCX como texto no assistente', async () => {
    const { context, elements } = editor();
    context.mammoth = mammoth;
    const docx = await docxDeTeste();
    for (const field of ['cvAtualInput', 'jobDescriptionInput']) {
        const target = { files: [{ name: 'entrada.TXT', size: 15, text: async () => 'Texto de teste' }], value: 'ficheiro' };
        await context.carregarTextoFicheiro({ target }, field, 'teste');
        assert.equal(elements[field].value, 'Texto de teste');
        assert.equal(target.value, '');
        target.files = [{ name: 'entrada.docx', size: docx.byteLength, arrayBuffer: async () => docx }];
        target.value = 'ficheiro';
        await context.carregarTextoFicheiro({ target }, field, 'teste');
        assert.match(elements[field].value, /Currículo de teste\n\nSegunda linha/);
        assert.equal(target.value, '');
    }
});

test('rejeita formatos não permitidos, ficheiros vazios, grandes ou DOCX inválidos sem substituir texto', async () => {
    const { context, elements } = editor();
    context.mammoth = mammoth;
    elements.cvAtualInput.value = 'Texto preservado';
    const invalid = [
        [{ name: 'cv.pdf', size: 5 }, /\.txt ou \.docx/],
        [{ name: 'cv.md', size: 5 }, /\.txt ou \.docx/],
        [{ name: 'cv.txt', size: 0 }, /5 MB/],
        [{ name: 'cv.txt', size: 5 * 1024 * 1024 + 1 }, /5 MB/],
        [{ name: 'cv.txt', size: 3, text: async () => '   ' }, /texto legível/],
        [{ name: 'cv.docx', size: 5, arrayBuffer: async () => new ArrayBuffer(5) }, /válido/]
    ];
    for (const [file, message] of invalid) {
        await context.carregarTextoFicheiro({ target: { files: [file], value: 'ficheiro' } }, 'cvAtualInput', 'CV');
        assert.equal(elements.cvAtualInput.value, 'Texto preservado');
        assert.match(elements.aiOutputText.textContent, message);
    }
});

test('leitura assíncrona não substitui edições recentes nem dados de uma sessão terminada', async () => {
    const { context, elements, setTime } = editor();
    let finish;
    const target = { files: [{ name: 'cv.txt', size: 5, text: () => new Promise(resolve => { finish = resolve; }) }], value: 'ficheiro' };
    const reading = context.carregarTextoFicheiro({ target }, 'cvAtualInput', 'CV');
    elements.cvAtualInput.value = 'Edição recente';
    finish('Texto antigo');
    await reading;
    assert.equal(elements.cvAtualInput.value, 'Edição recente');
    assert.match(elements.aiOutputText.textContent, /mudou durante a leitura/);

    const expiredReading = context.carregarTextoFicheiro({ target }, 'cvAtualInput', 'CV');
    setTime(120 * 60 * 1000);
    finish('Texto antigo');
    await expiredReading;
    assert.equal(elements.cvAtualInput.value, '');
    assert.match(elements.aiOutputText.textContent, /sessão terminou/);
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

test('valida dados antigos e impede campos, configurações e fotos inválidos', async () => {
    const { context, fields } = editor();
    const valid = draft(fields);
    assert.equal(await context.validateDraft(valid), valid);
    const invalidFields = { ...valid.campos };
    delete invalidFields.nome;
    await assert.rejects(context.validateDraft({ ...valid, campos: invalidFields }), /campos esperados/);
    await assert.rejects(context.validateDraft({ ...valid, configuracao: { ...valid.configuracao, margem: 0 } }), /inválidas/);
    await assert.rejects(context.validateDraft({ ...valid, fotografia: { dados: 'javascript:alert(1)', incluir: true } }), /JPEG ou PNG/);
});

test('recuperação repõe texto e configurações sem interpretar HTML', () => {
    const { context, fields, elements } = editor();
    const data = draft(fields);
    data.campos.nome = '<img src=x onerror=alert(1)>';
    data.configuracao.margem = 8;
    context.applyDraft(data);
    assert.equal(fields[0].textContent, data.campos.nome);
    assert.equal(elements.marginControl.value, 8);
    assert.equal(elements.languageControl.value, 'pt-PT');
});

test('idiomas alteram a apresentação sem modificar os textos recuperados', async () => {
    const { context, elements, fields, labels } = editor();
    const data = draft(fields);
    data.campos.nome = 'Nome preservado';
    data.configuracao.idioma = 'es';
    await context.validateDraft(data);
    context.applyDraft(data);
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
    await assert.rejects(context.validateDraft({ ...data, configuracao: { ...data.configuracao, idioma: 'fr' } }), /inválidas/);
});

test('converte rascunho legado preservando os dados do currículo', async () => {
    const { context } = editor();
    const text = textContent => ({ textContent });
    const job = {
        querySelector: selector => ({
            h3: text('Cargo antigo'), span: text('2020'), p: text('Empresa antiga')
        })[selector],
        querySelectorAll: () => [text('Resultado')]
    };
    const root = {
        children: [null, null, null, null,
            { querySelectorAll: () => [job] },
            { querySelectorAll: () => [text('Curso antigo')] }],
        querySelector: selector => ({
            h1: text('Nome antigo'), '#cargoAlvo': text('Objetivo antigo'),
            '#resumoTexto': text('Resumo antigo')
        })[selector] || null,
        querySelectorAll: selector => selector === '#competenciasGrid > p'
            ? [text('Competência antiga')] : [text('Morada: Cidade')]
    };
    let markup;
    context.document.createElement = tag => {
        assert.equal(tag, 'template');
        return { content: root, set innerHTML(value) { markup = value; } };
    };

    const result = await context.converterLegado('<div>rascunho</div>', null);
    assert.equal(markup, '<div>rascunho</div>');
    assert.equal(result.campos.nome, 'Nome antigo');
    assert.equal(result.campos.morada, 'Cidade');
    assert.equal(result.campos.experiencia1Detalhes, '• Resultado');
    assert.equal(result.campos.educacao1, 'Curso antigo');
    assert.equal(result.fotografia, null);
});

test('o prompt pede a resposta no idioma selecionado', () => {
    const { context, elements } = editor();
    elements.cvAtualInput.value = 'CV de teste';
    elements.jobDescriptionInput.value = 'Vaga de teste';
    elements.languageControl.value = 'en';
    context.gerarPrompt('adaptar');
    assert.match(elements.promptOutput.value, /Escreva em inglês/);
});

test('idioma da interface traduz mensagens e prompt sem alterar idioma do currículo', () => {
    const { context, elements } = editor();
    vm.runInContext("interfaceLanguage = 'en'", context);
    elements.languageControl.value = 'pt-BR';
    elements.cvAtualInput.value = 'CV de teste';
    elements.jobDescriptionInput.value = 'Vaga de teste';
    context.gerarPrompt('adaptar');
    assert.match(elements.promptOutput.value, /Write in Brazilian Portuguese/);
    assert.match(elements.promptOutput.value, /"competencias"/);
    elements.jobDescriptionInput.value = '';
    context.gerarPrompt('adaptar');
    assert.match(elements.aiOutputText.textContent, /First paste the job description/);
    assert.equal(elements.languageControl.value, 'pt-BR');
});

test('feedback aparece após PDF e o convite de apoio exige link HTTPS', () => {
    const { context, elements } = editor();
    context.mostrarApoio();
    assert.equal(elements.donationNotice.classList.contains('hidden'), false);
    assert.equal(elements.donationOffer.classList.contains('hidden'), true);
    context.mostrarApoio('http://example.test/doar');
    assert.equal(elements.donationOffer.classList.contains('hidden'), true);
    assert.match(elements.controlStatus.textContent, /indisponível/);
    context.mostrarApoio('https://example.test/doar');
    assert.equal(elements.donationOffer.classList.contains('hidden'), false);
    assert.equal(elements.donationLink.href, 'https://example.test/doar');
});

test('feedback prepara e-mail com texto codificado e não aceita mensagem vazia', () => {
    const { context, clickedLinks } = editor();
    vm.runInContext("interfaceLanguage = 'en'", context);
    const result = element();
    const message = { value: '  Sugestão & melhoria\nOutra linha?  ' };
    const form = { elements: { mensagem: message }, querySelector: () => result };
    let prevented = false;
    const event = { currentTarget: form, preventDefault() { prevented = true; } };
    context.enviarFeedback(event);
    const email = new URL(clickedLinks[0]);
    assert.equal(prevented, true);
    assert.equal(email.protocol, 'mailto:');
    assert.equal(email.pathname, 'goal-splendid50@bravealias.com');
    assert.equal(email.searchParams.get('subject'), 'Feedback for CV Editor');
    assert.equal(email.searchParams.get('body'), 'Sugestão & melhoria\r\nOutra linha?');
    assert.match(result.textContent, /confirm sending/);
    message.value = '   ';
    context.enviarFeedback(event);
    assert.equal(clickedLinks.length, 1);
    assert.match(result.textContent, /Write a message/);
});

test('dados recuperados suportam várias experiências e rejeitam uma entrada incompleta', async () => {
    const { context, fields } = editor();
    const data = draft(fields);
    for (const suffix of ['Cargo', 'Data', 'Empresa', 'Detalhes']) {
        data.campos[`experiencia4${suffix}`] = suffix;
    }
    data.campos.educacao4 = 'Curso adicional';
    await context.validateDraft(data);
    assert.equal(context.entryCounts(data.campos).experiences, 4);
    assert.equal(context.entryCounts(data.campos).education, 4);
    delete data.campos.experiencia4Cargo;
    await assert.rejects(context.validateDraft(data), /campos esperados/);
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
    elements.feedbackAfterPdf.value = 'Sugestão temporária';
    elements.feedbackFooter.value = 'Outra sugestão temporária';
    elements.languageControl.value = 'en';
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
    assert.equal(elements.feedbackAfterPdf.value, '');
    assert.equal(elements.feedbackFooter.value, '');
    assert.equal(elements.languageControl.value, 'pt-BR');
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
