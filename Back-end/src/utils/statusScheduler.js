import schedule from 'node-schedule';
import moment from 'moment-timezone';
import alunosService from '../services/alunosService.js'

const atualizarStatusJob = schedule.scheduleJob({
  hour: 0,
  minute: 0,
  second: 0,
  tz: "America/Sao_Paulo"
}, async () => {

  try {

    const hojeFusoHorarioSaoPaulo = moment.tz("America/Sao_Paulo").startOf('day').format('YYYY-MM-DD');
    
    const statusAtualizado = await alunosService.atualizarStatusAposLimite(hojeFusoHorarioSaoPaulo);

    if (!statusAtualizado) {
      
      console.log("Nenhum status atualizado");
    } else {

      console.log("Status de pagamento dos alunos atualizado com sucesso");
    }
  } catch (error) {

    console.error("Erro ao atualizar o status de pagamento dos alunos: ", error);
  }
});

export default atualizarStatusJob;