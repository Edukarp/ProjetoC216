# MyCatalog

Esse projeto é um catalogo de avaliações de filmes e series, onde o usuário após realizar o cadastro/login consegue realizar reviews, dar notas e favoritar seus filmes e series preferidos.

## Features
- Criar conta ou realizar o login (com criptografia das senhas)
- Catalogo de filmes e series dividios por diferentes gêneros
- Escrever reviews com possibilidade de editar ou apagar-la
- Ver a review de outros usuários
- Favoritar o filme, atualizando a pagina principal
- Dar nota ao filme
- Para **Admins** é possivel adicionar, editar e deletar filmes do site
 
**Nota**: o sistema de admin não foi implementado então todo usuário consegue fazer isso (com intuito de mostrar as funcionalidades)

## Para Execução 

1. Crie um arquivo **.env** dentro da pasta **./backend**, em seguida aplique as seguintes variaveis de ambiente:

```
PORT=3003

MONGO_URI =mongodb+srv://edukarp10_db_user:Rhjh8w8tKvSKsWbU@cluster0.3mbpxjo.mongodb.net/
JWT_SECRET=3f8d1a7e-4c9b-4e2a-9b2e-8d6f7c2a1b9e$!@XyZ2025!@%aBcDe
```
 **Importante**: Como o ropositório é privado, apenas para fins de facilitar a execução foi passado as variaveis de ambiente explicitas dessa forma.

2. Na root do projeto abra o terminal e digite o comando abaixo e aguarde até ele terminar de executar:

```
docker-compose up --build
```

3. Em seguida, abra [http://localhost:3001](http://localhost:3001) para vizualizar em seu navegador.

