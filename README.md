<div align="center">

# 🤖 Identificador de Humor 🧑

![express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)
![postgresql](	https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

</div>

Este projeto integra um modelo de NLP (Processamento de Linguagem Natural), atuando como o backend de toda a aplicação. Ele disponibiliza funcionalidades para análise de sentimento com base em frases e também para consulta de históricos de frases analisadas. A comunicação com o sistema é realizada por meio de rotas HTTP.

> [Veja a documentação completa aqui.](https://api-moodtracker.vercel.app/docs/routes.html)

## 🎯 Funcionalidades

- **identificador de humor**: Por meio de IA, é possivel mandar um texto e ter como resposta o tipo de humor identificado na frase, retornando: _neutral_, _negative_ e _positive_.
- **Histórico de frases**: Enviando a página requerida, é possivel receber um histórico das frases enviadas com o seu humor salvo.

## ⚙️ Como rodar

1. Instale as dependências:
   ```node
   npm install
   ```

2. Configure as variaveis de ambiente:

   - Tire o .example do arquivo `.env`, caso queria utilizar um banco de dados diferente, mude o DATABASE_URL para chave do seu banco.

3. Execute os testes unitarios:

   - Para ver se esta tudo bem configurado, execute o comando `npm test` para executar os testes unitarios.

4. Execute a aplicação:
    ```node
    npm start
    ```

## 📦 Estrutura da aplicação

- `.config`: Configurações de modulos
- `.github/workflows`: Pipelines
- `.vscode`: Configurações do vscode
- `__docs__`: Arquivos envolvendo documentação
- `__tests__`: Testes unitarios _`npm test`_
- `locales`: Arquivos de tradução
- `src`: Arquivos de programação

<hr>

<div align="center">
    developed by <a href="https://github.com/felipe-sant?tab=followers">@felipe-sant</a>
</div>
