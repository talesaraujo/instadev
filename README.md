# instadev

Aplicação desenvolvida para a disciplina de Desenvolvimento de Software para a Web (CK0207).

O `instadev` é uma aplicação de persistência e de edição de imagens. O código do editor pode ser encontrado [aqui](https://github.com/Mackirac/photo-web/tree/image-processor). Contém um sistema de login de usuários, onde um usuário poderá ver suas imagens cadastradas, pesquisar por outros usuários e ver as imagens deles, e contém um link que redireciona para o editor, onde ele poderá aplicar edições sobre uma imagem escolhida.

## Tecnologias aplicadas

Clientside
* Bootstrap
* VueJS

Serverside
* NodeJS
* Python (Django)

Database
* PostgreSQL

## Como rodar o projeto
Dentro da pasta `setup` estão os arquivos com a estrutura de tabelas para que a aplicação funcione corretamente. Se você dispõe do Docker instalado, pode utilizar o arquivo `docker-compose` dentro desta pasta e utilizar o comando

>`docker-compose up`

para definir um banco com as credenciais corretas rapidamente. Caso contrário, é necessário defini-las manualmente. As credenciais estão dentro deste arquivo.
Após ter o banco configurado, crie uma consulta com o conteúdo do arquivo `structure` para definir as tabelas.
Depois disso, entre na pasta raiz do projeto e utilize o comando

>`npm install`

para instalar as dependências.