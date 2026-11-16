const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

function resposta() {
    return {
        cargo: 'Suporte ao Cliente',
        resumo: 'Experiência em atendimento remoto.',
        competencias: Array.from({ length: 6 }, (_, i) => ({
            titulo: `Competência ${i + 1}`,
            descricao: 'Descrição baseada no CV.'
        }))
    };
}

function elemento() {
    return {
        textContent: 'Original',
        children: [],
        hidden: true,
        classList: {
            values: new Set(['active', 'hidden']),
            add(value) { this.values.add(value); },
            remove(value) { this.values.delete(value); },
            contains(value) { return this.values.has(value); }
        },
        appendChild(child) { this.children.push(child); },
        replaceChildren(...children) { this.children = children; },
        scrollIntoView() { this.scrolled = true; },
        focus() { this.focused = true; }
    };
}

function editor({ storageError = false } = {}) {
    const ids = ['respostaInput', 'cargoAlvo', 'resumoTexto', 'competenciasGrid',
        'cv-sheet', 'editorStatus', 'aiPanel', 'aiOutputText', 'aiResultBox'];
    const elements = Object.fromEntries(ids.map(id => [id, elemento()]));
    const saved = new Map();
    const context = vm.createContext({
        document: {
            addEventListener() {},
            getElementById: id => elements[id] || null,
            createElement: elemento,
            createTextNode: text => ({ textContent: text })
        },
        localStorage: {
            setItem(key, value) {
                if (storageError) throw new Error('Armazenamento indisponível');
                saved.set(key, value);
            }
        },
        console: { error() {} }
    });
    vm.runInContext(script, context);
    return { context, elements, saved };
}

test('aplica JSON com bloco de código e revela o resultado sem o painel a tapar o CV', () => {
    const { context, elements, saved } = editor();
    const data = resposta();
    data.cargo = '<strong>Suporte</strong>';
    elements.respostaInput.value = `Aqui está:\n\`\`\`json\n${JSON.stringify(data)}\n\`\`\``;
    context.aplicarResposta();
    assert.equal(elements.cargoAlvo.textContent, data.cargo);
    assert.equal(elements.resumoTexto.textContent, data.resumo);
    assert.equal(elements.competenciasGrid.children.length, 6);
    assert.equal(elements.competenciasGrid.children[0].children[1].textContent, data.competencias[0].descricao);
    assert.equal(elements.aiPanel.classList.contains('hidden'), true);
    assert.equal(elements.editorStatus.hidden, false);
    assert.equal(elements.editorStatus.scrolled, true);
    assert.equal(elements.editorStatus.focused, true);
    assert.match(elements.editorStatus.textContent, /atualizado e guardado/);
    assert.equal(saved.has('cv_editor_html'), true);
});

for (const [name, raw] of [
    ['resposta vazia', ''],
    ['texto livre', 'Segue o currículo adaptado em texto livre.'],
    ['JSON incompleto', '{"cargo": "Suporte"'],
    ['JSON sem os campos esperados', '{}'],
    ['resumo inválido', JSON.stringify({ ...resposta(), resumo: {} })],
    ['competência inválida', JSON.stringify({ ...resposta(), competencias: [...resposta().competencias.slice(0, 5), null] })],
    ['menos de seis competências', JSON.stringify({ ...resposta(), competencias: resposta().competencias.slice(0, 5) })]
]) {
    test(`rejeita ${name}, apresenta o erro e não aplica alterações parciais`, () => {
        const { context, elements, saved } = editor();
        elements.respostaInput.value = raw;
        context.aplicarResposta();
        assert.equal(elements.cargoAlvo.textContent, 'Original');
        assert.equal(elements.resumoTexto.textContent, 'Original');
        assert.equal(elements.competenciasGrid.children.length, 0);
        assert.equal(elements.aiPanel.classList.contains('active'), true);
        assert.equal(elements.aiResultBox.classList.contains('hidden'), false);
        assert.equal(elements.aiResultBox.scrolled, true);
        assert.match(elements.aiOutputText.textContent, /^⚠️/);
        assert.equal(saved.size, 0);
    });
}

test('campo removido pela edição direta não deixa o CV parcialmente atualizado', () => {
    const { context, elements, saved } = editor();
    elements.respostaInput.value = JSON.stringify(resposta());
    delete elements.resumoTexto;
    context.aplicarResposta();
    assert.equal(elements.cargoAlvo.textContent, 'Original');
    assert.equal(saved.size, 0);
    assert.match(elements.aiOutputText.textContent, /estrutura do CV/);
});

test('falha ao guardar não é apresentada como sucesso de persistência', () => {
    const { context, elements } = editor({ storageError: true });
    elements.respostaInput.value = JSON.stringify(resposta());
    context.aplicarResposta();
    assert.equal(elements.cargoAlvo.textContent, resposta().cargo);
    assert.equal(elements.editorStatus.hidden, false);
    assert.match(elements.editorStatus.textContent, /não foi possível guardá-lo/);
    assert.doesNotMatch(elements.editorStatus.textContent, /atualizado e guardado/);
});
