<!-- # Api ecommerce - stoom

v1.0.0

## INDICE

-   <a href="#funcionalidades">Funcionalidades do projeto</a>

-   <a href="#tecnologias">Tecnologias</a>

-   <a href="#rodar">Como rodar este projeto?</a>

-   <a href="#metodologias">Metodologias </a>

## Funcionalidades

-   [x] Cadastro de usuarios
-   [x] Autenticação de usuario
-   [x] Cadastro e listagem de produtos
-   [x] realizar pedido

## Tecnologias

1. [NodeJs](https://nodejs.org/en)
2. [TypeScript](https://www.typescriptlang.org/)
3. [PrismaORM](https://www.prisma.io/)
4. [JWT (JSON Web Tokens)](https://jwt.io/)
5. [Jest](https://jestjs.io/pt-BR/)
6. [Docker](https://www.docker.com)

## Rodar

### Configurações iniciais

## Instalando dependencias do projeto

### O projeto está utilizando o package manager 'npm' para lidar com os pacotes no node, sendo assim, para baixar as dependencias do projeto basta rodar o comando:

-   `npm install` na raiz do projeto

## Configurando variáveis de ambiente

Copie o arquivo .env.example e renomeie para .env. Este arquivo contém as variáveis de ambiente necessárias para o projeto. Preencha as informações de acordo com a sua configuração.

### Rodar projeto em um container Docker

Para rodar o projeto em um container docker, basta rodar o comando: `docker-compose up` na raiz do projeto, esse comando ira criar um container com o banco de dados postgres.

### Gerando esquema do Prisma e criando estrutura no banco

Para gerar o esquema do Prisma assim como a estrutura no banco de dados, basta rodar o comando:

`npx prisma db push`

Podes também rodar somente o comando `npx prisma generate` para gerar o esquema do prisma.

### Rodando o seeder para teste

Caso queira, com o prisma eu criei alguns seeders para que o banco de dados ja venha com alguns produtos, para rodar o seeder basta rodar o comando:

`npx prisma db seed`

## Rodando o projeto

Para rodar o projeto utilize o script `npm run dev`

## Documentação da api Swagger

http://localhost:3333/api-docs

Algumas rotas são privadas, e voce precisara se autenticar para conseguir testar elas

Pegue o token que retornar ao se autenticar
![Auth](https://i.imgur.com/ViKbbHp.png)

Cole aqui
![Colar](https://i.imgur.com/ofoG5i5.png)

## Testes com jest

-   Para executar os testes pode rodar o comando npm test

## DDD

-   Nesse projeto eu utilizei a metodologia DDD e alguns patterns como aggregate e watchedList que me auxiliou bastante no desenvolvimento, adoraria falar mais sobre em uma proxima conversa :D
 -->

