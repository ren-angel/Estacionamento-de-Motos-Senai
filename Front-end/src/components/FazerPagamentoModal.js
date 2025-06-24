import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import pagamentosService from '../services/pagamentosService';

import '../styles/modal.css';

function FazerPagamentoModal({ aluno, onPaySuccess, onClose }) {

  const [meses, setMeses] = useState(1);
  const [cookies] = useCookies(["token"]);
  
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      
      const respostaMensagem = await pagamentosService.efetuarPagamento(cookies.token, aluno.aluno_id, meses);

      toast.info(respostaMensagem);
      onPaySuccess();
    } catch (error) {

      toast.error(error.message);
    }
  };

  const fecharModalAoClicarFora = (e) => {

    if (e.target === e.currentTarget) {

        onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={fecharModalAoClicarFora}>
      <div className="modal">
        <h1 className="modal-h1">Faça um novo pagamento</h1>
        <form className="modal-form" onSubmit={handleSubmit}>
            <select
              value={meses}
              onChange={(e) => setMeses(e.target.value)}
              required
            >
              {[...Array(12).keys()].map((mes) => (
                <option key={mes + 1} value={mes + 1}>
                  {mes + 1} mês{mes > 0 ? 'es' : ''}
                </option>
              ))}
            </select>
            <button type="submit" className="modal-button">PAGAR</button>
        </form>
        <div className="modal-close">
          <button className="close-button" type='button' onClick={onClose}>FECHAR</button>
        </div>
      </div>
    </div>
  );
}

export default FazerPagamentoModal;
