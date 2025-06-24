import excelController from "../controllers/excelController.js";
import verificarAutenticacao from "../middlewares/autenticacaoMiddleware.js";

const excelRoutes = async (fastify, options) => {

  fastify.get('/download-excel', { preHandler: verificarAutenticacao }, excelController.gerarExcel);
};

export default excelRoutes;