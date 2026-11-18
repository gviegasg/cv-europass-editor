// Each entry contains the Portuguese (Portugal), Portuguese (Brazil), Spanish and English versions.
const INTERFACE_TEXTS = [
    ['CV Editor — Criar currículo', 'CV Editor — Criar currículo', 'CV Editor — Crear currículum', 'CV Editor — Create a résumé'],
    ['Idioma da página', 'Idioma da página', 'Idioma de la página', 'Page language'],
    ['Navegação principal', 'Navegação principal', 'Navegación principal', 'Main navigation'],
    ['Como funciona', 'Como funciona', 'Cómo funciona', 'How it works'],
    ['Abrir editor', 'Abrir editor', 'Abrir editor', 'Open editor'],
    ['Versão beta · Gratuita', 'Versão beta · Gratuita', 'Versión beta · Gratis', 'Beta version · Free'],
    ['Um currículo claro,', 'Um currículo claro,', 'Un currículum claro,', 'A clear résumé,'],
    ['direcionado à vaga.', 'direcionado à vaga.', 'adaptado a la oferta.', 'tailored to the job.'],
    ['Uma escrita clara e experiências relevantes para a vaga podem chamar a atenção dos recrutadores e aumentar as tuas hipóteses de entrevista.', 'Uma escrita clara e experiências relevantes para a vaga podem chamar a atenção dos recrutadores e aumentar suas chances de entrevista.', 'Una redacción clara y experiencias relevantes para la oferta pueden llamar la atención de los reclutadores y aumentar tus posibilidades de entrevista.', 'Clear writing and experience relevant to the job can catch recruiters’ attention and improve your chances of an interview.'],
    ['Começar a editar', 'Começar a editar', 'Empezar a editar', 'Start editing'],
    ['Gratuito e sem conta · Edita no navegador · Usa a IA que preferires, sem chave API', 'Gratuito e sem conta · Edite no navegador · Use a IA que preferir, sem chave de API', 'Gratis y sin cuenta · Edita en el navegador · Usa la IA que prefieras, sin clave API', 'Free, no account · Edit in your browser · Use your preferred AI without an API key'],
    ['Preparação de candidatura', 'Preparação para a candidatura', 'Preparación de la candidatura', 'Application preparation'],
    ['Um processo simples', 'Um processo simples', 'Un proceso sencillo', 'A simple process'],
    ['Personaliza o teu currículo', 'Personalize seu currículo', 'Personaliza tu currículum', 'Personalize your résumé'],
    ['Adapta-o à vaga com o teu chat de IA', 'Adapte-o à vaga com seu chat de IA', 'Adáptalo a la oferta con tu chat de IA', 'Adapt it to the job with your AI chat'],
    ['Revê e descarrega o PDF', 'Revise e baixe o PDF', 'Revisa y descarga el PDF', 'Review and download the PDF'],
    ['Usar IA é opcional. Escolhe o serviço que preferires e revê sempre a resposta.', 'Usar IA é opcional. Escolha o serviço que preferir e sempre revise a resposta.', 'Usar IA es opcional. Elige el servicio que prefieras y revisa siempre la respuesta.', 'AI is optional. Choose the service you prefer and always review its response.'],
    ['Cria, adapta e guarda o teu currículo', 'Crie, adapte e salve seu currículo', 'Crea, adapta y guarda tu currículum', 'Create, adapt and save your résumé'],
    ['01 · Edita', '01 · Edite', '01 · Edita', '01 · Edit'],
    ['Preenche o currículo', 'Preencha o currículo', 'Completa el currículum', 'Fill in your résumé'],
    ['Como o site não guarda as tuas informações, escreve e guarda primeiro o texto num bloco de notas ou num rascunho de e-mail. Depois, preenche os campos abaixo e adiciona uma foto se quiseres.', 'Como o site não salva suas informações, escreva e salve primeiro o texto em um bloco de notas ou em um rascunho de e-mail. Depois, preencha os campos abaixo e adicione uma foto se quiser.', 'Como el sitio no guarda tu información, escribe y guarda primero el texto en un bloc de notas o en un borrador de correo. Después, completa los campos de abajo y añade una foto si quieres.', 'Because the site does not save your information, first write and save your text in a notes app or an email draft. Then fill in the fields below and add a photo if you wish.'],
    ['No telemóvel, a edição é adaptada ao ecrã; usa-o na horizontal se preferires. Confirma o formato no PDF.', 'No celular, a edição é adaptada à tela; use-o na horizontal se preferir. Confira o formato no PDF.', 'En el móvil, la edición se adapta a la pantalla; úsalo en horizontal si lo prefieres. Comprueba el formato en el PDF.', 'On a phone, editing adapts to the screen; turn it sideways if you prefer. Check the layout in the PDF.'],
    ['02 · Adapta', '02 · Adapte', '02 · Adapta', '02 · Adapt'],
    ['Prepara com IA (opcional)', 'Prepare com IA (opcional)', 'Prepara con IA (opcional)', 'Prepare with AI (optional)'],
    ['No botão ✨, cola ou carrega a vaga e, se quiseres, o teu CV em .txt ou .docx. O texto fica no assistente; revê-o e gera o prompt para o chat de IA que escolheres.', 'No botão ✨, cole ou carregue a vaga e, se quiser, seu currículo em .txt ou .docx. O texto fica no assistente; revise-o e gere o prompt para o chat de IA que escolher.', 'En el botón ✨, pega o carga la oferta y, si quieres, tu currículum en .txt o .docx. El texto queda en el asistente; revísalo y genera el prompt para el chat de IA que elijas.', 'Use the ✨ button to paste or upload the job description and optionally your résumé as .txt or .docx. The text goes into the assistant; review it and generate a prompt for your chosen AI chat.'],
    ['03 · Revê', '03 · Revise', '03 · Revisa', '03 · Review'],
    ['Aplica e confirma', 'Aplique e confira', 'Aplica y comprueba', 'Apply and check'],
    ['Se usaste IA, cola a resposta JSON no painel e clica em Aplicar resposta ao CV. Apenas o cargo, o resumo e seis competências mudam. Revê a escrita e confirma os factos.', 'Se usou IA, cole a resposta JSON no painel e clique em Aplicar resposta ao currículo. Apenas cargo, resumo e seis competências mudam. Revise a escrita e confira os fatos.', 'Si usaste IA, pega la respuesta JSON en el panel y haz clic en Aplicar respuesta al currículum. Solo cambian el puesto, el perfil y seis competencias. Revisa la redacción y comprueba los datos.', 'If you used AI, paste the JSON response into the panel and select Apply response to résumé. Only the role, summary and six skills change. Review the writing and check the facts.'],
    ['04 · Guarda', '04 · Salve', '04 · Guarda', '04 · Save'],
    ['Guarda e gera o PDF', 'Salve e gere o PDF', 'Guarda y genera el PDF', 'Save and create your PDF'],
    ['Usa Descarregar PDF no canto superior direito. Podes continuar a editar na mesma aba. Guarda também o texto noutro lugar: não é possível retomar a edição pelo PDF.', 'Use Baixar PDF no canto superior direito. Você pode continuar editando na mesma aba. Salve também o texto em outro lugar: não é possível retomar a edição pelo PDF.', 'Usa Descargar PDF en la esquina superior derecha. Puedes seguir editando en la misma pestaña. Guarda también el texto en otro lugar: no se puede retomar la edición desde el PDF.', 'Use Download PDF in the upper-right corner. You can keep editing in the same tab. Save the text elsewhere too: you cannot resume editing from the PDF.'],
    ['O editor não guarda o CV automaticamente nem o envia para um servidor. Os dados desta sessão são descartados ao atualizar ou fechar a página, ou após 2 horas de inatividade. O PDF fica no teu dispositivo. Se enviares o prompt a um serviço de IA, estarás a partilhar com ele os dados incluídos. O site carrega a biblioteca de PDF de um fornecedor externo, que pode receber dados de ligação como o endereço IP.', 'O editor não salva o currículo automaticamente nem o envia para um servidor. Os dados desta sessão são descartados ao atualizar ou fechar a página, ou após 2 horas de inatividade. O PDF fica no seu dispositivo. Se enviar o prompt a um serviço de IA, você compartilhará com ele os dados incluídos. O site carrega a biblioteca de PDF de um fornecedor externo, que pode receber dados de conexão, como o endereço IP.', 'El editor no guarda el currículum automáticamente ni lo envía a un servidor. Los datos de esta sesión se descartan al actualizar o cerrar la página, o tras 2 horas de inactividad. El PDF permanece en tu dispositivo. Si envías el prompt a un servicio de IA, compartirás con él los datos incluidos. El sitio carga la biblioteca de PDF de un proveedor externo, que puede recibir datos de conexión como la dirección IP.', 'The editor does not automatically save your résumé or send it to a server. Session data is discarded when you reload or close the page, or after 2 hours of inactivity. The PDF remains on your device. If you send the prompt to an AI service, you share the included data with that service. The site loads the PDF library from an external provider, which may receive connection data such as your IP address.'],
    ['O teu espaço', 'Seu espaço', 'Tu espacio', 'Your workspace'],
    ['Editor de currículo', 'Editor de currículo', 'Editor de currículum', 'Résumé editor'],
    ['Clica nos campos da folha para os preencher.', 'Clique nos campos da folha para preenchê-los.', 'Haz clic en los campos de la hoja para completarlos.', 'Click the fields on the page to fill them in.'],
    ['Descarregar PDF', 'Baixar PDF', 'Descargar PDF', 'Download PDF'],
    ['Limpar CV', 'Limpar currículo', 'Borrar currículum', 'Clear résumé'],
    ['Idioma do CV', 'Idioma do currículo', 'Idioma del currículum', 'Résumé language'],
    ['Margem (mm)', 'Margem (mm)', 'Margen (mm)', 'Margin (mm)'],
    ['Fonte', 'Fonte', 'Fuente', 'Font'],
    ['Tamanho (px)', 'Tamanho (px)', 'Tamaño (px)', 'Size (px)'],
    ['Incluir foto no CV', 'Incluir foto no currículo', 'Incluir foto en el currículum', 'Include photo in résumé'],
    ['Escolher foto', 'Escolher foto', 'Elegir foto', 'Choose photo'],
    ['Remover foto', 'Remover foto', 'Eliminar foto', 'Remove photo'],
    ['JPEG/PNG · mínimo 300 × 400 px · máximo 5 MB · recorte vertical', 'JPEG/PNG · mínimo 300 × 400 px · máximo 5 MB · recorte vertical', 'JPEG/PNG · mínimo 300 × 400 px · máximo 5 MB · recorte vertical', 'JPEG/PNG · minimum 300 × 400 px · maximum 5 MB · portrait crop'],
    ['Adicionar experiência', 'Adicionar experiência', 'Añadir experiencia', 'Add experience'],
    ['Remover última experiência', 'Remover última experiência', 'Eliminar última experiencia', 'Remove last experience'],
    ['Adicionar formação', 'Adicionar formação', 'Añadir formación', 'Add education'],
    ['Remover última formação', 'Remover última formação', 'Eliminar última formación', 'Remove last education'],
    ['O idioma altera os títulos e as orientações; escreve os teus dados no idioma escolhido.', 'O idioma altera os títulos e as orientações; escreva seus dados no idioma escolhido.', 'El idioma cambia los títulos y las indicaciones; escribe tus datos en el idioma elegido.', 'The language changes headings and guidance; write your details in your chosen language.'],
    ['Ajuda-nos a melhorar o editor', 'Ajude-nos a melhorar o editor', 'Ayúdanos a mejorar el editor', 'Help us improve the editor'],
    ['Fechar', 'Fechar', 'Cerrar', 'Close'],
    ['Se o editor te ajudou, podes apoiar o projeto com uma contribuição voluntária.', 'Se o editor ajudou você, apoie o projeto com uma contribuição voluntária.', 'Si el editor te ayudó, puedes apoyar el proyecto con una contribución voluntaria.', 'If the editor helped you, you can support the project with a voluntary contribution.'],
    ['Apoiar o projeto', 'Apoiar o projeto', 'Apoyar el proyecto', 'Support the project'],
    ['Sugestão ou comentário (até 1500 caracteres)', 'Sugestão ou comentário (até 1500 caracteres)', 'Sugerencia o comentario (hasta 1500 caracteres)', 'Suggestion or comment (up to 1500 characters)'],
    ['Abre o teu aplicativo de e-mail para confirmares o envio a', 'Abra seu aplicativo de e-mail para confirmar o envio para', 'Abre tu aplicación de correo para confirmar el envío a', 'Open your email app to confirm sending to'],
    ['. Não incluas dados pessoais ou o teu CV.', '. Não inclua dados pessoais ou seu currículo.', '. No incluyas datos personales ni tu currículum.', '. Do not include personal data or your résumé.'],
    ['Preparar e-mail', 'Preparar e-mail', 'Preparar correo', 'Prepare email'],
    ['Sugestão para o CV Editor', 'Sugestão para o CV Editor', 'Sugerencia para CV Editor', 'Feedback for CV Editor'],
    ['O conteúdo excede uma página A4. Reduz o texto, a fonte ou a margem antes de descarregar o PDF.', 'O conteúdo ultrapassa uma página A4. Reduza o texto, a fonte ou a margem antes de baixar o PDF.', 'El contenido supera una página A4. Reduce el texto, el tamaño de letra o el margen antes de descargar el PDF.', 'The content exceeds one A4 page. Shorten the text, reduce the font size or narrow the margin before downloading the PDF.'],
    ['Há um rascunho guardado pela versão anterior. Ele continua no navegador até ser apagado. Recupera-o antes de o apagares.', 'Há um rascunho salvo pela versão anterior. Ele permanece no navegador até ser apagado. Recupere-o antes de excluí-lo.', 'Hay un borrador guardado por la versión anterior. Permanece en el navegador hasta eliminarlo. Recupéralo antes de eliminarlo.', 'A draft saved by the previous version remains in the browser until deleted. Recover it before deleting it.'],
    ['Recuperar rascunho antigo', 'Recuperar rascunho antigo', 'Recuperar borrador anterior', 'Recover old draft'],
    ['Apagar dados antigos', 'Apagar dados antigos', 'Eliminar datos anteriores', 'Delete old data'],
    ['Partilha a tua opinião', 'Compartilhe sua opinião', 'Comparte tu opinión', 'Share your feedback'],
    ['Encontraste algum problema ou tens uma sugestão para melhorar o editor?', 'Encontrou algum problema ou tem uma sugestão para melhorar o editor?', '¿Encontraste algún problema o tienes una sugerencia para mejorar el editor?', 'Found a problem or have a suggestion to improve the editor?'],
    ['Coach de Carreira', 'Assistente de carreira', 'Asistente de carrera', 'Career assistant'],
    ['Fechar assistente', 'Fechar assistente', 'Cerrar asistente', 'Close assistant'],
    ['Sem chave API: gera um prompt, envia-o no teu chat de IA preferido (ChatGPT, Gemini, Copilot…) e, no caso da adaptação do CV, cola aqui a resposta para aplicar ao documento.', 'Sem chave de API: gere um prompt, envie-o ao seu chat de IA preferido (ChatGPT, Gemini, Copilot…) e, para adaptar o currículo, cole aqui a resposta para aplicá-la ao documento.', 'Sin clave API: genera un prompt, envíalo a tu chat de IA preferido (ChatGPT, Gemini, Copilot…) y, para adaptar el currículum, pega aquí la respuesta para aplicarla al documento.', 'No API key: generate a prompt and send it to your preferred AI chat (ChatGPT, Gemini, Copilot…). To adapt the résumé, paste the response here to apply it.'],
    ['Aceita apenas ficheiros .txt ou .docx até 5 MB. O texto é lido no navegador e colocado no assistente, não preenche automaticamente o CV.', 'Aceita apenas arquivos .txt ou .docx de até 5 MB. O texto é lido no navegador e colocado no assistente; ele não preenche automaticamente o currículo.', 'Solo acepta archivos .txt o .docx de hasta 5 MB. El texto se lee en el navegador y se coloca en el asistente; no completa automáticamente el currículum.', 'Only .txt or .docx files up to 5 MB are accepted. Text is read in the browser and placed in the assistant; it does not automatically fill the résumé.'],
    ['1 · O teu CV atual (opcional)', '1 · Seu currículo atual (opcional)', '1 · Tu currículum actual (opcional)', '1 · Your current résumé (optional)'],
    ['📎 Carregar CV .txt ou .docx', '📎 Carregar currículo .txt ou .docx', '📎 Cargar currículum .txt o .docx', '📎 Upload résumé .txt or .docx'],
    ['2 · Anúncio da vaga', '2 · Anúncio da vaga', '2 · Oferta de empleo', '2 · Job description'],
    ['📎 Carregar vaga .txt ou .docx', '📎 Carregar vaga .txt ou .docx', '📎 Cargar oferta .txt o .docx', '📎 Upload job .txt or .docx'],
    ['🎯 Gerar prompt: Adaptar CV à vaga', '🎯 Gerar prompt: Adaptar currículo à vaga', '🎯 Generar prompt: Adaptar currículum a la oferta', '🎯 Generate prompt: Adapt résumé to job'],
    ['Prompt: Entrevista', 'Prompt: Entrevista', 'Prompt: Entrevista', 'Prompt: Interview'],
    ['Prompt: Carta', 'Prompt: Carta', 'Prompt: Carta', 'Prompt: Cover letter'],
    ['3 · Prompt gerado — copia e envia na tua IA', '3 · Prompt gerado — copie e envie para sua IA', '3 · Prompt generado — cópialo y envíalo a tu IA', '3 · Generated prompt — copy and send to your AI'],
    ['📋 Copiar prompt', '📋 Copiar prompt', '📋 Copiar prompt', '📋 Copy prompt'],
    ['4 · Cola a resposta da IA (só para "Adaptar CV")', '4 · Cole a resposta da IA (somente para "Adaptar currículo")', '4 · Pega la respuesta de la IA (solo para "Adaptar currículum")', '4 · Paste the AI response (only for "Adapt résumé")'],
    ['✅ Aplicar resposta ao CV', '✅ Aplicar resposta ao currículo', '✅ Aplicar respuesta al currículum', '✅ Apply response to résumé'],
    ['Gera PDF vetorial pelo navegador (recomendado)', 'Gera PDF vetorial pelo navegador (recomendado)', 'Genera un PDF vectorial desde el navegador (recomendado)', 'Generate a vector PDF using the browser (recommended)'],
    ['Descarta as edições desta sessão', 'Descarta as edições desta sessão', 'Descarta los cambios de esta sesión', 'Discard this session’s edits'],
    ['O que podemos melhorar?', 'O que podemos melhorar?', '¿Qué podemos mejorar?', 'What can we improve?'],
    ['Escreve aqui a tua mensagem', 'Escreva sua mensagem aqui', 'Escribe aquí tu mensaje', 'Write your message here'],
    ['Cola aqui o texto do teu CV atual. Se deixares vazio, uso o CV do documento ao lado.', 'Cole aqui o texto do seu currículo atual. Se deixar vazio, usaremos o currículo do editor.', 'Pega aquí el texto de tu currículum actual. Si lo dejas vacío, usaremos el currículum del editor.', 'Paste your current résumé here. If left blank, the editor résumé will be used.'],
    ['Cola aqui o anúncio da vaga a que te candidatas', 'Cole aqui o anúncio da vaga para a qual você está se candidatando', 'Pega aquí la oferta de empleo a la que te postulas', 'Paste the job description here'],
    ['Cola aqui a resposta da IA (o JSON com cargo, resumo e competências)', 'Cole aqui a resposta da IA (o JSON com cargo, resumo e competências)', 'Pega aquí la respuesta de la IA (el JSON con puesto, perfil y competencias)', 'Paste the AI response here (the JSON with role, summary and skills)'],
    ['Assistente de carreira', 'Assistente de carreira', 'Asistente de carrera', 'Career assistant'],
    ['Abrir ou fechar assistente de carreira', 'Abrir ou fechar assistente de carreira', 'Abrir o cerrar el asistente de carrera', 'Open or close career assistant']
];

const INTERFACE_MESSAGES = [
    ['A sessão terminou durante a operação. Tenta novamente.', 'A sessão terminou durante a operação. Tente novamente.', 'La sesión terminó durante la operación. Inténtalo de nuevo.', 'The session ended during the operation. Please try again.'],
    ['Os dados devem ter entre 1 e 20 experiências e formações.', 'Os dados devem ter entre 1 e 20 experiências e formações.', 'Los datos deben tener entre 1 y 20 experiencias y estudios.', 'The data must contain between 1 and 20 experience and education entries.'],
    ['Os dados não contêm todos os campos esperados.', 'Os dados não contêm todos os campos esperados.', 'Los datos no contienen todos los campos esperados.', 'The data does not contain all expected fields.'],
    ['O limite é de 20 entradas por secção.', 'O limite é de 20 entradas por seção.', 'El límite es de 20 entradas por sección.', 'The limit is 20 entries per section.'],
    ['Experiência adicionada ao CV.', 'Experiência adicionada ao currículo.', 'Experiencia añadida al currículum.', 'Experience added to the résumé.'],
    ['Formação adicionada ao CV.', 'Formação adicionada ao currículo.', 'Formación añadida al currículum.', 'Education added to the résumé.'],
    ['Mantém pelo menos uma entrada nesta secção.', 'Mantenha pelo menos uma entrada nesta seção.', 'Mantén al menos una entrada en esta sección.', 'Keep at least one entry in this section.'],
    ['Remover a última entrada e os seus dados?', 'Remover a última entrada e seus dados?', '¿Eliminar la última entrada y sus datos?', 'Remove the last entry and its data?'],
    ['Última entrada removida.', 'Última entrada removida.', 'Última entrada eliminada.', 'Last entry removed.'],
    ['As configurações de idioma, margem ou fonte são inválidas.', 'As configurações de idioma, margem ou fonte são inválidas.', 'Los ajustes de idioma, margen o fuente no son válidos.', 'The language, margin or font settings are invalid.'],
    ['Ajustes aplicados ao CV.', 'Ajustes aplicados ao currículo.', 'Ajustes aplicados al currículum.', 'Settings applied to the résumé.'],
    ['Não foi possível aplicar os ajustes:', 'Não foi possível aplicar os ajustes:', 'No se pudieron aplicar los ajustes:', 'Could not apply the settings:'],
    ['Não foi possível ler o ficheiro.', 'Não foi possível ler o arquivo.', 'No se pudo leer el archivo.', 'Could not read the file.'],
    ['A foto deve ser JPEG ou PNG e ter no máximo 5 MB.', 'A foto deve ser JPEG ou PNG e ter no máximo 5 MB.', 'La foto debe ser JPEG o PNG y tener como máximo 5 MB.', 'The photo must be JPEG or PNG and no larger than 5 MB.'],
    ['O conteúdo da foto não é um JPEG ou PNG válido.', 'O conteúdo da foto não é um JPEG ou PNG válido.', 'El contenido de la foto no es un JPEG o PNG válido.', 'The photo content is not a valid JPEG or PNG.'],
    ['A foto deve ter pelo menos 300 × 400 pixels.', 'A foto deve ter pelo menos 300 × 400 pixels.', 'La foto debe tener al menos 300 × 400 píxeles.', 'The photo must be at least 300 × 400 pixels.'],
    ['Não foi possível abrir esta imagem.', 'Não foi possível abrir esta imagem.', 'No se pudo abrir esta imagen.', 'Could not open this image.'],
    ['Escolhe primeiro uma foto JPEG ou PNG com pelo menos 300 × 400 pixels.', 'Escolha primeiro uma foto JPEG ou PNG com pelo menos 300 × 400 pixels.', 'Primero elige una foto JPEG o PNG de al menos 300 × 400 píxeles.', 'First choose a JPEG or PNG photo of at least 300 × 400 pixels.'],
    ['Foto adicionada. Podes desmarcar «Incluir foto» antes de descarregar o PDF.', 'Foto adicionada. Você pode desmarcar «Incluir foto» antes de baixar o PDF.', 'Foto añadida. Puedes desmarcar «Incluir foto» antes de descargar el PDF.', 'Photo added. You can uncheck “Include photo” before downloading the PDF.'],
    ['Foto removida.', 'Foto removida.', 'Foto eliminada.', 'Photo removed.'],
    ['Os dados antigos não são válidos.', 'Os dados antigos não são válidos.', 'Los datos anteriores no son válidos.', 'The old data is invalid.'],
    ['Os dados da fotografia são inválidos.', 'Os dados da foto são inválidos.', 'Los datos de la foto no son válidos.', 'The photo data is invalid.'],
    ['Não foi possível verificar se existem dados antigos neste navegador.', 'Não foi possível verificar se existem dados antigos neste navegador.', 'No se pudo comprobar si hay datos anteriores en este navegador.', 'Could not check for old data in this browser.'],
    ['Apagar definitivamente os dados guardados pela versão anterior? Recupera-os primeiro se precisares deles.', 'Apagar definitivamente os dados salvos pela versão anterior? Recupere-os antes se precisar deles.', '¿Eliminar definitivamente los datos guardados por la versión anterior? Recupéralos primero si los necesitas.', 'Permanently delete data saved by the previous version? Recover it first if you need it.'],
    ['Dados antigos apagados deste navegador.', 'Dados antigos apagados deste navegador.', 'Datos anteriores eliminados de este navegador.', 'Old data deleted from this browser.'],
    ['Não foi possível apagar os dados antigos neste navegador.', 'Não foi possível apagar os dados antigos neste navegador.', 'No se pudieron eliminar los datos anteriores de este navegador.', 'Could not delete old data from this browser.'],
    ['O rascunho antigo não contém um CV reconhecível.', 'O rascunho antigo não contém um currículo reconhecível.', 'El borrador anterior no contiene un currículum reconocible.', 'The old draft does not contain a recognizable résumé.'],
    ['O formato antigo não pôde ser convertido sem perda.', 'O formato antigo não pôde ser convertido sem perda.', 'El formato anterior no se pudo convertir sin pérdida.', 'The old format could not be converted without loss.'],
    ['A fotografia antiga não cumpre os requisitos atuais. Recuperar os textos sem a fotografia? Os dados antigos não serão apagados.', 'A foto antiga não atende aos requisitos atuais. Recuperar os textos sem a foto? Os dados antigos não serão apagados.', 'La foto anterior no cumple los requisitos actuales. ¿Recuperar los textos sin la foto? Los datos anteriores no se eliminarán.', 'The old photo does not meet the current requirements. Recover the text without the photo? Old data will not be deleted.'],
    ['Recuperação cancelada.', 'Recuperação cancelada.', 'Recuperación cancelada.', 'Recovery cancelled.'],
    ['Recuperar o rascunho substituirá o CV atual. Continua?', 'Recuperar o rascunho substituirá o currículo atual. Continuar?', 'Recuperar el borrador reemplazará el currículum actual. ¿Continuar?', 'Recovering the draft will replace the current résumé. Continue?'],
    ['Rascunho recuperado. Copia e guarda o texto noutro lugar antes de apagares os dados antigos.', 'Rascunho recuperado. Copie e salve o texto em outro lugar antes de apagar os dados antigos.', 'Borrador recuperado. Copia y guarda el texto en otro lugar antes de eliminar los datos anteriores.', 'Draft recovered. Copy and save the text elsewhere before deleting the old data.'],
    ['Os dados antigos não foram apagados.', 'Os dados antigos não foram apagados.', 'Los datos anteriores no se eliminaron.', 'The old data was not deleted.'],
    ['Apagar o CV e os dados desta sessão? Esta ação não pode ser desfeita.', 'Apagar o currículo e os dados desta sessão? Esta ação não pode ser desfeita.', '¿Eliminar el currículum y los datos de esta sesión? Esta acción no se puede deshacer.', 'Delete the résumé and this session’s data? This cannot be undone.'],
    ['Dados desta sessão apagados.', 'Dados desta sessão apagados.', 'Datos de esta sesión eliminados.', 'Session data deleted.'],
    ['Sessão apagada após 2 horas de inatividade.', 'Sessão apagada após 2 horas de inatividade.', 'Sesión eliminada tras 2 horas de inactividad.', 'Session cleared after 2 hours of inactivity.'],
    ['A sessão será apagada após 2 horas de inatividade. Interage com a página para continuar.', 'A sessão será apagada após 2 horas de inatividade. Interaja com a página para continuar.', 'La sesión se eliminará tras 2 horas de inactividad. Interactúa con la página para continuar.', 'The session will be cleared after 2 hours of inactivity. Interact with the page to continue.'],
    ['A biblioteca de PDF não está disponível. Verifica a ligação ou usa a impressão do navegador.', 'A biblioteca de PDF não está disponível. Verifique a conexão ou use a impressão do navegador.', 'La biblioteca de PDF no está disponible. Comprueba la conexión o usa la opción de impresión del navegador.', 'The PDF library is unavailable. Check your connection or use your browser’s print feature.'],
    ['A gerar...', 'Gerando...', 'Generando...', 'Generating...'],
    ['O download direto não está disponível neste navegador. Usa a impressão do navegador.', 'O download direto não está disponível neste navegador. Use a impressão do navegador.', 'La descarga directa no está disponible en este navegador. Usa la opción de impresión del navegador.', 'Direct download is unavailable in this browser. Use your browser’s print feature.'],
    ['Não foi possível gerar o PDF. Tenta novamente ou usa a impressão do navegador.', 'Não foi possível gerar o PDF. Tente novamente ou use a impressão do navegador.', 'No se pudo generar el PDF. Inténtalo de nuevo o usa la opción de impresión del navegador.', 'Could not generate the PDF. Try again or use your browser’s print feature.'],
    ['A opção de apoio está indisponível: o link de doação não está configurado corretamente.', 'A opção de apoio está indisponível: o link de doação não está configurado corretamente.', 'La opción de apoyo no está disponible: el enlace de donación no está configurado correctamente.', 'The support option is unavailable: the donation link is not configured correctly.'],
    ['Escreve uma mensagem com até 1500 caracteres.', 'Escreva uma mensagem com até 1500 caracteres.', 'Escribe un mensaje de hasta 1500 caracteres.', 'Write a message of up to 1500 characters.'],
    ['Revê e confirma o envio no teu aplicativo de e-mail. Se não abrir, envia a mensagem para', 'Revise e confirme o envio no seu aplicativo de e-mail. Se não abrir, envie a mensagem para', 'Revisa y confirma el envío en tu aplicación de correo. Si no se abre, envía el mensaje a', 'Review and confirm sending in your email app. If it does not open, send the message to'],
    ['Não foi possível preparar o e-mail. Envia a mensagem para', 'Não foi possível preparar o e-mail. Envie a mensagem para', 'No se pudo preparar el correo. Envía el mensaje a', 'Could not prepare the email. Send the message to'],
    ['Não foi possível ler o ficheiro de', 'Não foi possível ler o arquivo de', 'No se pudo leer el archivo de', 'Could not read the file for'],
    ['Escolhe um ficheiro .txt ou .docx.', 'Escolha um arquivo .txt ou .docx.', 'Elige un archivo .txt o .docx.', 'Choose a .txt or .docx file.'],
    ['O ficheiro deve ter conteúdo e no máximo 5 MB.', 'O arquivo deve ter conteúdo e no máximo 5 MB.', 'El archivo debe tener contenido y un máximo de 5 MB.', 'The file must contain data and be no larger than 5 MB.'],
    ['A leitura de DOCX está indisponível.', 'A leitura de DOCX está indisponível.', 'La lectura de DOCX no está disponible.', 'DOCX reading is unavailable.'],
    ['O texto mudou durante a leitura. Escolhe novamente o ficheiro.', 'O texto mudou durante a leitura. Escolha o arquivo novamente.', 'El texto cambió durante la lectura. Vuelve a elegir el archivo.', 'The text changed during reading. Choose the file again.'],
    ['O ficheiro não contém texto legível.', 'O arquivo não contém texto legível.', 'El archivo no contiene texto legible.', 'The file contains no readable text.'],
    ['Verifica se o ficheiro é válido.', 'Verifique se o arquivo é válido.', 'Comprueba que el archivo sea válido.', 'Check whether the file is valid.'],
    ['anúncio da vaga', 'anúncio da vaga', 'oferta de empleo', 'job description'],
    ['Preenche o CV no editor ou cola o teu CV atual antes de gerar o prompt.', 'Preencha o currículo no editor ou cole seu currículo atual antes de gerar o prompt.', 'Completa el currículum en el editor o pega tu currículum actual antes de generar el prompt.', 'Fill in the editor résumé or paste your current résumé before generating the prompt.'],
    ['Cola primeiro o anúncio da vaga.', 'Cole primeiro o anúncio da vaga.', 'Pega primero la oferta de empleo.', 'First paste the job description.'],
    ['Tipo de prompt desconhecido.', 'Tipo de prompt desconhecido.', 'Tipo de prompt desconocido.', 'Unknown prompt type.'],
    ['Prompt gerado. Copia-o e envia-o no teu chat de IA.', 'Prompt gerado. Copie-o e envie-o ao seu chat de IA.', 'Prompt generado. Cópialo y envíalo a tu chat de IA.', 'Prompt generated. Copy and send it to your AI chat.'],
    ['Depois cola a resposta JSON no passo 4.', 'Depois cole a resposta JSON na etapa 4.', 'Después pega la respuesta JSON en el paso 4.', 'Then paste the JSON response in step 4.'],
    ['Lê a resposta diretamente no chat.', 'Leia a resposta diretamente no chat.', 'Lee la respuesta directamente en el chat.', 'Read the response directly in the chat.'],
    ['Prompt copiado. Os dados permanecem na área de transferência até serem substituídos.', 'Prompt copiado. Os dados permanecem na área de transferência até serem substituídos.', 'Prompt copiado. Los datos permanecen en el portapapeles hasta que se sustituyan.', 'Prompt copied. The data remains on the clipboard until replaced.'],
    ['Não foi possível copiar automaticamente. Copia o texto selecionado manualmente.', 'Não foi possível copiar automaticamente. Copie o texto selecionado manualmente.', 'No se pudo copiar automáticamente. Copia el texto seleccionado manualmente.', 'Could not copy automatically. Copy the selected text manually.'],
    ['Cola primeiro a resposta da IA no passo 4.', 'Cole primeiro a resposta da IA na etapa 4.', 'Primero pega la respuesta de la IA en el paso 4.', 'First paste the AI response in step 4.'],
    ['A resposta deve conter o JSON completo devolvido pelo prompt «Adaptar CV».', 'A resposta deve conter o JSON completo retornado pelo prompt «Adaptar currículo».', 'La respuesta debe contener el JSON completo devuelto por el prompt «Adaptar currículum».', 'The response must contain the complete JSON returned by the “Adapt résumé” prompt.'],
    ['O JSON deve incluir cargo, resumo e exatamente 6 competencias, cada uma com titulo e descricao não vazios.', 'O JSON deve incluir cargo, resumo e exatamente 6 competencias, cada uma com titulo e descricao não vazios.', 'El JSON debe incluir cargo, resumo y exactamente 6 competencias, cada una con titulo y descricao no vacíos.', 'The JSON must include cargo, resumo and exactly 6 competencias, each with nonempty titulo and descricao.'],
    ['Faltam campos necessários no CV. Nenhuma alteração foi aplicada.', 'Faltam campos necessários no currículo. Nenhuma alteração foi aplicada.', 'Faltan campos necesarios en el currículum. No se aplicaron cambios.', 'Required résumé fields are missing. No changes were applied.'],
    ['Cargo, resumo e competências atualizados nesta sessão. Revê o CV antes de gerar o PDF.', 'Cargo, resumo e competências atualizados nesta sessão. Revise o currículo antes de gerar o PDF.', 'Puesto, perfil y competencias actualizados en esta sesión. Revisa el currículum antes de generar el PDF.', 'Role, summary and skills updated in this session. Review the résumé before generating the PDF.'],
    ['A página foi reaberta. Os dados da sessão anterior foram descartados.', 'A página foi reaberta. Os dados da sessão anterior foram descartados.', 'La página se volvió a abrir. Los datos de la sesión anterior se descartaron.', 'The page was reopened. The previous session’s data was discarded.']
];

const INTERFACE_LANGUAGES = ['pt-PT', 'pt-BR', 'es', 'en'];
const PROMPT_TEXTS = {
    'pt-PT': {
        languages: { 'pt-PT': 'português europeu', 'pt-BR': 'português brasileiro', es: 'espanhol', en: 'inglês' },
        adapt: language => `És um consultor de RH sénior. Adapta o meu CV à vaga abaixo, sem inventar experiências ou competências. Escreve em ${language}, de forma direta e profissional.`,
        interview: (language, job) => `És um recrutador experiente. Com base no meu CV${job ? ' e na vaga' : ''}, prevê as 5 perguntas de entrevista mais prováveis e sugere uma resposta para cada uma usando apenas factos do meu CV (método STAR quando aplicável). Responde em ${language}.`,
        letter: language => `És um consultor de RH. Escreve uma carta de apresentação persuasiva e concisa (máx. 250 palavras), em ${language}, dirigida à vaga e baseada apenas em factos do meu CV.`,
        json: 'Responde APENAS com JSON válido, sem comentários, texto adicional ou bloco de código. Usa exatamente as chaves abaixo e exatamente 6 itens em "competencias":',
        example: ['título profissional alvo', 'resumo profissional', 'título curto', 'descrição de uma linha'],
        cv: 'MEU CV', job: 'ANÚNCIO DA VAGA'
    },
    'pt-BR': {
        languages: { 'pt-PT': 'português europeu', 'pt-BR': 'português brasileiro', es: 'espanhol', en: 'inglês' },
        adapt: language => `Você é um consultor de RH sênior. Adapte meu currículo à vaga abaixo, sem inventar experiências ou competências. Escreva em ${language}, de forma direta e profissional.`,
        interview: (language, job) => `Você é um recrutador experiente. Com base no meu currículo${job ? ' e na vaga' : ''}, preveja as 5 perguntas de entrevista mais prováveis e sugira uma resposta para cada uma usando apenas fatos do meu currículo (método STAR quando aplicável). Responda em ${language}.`,
        letter: language => `Você é um consultor de RH. Escreva uma carta de apresentação persuasiva e concisa (máx. 250 palavras), em ${language}, direcionada à vaga e baseada apenas em fatos do meu currículo.`,
        json: 'Responda APENAS com JSON válido, sem comentários, texto adicional ou bloco de código. Use exatamente as chaves abaixo e exatamente 6 itens em "competencias":',
        example: ['título profissional desejado', 'resumo profissional', 'título curto', 'descrição de uma linha'],
        cv: 'MEU CURRÍCULO', job: 'ANÚNCIO DA VAGA'
    },
    es: {
        languages: { 'pt-PT': 'portugués de Portugal', 'pt-BR': 'portugués de Brasil', es: 'español', en: 'inglés' },
        adapt: language => `Eres un consultor sénior de recursos humanos. Adapta mi currículum a la oferta, sin inventar experiencias ni competencias. Escribe en ${language} de manera directa y profesional.`,
        interview: (language, job) => `Eres un reclutador experimentado. Según mi currículum${job ? ' y la oferta' : ''}, prevé las 5 preguntas de entrevista más probables y sugiere una respuesta para cada una usando solo hechos de mi currículum (método STAR cuando corresponda). Responde en ${language}.`,
        letter: language => `Eres un consultor de recursos humanos. Escribe una carta de presentación persuasiva y concisa (máx. 250 palabras), en ${language}, dirigida a la oferta y basada solo en hechos de mi currículum.`,
        json: 'Responde SOLO con JSON válido, sin comentarios, texto adicional ni bloque de código. Usa exactamente las claves siguientes y exactamente 6 elementos en "competencias":',
        example: ['puesto deseado', 'perfil profesional', 'título breve', 'descripción de una línea'],
        cv: 'MI CURRÍCULUM', job: 'OFERTA DE EMPLEO'
    },
    en: {
        languages: { 'pt-PT': 'European Portuguese', 'pt-BR': 'Brazilian Portuguese', es: 'Spanish', en: 'English' },
        adapt: language => `You are a senior HR consultant. Adapt my résumé to the job below without inventing experience or skills. Write in ${language} in a direct, professional style.`,
        interview: (language, job) => `You are an experienced recruiter. Based on my résumé${job ? ' and the job description' : ''}, predict the 5 most likely interview questions and suggest an answer for each using only facts from my résumé (the STAR method where applicable). Respond in ${language}.`,
        letter: language => `You are an HR consultant. Write a persuasive, concise cover letter (max. 250 words) in ${language}, addressed to the job and based only on facts from my résumé.`,
        json: 'Reply ONLY with valid JSON, with no comments, additional text or code fence. Use exactly the keys below and exactly 6 items in "competencias":',
        example: ['target job title', 'professional summary', 'short title', 'one-line description'],
        cv: 'MY RÉSUMÉ', job: 'JOB DESCRIPTION'
    }
};
const messageLookup = new Map(INTERFACE_MESSAGES.map(entry => [entry[0], entry]));
const messagePattern = new RegExp([...messageLookup.keys()].sort((a, b) => b.length - a.length)
    .map(text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
let interfaceLanguage = 'pt-BR';
const interfaceNodes = [];
const interfaceAttributes = [];
const interfaceMessages = new Map();
let interfaceTitle;

function traduzirTexto(texto) {
    const index = INTERFACE_LANGUAGES.indexOf(interfaceLanguage);
    const entry = INTERFACE_TEXTS.find(row => row[0] === texto);
    return entry ? entry[index] : texto;
}

function traduzirMensagem(texto) {
    const index = INTERFACE_LANGUAGES.indexOf(interfaceLanguage);
    return texto.replace(messagePattern, original => messageLookup.get(original)[index]);
}

function mostrarMensagem(elemento, texto) {
    interfaceMessages.set(elemento, texto);
    elemento.textContent = traduzirMensagem(texto);
}

function criarTextoPrompt(tipo, idiomaCV, cv, vaga) {
    const text = PROMPT_TEXTS[interfaceLanguage];
    const language = text.languages[idiomaCV];
    let instruction;
    if (tipo === 'adaptar') {
        const [cargo, resumo, titulo, descricao] = text.example;
        const schema = JSON.stringify({ cargo, resumo, competencias: [{ titulo, descricao }] }, null, 2);
        instruction = `${text.adapt(language)}\n\n${text.json}\n${schema}`;
    } else if (tipo === 'entrevista') {
        instruction = text.interview(language, Boolean(vaga));
    } else if (tipo === 'carta') {
        instruction = text.letter(language);
    } else {
        throw new Error('Tipo de prompt desconhecido.');
    }
    return `${instruction}\n\n=== ${text.cv} ===\n${cv}${vaga ? `\n\n=== ${text.job} ===\n${vaga}` : ''}`;
}

function inicializarIdiomaPagina() {
    interfaceTitle = INTERFACE_TEXTS.find(row => row[0] === document.title);
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.parentElement.closest('#cv-sheet, script, style')) continue;
        const original = node.nodeValue.trim();
        const entry = INTERFACE_TEXTS.find(row => row[0] === original);
        if (entry) interfaceNodes.push([node, entry]);
    }
    for (const element of document.querySelectorAll('[placeholder], [title], [aria-label]')) {
        if (element.closest('#cv-sheet')) continue;
        for (const attr of ['placeholder', 'title', 'aria-label']) {
            const entry = INTERFACE_TEXTS.find(row => row[0] === element.getAttribute(attr));
            if (entry) interfaceAttributes.push([element, attr, entry]);
        }
    }
    document.getElementById('interfaceLanguage').addEventListener('change', atualizarIdiomaPagina);
    atualizarIdiomaPagina();
}

function atualizarIdiomaPagina() {
    interfaceLanguage = document.getElementById('interfaceLanguage').value;
    const index = INTERFACE_LANGUAGES.indexOf(interfaceLanguage);
    document.documentElement.lang = interfaceLanguage;
    if (interfaceTitle) document.title = interfaceTitle[index];
    for (const [node, entry] of interfaceNodes) {
        node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), entry[index]);
    }
    for (const [element, attr, entry] of interfaceAttributes) element.setAttribute(attr, entry[index]);
    for (const [element, text] of interfaceMessages) element.textContent = traduzirMensagem(text);
}
