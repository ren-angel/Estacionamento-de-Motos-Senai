import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// dotenv.config({ path: '../../.env' });
dotenv.config();

let db;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const conexaoInicial = async (tentativas = 10, delay = 10000) => {

  for (let i = 0; i < tentativas; i++) {

    try {

      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });

      console.log('Conectado ao MySQL.');

      await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

      console.log(`Banco de dados criado ou já existe.`);

      await connection.end();

      db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      console.log("Conectado ao banco de dados.");
      return;

    } catch (error) {

      if (i < tentativas - 1) {

        console.log(`Tentando novamente em ${delay / 1000} segundos...`);

        await new Promise(res => setTimeout(res, delay));
      } else {
        
        console.error("Erro ao conectar ao banco: ", error.message);
        process.exit(1);
      }
    }
  }
};

const criarTabelas = async () => {
  
  try {

    const sql = await fs.readFile(path.join(__dirname, '../models/create_tables.sql'), 'utf-8');

    const declaracoes = sql.split(';').filter(declaracao => declaracao.trim() !== '');

    for (const declaracao of declaracoes) {

      await db.execute(declaracao);
    }

    console.log('Tabelas criadas ou já existem.');
  } catch (error) {

    console.error('Erro ao criar as tabelas:', error.message);
  }
};

await conexaoInicial();
await criarTabelas();

export default db;