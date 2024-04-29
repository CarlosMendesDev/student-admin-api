# student-admin-api

A API criada é uma solução para gerenciar matrículas de alunos em turmas online. Ela permite cadastrar, editar e excluir alunos, oferecendo uma interface fácil de usar para interagir com o banco de dados.

## Stack utilizada

- Node
- Express
- Typescript
- TypeORM (postgres)

## Motivo da arquitetura

Escolhi usar a arquitetura de entities, controller e service porque ela deixa tudo mais organizado. Assim, consigo separar o que cada parte do código faz de forma bem clara. Isso facilita na hora de mexer no código, adicionar novas coisas e até reutilizar pedaços dele em outros lugares. Além disso, essa arquitetura é boa para testar e escalar a aplicação. Resumindo, é uma escolha que ajuda a deixar o código mais fácil de entender e mexer.
## Coisas para melhorar

Desenvolver middlewares para lidar com exceções de forma mais elegante, garantindo uma melhor experiência para o usuário final e uma resposta consistente da API em caso de erros.

Outra área de melhoria seria a implementação de testes unitários para garantir a qualidade do código e a estabilidade da aplicação. Adotaria também testes de performance utilizando ferramentas como K6, para avaliar o desempenho da API sob diferentes cargas de trabalho.

Por fim, explorarar a integração de um mecanismo de busca mais avançado, como o Elasticsearch, para fornecer recursos de busca mais inteligentes e eficientes, melhorando assim a experiência do usuário ao pesquisar informações na aplicação.