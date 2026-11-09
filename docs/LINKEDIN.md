# Texto para revisão antes de publicar

Uma planilha pode parecer pronta e ainda carregar problemas para o cadastro.

No Importa Clara, preparei um estudo com React e TypeScript para revisar um CSV de produtos antes da importação: SKUs duplicados, preços inválidos, estoque fracionário e nomes incompletos aparecem por linha.

A exportação fica bloqueada enquanto houver erros. Quando o conteúdo muda, a revisão anterior é descartada, evitando exportar uma validação que já ficou desatualizada.

Separei as regras da interface e representei preços em centavos inteiros. O resultado é um JSON que poderia alimentar uma futura integração, sem cadastrar produtos de verdade.

Na validação executada, passaram 21 testes unitários e o build de produção. Também preparei cinco testes de navegador, mas eles ficaram pendentes porque o ambiente bloqueou a inicialização do Chromium. Ainda não estou tratando navegação por teclado e responsividade como verificadas no navegador.

É uma demonstração com dados fictícios, processamento local e um formato CSV limitado. Uma versão real precisaria validar novamente no servidor e conferir os produtos já cadastrados.

#React #TypeScript #Frontend #TestesDeSoftware #DesenvolvimentoWeb

---
Não publicado. Antes de usar: execute o projeto, conclua a verificação de navegador e atualize somente os resultados efetivamente obtidos. Acrescente a URL real do repositório quando existir. Captura e vídeo ainda pendentes.
