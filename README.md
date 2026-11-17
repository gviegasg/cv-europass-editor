# CV Editor — Modelo EUROPASS

Editor de currículo no modelo **EUROPASS** num único ficheiro HTML, pensado para impressão perfeita em **A4** com margens homogéneas, centralizadas e mínimas.

## ✨ Funcionalidades

- 📄 **Modelo EUROPASS** fiel (barra lateral azul, secções clássicas)
- 🖼️ **Fotografia**: clica na moldura para inserir/alterar a foto
- ✏️ **Edição direta**: todo o texto da folha é editável (clica e escreve); as edições são guardadas automaticamente no navegador
- 🖨️ **Impressão A4 perfeita**: ecrã, `Imprimir` e `Descarregar PDF` usam exatamente a mesma margem, igual nos 4 lados
- 🎯 **Adaptar CV à vaga (sem chave API!)**: cola o teu CV atual (ou carrega um `.txt`) e o anúncio da vaga — o projeto gera um **prompt pronto a copiar** para o teu chat de IA preferido (ChatGPT, Gemini, Copilot…); depois colas a resposta e o editor aplica o cargo, o resumo e as 6 competências diretamente no documento
- ❓ **Prompts de perguntas de entrevista** e de **carta de apresentação** gerados com um clique
- 🔄 **Repor original**: descarta as edições guardadas e volta ao conteúdo do ficheiro

## 🚀 Como usar

Abre o `index.html` em qualquer navegador moderno (Chrome recomendado). Não precisa de servidor nem instalação. A página inicial explica os passos; seleciona **Começar a editar** para ir diretamente ao editor abaixo. A apresentação não aparece na impressão.

## ⚙️ Configuração (margens, fonte e tamanho)

No topo do `index.html`, dentro de `<style>`, está o bloco de configuração — edita estes valores:

```css
:root {
    --margem: 10mm;                              /* margem A4, igual nos 4 lados */
    --fonte: Arial, Helvetica, sans-serif;       /* família da fonte */
    --fonte-base: 10px;                          /* tamanho base — tudo escala a partir dele */
    --entrelinha: 1.35;                          /* altura de linha */
}
```

- **Margem mínima**: podes descer até `6mm` sem risco de corte na maioria das impressoras.
- **Tamanho da fonte**: todos os textos do CV escalam proporcionalmente a partir de `--fonte-base` (o nome é 2×, as datas 0.9×, etc.). Sobe para `10.5px`/`11px` para mais legibilidade, desce para `9.5px` para caber mais conteúdo.

## 🖨️ Dicas de impressão

1. Usa o botão **Imprimir** (gera PDF vetorial, texto selecionável — melhor qualidade que o html2pdf).
2. No diálogo de impressão: papel **A4**, margens **Nenhuma/None**, escala **100%**, e desativa **Cabeçalhos e rodapés**.
3. A margem do documento vem da variável `--margem` do ficheiro — não do navegador.

## 🤖 Assistente de carreira (sem chave API)

O painel ✨ no canto inferior direito funciona com **qualquer chat de IA** — não precisas de chave API:

1. **(Opcional)** Cola o texto do teu CV atual ou carrega um `.txt`. Se deixares vazio, é usado o CV do documento.
2. Cola o **anúncio da vaga**.
3. Clica em **🎯 Gerar prompt: Adaptar CV à vaga** (ou *Entrevista* / *Carta*) e copia o prompt gerado.
4. Envia o prompt no teu chat de IA preferido (ChatGPT, Gemini, Copilot, Claude…).
5. Para a adaptação do CV: cola a resposta da IA (um JSON) no passo 4 do painel e clica em **✅ Aplicar resposta ao CV** — o cargo, o resumo e as competências são atualizados no documento, prontos a editar e exportar.

Ao aplicar, o painel fecha e uma confirmação aparece acima do CV para facilitar a revisão. A resposta precisa de conter `cargo`, `resumo` e exatamente 6 `competencias` (cada uma com `titulo` e `descricao`); blocos de código à volta do JSON são aceites. Respostas inválidas mostram uma mensagem no painel sem alterar o documento. Nome, contactos, experiência, formação e fotografia não são alterados por este passo.

> 💡 O conteúdo do ficheiro usa **dados fictícios de exemplo** — edita o documento diretamente com os teus dados (as edições ficam guardadas no teu navegador).

## 🛠️ Tecnologias

- HTML + [Tailwind CSS](https://tailwindcss.com) (CDN)
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) para exportação rápida de PDF
- 100% client-side: sem servidor, sem chaves API, sem envio de dados
