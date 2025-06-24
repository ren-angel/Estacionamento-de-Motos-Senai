# **Sistema de Gestão de Estacionamento de Motos**

Aplicação web desenvolvida para facilitar o gerenciamento de estacionamento de motocicletas de estudantes da instituição de ensino, SENAI Suíço-Brasileira "Paulo Ernesto Tolle". O sistema permite autenticação de usuários, cadastro de alunos, controle de pagamentos e geração de relatórios em formato Excel.

## Como Começar

Estas instruções irão ajudá-lo a obter uma cópia do projeto e colocá-lo em funcionamento na sua máquina local, para fins de desenvolvimento e testes.

### Pré-requisitos

Antes de começar, verifique se você possui as seguintes ferramentas instaladas:

* **Node.js** (versão 20 ou superior)
* **npm** (versão 10 ou superior)
* **MySQL** (versão 8.0 ou superior)

### Instalação

Siga os passos abaixo para configurar os ambientes de back-end e front-end:

#### Back-end (Node.js + Fastify)

1. Clone o repositório e acesse a pasta `backend`:

   ```bash
   git clone <URL-do-repositório>
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` baseado no `.env.example` e configure as credenciais do banco de dados e o segredo JWT:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=parking_db
   JWT_SECRET=seu_segredo_jwt
   BCRYPT_SALT_ROUNDS = seu_salto
   PLAN_PRICE=seu-preco
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

5. Para desenvolvimento com recarga automática:

   ```bash
   npm run dev
   ```

#### Front-end (React)

1. Acesse a pasta `frontend`:

   ```bash
   cd ../frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` baseado no `.env.example` e configure a URL da API:

   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

## Executando os Testes

Para rodar a suíte de testes automatizados, execute os comandos abaixo em cada diretório.

### Testes de ponta a ponta

Estes testes simulam fluxos completos de usuário para garantir que o sistema funcione corretamente.

```bash
# Testes E2E do back-end
dd backend
npm test

# Testes de integração do front-end
cd ../frontend
npm test
```

## Deployment

1. Gere a versão de produção do front-end:

   ```bash
   cd frontend
   npm run build
   ```

2. Instale um servidor estático e sirva o build:

   ```bash
   npm install -g serve
   serve -s build
   ```

3. Garanta que o back-end esteja em execução em um ambiente de produção (por exemplo, usando Docker).

## Construído Com

* **Fastify** – Framework web rápido para Node.js
* **React** – Biblioteca para construção de interfaces
* **MySQL** – Banco de dados relacional
* **ExcelJS** – Biblioteca para gerar relatórios em Excel
* **JWT** – Tokens JSON para autenticação

## Autor

* **Daniel "Ren_Angel" Medrado de Morais**
