import pagamentoController from "../controllers/pagamentosController.js";
import verificarAutenticacao from "../middlewares/autenticacaoMiddleware.js";

const pagamentoRoutes = async (fastify, options) => {

  fastify.addHook('preHandler', verificarAutenticacao);

  fastify.get('/pagamentos', pagamentoController.pegarTodos);

  fastify.post('/efetuar-pagamento', pagamentoController.efetuarNovoPagamento);
};

export default pagamentoRoutes;
