import db from '../config/database.js';

const pegarTodosPagamentos = async () => {

    try {

      const [linhas] = await db.execute('SELECT valor, dia_pago_pagamento FROM tbl_pagamentos');

      return linhas.length > 0 ? linhas : null;
    } catch (error) {

      console.error('Erro ao buscar os pagamentos:', error);
      return null;
    }
};

const criarPagamento = async ({ valor, hoje }) => {

  try {

    const [resultado] = await db.execute(
      'INSERT INTO tbl_pagamentos (valor, dia_pago_pagamento) VALUES (?, ?)',
      [valor, hoje]
    );
  
    return resultado.insertId ? true : false;
  } catch (error) {

    console.error('Erro ao criar o pagamento:', error);
    return false;
  }
};

export default { pegarTodosPagamentos, criarPagamento };
