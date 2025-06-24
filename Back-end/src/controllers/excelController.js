import ExcelJS from 'exceljs';
import excelService from '../services/excelService.js';
import validations from '../utils/validations.js';

const gerarExcel = async (request, reply) => {

  try {

    const dados = await excelService.pegarInformaçoes();

    if (dados) {

      const dadosConvertidos = dados.map(linha => ({
        ...linha,
        ultimo_pagamento: validations.formatarDataFormatoBrasil(linha.dia_pago_aluno),
        data_expiracao: validations.formatarDataFormatoBrasil(linha.limite_estacionamento),
        termino_curso: validations.formatarDataFormatoBrasil(linha.termino_curso)
      }));
  
      const dadosEmOrdemAlfabetica = dadosConvertidos.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
      });
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Dados do Estacionamento Motos');
  
      worksheet.columns = [
        { header: 'Nome', key: 'nome', width: 45 },
        { header: 'Placa', key: 'placa', width: 20 },
        { header: 'Termino do Curso', key: 'termino_curso', width: 20 },
        { header: 'Último Pagamento', key: 'ultimo_pagamento', width: 20 },
        { header: 'Pode Estacionar Até', key: 'data_expiracao', width: 25 },
      ];
  
      dadosEmOrdemAlfabetica.forEach((linha) => {
        worksheet.addRow(linha);
      });
  
      worksheet.headerFooter.oddHeader = '&C&"Arial,Bold"&16Dados do Estacionamento de Motos';
      worksheet.headerFooter.oddFooter = '';
  
      worksheet.pageSetup = {
        orientation: 'landscape',
        paperSize: 9,
        fitToPage: true,
        horizontalCentered: true,
        verticalCentered: false,
        margins: {
          left: 0.7, right: 0.7,
          top: 0.75, bottom: 0.75,
          header: 0.3, footer: 0
        },
      };
  
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
  
          cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
  
          if (rowNumber === 1) {
            cell.font = { bold: true };
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFE599' },
            };
          }
        });
      });
  
      worksheet.autoFilter = {
        from: 'A1',
        to: 'D1'
      };
  
      reply
        .header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .header('Content-Disposition', 'attachment; filename=Dados_do_Estacionamento_das_Motos.xlsx');
  
      const buffer = await workbook.xlsx.writeBuffer();
      return reply.send(buffer);
    } else {

      return reply.code(404).send({ mensagem: "Não há nenhum dado para se criar a panilha com" })
    }
  } catch (error) {

    if (error.response && error.response.status === 401) {

      return reply.send({ mensagem: "Sessão expirada. Por favor, faça login novamente." });
    }

    console.error(error.message);
    return reply.code(500).send({ mensagem: "Erro no servidor" });
  }
};

export default { gerarExcel };
