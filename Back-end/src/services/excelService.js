import db from '../config/database.js';

const pegarInformaçoes = async () => {

    try {

        const [linhas] = await db.execute(
            'SELECT nome, placa, dia_pago_aluno, limite_estacionamento, termino_curso FROM tbl_alunos WHERE status_pagamento = ?',
            [true]
        );
    
        return linhas.length > 0 ? linhas : null;
    } catch (error) {

        console.error('Erro ao buscar as informações dos alunos:', error);
        return null;
    }
};

export default { pegarInformaçoes };
