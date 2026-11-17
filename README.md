# CV Editor

Editor gratuito de currículo no navegador, com fotografia opcional, impressão em A4 e prompts para o chat de IA escolhido pelo utilizador.

## Utilização

Abre `index.html` num navegador moderno. A página inicial explica o processo e o editor está logo abaixo. Os textos em cinzento nos campos são orientações: não fazem parte do CV impresso.

1. Preenche os campos do currículo. O editor começa com seis competências, três experiências e três formações; os controlos permitem adicionar ou remover experiências e formações (até 20 por secção).
2. Opcionalmente, escolhe uma fotografia JPEG ou PNG de **pelo menos 300 × 400 pixels**, com **até 5 MB**. A imagem é recortada verticalmente. Podes desmarcar **Incluir foto no CV** antes de imprimir.
3. Ajusta a margem, a fonte e o tamanho diretamente nos controlos do editor. Se o conteúdo exceder uma página A4, surge um aviso; revê também a pré-visualização do navegador.
4. Usa **Exportar backup** para guardar um ficheiro JSON com o CV, a fotografia e as configurações. **Importar backup** recupera esse ficheiro e substitui o CV da sessão após confirmação.
5. Para gerar PDF, usa **Imprimir** e escolhe A4, margens nenhumas, escala 100% e sem cabeçalhos ou rodapés. Também podes usar **Descarregar PDF**.

O idioma do CV pode ser português de Portugal, português do Brasil, espanhol ou inglês: altera os títulos e as orientações, mas **não traduz o texto escrito**. Escreve ou revê os teus dados no idioma escolhido. O idioma é incluído nos novos backups. Backups anteriores continuam a funcionar; se não tiverem idioma, usam português de Portugal, e qualquer modelo anteriormente escolhido é ignorado.

## Privacidade e duração da sessão

O editor não grava o CV automaticamente nem o envia para um servidor. O conteúdo é mantido na memória da página e é descartado quando ela é atualizada ou fechada, ou após **duas horas de inatividade**. Ao regressar a uma página suspensa, o prazo de inatividade é verificado. Exporta um backup antes de sair.

O backup e o PDF são ficheiros no dispositivo do utilizador: não são apagados pelo editor e podem conter dados pessoais. Ao copiar o prompt ou enviá-lo a um serviço de IA, os dados incluídos ficam na área de transferência ou são partilhados com esse serviço. As bibliotecas visuais e de PDF são carregadas de CDNs, que podem receber dados de ligação, como o endereço IP.

Uma versão anterior guardava rascunhos no navegador. Se existirem, o editor mostra opções para os recuperar, exportar ou apagar. Esses dados antigos permanecem no navegador até serem apagados pelo utilizador. A recuperação converte até seis competências e 20 experiências ou formações por secção. Se a fotografia antiga não cumprir os requisitos, podes recuperar apenas o texto; se a estrutura não puder ser convertida, exporta os dados antigos antes de os apagar.

## Assistente de carreira

O painel ✨ gera prompts sem chave API:

1. Preenche o CV no editor ou cola/carrega o texto do CV atual (`.txt` ou `.md`).
2. Cola ou carrega o anúncio da vaga (`.txt` ou `.md`) e gera um prompt de adaptação, entrevista ou carta.
3. Copia o prompt para o chat de IA escolhido. Para adaptação, cola a resposta JSON no painel e aplica-a.
4. Revê os resultados: apenas o cargo, o resumo e as seis competências são substituídos. Nome, contactos, experiência, formação e fotografia mantêm-se.

A resposta de adaptação precisa de `cargo`, `resumo` e exatamente seis `competencias`, cada uma com `titulo` e `descricao`. Um bloco de código à volta do JSON é aceite. O utilizador deve confirmar a veracidade de qualquer conteúdo gerado por IA.

## Contribuições voluntárias

Não há limite de downloads nem pagamento obrigatório. Para ativar o convite opcional após **Descarregar PDF**, define `DONATION_URL` em `editor.js` com um link público HTTPS de uma página de doação. Enquanto estiver vazio, o convite permanece oculto. O link abre o serviço escolhido noutro separador; consulta as condições e a política de privacidade desse serviço antes de o configurar.

## Testes

Executa `node --test tests/editor.test.cjs` para os testes automatizados. Os fluxos de foto, backup, impressão e sessão devem também ser verificados no navegador.
