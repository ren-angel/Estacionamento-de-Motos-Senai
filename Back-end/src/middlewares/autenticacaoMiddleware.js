import jwt from 'jsonwebtoken';

const verificarAutenticacao = async (request, reply) => {

  const JWT_SECRET = process.env.JWT_SECRET;

  try {

    const token = request.headers["authorization"];

    if (!token) {

      return reply.status(401).json({ message: "Não autorizado" });
    }

    const decodificado = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

    request.user = decodificado;
  } catch (error) {

    console.error(error.message);  
    return reply.status(401).send({ message: "Sessão expirada. Por favor, faça login novamente." });
  }
};

export default verificarAutenticacao;