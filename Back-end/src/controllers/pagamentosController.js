import validations from '../utils/validations.js';
import pagamentosService from '../services/pagamentosService.js';
import alunosService from '../services/alunosService.js';

const pegarTodos = async (request, reply) => {

  try {

    const todosPagamentos = await pagamentosService.pegarTodosPagamentos();

    reply.send({ todosPagamentos });
  } catch (error) {

    if (error.response && error.response.status === 401) {

      return reply.send({ mensagem: "Sessão expirada. Por favor, faça login novamente." });
    }

    console.error(error.message);
    return reply.code(500).send({ mensagem: "Erro no servidor" });
  }
}

const efetuarNovoPagamento = async (request, reply) => {

  try {

    let { id, meses } = request.body;

    meses = Number(meses);

    const preco = process.env.PLAN_PRICE;

    const valor = preco * meses;

    const hoje = validations.converterDataParaFormatoSQL();

    const pagamentoEfetuado = await pagamentosService.criarPagamento({ valor, hoje });

    if (!pagamentoEfetuado) {

      return reply.code(500).send({ mensagem: "Houve um problema ao efetuar o pagamento" });
    }

    const aluno = await alunosService.pegarAlunoPorId(id);

    const limiteAtual = aluno.limite_estacionamento.toISOString().split('T')[0];
    
    if (limiteAtual <= hoje) {
      
      const limite = validations.calcularLimite(meses);

      const limiteAtualizado = await alunosService.atualizarLimiteAposPago({ id, hoje, limite });

      if (!limiteAtualizado) {

        return reply.code(500).send({ mensagem: "Houve um problema ao tentar atualizar a data limite" });
      }

      reply.send({ mensagem: "Pagamento efetuado e data limite atualizada com sucesso" });
    } else {
      
      const limite = validations.calcularLimitePreExpiracao(limiteAtual, meses);

      const limiteAtualizado = await alunosService.atualizarLimiteAposPago({ id, hoje, limite });

      if (!limiteAtualizado) {

        return reply.code(500).send({ mensagem: "Houve um problema ao tentar atualizar a data limite" });
      }

      reply.send({ mensagem: "Pagamento efetuado e data limite atualizada com sucesso" });
    }
  } catch (error) {

    if (error.response && error.response.status === 401) {
      
      return reply.send({ mensagem: "Sessão expirada. Por favor, faça login novamente." });
    }

    console.error(error.message);
    return reply.code(500).send({ mensagem: "Erro no servidor" });
  }
}

export default { pegarTodos, efetuarNovoPagamento };
