import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const get_secret = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Variável de ambiente ${key} não está definida`);
  }
  return value;
};

const db = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306, 
        user: get_secret('DATABASE_USER'),
        password: get_secret('DATABASE_PASSWORD'),
        database: get_secret('DATABASE_NAME'),
    },
})

export default db