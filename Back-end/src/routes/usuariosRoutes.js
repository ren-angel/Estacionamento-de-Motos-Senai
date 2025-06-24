import usuariosController from "../controllers/usuariosController.js";

const usuariosRoutes = async (fastify, options) => {

  fastify.post('/login', usuariosController.logar);

  fastify.get('/logout', usuariosController.deslogar);
};

export default usuariosRoutes;
