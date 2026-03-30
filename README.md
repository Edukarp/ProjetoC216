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

1. Na root do projeto abra o terminal e digite o comando abaixo e aguarde até ele terminar de executar:

```
docker-compose up --build
```

3. Em seguida, abra [http://localhost:3001](http://localhost:3001) para vizualizar em seu navegador.

