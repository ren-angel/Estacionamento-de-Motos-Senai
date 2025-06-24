import validations from '../utils/validations.js';
import alunosService from '../services/alunosService.js';
import pagamentosService from '../services/pagamentosService.js';

const pegarTodos = async (request, reply) => {

  try {

    const todosAlunos = await alunosService.pegarTodosAlunos();

    reply.send({ todosAlunos });
  } catch (error) {

    if (error.response && error.response.status === 401) {

      return reply.send({ mensagem: "Sessão expirada. Por favor, faça login novamente." });
    }

    console.error(error.message);
    return reply.code(500).send({ mensagem: "Erro no servidor" });
  }
}

const pegarAlunoEspecifico = async (request, reply) => {

  try {

    const nome = request.params.nome;

    const alunoEspecifico = await alunosService.pegarAlunoPorNome(nome);

    if (!alunoEspecifico) {

      return reply.code(404).send({ mensagem: "Nenhum aluno encontrado" })
    }

    reply.send({ alunoEspecifico });
  } catch (error) {
    
    if (error.response && error.response.status === 401) {

      return reply.send({ mensagem: "Sessão expirada. Por favor, faça login novamente." });
    }

    console.error(error.message);
    return reply.code(500).send({ mensagem: "Erro no servidor" });
  }
}

const buscarPorNome = async (request, reply) => {

  try {

    const query = request.query.pesquisa;

    const alunosEncontrados = await alunosService.buscarAlunoPorNome(query);

    reply.send({ alunosEncontrados });
  } catch (error) {

    if (error.response && error.response.status === 401) {

      return reply.send({ mensagem: "Sessão expirada. Por favor, faça login novamente." });
    }

    console.error(error.message);
    return reply.code(500).send({ mensagem: "Erro no servidor" });
  }
}

const criarAluno = async (request, reply) => {

  try {

    let { nome, turma, placa, termino, meses } = request.body;

    const preco = process.env.PLAN_PRICE;

    if (validations.camposAdicionarAlunoEstaVazio(nome, turma, placa, termino)) {

      return reply.code(400).send({ mensagem: "Preencha todos os campos" });
    }

    if (nome.length > 100) {

      return reply.code(400).send({ mensagem: "Digite um nome com até 100 caracteres" });
    }

    if (turma.length > 20) {

      return reply.code(400).send({ mensagem: "Digite uma turma com até 20 caracteres" });
    }

    if (placa.length !== 7) {
      
      return reply.code(400).send({ mensagem: "Digite uma placa válida" });
    }

    nome = nome.toUpperCase();
    turma = turma.toUpperCase();
    placa = placa.toUpperCase();
    meses = Number(meses);

    const hoje = validations.converterDataParaFormatoSQL();
    const limite = validations.calcularLimite(meses);

    const alunoCriado = await alunosService.criarAluno({ nome, turma, placa, hoje, limite, termino });

    if (!alunoCriado) {

      return reply.code(500).send({ mensagem: "Houve um problema ao criar o aluno" });
    }

    const valor = preco * meses;

    const pagamentoEfetuado = await pagamentosService.criarPagamento({ valor, hoje });

    if (!pagamentoEfetuado) {

      return reply.code(500).send({ mensagem: "Houve um problema ao efetuar o pagamento" });
    }

    reply.send({ mensagem: "Aluno criado e pagamento efetuado com sucesso" });
  } catch (error) {

    if (error.response && error.response.status === 401) {

      return reply.send({ mensagem: "Sessão expirada. Por favor, faça login novamente." });
    }

    console.error(error.message);
    return reply.code(500).send({ mensagem: "Erro no servidor" });
  }
}

const editarAluno = async (request, reply) => {

  try {

    let { id, nome, turma, termino, placa } = request.body;

    const alunoExiste = await alunosService.pegarAlunoPorId(id);

    if (!alunoExiste) {

      return reply.code(404).send({ mensagem: "Nenhum aluno encontrado" });
    }

    if (!nome && !turma && !placa && !termino) {

      return reply.code(400).send({ mensagem: "Atualize pelo menos um campo" });
    }

    if (nome.length > 100) {

      return reply.code(400).send({ mensagem: "Digite um nome com até 100 caracteres" });
    }

    if (turma.length > 20) {

      return reply.code(400).send({ mensagem: "Digite uma turma com até 20 caracteres" });
    }

    if (placa.length !== 7) {
      
      return reply.code(400).send({ mensagem: "Digite uma placa válida" });
    }

    nome = nome ? nome.toUpperCase() : undefined;
    turma = turma ? turma.toUpperCase() : undefined;
    placa = placa ? placa.toUpperCase() : undefined;

    const alunoAtualizado = await alunosService.atualizarInformaçõesAluno({ id, nome, turma, placa, termino });

    if (!alunoAtualizado) {

      return reply.code(500).send({ mensagem: "Houve um problema ao tentar alterar as informações do aluno" });
    }

    reply.send({ mensagem: "Informações do aluno editadas com sucesso" });
  } catch (error) {

    if (error.response && error.response.status === 401) {

      return reply.send({ mensagem: "Sessão expirada. Por favor, faça login novamente." });
    }

    console.error(error.message);
    return reply.code(500).send({ mensagem: "Erro no servidor" });
  }
}

const removerAluno = async (request, reply) => {

  try {

    const id = request.query.id;

    const alunoVitima = await alunosService.pegarAlunoPorId(id);

    if (!alunoVitima) {

      return reply.code(404).send({ mensagem: "Nenhum aluno encontrado" });
    }

    const alunoRemovido = await alunosService.removerAluno(id);

    if (!alunoRemovido) {

      reply.code(500).send({ mensagem: "Houve um problema ao tentar remover o aluno" })
    }

    reply.send({ mensagem: "Aluno removido com sucesso" });
  } catch (error) {

    if (error.response && error.response.status === 401) {

      return reply.send({ mensagem: "Sessão expirada. Por favor, faça login novamente." });
    }
    
    console.error(error.message);
    return reply.code(500).send({ mensagem: "Erro no servidor." });
  }
}

export default { pegarTodos, pegarAlunoEspecifico, buscarPorNome, criarAluno, editarAluno, removerAluno };