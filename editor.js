const SESSION_LIMIT = 2 * 60 * 60 * 1000;
const SESSION_WARNING = 5 * 60 * 1000;
const PHOTO_LIMIT = 5 * 1024 * 1024;
const TEXT_FILE_LIMIT = 5 * 1024 * 1024;
const LEGACY_HTML_LIMIT = 32 * 1024 * 1024;
const LEGACY_HTML = 'cv_editor_html';
const LEGACY_PHOTO = 'cv_editor_foto';
const MAX_ENTRIES = 20;
const DONATION_URL = '';
const FEEDBACK_EMAIL = 'goal-splendid50@bravealias.com';
const BASE_FIELDS = ['nome', 'cargo', 'morada', 'email', 'telefone', 'resumo',
    ...Array.from({ length: 6 }, (_, index) => `competencia${index + 1}`)];
const FONTS = [
    'Arial, Helvetica, sans-serif',
    'Calibri, Arial, sans-serif',
    'Georgia, serif',
    "'Times New Roman', serif"
];
const CV_LANGUAGES = {
    'pt-PT': {
        photo: 'Fotografia do candidato',
        labels: { address: 'Morada:', email: 'Email:', phone: 'Telemóvel:', summary: 'Resumo Profissional', skills: 'Competências', experience: 'Experiência', education: 'Educação e Estudos' },
        fields: {
            nome: ['Escreve o teu nome completo', 'Nome completo'],
            cargo: ['Indica o cargo ou área pretendida', 'Cargo pretendido'],
            morada: ['Cidade e país ou morada', 'Morada'],
            email: ['Email profissional', 'Email'],
            telefone: ['Número com indicativo', 'Telemóvel'],
            resumo: ['Resume a tua experiência, pontos fortes e objetivo profissional em algumas frases.', 'Resumo profissional']
        },
        skills: ['Indica uma competência relevante', 'Indica outra competência relevante', 'Indica ferramentas ou conhecimentos', 'Indica uma habilidade profissional', 'Indica outra habilidade profissional', 'Indica idiomas ou outras competências'],
        skillLabel: 'Competência',
        experience: { Cargo: ['Cargo desempenhado', 'Cargo da experiência'], Data: ['Mês/ano – mês/ano', 'Período da experiência'], Empresa: ['Empresa e local', 'Empresa da experiência'], Detalhes: ['Descreve responsabilidades e resultados concretos.', 'Detalhes da experiência'] },
        education: ['Curso, instituição e data de conclusão ou situação atual', 'Educação']
    },
    'pt-BR': {
        photo: 'Foto do candidato',
        labels: { address: 'Endereço:', email: 'E-mail:', phone: 'Telefone:', summary: 'Resumo Profissional', skills: 'Competências', experience: 'Experiência', education: 'Formação Acadêmica' },
        fields: {
            nome: ['Escreva seu nome completo', 'Nome completo'],
            cargo: ['Informe o cargo ou área desejada', 'Cargo desejado'],
            morada: ['Cidade e país ou endereço', 'Endereço'],
            email: ['E-mail profissional', 'E-mail'],
            telefone: ['Número com código do país', 'Telefone'],
            resumo: ['Resuma sua experiência, pontos fortes e objetivo profissional em algumas frases.', 'Resumo profissional']
        },
        skills: ['Informe uma competência relevante', 'Informe outra competência relevante', 'Informe ferramentas ou conhecimentos', 'Informe uma habilidade profissional', 'Informe outra habilidade profissional', 'Informe idiomas ou outras competências'],
        skillLabel: 'Competência',
        experience: { Cargo: ['Cargo exercido', 'Cargo da experiência'], Data: ['Mês/ano – mês/ano', 'Período da experiência'], Empresa: ['Empresa e local', 'Empresa da experiência'], Detalhes: ['Descreva responsabilidades e resultados concretos.', 'Detalhes da experiência'] },
        education: ['Curso, instituição e data de conclusão ou situação atual', 'Formação']
    },
    es: {
        photo: 'Fotografía del candidato',
        labels: { address: 'Dirección:', email: 'Correo:', phone: 'Teléfono:', summary: 'Perfil Profesional', skills: 'Competencias', experience: 'Experiencia', education: 'Formación Académica' },
        fields: {
            nome: ['Escribe tu nombre completo', 'Nombre completo'],
            cargo: ['Indica el puesto o área deseados', 'Puesto deseado'],
            morada: ['Ciudad y país o dirección', 'Dirección'],
            email: ['Correo electrónico profesional', 'Correo electrónico'],
            telefone: ['Número con prefijo internacional', 'Teléfono'],
            resumo: ['Resume tu experiencia, fortalezas y objetivo profesional en unas frases.', 'Perfil profesional']
        },
        skills: ['Indica una competencia relevante', 'Indica otra competencia relevante', 'Indica herramientas o conocimientos', 'Indica una habilidad profesional', 'Indica otra habilidad profesional', 'Indica idiomas u otras competencias'],
        skillLabel: 'Competencia',
        experience: { Cargo: ['Puesto desempeñado', 'Puesto de la experiencia'], Data: ['Mes/año – mes/año', 'Período de la experiencia'], Empresa: ['Empresa y lugar', 'Empresa de la experiencia'], Detalhes: ['Describe responsabilidades y resultados concretos.', 'Detalles de la experiencia'] },
        education: ['Estudios, institución y fecha de finalización o situación actual', 'Formación']
    },
    en: {
        photo: 'Candidate photograph',
        labels: { address: 'Address:', email: 'Email:', phone: 'Phone:', summary: 'Professional Summary', skills: 'Skills', experience: 'Experience', education: 'Education' },
        fields: {
            nome: ['Enter your full name', 'Full name'],
            cargo: ['Enter your target role or field', 'Target role'],
            morada: ['City and country or address', 'Address'],
            email: ['Professional email address', 'Email'],
            telefone: ['Number with country code', 'Phone'],
            resumo: ['Summarize your experience, strengths and career objective in a few sentences.', 'Professional summary']
        },
        skills: ['Enter a relevant skill', 'Enter another relevant skill', 'Enter tools or knowledge', 'Enter a professional skill', 'Enter another professional skill', 'Enter languages or other skills'],
        skillLabel: 'Skill',
        experience: { Cargo: ['Job title', 'Job title for experience'], Data: ['Month/year – month/year', 'Dates for experience'], Empresa: ['Company and location', 'Company for experience'], Detalhes: ['Describe responsibilities and concrete results.', 'Details for experience'] },
        education: ['Qualification, institution and completion date or current status', 'Education']
    }
};

let lastActivity = Date.now();
let sessionTimer;
let dirty = false;
let photoData = null;
let sessionRevision = 0;
let photoRevision = 0;
const textFileRevisions = Object.create(null);

function checkSession(revision) {
    if (Date.now() - lastActivity >= SESSION_LIMIT) scheduleSession();
    if (revision !== sessionRevision) throw new Error('A sessão terminou durante a operação. Tenta novamente.');
}

function status(texto) {
    mostrarMensagem(document.getElementById('controlStatus'), texto);
}

function fields() {
    return [...document.querySelectorAll('#cv-sheet [data-field]')];
}

function currentFields() {
    return Object.fromEntries(fields().map(field => [field.dataset.field, field.innerText.trim()]));
}

function fieldKeys(experiences, education) {
    return [
        ...BASE_FIELDS,
        ...Array.from({ length: experiences }, (_, index) =>
            ['Cargo', 'Data', 'Empresa', 'Detalhes'].map(suffix => `experiencia${index + 1}${suffix}`)).flat(),
        ...Array.from({ length: education }, (_, index) => `educacao${index + 1}`)
    ];
}

function entryCounts(data) {
    const keys = Object.keys(data);
    const count = pattern => Math.max(0, ...keys.map(key => Number(key.match(pattern)?.[1] || 0)));
    const experiences = count(/^experiencia(\d+)(?:Cargo|Data|Empresa|Detalhes)$/);
    const education = count(/^educacao(\d+)$/);
    if (experiences < 1 || experiences > MAX_ENTRIES || education < 1 || education > MAX_ENTRIES) {
        throw new Error('Os dados devem ter entre 1 e 20 experiências e formações.');
    }
    const expected = fieldKeys(experiences, education);
    if (keys.length !== expected.length ||
        expected.some(key => typeof data[key] !== 'string' || data[key].length > 100000)) {
        throw new Error('Os dados não contêm todos os campos esperados.');
    }
    return { experiences, education };
}

function listaEntrada(tipo) {
    return document.getElementById(tipo === 'experiencia' ? 'experienceList' : 'educationList');
}

function acrescentarEntrada(tipo) {
    const list = listaEntrada(tipo);
    const number = list.children.length + 1;
    const clone = list.firstElementChild.cloneNode(true);
    const editable = tipo === 'experiencia' ? clone.querySelectorAll('[data-field]') : [clone];
    for (const field of editable) {
        field.dataset.field = field.dataset.field.replace(new RegExp(`^${tipo}\\d+`), tipo + number);
        field.setAttribute('aria-label', field.getAttribute('aria-label').replace(/\d+$/, number));
        field.textContent = '';
    }
    list.appendChild(clone);
}

function ajustarEntradas(experiences, education) {
    for (const [tipo, count] of [['experiencia', experiences], ['educacao', education]]) {
        const list = listaEntrada(tipo);
        while (list.children.length > count) list.lastElementChild.remove();
        while (list.children.length < count) acrescentarEntrada(tipo);
    }
}

function adicionarEntrada(tipo) {
    if (listaEntrada(tipo).children.length >= MAX_ENTRIES) {
        status('⚠️ O limite é de 20 entradas por secção.');
        return;
    }
    acrescentarEntrada(tipo);
    dirty = true;
    verificarPagina();
    status(tipo === 'experiencia' ? 'Experiência adicionada ao CV.' : 'Formação adicionada ao CV.');
}

function removerEntrada(tipo) {
    const list = listaEntrada(tipo);
    if (list.children.length <= 1) {
        status('⚠️ Mantém pelo menos uma entrada nesta secção.');
        return;
    }
    const last = list.lastElementChild;
    if (last.innerText.trim() && !confirm(traduzirMensagem('Remover a última entrada e os seus dados?'))) return;
    last.remove();
    dirty = true;
    verificarPagina();
    status('Última entrada removida.');
}

function sessionSettings() {
    return {
        margem: Number(document.getElementById('marginControl').value),
        fonte: document.getElementById('fontControl').value,
        tamanho: Number(document.getElementById('fontSizeControl').value),
        idioma: document.getElementById('languageControl').value
    };
}

function validateSettings(settings) {
    if (!settings || !Number.isFinite(settings.margem) || settings.margem < 5 || settings.margem > 25 ||
        !FONTS.includes(settings.fonte) || !Number.isFinite(settings.tamanho) ||
        settings.tamanho < 8 || settings.tamanho > 18 ||
        (settings.idioma !== undefined && !Object.hasOwn(CV_LANGUAGES, settings.idioma))) {
        throw new Error('As configurações de idioma, margem ou fonte são inválidas.');
    }
}

function aplicarIdioma(idioma) {
    const text = CV_LANGUAGES[idioma];
    const sheet = document.getElementById('cv-sheet');
    sheet.lang = idioma;
    document.getElementById('cvPhoto').alt = text.photo;
    for (const label of sheet.querySelectorAll('[data-cv-label]')) {
        label.textContent = text.labels[label.dataset.cvLabel];
    }
    for (const field of fields()) {
        const key = field.dataset.field;
        const skill = key.match(/^competencia(\d+)$/);
        const experience = key.match(/^experiencia(\d+)(Cargo|Data|Empresa|Detalhes)$/);
        const education = key.match(/^educacao(\d+)$/);
        let instructions = text.fields[key];
        if (skill) instructions = [text.skills[Number(skill[1]) - 1], `${text.skillLabel} ${skill[1]}`];
        if (experience) {
            const [placeholder, label] = text.experience[experience[2]];
            instructions = [placeholder, `${label} ${experience[1]}`];
        }
        if (education) instructions = [text.education[0], `${text.education[1]} ${education[1]}`];
        field.dataset.placeholder = instructions[0];
        field.setAttribute('aria-label', instructions[1]);
    }
}

function applySettings(settings) {
    validateSettings(settings);
    const idioma = settings.idioma === undefined ? 'pt-PT' : settings.idioma;
    document.getElementById('marginControl').value = settings.margem;
    document.getElementById('fontControl').value = settings.fonte;
    document.getElementById('fontSizeControl').value = settings.tamanho;
    document.getElementById('languageControl').value = idioma;
    aplicarIdioma(idioma);
    const root = document.documentElement.style;
    root.setProperty('--margem', `${settings.margem}mm`);
    root.setProperty('--fonte', settings.fonte);
    root.setProperty('--fonte-base', `${settings.tamanho}px`);
    verificarPagina();
}

function atualizarConfiguracao() {
    try {
        applySettings(sessionSettings());
        dirty = true;
        status('Ajustes aplicados ao CV.');
    } catch (error) {
        status('⚠️ Não foi possível aplicar os ajustes: ' + error.message);
    }
}

function verificarPagina() {
    const sheet = document.getElementById('cv-sheet');
    const clone = sheet.cloneNode(true);
    clone.classList.add('exporting');
    Object.assign(clone.style, {
        position: 'fixed', visibility: 'hidden', left: '-10000px', top: '0',
        width: '210mm', maxWidth: 'none', minHeight: '0', height: 'auto'
    });
    const page = document.createElement('div');
    Object.assign(page.style, { position: 'fixed', visibility: 'hidden', height: '297mm' });
    document.body.append(clone, page);
    const overflow = clone.getBoundingClientRect().height > page.getBoundingClientRect().height ||
        clone.scrollWidth > clone.clientWidth;
    clone.remove();
    page.remove();
    document.getElementById('pageWarning').classList.toggle('hidden', !overflow);
    return overflow;
}

function dataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Não foi possível ler o ficheiro.'));
        reader.readAsDataURL(file);
    });
}

function validarFoto(data) {
    return new Promise((resolve, reject) => {
        if (typeof data !== 'string' || !/^data:image\/(jpeg|png);base64,[A-Za-z0-9+/]+={0,2}$/.test(data) ||
            data.length > Math.ceil(PHOTO_LIMIT / 3) * 4 + 30) {
            reject(new Error('A foto deve ser JPEG ou PNG e ter no máximo 5 MB.'));
            return;
        }
        try {
            const signature = atob(data.slice(data.indexOf(',') + 1, data.indexOf(',') + 13));
            const jpeg = data.startsWith('data:image/jpeg;') && signature.startsWith('\xff\xd8\xff');
            const png = data.startsWith('data:image/png;') && signature.startsWith('\x89PNG\r\n\x1a\n');
            if (!jpeg && !png) throw new Error('Formato inválido');
        } catch {
            reject(new Error('O conteúdo da foto não é um JPEG ou PNG válido.'));
            return;
        }
        const image = new Image();
        image.onload = () => {
            if (image.naturalWidth < 300 || image.naturalHeight < 400) {
                reject(new Error('A foto deve ter pelo menos 300 × 400 pixels.'));
            } else {
                resolve();
            }
        };
        image.onerror = () => reject(new Error('Não foi possível abrir esta imagem.'));
        image.src = data;
    });
}

function alterarFoto() {
    const checkbox = document.getElementById('includePhoto');
    if (checkbox.checked && !photoData) {
        checkbox.checked = false;
        status('⚠️ Escolhe primeiro uma foto JPEG ou PNG com pelo menos 300 × 400 pixels.');
        return;
    }
    document.getElementById('photoColumn').classList.toggle('hidden', !checkbox.checked);
    document.getElementById('personalData').classList.toggle('col-span-12', !checkbox.checked);
    document.getElementById('personalData').classList.toggle('col-span-10', checkbox.checked);
    dirty = true;
    verificarPagina();
}

async function previewImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const revision = sessionRevision;
    const request = ++photoRevision;
    try {
        if (!['image/jpeg', 'image/png'].includes(file.type) || file.size > PHOTO_LIMIT) {
            throw new Error('A foto deve ser JPEG ou PNG e ter no máximo 5 MB.');
        }
        const data = await dataUrl(file);
        await validarFoto(data);
        checkSession(revision);
        if (request !== photoRevision) return;
        photoData = data;
        document.getElementById('cvPhoto').src = data;
        document.getElementById('includePhoto').checked = true;
        alterarFoto();
        status('Foto adicionada. Podes desmarcar «Incluir foto» antes de descarregar o PDF.');
    } catch (error) {
        if (request === photoRevision) status('⚠️ ' + error.message);
    } finally {
        if (request === photoRevision) event.target.value = '';
    }
}

function removerFoto() {
    photoRevision++;
    photoData = null;
    document.getElementById('cvPhoto').removeAttribute('src');
    document.getElementById('includePhoto').checked = false;
    alterarFoto();
    status('Foto removida.');
}

async function validateDraft(draft) {
    if (!draft || draft.formato !== 'cv-editor' || draft.versao !== 1 ||
        !draft.campos || typeof draft.campos !== 'object' || Array.isArray(draft.campos)) {
        throw new Error('Os dados antigos não são válidos.');
    }
    entryCounts(draft.campos);
    validateSettings(draft.configuracao);
    if (draft.fotografia !== null) {
        if (!draft.fotografia || typeof draft.fotografia.incluir !== 'boolean') {
            throw new Error('Os dados da fotografia são inválidos.');
        }
        await validarFoto(draft.fotografia.dados);
    }
    return draft;
}

function applyDraft(draft) {
    const counts = entryCounts(draft.campos);
    ajustarEntradas(counts.experiences, counts.education);
    for (const field of fields()) field.textContent = draft.campos[field.dataset.field];
    photoRevision++;
    photoData = draft.fotografia?.dados || null;
    const photo = document.getElementById('cvPhoto');
    if (photoData) photo.src = photoData;
    else photo.removeAttribute('src');
    document.getElementById('includePhoto').checked = draft.fotografia?.incluir || false;
    alterarFoto();
    applySettings(draft.configuracao);
    dirty = true;
}

function legacyData() {
    return { html: localStorage.getItem(LEGACY_HTML), foto: localStorage.getItem(LEGACY_PHOTO) };
}

function atualizarAvisoLegado() {
    try {
        const old = legacyData();
        document.getElementById('legacyNotice').classList.toggle('hidden', !old.html && !old.foto);
    } catch (error) {
        console.error('Não foi possível verificar dados antigos:', error);
        status('⚠️ Não foi possível verificar se existem dados antigos neste navegador.');
    }
}

function apagarLegado() {
    if (!confirm(traduzirMensagem('Apagar definitivamente os dados guardados pela versão anterior? Recupera-os primeiro se precisares deles.'))) return;
    try {
        localStorage.removeItem(LEGACY_HTML);
        localStorage.removeItem(LEGACY_PHOTO);
        atualizarAvisoLegado();
        status('Dados antigos apagados deste navegador.');
    } catch (error) {
        console.error('Não foi possível apagar os dados antigos:', error);
        status('⚠️ Não foi possível apagar os dados antigos neste navegador.');
    }
}

async function converterLegado(html, foto) {
    if (typeof html !== 'string' || html.length > LEGACY_HTML_LIMIT) {
        throw new Error('O rascunho antigo não contém um CV reconhecível.');
    }
    // O conteúdo do template permanece inerte e nunca é inserido na página.
    const template = document.createElement('template');
    template.innerHTML = html;
    const root = template.content;
    const blocks = root.children;
    const summary = root.querySelector('#resumoTexto');
    const skills = root.querySelectorAll('#competenciasGrid > p');
    const jobs = blocks[4]?.querySelectorAll(':scope > .col-span-10 > div');
    const studies = blocks[5]?.querySelectorAll(':scope > .col-span-10 > div');
    if (!root.querySelector('h1') || !root.querySelector('#cargoAlvo') || !summary || !jobs || !studies ||
        skills.length > 6 || jobs.length > MAX_ENTRIES || studies.length > MAX_ENTRIES) {
        throw new Error('O formato antigo não pôde ser convertido sem perda.');
    }
    const text = node => node?.textContent?.trim() || '';
    const blank = Object.fromEntries(fieldKeys(Math.max(1, jobs.length), Math.max(1, studies.length))
        .map(key => [key, '']));
    blank.nome = text(root.querySelector('h1'));
    blank.cargo = text(root.querySelector('#cargoAlvo'));
    blank.resumo = text(summary);
    const contacts = root.querySelectorAll('li');
    for (const contact of contacts) {
        const value = text(contact).replace(/^(Morada|Telemóvel|Email):\s*/i, '').trim();
        if (/^Morada:/i.test(text(contact))) blank.morada = value;
        if (/^Telemóvel:/i.test(text(contact))) blank.telefone = value;
        if (/^Email:/i.test(text(contact))) blank.email = value;
    }
    skills.forEach((item, index) => { blank[`competencia${index + 1}`] = text(item); });
    jobs.forEach((job, index) => {
        const prefix = `experiencia${index + 1}`;
        blank[prefix + 'Cargo'] = text(job.querySelector('h3'));
        blank[prefix + 'Data'] = text(job.querySelector('span'));
        blank[prefix + 'Empresa'] = text(job.querySelector('p'));
        blank[prefix + 'Detalhes'] = [...job.querySelectorAll('li')].map(item => '• ' + text(item)).join('\n');
    });
    studies.forEach((study, index) => { blank[`educacao${index + 1}`] = text(study); });
    let image = foto || root.querySelector('#cvPhoto')?.getAttribute('src') || null;
    if (image) {
        try {
            await validarFoto(image);
        } catch (error) {
            if (!confirm(traduzirMensagem('A fotografia antiga não cumpre os requisitos atuais. Recuperar os textos sem a fotografia? Os dados antigos não serão apagados.'))) {
                throw new Error('Recuperação cancelada.');
            }
            image = null;
        }
    }
    return validateDraft({
        formato: 'cv-editor', versao: 1, campos: blank,
        configuracao: { margem: 10, fonte: FONTS[0], tamanho: 10 },
        fotografia: image ? { dados: image, incluir: true } : null
    });
}

async function recuperarLegado() {
    const revision = sessionRevision;
    try {
        const old = legacyData();
        const draft = await converterLegado(old.html, old.foto);
        checkSession(revision);
        if (dirty && !confirm(traduzirMensagem('Recuperar o rascunho substituirá o CV atual. Continua?'))) return;
        checkSession(revision);
        applyDraft(draft);
        status('Rascunho recuperado. Copia e guarda o texto noutro lugar antes de apagares os dados antigos.');
    } catch (error) {
        console.error('Erro ao recuperar rascunho antigo:', error);
        status('⚠️ ' + error.message + ' Os dados antigos não foram apagados.');
    }
}

function resetSession() {
    sessionRevision++;
    ajustarEntradas(3, 3);
    fields().forEach(field => { field.textContent = ''; });
    for (const id of ['cvAtualInput', 'jobDescriptionInput', 'promptOutput', 'respostaInput', 'cvFileUpload', 'jobFileUpload', 'photoUpload', 'feedbackAfterPdf', 'feedbackFooter']) {
        document.getElementById(id).value = '';
    }
    document.querySelectorAll('[data-feedback-status]').forEach(node => { mostrarMensagem(node, ''); });
    document.getElementById('promptBox').classList.add('hidden');
    document.getElementById('aiResultBox').classList.add('hidden');
    document.getElementById('aiPanel').classList.remove('active');
    document.getElementById('aiPanel').classList.add('hidden');
    document.getElementById('editorStatus').hidden = true;
    document.getElementById('donationNotice').classList.add('hidden');
    mostrarMensagem(document.getElementById('pdfStatus'), '');
    removerFoto();
    applySettings({ margem: 10, fonte: FONTS[0], tamanho: 10, idioma: 'pt-BR' });
    dirty = false;
}

function reporOriginal() {
    if (!confirm(traduzirMensagem('Apagar o CV e os dados desta sessão? Esta ação não pode ser desfeita.'))) return;
    resetSession();
    status('Dados desta sessão apagados.');
}

function scheduleSession() {
    clearTimeout(sessionTimer);
    const remaining = SESSION_LIMIT - (Date.now() - lastActivity);
    const warning = document.getElementById('sessionWarning');
    if (remaining <= 0) {
        resetSession();
        status('Sessão apagada após 2 horas de inatividade.');
        warning.classList.add('hidden');
        lastActivity = Date.now();
        sessionTimer = setTimeout(scheduleSession, SESSION_LIMIT - SESSION_WARNING);
    } else if (remaining <= SESSION_WARNING) {
        mostrarMensagem(warning, 'A sessão será apagada após 2 horas de inatividade. Interage com a página para continuar.');
        warning.classList.remove('hidden');
        sessionTimer = setTimeout(scheduleSession, remaining);
    } else {
        warning.classList.add('hidden');
        sessionTimer = setTimeout(scheduleSession, remaining - SESSION_WARNING);
    }
}

function registrarAtividade() {
    if (Date.now() - lastActivity >= SESSION_LIMIT) scheduleSession();
    lastActivity = Date.now();
    scheduleSession();
}

async function gerarPDF() {
    const btn = document.getElementById('btnPdf');
    const pdfStatus = document.getElementById('pdfStatus');
    const original = [...btn.childNodes];
    const sheet = document.getElementById('cv-sheet');
    if (typeof html2pdf !== 'function') {
        mostrarMensagem(pdfStatus, '⚠️ A biblioteca de PDF não está disponível. Verifica a ligação ou usa a impressão do navegador.');
        return;
    }
    const link = document.createElement('a');
    if (!('download' in link) || typeof URL.createObjectURL !== 'function') {
        mostrarMensagem(pdfStatus, '⚠️ O download direto não está disponível neste navegador. Usa a impressão do navegador.');
        return;
    }
    mostrarMensagem(pdfStatus, '');
    btn.disabled = true;
    mostrarMensagem(btn, 'A gerar...');
    let url;
    try {
        const fits = !verificarPagina();
        sheet.classList.add('exporting');
        const worker = html2pdf().set({
            margin: 0,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false, scrollX: 0, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).from(sheet).toCanvas();
        const canvas = await worker.get('canvas');
        const size = await worker.get('pageSize');
        const pageHeight = Math.floor(canvas.width * size.inner.ratio);
        // O arredondamento do canvas pode criar uma página extra só com parte da margem inferior.
        if (fits && canvas.height > pageHeight && canvas.height - pageHeight <= 4) {
            const cropped = document.createElement('canvas');
            cropped.width = canvas.width;
            cropped.height = pageHeight;
            const context = cropped.getContext('2d');
            if (!context) throw new Error('Não foi possível preparar a imagem do PDF.');
            context.drawImage(canvas, 0, 0);
            await worker.set({ canvas: cropped });
        }
        url = URL.createObjectURL(await worker.toPdf().outputPdf('blob'));
        link.href = url;
        link.download = 'CV.pdf';
        // Se o navegador abrir uma prévia em vez de baixar, não substitui a aba do editor.
        link.target = '_blank';
        link.rel = 'noopener';
        link.hidden = true;
        document.body.append(link);
        link.click();
        mostrarApoio();
    } catch (error) {
        console.error('Erro na exportação:', error);
        mostrarMensagem(pdfStatus, '⚠️ Não foi possível gerar o PDF. Tenta novamente ou usa a impressão do navegador.');
    } finally {
        link.remove();
        // Dá tempo ao navegador para iniciar a leitura do arquivo.
        if (url) setTimeout(() => URL.revokeObjectURL(url), 60_000);
        sheet.classList.remove('exporting');
        btn.disabled = false;
        interfaceMessages.delete(btn);
        btn.replaceChildren(...original);
    }
}

function mostrarApoio(link = DONATION_URL) {
    document.getElementById('donationNotice').classList.remove('hidden');
    const offer = document.getElementById('donationOffer');
    offer.classList.add('hidden');
    if (!link) return;
    let url;
    try {
        url = new URL(link);
        if (url.protocol !== 'https:') throw new Error('O link de doação deve usar HTTPS.');
    } catch (error) {
        console.error('Link de doação inválido:', error);
        status('⚠️ A opção de apoio está indisponível: o link de doação não está configurado corretamente.');
        return;
    }
    document.getElementById('donationLink').href = url.href;
    offer.classList.remove('hidden');
}

function enviarFeedback(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = form.elements.mensagem.value.trim();
    const result = form.querySelector('[data-feedback-status]');
    if (!message || message.length > 1500) {
        mostrarMensagem(result, '⚠️ Escreve uma mensagem com até 1500 caracteres.');
        return;
    }
    try {
        const subject = encodeURIComponent(traduzirTexto('Sugestão para o CV Editor'));
        const body = encodeURIComponent(message.replace(/\r?\n/g, '\r\n'));
        const link = document.createElement('a');
        link.href = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
        link.click();
        mostrarMensagem(result, `Revê e confirma o envio no teu aplicativo de e-mail. Se não abrir, envia a mensagem para ${FEEDBACK_EMAIL}.`);
    } catch (error) {
        console.error('Não foi possível preparar o e-mail:', error);
        mostrarMensagem(result, `⚠️ Não foi possível preparar o e-mail. Envia a mensagem para ${FEEDBACK_EMAIL}.`);
    }
}

function toggleAiPanel() {
    const panel = document.getElementById('aiPanel');
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        setTimeout(() => panel.classList.add('active'), 10);
    } else {
        panel.classList.remove('active');
        setTimeout(() => panel.classList.add('hidden'), 300);
    }
}

async function carregarTextoFicheiro(event, campo, descricao) {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = '';
    const revision = sessionRevision;
    const uploadRevision = textFileRevisions[campo] = (textFileRevisions[campo] || 0) + 1;
    const target = document.getElementById(campo);
    const original = target.value;
    try {
        if (!/\.(txt|docx)$/i.test(file.name)) throw new Error('Escolhe um ficheiro .txt ou .docx.');
        if (!file.size || file.size > TEXT_FILE_LIMIT) throw new Error('O ficheiro deve ter conteúdo e no máximo 5 MB.');
        let text;
        if (/\.docx$/i.test(file.name)) {
            if (typeof mammoth === 'undefined') throw new Error('A leitura de DOCX está indisponível.');
            text = (await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })).value;
        } else {
            text = await file.text();
        }
        checkSession(revision);
        if (uploadRevision !== textFileRevisions[campo]) return;
        if (target.value !== original) throw new Error('O texto mudou durante a leitura. Escolhe novamente o ficheiro.');
        if (!text.trim()) throw new Error('O ficheiro não contém texto legível.');
        target.value = text;
        dirty = true;
    } catch (error) {
        if (uploadRevision !== textFileRevisions[campo]) return;
        console.error('Não foi possível ler o ficheiro:', error);
        const detail = [
            'Escolhe um ficheiro .txt ou .docx.',
            'O ficheiro deve ter conteúdo e no máximo 5 MB.',
            'A leitura de DOCX está indisponível.',
            'O texto mudou durante a leitura. Escolhe novamente o ficheiro.',
            'O ficheiro não contém texto legível.',
            'A sessão terminou durante a operação. Tenta novamente.'
        ].includes(error.message) ? error.message : 'Verifica se o ficheiro é válido.';
        mostrarResultado(`⚠️ Não foi possível ler o ficheiro de ${descricao}. ${detail}`);
    }
}

function mostrarResultado(texto) {
    mostrarMensagem(document.getElementById('aiOutputText'), texto);
    const box = document.getElementById('aiResultBox');
    box.classList.remove('hidden');
    box.scrollIntoView({ block: 'nearest' });
}

function gerarPrompt(tipo) {
    const cvColado = document.getElementById('cvAtualInput').value.trim();
    const cvBase = cvColado || document.getElementById('cv-sheet').innerText.trim();
    const vaga = document.getElementById('jobDescriptionInput').value.trim();
    const idioma = document.getElementById('languageControl').value;
    if (!cvColado && !Object.values(currentFields()).some(Boolean)) {
        mostrarResultado('⚠️ Preenche o CV no editor ou cola o teu CV atual antes de gerar o prompt.');
        return;
    }
    if (tipo !== 'entrevista' && !vaga) {
        mostrarResultado('⚠️ Cola primeiro o anúncio da vaga.');
        return;
    }

    if (!['adaptar', 'entrevista', 'carta'].includes(tipo)) {
        mostrarResultado('⚠️ Tipo de prompt desconhecido.');
        return;
    }
    document.getElementById('promptOutput').value = criarTextoPrompt(tipo, idioma, cvBase, vaga);
    document.getElementById('promptBox').classList.remove('hidden');
    mostrarResultado('📋 Prompt gerado. Copia-o e envia-o no teu chat de IA.' +
        (tipo === 'adaptar' ? ' Depois cola a resposta JSON no passo 4.' : ' Lê a resposta diretamente no chat.'));
}

async function copiarPrompt() {
    const campo = document.getElementById('promptOutput');
    try {
        await navigator.clipboard.writeText(campo.value);
        mostrarResultado('📋 Prompt copiado. Os dados permanecem na área de transferência até serem substituídos.');
    } catch (error) {
        campo.focus();
        campo.select();
        mostrarResultado('⚠️ Não foi possível copiar automaticamente. Copia o texto selecionado manualmente.');
    }
}

function lerResposta(bruto) {
    if (!bruto.trim()) throw new Error('Cola primeiro a resposta da IA no passo 4.');
    let dados;
    try {
        dados = JSON.parse(bruto.slice(bruto.indexOf('{'), bruto.lastIndexOf('}') + 1));
    } catch {
        throw new Error('A resposta deve conter o JSON completo devolvido pelo prompt «Adaptar CV».');
    }
    const textoValido = valor => typeof valor === 'string' && valor.trim().length > 0;
    if (!dados || !textoValido(dados.cargo) || !textoValido(dados.resumo) ||
        !Array.isArray(dados.competencias) || dados.competencias.length !== 6 ||
        !dados.competencias.every(c => c && textoValido(c.titulo) && textoValido(c.descricao))) {
        throw new Error('O JSON deve incluir cargo, resumo e exatamente 6 competencias, cada uma com titulo e descricao não vazios.');
    }
    return dados;
}

function aplicarResposta() {
    let dados;
    try {
        dados = lerResposta(document.getElementById('respostaInput').value);
    } catch (error) {
        mostrarResultado('⚠️ ' + error.message);
        return;
    }
    const cargo = document.getElementById('cargoAlvo');
    const resumo = document.getElementById('resumoTexto');
    const competencias = Array.from({ length: 6 }, (_, index) =>
        document.querySelector(`[data-field="competencia${index + 1}"]`));
    if (!cargo || !resumo || competencias.some(field => !field)) {
        mostrarResultado('⚠️ Faltam campos necessários no CV. Nenhuma alteração foi aplicada.');
        return;
    }
    cargo.textContent = dados.cargo;
    resumo.textContent = dados.resumo;
    competencias.forEach((field, index) => {
        const item = dados.competencias[index];
        field.textContent = `• ${item.titulo}: ${item.descricao}`;
    });
    dirty = true;
    verificarPagina();
    const message = document.getElementById('editorStatus');
    mostrarMensagem(message, '✅ Cargo, resumo e competências atualizados nesta sessão. Revê o CV antes de gerar o PDF.');
    message.hidden = false;
    const panel = document.getElementById('aiPanel');
    panel.classList.remove('active');
    panel.classList.add('hidden');
    message.focus({ preventScroll: true });
    message.scrollIntoView({ block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarIdiomaPagina();
    aplicarIdioma(document.getElementById('languageControl').value);
    for (const id of ['marginControl', 'fontControl', 'fontSizeControl', 'languageControl']) {
        document.getElementById(id).addEventListener('input', atualizarConfiguracao);
    }
    document.getElementById('cv-sheet').addEventListener('input', () => {
        dirty = true;
        verificarPagina();
    });
    document.getElementById('cv-sheet').addEventListener('focusout', event => {
        const field = event.target.closest('[data-field]');
        if (field && !field.innerText.trim()) field.textContent = '';
    });
    for (const id of ['cvAtualInput', 'jobDescriptionInput', 'respostaInput', 'feedbackAfterPdf', 'feedbackFooter']) {
        document.getElementById(id).addEventListener('input', () => { dirty = true; });
    }
    document.querySelectorAll('[data-feedback-email]').forEach(node => { node.textContent = FEEDBACK_EMAIL; });
    document.addEventListener('paste', event => {
        if (!event.target.closest('#cv-sheet [data-field]')) return;
        event.preventDefault();
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const node = document.createTextNode(event.clipboardData.getData('text/plain'));
        range.insertNode(node);
        range.setStartAfter(node);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        event.target.dispatchEvent(new Event('input', { bubbles: true }));
    });
    for (const event of ['pointerdown', 'keydown', 'input', 'wheel']) {
        document.addEventListener(event, registrarAtividade, { passive: true });
    }
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) scheduleSession();
    });
    window.addEventListener('pageshow', event => {
        if (event.persisted) {
            resetSession();
            status('A página foi reaberta. Os dados da sessão anterior foram descartados.');
            lastActivity = Date.now();
            scheduleSession();
        }
    });
    window.addEventListener('beforeunload', event => {
        if (dirty) {
            event.preventDefault();
            event.returnValue = '';
        }
    });
    atualizarAvisoLegado();
    scheduleSession();
    verificarPagina();
});
