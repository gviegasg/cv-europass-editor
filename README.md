# CV Editor

Editor gratuito de currículo no navegador, com fotografia opcional, impressão em A4 e prompts para o chat de IA escolhido pelo utilizador.
Uma escrita clara e experiências relevantes para a vaga podem ajudar a chamar a atenção dos recrutadores, sem garantir uma entrevista ou seleção.

[Usar o CV Editor online](https://gviegasg.github.io/cveditor/) · [Diário de desenvolvimento](./DIARIO.md)

## Utilização

Acede à versão online ou abre `index.html` num navegador moderno. A página inicial explica o processo e o editor está logo abaixo. Os textos em cinzento nos campos são orientações: não fazem parte do CV impresso. Podes preparar e guardar o texto num bloco de notas ou rascunho de e-mail antes de preencher o editor, pois este não guarda os dados automaticamente. Em telas pequenas, a edição é adaptada ao ecrã; o PDF e a impressão mantêm o formato A4. A orientação horizontal pode facilitar o preenchimento.

1. Preenche os campos do currículo. O editor começa com seis competências, três experiências e três formações; os controlos permitem adicionar ou remover experiências e formações (até 20 por secção).
2. Opcionalmente, escolhe uma fotografia JPEG ou PNG de **pelo menos 300 × 400 pixels**, com **até 5 MB**. A imagem é recortada verticalmente. Podes desmarcar **Incluir foto no CV** antes de imprimir.
3. Ajusta a margem, a fonte e o tamanho diretamente nos controlos do editor. Se o conteúdo exceder uma página A4, surge um aviso; revê também a pré-visualização do navegador.
4. Para gerar PDF, usa **Imprimir** e escolhe A4, margens nenhumas, escala 100% e sem cabeçalhos ou rodapés. Também podes usar **Descarregar PDF**, que gera o documento a partir de uma imagem e depende da biblioteca carregada pela internet. Para texto selecionável, prefere a impressão do navegador e verifica o PDF gerado. O PDF não pode ser usado para retomar a edição no editor.

A página começa em português do Brasil e oferece português de Portugal, espanhol e inglês no seletor do cabeçalho. O idioma da página e o do CV são independentes; ambos começam em português do Brasil numa sessão nova. O idioma do CV altera os títulos e as orientações, mas **não traduz o texto escrito**. Escreve ou revê os teus dados no idioma escolhido.

## Privacidade e duração da sessão

O editor não grava o CV automaticamente nem o envia para um servidor. O conteúdo é mantido na memória da página e é descartado quando ela é atualizada ou fechada, ou após **duas horas de inatividade**. Ao regressar a uma página suspensa, o prazo de inatividade é verificado. Guarda o texto noutro lugar antes de sair; ficheiros de sessão de versões anteriores não podem ser importados.

O PDF é um ficheiro no dispositivo do utilizador: não é apagado pelo editor e pode conter dados pessoais. Guarda-o num local seguro. Ao copiar o prompt ou enviá-lo a um serviço de IA, os dados incluídos ficam na área de transferência ou são partilhados com esse serviço. A biblioteca de PDF é carregada de um CDN, que pode receber dados de ligação, como o endereço IP; o navegador verifica a integridade da versão utilizada.

Uma versão anterior guardava rascunhos no navegador. Se existirem, o editor mostra opções para os recuperar ou apagar. Esses dados antigos permanecem no navegador até serem apagados pelo utilizador. A recuperação converte até seis competências e 20 experiências ou formações por secção. Se a fotografia antiga não cumprir os requisitos, podes recuperar apenas o texto. Se a estrutura não puder ser convertida, os dados antigos não são apagados.

## Assistente de carreira

O painel ✨ gera prompts sem chave API:

1. Preenche o CV no editor ou cola/carrega o texto do CV atual (`.txt` ou `.docx`, até 5 MB).
2. Cola ou carrega o anúncio da vaga (`.txt` ou `.docx`, até 5 MB) e gera um prompt de adaptação, entrevista ou carta. Os ficheiros são lidos no navegador e o texto aparece no assistente; não preenchem automaticamente os campos do currículo.
3. Copia o prompt para o chat de IA escolhido. Para adaptação, cola a resposta JSON no painel e aplica-a.
4. Revê os resultados: apenas o cargo, o resumo e as seis competências são substituídos. Nome, contactos, experiência, formação e fotografia mantêm-se.

A resposta de adaptação precisa de `cargo`, `resumo` e exatamente seis `competencias`, cada uma com `titulo` e `descricao`. Um bloco de código à volta do JSON é aceite. O utilizador deve confirmar a veracidade de qualquer conteúdo gerado por IA.

## Feedback e contribuições voluntárias

O feedback pode ser escrito no fim da página ou após **Descarregar PDF**. O botão prepara uma mensagem no aplicativo de e-mail do utilizador, que deve revê-la e confirmar o envio; é necessário ter um aplicativo de e-mail configurado. Se não abrir, o endereço de destino é mostrado junto ao campo. Não incluas dados pessoais ou o CV na mensagem. O editor não envia nem guarda o feedback automaticamente.

Não há limite de downloads nem pagamento obrigatório. Para ativar o convite opcional de apoio após **Descarregar PDF**, define `DONATION_URL` em `editor.js` com um link público HTTPS de uma página de doação. Enquanto estiver vazio, só aparece o campo de feedback. O link abre o serviço escolhido noutro separador; consulta as condições e a política de privacidade desse serviço antes de o configurar.

## Testes

Executa `npm test` para os testes automatizados. Os fluxos de foto, ficheiros de texto, impressão e sessão devem também ser verificados no navegador.

O CSS gerado está incluído no projeto, pelo que não é necessário instalar dependências para utilizar o editor. Após alterar classes no HTML ou JavaScript, executa `npm ci` e `npm run build:css` para atualizar `styles.css`.

A biblioteca local para ler DOCX e os seus avisos de licença estão em `vendor/`. Após alterar a versão das dependências, executa `npm run build:vendor` para regenerá-los.
