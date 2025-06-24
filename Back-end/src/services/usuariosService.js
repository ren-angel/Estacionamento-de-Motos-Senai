import db from '../config/database.js';

const fazerLogin = async (SN, senha) => {

  try {

    const [linhas] = await db.execute(
      'SELECT * FROM tbl_usuarios WHERE SN = ? AND senha=?',
      [SN, senha]
    );
    
    return linhas.length > 0 ? true : false;
  } catch (error) {

    console.error('Erro ao fazer login:', error);
    return false;
  }
};

export default { fazerLogin };
