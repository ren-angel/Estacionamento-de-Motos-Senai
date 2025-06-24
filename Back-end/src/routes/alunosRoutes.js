import alunosController from "../controllers/alunosController.js";
import verificarAutenticacao from "../middlewares/autenticacaoMiddleware.js";

const alunoRoutes = async (fastify, options) => {

  fastify.addHook('preHandler', verificarAutenticacao);

  fastify.get('/alunos', alunosController.pegarTodos);

  fastify.get('/aluno/:nome', alunosController.pegarAlunoEspecifico);

  fastify.get('/busca', alunosController.buscarPorNome);

  fastify.post('/novo-aluno', alunosController.criarAluno);

  fastify.put('/editar-aluno', alunosController.editarAluno);

  fastify.delete('/remover-aluno', alunosController.removerAluno);
};

export default alunoRoutes;
