# Importa Clara · Marcos Solutions

Projeto demonstrativo React + TypeScript para revisar CSV de produtos antes da importação. Não foi publicado.

1. Extraia o ZIP.
2. Abra a pasta `importa-clara` no VS Code.
3. No terminal, execute `npm ci` e depois `npm run dev` (Node 24).
4. Abra o endereço que aparecer no terminal.
5. Clique em Validar catálogo. Depois teste Exemplo corrigido e Exportar JSON.

Não há banco de dados ou credenciais. Os dados ficam apenas na memória da página e se perdem ao atualizar.

Documentos:
- README.md: explicação técnica em inglês.
- docs/ROTEIRO-5-DIAS.md: plano de estudo.
- docs/LINKEDIN.md: texto em português, ainda não publicado.
- docs/VALIDATION.md: resultados e pendências reais.
- docs/VIDEO.md: roteiro para gravação, ainda pendente.

21 testes unitários e build passaram. Os cinco testes de navegador não puderam rodar: o ambiente bloqueou a inicialização do Chromium. Não há captura ou vídeo real nesta entrega. No seu computador, execute `npx playwright install chromium` e `npm run test:e2e`.
