const formatarDataFormatoBrasil = (dataOriginal) => {

    let data = dataOriginal instanceof Date ? dataOriginal : new Date(dataOriginal);

    if (isNaN(data.getTime())) {

        console.error("Formato de data inválido:", dataOriginal);
        return "Data inválida";
    }

    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();

    return `${dia}/${mes}/${ano}`;
};

export default { formatarDataFormatoBrasil };