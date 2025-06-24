import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import alunosService from '../services/alunosService';

import '../styles/modal.css';

function EditarAlunoModal({ aluno, onEditSuccess, onClose }) {

    const [nome, setNome] = useState(null);
    const [turma, setTurma] = useState(null);
    const [placa, setPlaca] = useState(null);
    const [termino, setTermino] = useState(null);
    const [cookies] = useCookies(["token"]);

    useEffect(() => {

        setNome(aluno.nome);
        setTurma(aluno.turma);
        setPlaca(aluno.placa);
        setTermino(aluno.termino_curso.slice(0, 10));
    }, [aluno]);

    const handleSubmit = async (e) => {

        e.preventDefault();
    
        try {
    
          const alunoInfo = { id: aluno.aluno_id, nome, turma, placa, termino };
          
          const respostaMensagem = await alunosService.editarAluno(cookies.token, alunoInfo);
    
          toast.success(respostaMensagem);
          onEditSuccess();
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
            <h1 className="modal-h1">Editar informações do aluno</h1>
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
                        placeholder="dd/mm/aaaa"
                        required
                    />
                    <button type="submit" className="modal-button">EDITAR</button>
                </form>
                <div className="modal-close">
                    <button className="close-button" type='button' onClick={onClose}>FECHAR</button>
                </div>
            </div>
        </div>
    );
}

export default EditarAlunoModal;
