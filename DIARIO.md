# Diário de desenvolvimento — CV Editor

Este diário reúne os onze commits da branch `main` desde o primeiro até `10eb63f`, além de marcos e alterações posteriores documentados durante o desenvolvimento. As datas e horas abaixo estão em **UTC**. O histórico disponível não permite reconstruir trabalhos anteriores ao primeiro commit ou versões que não tenham sido preservadas.

## 16 de novembro de 2026

### 02:10 — Primeira versão do editor

**Commit:** `e5558ef`

- Foi criada uma página HTML de currículo editável, inicialmente baseada no modelo então escolhido para o projeto. O conteúdo de exemplo era fictício.
- A folha A4 recebeu margens iguais nos quatro lados e variáveis no próprio arquivo para margem, família e tamanho da fonte e entrelinha. Foram oferecidas impressão pelo navegador e exportação direta em PDF.
- A foto podia ser inserida no currículo; nessa versão, as alterações eram guardadas automaticamente no navegador.
- Em vez de integrar uma API de IA, o assistente passou a gerar prompts para o usuário copiar em seu chat preferido. Havia opções para adaptar o currículo à vaga, preparar perguntas de entrevista e criar carta de apresentação.
- A resposta JSON de adaptação podia atualizar cargo, resumo e competências. O README inicial documentava o uso e a impressão.

### 03:16 — Correção do fluxo de adaptação e primeiros testes

**Commit:** `0920094`

- Foi corrigido o fluxo que fazia parecer que **Aplicar resposta ao CV** não funcionava: após aplicar uma resposta válida, o painel passou a fechar e uma confirmação a aparecer junto ao currículo.
- A resposta passou a ser validada antes de qualquer alteração: cargo e resumo não vazios e exatamente seis competências com título e descrição. Foram aceitos blocos de código ao redor do JSON.
- Respostas inválidas e ausência de campos passaram a mostrar erros sem atualização parcial. Foi acrescentado aviso caso a gravação no navegador falhasse.
- Foi criada a suíte de testes automatizados para respostas válidas e inválidas, campos ausentes e falha de armazenamento. A documentação explicou quais campos eram alterados.

## 17 de novembro de 2026

### 01:41 — Página inicial

**Commit:** `7ad6816`

- Foi adicionada uma página inicial com apresentação do serviço, explicação do fluxo e atalhos para o editor, mantido logo abaixo.
- A apresentação foi excluída da impressão. Na ocasião, foram relatadas verificações de navegação, layout móvel e impressão, com dez testes passando.

### 02:50 — Melhorias do MVP, privacidade e idiomas do currículo

**Commit:** `a8d9223`

- O JavaScript do editor foi separado em `editor.js`, e os campos de exemplo foram substituídos por orientações para preenchimento, ocultas na impressão e no PDF.
- A foto tornou-se opcional no documento. Foram exigidos JPEG ou PNG, resolução mínima de 300 × 400 pixels, tamanho máximo de 5 MB e recorte vertical.
- Foram adicionados controles visuais para margem, fonte e tamanho, além de inclusão e remoção de experiências e formações, com até 20 entradas por seção.
- Foi criado um aviso quando o conteúdo ultrapassa a área de uma folha A4. A exportação direta recebeu tratamento para evitar uma página extra causada por arredondamento quando o conteúdo cabe na folha.
- A gravação automática do currículo foi retirada: a sessão passou a ser descartada ao atualizar ou fechar a página, ou após duas horas de **inatividade**, com aviso prévio.
- Foram implementadas exportação e importação de backup JSON, validação antes de substituir dados e opções para recuperar, exportar ou apagar rascunhos guardados por versões anteriores.
- Foram adicionados idiomas do currículo: PT-BR, PT-PT, espanhol e inglês. Os títulos e orientações mudam, mas o texto escrito pelo usuário não é traduzido.
- Houve uma opção temporária entre dois modelos. Também foi preparada uma contribuição voluntária por link HTTPS, desativada enquanto não houver link configurado; downloads não foram limitados.
- As instruções de uso, privacidade e recuperação foram atualizadas. O commit registrou 19 testes passando.

### 02:55 — Retorno a um único modelo

**Commit:** `9e1ccc5`

- A escolha entre modelos foi removida a pedido do usuário, que não percebeu diferença suficiente entre eles. O formato original foi mantido.
- Backups com a antiga escolha de modelo continuaram aceitos, ignorando essa escolha. Os idiomas do currículo foram preservados.
- A documentação e os testes foram ajustados; o commit registrou 20 testes passando.

### 03:06 — Feedback e primeira publicação

**Commit:** `287bed1`

- Foi incluído um campo de feedback no fim da página e outro após o download direto do PDF, junto ao convite de apoio quando configurado.
- O botão prepara uma mensagem no aplicativo de e-mail do usuário; ele precisa revisá-la e confirmar o envio. O feedback não entra no backup.
- O projeto foi disponibilizado como beta no GitHub Pages, usando a branch `main` e HTTPS. A primeira implantação registrada do Pages corresponde a este commit.

### 03:21 — Idiomas independentes para página e currículo

**Commit:** `2ac3b44`

- PT-BR tornou-se o padrão de novas sessões. Foi criado um seletor da página com PT-BR, PT-PT, espanhol e inglês, independente do seletor de idioma do currículo.
- Foram traduzidos textos da interface, atributos acessíveis, mensagens e prompts; o idioma escolhido para o currículo passou a orientar a resposta solicitada à IA.
- Mudanças no idioma da página não substituem o conteúdo do usuário. Backups antigos sem idioma continuam interpretados como PT-PT.
- A implementação foi organizada em `interface.js`. Foram relatados testes dos quatro idiomas, preservação do conteúdo, prompt, aplicação de resposta, PDF e tela pequena; 22 testes automatizados passaram.

### 03:26 — Novo endereço de feedback

**Commit:** `69eeb4c`

- O destinatário do feedback foi alterado para o endereço atualmente exibido na página. O teste de preparação do e-mail foi atualizado e a mudança publicada.

### 04:19 — Revisão e reforço de segurança

**Commit:** `f5f4b98`

- A revisão identificou risco de dependência de scripts externos sem verificação de integridade e um possível carregamento remoto ao analisar HTML de backup legado.
- O CSS do Tailwind passou a ser gerado localmente; foram adicionados os arquivos e comandos necessários para reconstruí-lo. A biblioteca externa de PDF recebeu versão fixa e verificação de integridade.
- A conversão de rascunhos legados passou a analisar o conteúdo em um `template` inerte, sem inseri-lo na página. Foi adicionado um teste de conversão.
- Em teste sintético no Chromium, a importação preservou dados sem executar scripts nem registrar requisições para os endereços de teste. Uma biblioteca de PDF adulterada foi bloqueada pela verificação de integridade. Isso não substitui testes em outros navegadores ou uma auditoria completa.
- A documentação de privacidade foi atualizada; 23 testes automatizados passaram e a alteração foi publicada. Uma política de segurança de conteúdo restritiva ficou como melhoria futura.

### 04:32 — Benefícios e instruções mais claros

**Commit:** `0a4cbe3`

- A página inicial passou a explicar que escrita clara e experiência relevante para a vaga podem ajudar a chamar a atenção dos recrutadores, sem garantir entrevista ou seleção.
- Foram destacados o uso gratuito, a ausência de conta e a possibilidade de usar o chat de IA escolhido sem chave API.
- O passo a passo foi organizado em quatro etapas: preencher ou recuperar, preparar com IA opcional, aplicar e conferir, e salvar backup e PDF.
- Os textos foram atualizados nos quatro idiomas e os estilos regenerados. Foram verificados os idiomas, a preservação de conteúdo e tamanhos de tela diferentes; 23 testes passaram e a atualização foi publicada.

### 17:34 — Diário e revisão do README

**Commit:** `10eb63f`

- Foi elaborado este diário a partir do histórico acessível, dos registros de implantação e das decisões documentadas durante o projeto.
- O README foi revisto e complementado com o link da versão online, o acesso a este diário e esclarecimentos sobre segurança do backup e as duas formas de gerar PDF.

### 17:45 — Alinhamento das seções da página

**Commit:** `db26810`

- O cabeçalho, a apresentação, os controles do editor e o rodapé passaram a compartilhar as mesmas bordas laterais da folha do currículo, com espaço nas laterais em telas pequenas.
- A folha mantém o formato A4 na impressão e no PDF; os cartões de instruções se adaptam à largura da página.
- O alinhamento foi medido no navegador em larguras de tela diferentes, e o PDF e a impressão foram verificados com dados de teste. Os 23 testes automatizados passaram.

### 17:56 — Novo endereço e formulário de opinião

**Commit:** `84427d9`

- O repositório e o endereço do GitHub Pages foram alterados para `cveditor`, e o link da versão online foi atualizado.
- O formulário de opinião no rodapé teve a altura e o campo de texto reduzidos, mantendo a largura alinhada às demais seções.
- Foram verificados o alinhamento e os quatro idiomas em tela pequena; os 23 testes automatizados passaram.

### 18:13 — Orientações de preenchimento

**Commit:** `f89ec40`

- O título principal ficou 25% menor em telas pequenas e grandes.
- O primeiro cartão passou a sugerir que o texto seja preparado e salvo em um bloco de notas ou rascunho de e-mail, pois o site não guarda os dados, e orienta usar o celular na horizontal.
- As orientações foram traduzidas para os quatro idiomas; a opção de backup continua disponível para salvar e restaurar o currículo editável.
- A redução do título, os idiomas e os tamanhos de tela foram verificados no navegador; os 23 testes automatizados passaram.

### 21:06 — Ficheiros de texto e revisão responsiva

- O assistente passou a aceitar ficheiros `.txt` e `.docx` até 5 MB para o currículo e a vaga, com leitura no navegador. O texto carregado fica no assistente, não preenche automaticamente os campos.
- Os controles e avisos para salvar ou recuperar arquivos de sessão foram removidos; os rascunhos antigos guardados no navegador ainda podem ser recuperados ou apagados.
- O painel do assistente passou a caber em telas estreitas; a edição do currículo em telas pequenas foi adaptada para leitura, sem alterar a impressão e o PDF A4.
- Foram verificados, no Chromium, carregamento de TXT e DOCX, rejeição de PDF, idiomas, telas de celular, tablet e desktop, foto, aviso de excesso e PDF A4 de uma página. Os 24 testes automatizados passaram.

### 21:08 — Ajuste do texto inicial

- Foi retirada a expressão sobre não garantir a seleção do texto inicial, nos quatro idiomas da página.

## Situação e decisões registradas

- O editor atual é uma aplicação estática no navegador, sem API de IA, conta, backend próprio ou armazenamento automático do currículo.
- A IA é opcional e recebe os dados somente quando o usuário envia o prompt ao serviço escolhido. O PDF fica no dispositivo e pode conter dados pessoais.
- Doações foram consideradas como contribuição voluntária; não há cobrança obrigatória nem limite diário de downloads. Publicidade e venda de banners foram discutidas, mas não foram implementadas.
- Na avaliação de produto e usabilidade, ficaram como oportunidades melhorias adicionais de acessibilidade e da qualidade textual do PDF direto. São itens de melhoria, não alterações concluídas neste diário.

Para registrar mudanças futuras, acrescenta uma entrada com data, commit, alterações, decisões e verificações realizadas, distinguindo o que foi planejado do que foi efetivamente publicado.
