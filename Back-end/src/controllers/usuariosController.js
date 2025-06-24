import jwt from "jsonwebtoken";
import validations from '../utils/validations.js';
import usuariosService from '../services/usuariosService.js';

const logar = async (request, reply) => {

  const JWT_SECRET = process.env.JWT_SECRET;
  const expirarCookie = 86400 * 1000;

  try {

    const { SN, senha } = request.body;

    if (validations.camposLoginEstaVazio(SN, senha)) {
      
      return reply.code(400).send({ mensagem: "Preencha todos os campos" });
    }

    const senhaCorresponde = await usuariosService.fazerLogin(SN, senha);

    if (!senhaCorresponde) {

      return reply.code(401).send({ mensagem: "Credenciais inválidas" });
    }

    const token = jwt.sign({ SN }, JWT_SECRET, { expiresIn: "1d" });

    reply
      .setCookie("token", token, { httpOnly: true, maxAge: expirarCookie })
      .send({ token });
  } catch (error) {

    console.error(error.message);
    return reply.code(500).send({ mensagem: "Erro no servidor" });
  }
}

const deslogar = async (request, reply) => {

  reply
    .clearCookie("token")
    .send({ mensagem: "Deslogado com sucesso" });
}

export default { logar, deslogar };
