# CV Editor

Editor gratuito de currículo no navegador, com fotografia opcional, impressão em A4 e prompts para o chat de IA escolhido pelo utilizador.
Uma escrita clara e experiências relevantes para a vaga podem ajudar a chamar a atenção dos recrutadores, sem garantir uma entrevista ou seleção.

[Usar o CV Editor online](https://gviegasg.github.io/cveditor/) · [Diário de desenvolvimento](./DIARIO.md)

## Utilização

Acede à versão online ou abre `index.html` num navegador moderno. A página inicial explica o processo e o editor está logo abaixo. Os textos em cinzento nos campos são orientações: não fazem parte do CV impresso.

1. Preenche os campos do currículo. O editor começa com seis competências, três experiências e três formações; os controlos permitem adicionar ou remover experiências e formações (até 20 por secção).
2. Opcionalmente, escolhe uma fotografia JPEG ou PNG de **pelo menos 300 × 400 pixels**, com **até 5 MB**. A imagem é recortada verticalmente. Podes desmarcar **Incluir foto no CV** antes de imprimir.
3. Ajusta a margem, a fonte e o tamanho diretamente nos controlos do editor. Se o conteúdo exceder uma página A4, surge um aviso; revê também a pré-visualização do navegador.
4. Usa **Exportar backup** para guardar um ficheiro JSON com o CV, a fotografia e as configurações. **Importar backup** recupera esse ficheiro e substitui o CV da sessão; se houver alterações na sessão, pede confirmação.
5. Para gerar PDF, usa **Imprimir** e escolhe A4, margens nenhumas, escala 100% e sem cabeçalhos ou rodapés. Também podes usar **Descarregar PDF**, que gera o documento a partir de uma imagem e depende da biblioteca carregada pela internet. Para texto selecionável, prefere a impressão do navegador e verifica o PDF gerado.

A página começa em português do Brasil e oferece português de Portugal, espanhol e inglês no seletor do cabeçalho. O idioma da página e o do CV são independentes; ambos começam em português do Brasil numa sessão nova. O idioma do CV altera os títulos e as orientações, mas **não traduz o texto escrito**. Escreve ou revê os teus dados no idioma escolhido. O idioma do CV é incluído nos novos backups. Backups anteriores continuam a funcionar; se não tiverem idioma, usam português de Portugal, e qualquer modelo anteriormente escolhido é ignorado.

## Privacidade e duração da sessão

O editor não grava o CV automaticamente nem o envia para um servidor. O conteúdo é mantido na memória da página e é descartado quando ela é atualizada ou fechada, ou após **duas horas de inatividade**. Ao regressar a uma página suspensa, o prazo de inatividade é verificado. Exporta um backup antes de sair.

O backup e o PDF são ficheiros no dispositivo do utilizador: não são apagados pelo editor e podem conter dados pessoais. O backup não é cifrado e inclui a foto carregada mesmo que a sua inclusão no CV esteja desmarcada; guarda-o num local seguro. Ao copiar o prompt ou enviá-lo a um serviço de IA, os dados incluídos ficam na área de transferência ou são partilhados com esse serviço. A biblioteca de PDF é carregada de um CDN, que pode receber dados de ligação, como o endereço IP; o navegador verifica a integridade da versão utilizada.

Uma versão anterior guardava rascunhos no navegador. Se existirem, o editor mostra opções para os recuperar, exportar ou apagar. Esses dados antigos permanecem no navegador até serem apagados pelo utilizador. A recuperação converte até seis competências e 20 experiências ou formações por secção. Se a fotografia antiga não cumprir os requisitos, podes recuperar apenas o texto; se a estrutura não puder ser convertida, exporta os dados antigos antes de os apagar.

## Assistente de carreira

O painel ✨ gera prompts sem chave API:

1. Preenche o CV no editor ou cola/carrega o texto do CV atual (`.txt` ou `.md`).
2. Cola ou carrega o anúncio da vaga (`.txt` ou `.md`) e gera um prompt de adaptação, entrevista ou carta.
3. Copia o prompt para o chat de IA escolhido. Para adaptação, cola a resposta JSON no painel e aplica-a.
4. Revê os resultados: apenas o cargo, o resumo e as seis competências são substituídos. Nome, contactos, experiência, formação e fotografia mantêm-se.

A resposta de adaptação precisa de `cargo`, `resumo` e exatamente seis `competencias`, cada uma com `titulo` e `descricao`. Um bloco de código à volta do JSON é aceite. O utilizador deve confirmar a veracidade de qualquer conteúdo gerado por IA.

## Feedback e contribuições voluntárias

O feedback pode ser escrito no fim da página ou após **Descarregar PDF**. O botão prepara uma mensagem no aplicativo de e-mail do utilizador, que deve revê-la e confirmar o envio; é necessário ter um aplicativo de e-mail configurado. Se não abrir, o endereço de destino é mostrado junto ao campo. Não incluas dados pessoais ou o CV na mensagem. O feedback não é incluído no backup e o editor não o envia nem guarda automaticamente.

Não há limite de downloads nem pagamento obrigatório. Para ativar o convite opcional de apoio após **Descarregar PDF**, define `DONATION_URL` em `editor.js` com um link público HTTPS de uma página de doação. Enquanto estiver vazio, só aparece o campo de feedback. O link abre o serviço escolhido noutro separador; consulta as condições e a política de privacidade desse serviço antes de o configurar.

## Testes

Executa `node --test tests/editor.test.cjs` para os testes automatizados. Os fluxos de foto, backup, impressão e sessão devem também ser verificados no navegador.

O CSS gerado está incluído no projeto, pelo que não é necessário instalar dependências para utilizar o editor. Após alterar classes no HTML ou JavaScript, executa `npm ci` e `npm run build:css` para atualizar `styles.css`.
