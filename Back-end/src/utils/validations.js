const camposAdicionarAlunoEstaVazio = (nome, turma, placa, termino) => {

    return !nome || !turma || !placa || !termino ? true:false;
}

const camposLoginEstaVazio = (SN, senha) => {

    return !SN || !senha ? true:false;
}

const converterDataParaFormatoSQL = () => {
        
    const hoje = new Date();
        
    return hoje.toISOString().split('T')[0];
}

const calcularLimite = (meses) => {

    const hoje = new Date();

    const dataLimite = new Date(hoje.setMonth(hoje.getMonth() + meses));
    
    return dataLimite.toISOString().split('T')[0];
}

const calcularLimitePreExpiracao = (limiteAtual, meses) => {

    const datalimite = new Date(limiteAtual);

    const dataLimiteNova = new Date(datalimite.setMonth(datalimite.getMonth() + meses));
    
    return dataLimiteNova.toISOString().split('T')[0];
}

const formatarDataFormatoBrasil = (dataOriginal) => {

    let data = dataOriginal instanceof Date ? dataOriginal : new Date(dataOriginal);

    if (isNaN(data.getTime())) {

        console.error("Formato de data inválido:", dataOriginal);
        return "Data inválida";
    }

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
};

export default { camposAdicionarAlunoEstaVazio, camposLoginEstaVazio, converterDataParaFormatoSQL, calcularLimite, calcularLimitePreExpiracao, formatarDataFormatoBrasil };