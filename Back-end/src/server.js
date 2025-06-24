import dotenv from 'dotenv';
import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import alunoRoutes from './routes/alunosRoutes.js';
import excelRoutes from './routes/excelRoutes.js';
import pagamentoRoutes from './routes/pagamentoRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import atualizarStatusJob from './utils/statusScheduler.js';
import removerAlunoAposUmAnoJob from './utils/removerAlunoScheduler.js';

dotenv.config({ path: '../.env' });
// dotenv.config();

const fastify = Fastify({ logger: true });
const PORT = process.env.SERVER_PORT;

await fastify.register(fastifyCors);

await fastify.register(fastifyCookie);

fastify.get("/", async (req, reply) => {
  
  reply.clearCookie("token");
  reply.send({ mensagem: "Cookies limpados" });
});

await fastify.register(usuariosRoutes, { prefix: '/api' });
await fastify.register(alunoRoutes, { prefix: '/api' });
await fastify.register(pagamentoRoutes, { prefix: '/api' });
await fastify.register(excelRoutes, { prefix: '/api' });

const start = async () => {

  try {

    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`O servidor está rodando na porta ${PORT}`);
  } catch (err) {

    fastify.log.error(err);
    process.exit(1);
  }
};

start();
