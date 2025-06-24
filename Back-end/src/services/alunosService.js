import db from '../config/database.js';

const pegarTodosAlunos = async () => {

  try {

    const [linhas] = await db.execute('SELECT * FROM tbl_alunos');

    return linhas.length > 0 ? linhas : null;
  } catch (error) {

    console.error('Erro ao buscar os alunos:', error);
    return null;
  }
};

const pegarAlunoPorNome = async (nome) => {

  try {

    const [linhas] = await db.execute(
      'SELECT * FROM tbl_alunos WHERE nome = ?',
      [nome]
    );

    return linhas.length > 0 ? linhas[0] : null;
  } catch (error) {

    console.error('Erro ao buscar o aluno pelo nome:', error);
    return null;
  }
};

const pegarAlunoPorId = async (id) => {
  
  try {

    const [linhas] = await db.execute(
      'SELECT * FROM tbl_alunos WHERE aluno_id = ?',
      [id]
    );

    return linhas.length > 0 ? linhas[0] : false;
  } catch (error) {

    console.error('Erro ao buscar o aluno pelo ID:', error);
    return false;
  }
};

const buscarAlunoPorNome = async (query) => {

  try {

    const [resultados] = await db.execute(
      'SELECT nome FROM tbl_alunos WHERE nome LIKE ?',
      [`${query}%`]
    );

    return resultados;
  } catch (error) {

    console.error('Erro ao realizar a busca:', error);
    return "Erro ao realizar a busca.";
  }
};

const criarAluno = async ({ nome, turma, placa, hoje, limite, termino }) => {

  try {

    const [resultado] = await db.execute(
      'INSERT INTO tbl_alunos (nome, turma, placa, dia_pago_aluno, limite_estacionamento, termino_curso) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, turma, placa, hoje, limite, termino]
    );

    return resultado.insertId ? true : false;
  } catch (error) {

    console.error('Erro ao criar o aluno:', error);
    return false;
  }
};

const atualizarInformaçõesAluno = async ({ id, nome, turma, placa, termino }) => {
  
  try {

    const campos = [];
    const valores = [];

    if (nome) {

      campos.push('nome = ?');
      valores.push(nome);
    }

    if (turma) {

      campos.push('turma = ?');
      valores.push(turma);
    }

    if (placa) {

      campos.push('placa = ?');
      valores.push(placa);
    }

    if (termino) {

      campos.push('termino_curso = ?');
      valores.push(termino);
    }

    valores.push(id);

    const [resultado] = await db.execute(
      `UPDATE tbl_alunos SET ${campos.join(', ')} WHERE aluno_id = ?`,
      valores
    );

    return resultado.affectedRows > 0 ? true : false;
  } catch (error) {

    console.error('Erro ao atualizar os dados do aluno:', error);
    return false;
  }
};

const atualizarLimiteAposPago = async ({ id, hoje, limite }) => {

  try {

    const [resultado] = await db.execute(
      'UPDATE tbl_alunos SET status_pagamento = ?, dia_pago_aluno = ?, limite_estacionamento = ? WHERE aluno_id = ?',
      [true, hoje, limite, id]
    );

    return resultado.affectedRows > 0 ? true : false;
  } catch (error) {

    console.error('Erro ao atualizar o limite de estacionamento:', error);
    return false;
  }
};

const atualizarStatusAposLimite = async (hojeFusoHorarioSaoPaulo) => {

  try {

    const [resultado] = await db.execute(
      'UPDATE tbl_alunos SET status_pagamento = ? WHERE limite_estacionamento < ?',
      [false, hojeFusoHorarioSaoPaulo]
    );

    return resultado.affectedRows > 0 ? true : false;
  } catch (error) {

    console.error('Erro ao atualizar o status de pagamento do aluno:', error);
    return false;
  }
};

const removerAluno = async (id) => {

  try {

    const [resultado] = await db.execute(
      'DELETE FROM tbl_alunos WHERE aluno_id = ?',
      [id]
    );

    return resultado.affectedRows > 0 ? true: false;
  } catch (error) {

    console.error('Erro ao remover o aluno:', error);
    return false;
  }
};

const removerAlunoAposTermino = async (hojeFusoHorarioSaoPaulo) => {

  try {

    const [resultado] = await db.execute(
      'DELETE FROM tbl_alunos WHERE termino_curso < ?',
      [hojeFusoHorarioSaoPaulo]
    );

    return resultado.affectedRows > 0 ? true: false;
  } catch (error) {

    console.error('Erro ao remover o aluno:', error);
    return false;
  }
};

export default {
  pegarTodosAlunos,
  pegarAlunoPorNome,
  pegarAlunoPorId,
  buscarAlunoPorNome,
  criarAluno,
  atualizarInformaçõesAluno,
  atualizarLimiteAposPago,
  atualizarStatusAposLimite,
  removerAluno,
  removerAlunoAposTermino
};
