# Cinco dias para estudar e explicar

## Dia 1 · Problema e contrato (45–60 min)
Instale com `npm ci`, rode `npm run dev` e leia o README. Experimente os dois exemplos. Explique por que um catálogo inválido atrapalha cadastro e estoque. Anote os formatos que o parser aceita e os que rejeita.
Entrega: explique em um minuto o problema, sem prometer redução de erros medida.

## Dia 2 · Regras em TypeScript (60–90 min)
Leia `src/import.ts`. Acompanhe a conversão de 29,90 para 2990 centavos. Teste preço zero, estoque fracionário e dois SKUs iguais. Veja por que todas as duplicatas recebem erro. Rode `npm test`.
Exercício: adicione um teste para o limite de 20 caracteres do SKU antes de mudar a regra.

## Dia 3 · Estado e interação (60–90 min)
Leia `main.tsx`. Explique como a edição invalida a revisão e por que os totais são derivados. Teste a sequência de leitura de arquivo seguida de edição. Percorra a página com Tab, Shift+Tab e Enter; confira foco após validar e ao voltar ao editor.
Entrega: diagrama simples do fluxo fonte → revisão → exportação.

## Dia 4 · Navegador e evidências (60–90 min)
Instale o Chromium com `npx playwright install chromium` e execute `npm run test:e2e`. Os testes de navegador estão pendentes nesta entrega, pois o ambiente impediu o Chromium de abrir. Corrija qualquer falha real e registre a saída, sem trocar as expectativas apenas para passar.
Teste 390 px e desktop, upload, filtro e JSON baixado. Use leitor de tela se disponível, anotando qual ferramenta e quais fluxos foram verificados. Grave o roteiro em VIDEO.md somente após validar a interface.

## Dia 5 · Entrevista e publicação (45–60 min)
Leia o texto do LinkedIn e ajuste para o que você consegue demonstrar. Explique: por que não usar float para preços; por que não exportar parcialmente; por que repetir validação no backend; por que este parser não é um parser CSV completo.
Adicione captura real e vídeo se conseguiu executá-los. Crie o repositório somente quando decidir publicar. Não invente link de demo, cliente ou métrica.

Próxima evolução opcional: biblioteca de parsing para campos entre aspas + testes, seguida de endpoint com validação e transação. Não faz parte do escopo desta semana.
