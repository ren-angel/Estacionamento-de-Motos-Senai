import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import alunosService from '../services/alunosService';

import '../styles/modal.css';

function AdicionarAlunoModal({ onAddSuccess, onClose }) {

  const [nome, setNome] = useState(null);
  const [turma, setTurma] = useState(null);
  const [placa, setPlaca] = useState(null);
  const [termino, setTermino] = useState(null);
  const [meses, setMeses] = useState(1);
  const [cookies] = useCookies(["token"]);

  let hoje = new Date();
  hoje = hoje.toISOString().split('T')[0];
  
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const alunoInfo = { nome, turma, placa, termino, meses };
      
      const respostaMensagem = await alunosService.criarAluno(cookies.token, alunoInfo);

      toast.info(respostaMensagem);
      onAddSuccess();
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
        <h1 className="modal-h1">Adicionar um novo aluno</h1>
        <form className="modal-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="modal-input"
              maxLength={100}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              required
            />
            <input
              type="text"
              className="modal-input"
              maxLength={20}
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              placeholder="Turma"
              required
            />
            <input
              type="text"
              className="modal-input"
              minLength={7}
              maxLength={7}
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              placeholder="Placa"
              required
            />
            <input
              type="date"
              className="modal-input"
              value={termino}
              onChange={(e) => setTermino(e.target.value)}
              min={hoje}
              placeholder="dd/mm/aaaa"
              required
            />
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
            <button type="submit" className="modal-button">ADICIONAR</button>
        </form>
        <div className="modal-close">
          <button className="close-button" type='button' onClick={onClose}>FECHAR</button>
        </div>
      </div>
    </div>
  );
}

export default AdicionarAlunoModal;
