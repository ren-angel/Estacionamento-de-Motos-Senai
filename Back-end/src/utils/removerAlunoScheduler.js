import schedule from 'node-schedule';
import moment from 'moment-timezone';
import alunosService from '../services/alunosService.js'

const removerAlunoAposUmAnoJob = schedule.scheduleJob({
  hour: 0,
  minute: 0,
  second: 0,
  tz: "America/Sao_Paulo"
}, async () => {

  try {

    const hojeFusoHorarioSaoPaulo = moment.tz("America/Sao_Paulo").startOf('day').format('YYYY-MM-DD');

    const removerAlunos = await alunosService.removerAlunoAposTermino(hojeFusoHorarioSaoPaulo);

    if (!removerAlunos) {
      
      console.log("Nenhum aluno removido");
    } else {

      console.log("Alunos com curso terminado removidos com sucesso");
    }
  } catch (error) {

    console.error("Erro ao remover os alunos com curso terminado: ", error);
  }
});

export default removerAlunoAposUmAnoJob;