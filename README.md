# 🏷️ Estoque Corporativo com JavaScript e Node.js + Express
Este projeto foi baseado no repositório Estoque-corporativo disponível no meu GitHub, originalmente desenvolvido com Python e Django. O objetivo desta versão em JavaScript utilizando Node.js + Express foi praticar meus conhecimentos no desenvolvimento de sistemas back-end com essas tecnologias.

Este projeto faz parte do meu portfólio pessoal, demonstrando minha evolução prática com a tecnologia. Com o tempo, pretendo adicionar novas funcionalidades conforme avanço nos meus estudos e adquiro mais experiência com Node.js e ferramentas relacionadas ao desenvolvimento web.

## Funcionalidades
- ✅ Aplicação SPA (Single Page Application)
- 🧾 CRUD de produtos (Criação, Leitura, Atualização e Deleção)
- 🔍 Busca por nome, categoria ou ambos
- 🛒 Sistema de carrinho 
- 📡 APIs
- 🛡️ Middleware

## 🧰 Tecnologias utilizadas
- JavaScript
- Node.js
- Express
- React
- APIs
- Mysql
- Knex
- JWT
- Cookie-parser
- Cors

## Instruções para rodar o projeto localmente
### Pré-requisitos:
Ter instalado:
- Git
- MySql

1°: Instalar as dependências do front-end
```bash
cd front-estoque
npm install
```

2°: Instalar as dependências do back-estoque
```bash
npm install
```
3°: Deve-se criar as tabelas no MySql

⚠️Este banco de dados foi criado no projeto Estoque Corporativo, que utiliza Python e Django. O repositório está disponível aqui no meu GitHub. 
O Django criou as tabelas com os nomes products_product e products_category.
Você pode definir outros nomes, mas deverá ajustá-los nas consultas. Por exemplo: 

```javascript
const data = await db.select().table('nome_da_sua_tabela')
```

❗Abaixo estão as instruções com os nomes originais utilizados no projeto:

🗃️ Estrutura das tabelas (MySQL Workbench)
```sql
CREATE TABLE products_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(75),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products_product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(75),
    price DECIMAL(10,2),
    promotion TINYINT(1),
    price_promotion DECIMAL(10,2),
    stock_quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    category_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES products_category(id)
);
```
⚠️Importante: a coluna category_id é uma foreign key, e deve referenciar o id da tabela products_category.

4°: Configurações do database e secret_key

Criar um arquivo .env na pasta back-estoque
```bash
back-estoque/
    ├── config/
    ├── controller/
    ├── middleware/
    └── .env
```

No arquivo .env
```env
DATABASE_USER='Seu_User'
DATABASE_PASSWORD='Sua_Senha'
DATABASE_NAME='Nome_do_Database'
SECRET_KEY='Digite_Algo_Complexo'
```

ℹ️ Os campos com os nomes DATABASE são as credenciais para se conectar ao MySql. 
ℹ️ SECRET_KEY  é uma chave secreta que o back-end usa para proteger as requisições, como ao gerar tokens de autenticação (JWT). Ela garante que só o seu servidor consiga criar e validar esses tokens, funcionando como uma senha mestra invisível ao usuário.

5°: Iniciar o projeto
```bash
cd back-estoque
nodemon index.js
```

```bash
cd front-estoque
npm run dev
```