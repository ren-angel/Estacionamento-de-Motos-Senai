import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import usuariosService from '../../services/usuariosService.js';
import alunosService from '../../services/alunosService.js';

import Loading from '../../components/Loading.js';
import ExcelBotao from '../../components/ExcelBotao.js';
import Paginacao from '../../components/paginacao.js';
import AdicionarAlunoModal from '../../components/AdicionarAlunoModal.js';
import FazerPagamentoModal from '../../components/FazerPagamentoModal.js';
import VerPagamentosModal from '../../components/VerPagamentosModal.js';
import EditarAlunoModal from '../../components/EditarAlunoModal.js';
import ConfirmarExclusaoModal from '../../components/ConfirmarExclusaoModal.js';
import formatacaoData from '../../utils/formatacaoData.js';

import senaiLogo from '../../assets/logo-senai.png';
import adicionarAlunoIcone from '../../assets/add.png';
import verPagamentosIcone from '../../assets/historico.png';
import lupaIcone from '../../assets/lupa.png';
import efetuarPagamentoIcone from '../../assets/dinheiro.png';
import editarAlunoIcone from '../../assets/editar.png';
import removerAlunoIcone from '../../assets/remover.png';
import logoutIcone from '../../assets/logout.png';

import '../../styles/dashboard.css';

function Dashboard() {

  const [alunos, setAlunos] =useState(null);
  const [alunosPaginaAtual, setAlunosPaginaAtual] = useState(null);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [query, setQuery] =useState('');
  const [sugestoes, setSugestoes] =useState([]);
  const [adicionarModalAberto, setAdicionarModalAberto] = useState(false);
  const [pagarModalAberto, setPagarModalAberto] = useState(false);
  const [pagamentosModalAberto, setPagamentosModalAberto] = useState(false);
  const [editarModalAberto, setEditarModalAberto] = useState(false);
  const [confirmacaoModalAberto, setConfirmacaoModalAberto] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const alunosPorPagina = 50;

  const indiceUltimoAluno = paginaAtual * alunosPorPagina;
  const indicePrimeiroAluno = indiceUltimoAluno - alunosPorPagina;
  
  useEffect(() => {

    if (!cookies.token) {

      navigate("/");
    } else {

      const pegarAlunos = async () => {

        setLoading(true);

        try {

          const alunosCadastrados = await alunosService.pegarAlunos(cookies.token);   
          
          if (alunosCadastrados) {

            const alunosEmOrdemAlfabetica = ordemAlfabetica(alunosCadastrados);

            setAlunos(alunosEmOrdemAlfabetica);
          } else {

            setAlunos(null);
          }

          setLoading(false);
        } catch (error) {
            
          toast.error(error.message);
          setLoading(false);
        }
      };
      
      pegarAlunos();
    }
  }, [cookies.token, navigate]);

  useEffect(() => {

    if (alunos && Array.isArray(alunos)) {

      pesquisarAluno(alunos);
    }
  }, [alunos, query, paginaAtual]);

  const ordemAlfabetica = (nomes) => {

    if (nomes) {

      const alunosEmOrdemAlfabetica = nomes.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
      });
  
      return alunosEmOrdemAlfabetica;
    } else {

      return nomes;
    }
  }

  const handleQuery = (e) => {

    const novaQuery = e.target.value;

    setQuery(novaQuery);
    
    if (novaQuery.length > 0) {
      
      pegarSugestoes(novaQuery);
    } else {

      setSugestoes([]);
    }
  };

  const pegarSugestoes = async (pesquisa) => {

    try {

      const resultados = await alunosService.barraDeBusca(cookies.token, pesquisa);

      const resultadosEmEmOrdemAlfabetica = ordemAlfabetica(resultados);
      
      setSugestoes(resultadosEmEmOrdemAlfabetica);
    } catch (error) {

      toast.error(error.message);
    }
  }

  const pesquisarAluno = (alunos) => {

    if (alunos && query.trim()) {

      let alunosFiltrados = null;

      if (!isNaN(query)) {
        
        alunosFiltrados = alunos.filter(aluno =>
          aluno.cartao.includes(query)
        );
      } else {

        const queryUpper = query.toUpperCase();
      
        alunosFiltrados = alunos.filter(
          aluno => aluno.nome.toUpperCase().includes(queryUpper) || 
          aluno.turma.toUpperCase().includes(queryUpper)
        );
      }

      const totalPaginasFiltradas = Math.ceil(alunosFiltrados.length / alunosPorPagina);
      const alunosPaginaAtualFiltrados = alunosFiltrados.slice(indicePrimeiroAluno, indiceUltimoAluno);

      setTotalPaginas(totalPaginasFiltradas);
      setAlunosPaginaAtual(alunosPaginaAtualFiltrados);
    } else {

      const totalPaginasFiltradas = Math.ceil(alunos.length / alunosPorPagina);
      const alunosPaginaAtualFiltrados = alunos.slice(indicePrimeiroAluno, indiceUltimoAluno);

      setTotalPaginas(totalPaginasFiltradas);
      setAlunosPaginaAtual(alunosPaginaAtualFiltrados);
    }
  };

  const handleSearchClick = () => {

    pesquisarAluno(alunos);
  };
  
  const toggleAdicionarModal = () => {
    
    setAdicionarModalAberto(!adicionarModalAberto);
  }

  const togglePagarModal = (aluno) => {
    
    setAlunoSelecionado(aluno);
    setPagarModalAberto(!pagarModalAberto);
  }

  const togglePagamentosModal = () => {
    
    setPagamentosModalAberto(!pagamentosModalAberto);
  }

  const toggleEditarModal = (aluno) => {
    
    setAlunoSelecionado(aluno);
    setEditarModalAberto(!editarModalAberto);
  }
  
  const toggleConfirmacaoModal = (aluno) => {
    
    setAlunoSelecionado(aluno);
    setConfirmacaoModalAberto(!confirmacaoModalAberto);
  }

  const handleAddSuccess = async () => {

    setLoading(true);

    try {

      const alunosCadastrados = await alunosService.pegarAlunos(cookies.token);

      const alunosEmOrdemAlfabetica = ordemAlfabetica(alunosCadastrados);

      setAlunos(alunosEmOrdemAlfabetica);

      setLoading(false);
      setQuery('');
      setAdicionarModalAberto(false);
    } catch (error) {

      toast.error(error.message);
      setLoading(false);
      setAdicionarModalAberto(false);
    }
  };

  const handlePaySuccess = async () => {

    setLoading(true);

    try {

      const alunoAtualizado = await alunosService.pegarAlunos(cookies.token);
      const alunosEmOrdemAlfabetica = ordemAlfabetica(alunoAtualizado);

      setAlunos(alunosEmOrdemAlfabetica);

      pesquisarAluno(alunosEmOrdemAlfabetica);

      setLoading(false);
      setPagarModalAberto(false);
    } catch (error) {

      toast.error(error.message);
      setLoading(false);
      setPagarModalAberto(false);
    }
  };

  const handleEditSuccess = async () => {

    setLoading(true);

    try {

      const alunoAtualizado = await alunosService.pegarAlunos(cookies.token);
      const alunosEmOrdemAlfabetica = ordemAlfabetica(alunoAtualizado);

      setAlunos(alunosEmOrdemAlfabetica);

      pesquisarAluno(alunosEmOrdemAlfabetica);

      setLoading(false);
      setEditarModalAberto(false);
    } catch (error) {

      toast.error(error.message);
      setLoading(false);
      setEditarModalAberto(false);
    }
  };

  const handleDeleteSuccess = async (id) => {

    setLoading(true);

    try {

        const respostaMensagem = await alunosService.removerAluno(cookies.token, id);
        
        setAlunos(alunos.filter(aluno => aluno.aluno_id !== id));
        
        toast.success(respostaMensagem);
        
        setLoading(false);
        setQuery('');
        setConfirmacaoModalAberto(false);
    } catch (error) {

        toast.error(error.message);
        setLoading(false);
        setConfirmacaoModalAberto(false);
    }
  }

  const handleLogout = async () => {

    try {

      await usuariosService.logout();
      
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      navigate("/");
    } catch (error) {

      toast.error(error.message);
    }
  };

  return (
    <div className="dashboard-container">
      {loading && <Loading />}
      <div className='header'>
        <img src={senaiLogo} alt="Logo do Senai" className='logo' />
        <div className="logout-container">
              <button className="logout-button" onClick={handleLogout}>
                <img src={logoutIcone} alt="Logout" />
                SAIR
              </button>
        </div>
      </div>
      <div className='main'>
        <div className='funcoes-topo-container'>
          <button className='adicionar-button' onClick={() => toggleAdicionarModal()}>
            <img src={adicionarAlunoIcone} alt="Adicionar Aluno" />
            Adicionar Aluno
          </button>
          {adicionarModalAberto && (
           <AdicionarAlunoModal
            onAddSuccess={handleAddSuccess}
            onClose={() => setAdicionarModalAberto(false)}
           />
          )}
          <button className='pagamentos-button' onClick={() => togglePagamentosModal()}>
              <img src={verPagamentosIcone} alt="Visualizar Pagamentos" />
              Visualizar Pagamentos
          </button>
          {pagamentosModalAberto && (
           <VerPagamentosModal
            onClose={() => setPagamentosModalAberto(false)}
           />
          )}
          <ExcelBotao />
          <div className={`searchbar${loading ? '-loading' : ''}`}>
            <input
              type='text'
              value={query}
              onChange={handleQuery}
              onFocus={() => query && pegarSugestoes(query)}
              onBlur={() => setTimeout(() => setSugestoes([]), 100)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchClick();
                }
              }}
              placeholder='Pesquisar por um aluno...'
              />
            <ul>
              {sugestoes && sugestoes.map((aluno, indice) => (
                <li key={indice}>
                  <button
                    onMouseDown={() => setQuery(aluno.nome)}
                    onClick={() => setSugestoes([])}
                  >
                    {aluno.nome}
                  </button>
                </li>
              ))}
            </ul>  
          </div>
          <button onClick={handleSearchClick} className='search-button'>
            <img src={lupaIcone} alt="Pesquisar" />
          </button>
        </div>
        <table className="alunos-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Turma</th>
              <th>Placa</th>
              <th>Cartão</th>
              <th>Termino</th>
              <th>Status</th>
              <th>Último Pagamento</th>
              <th>Estacionar Até</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {alunosPaginaAtual && alunosPaginaAtual.map((aluno, indice) => (
              <tr key={indice}>
                <td>{aluno.nome}</td>
                <td>{aluno.turma}</td>
                <td>{aluno.placa}</td>
                <td>{aluno.cartao}</td>
                <td>{formatacaoData.formatarDataFormatoBrasil(aluno.termino_curso)}</td>
                <td>{aluno.status_pagamento ? "PAGO" : "NÃO PAGO"}</td>
                <td>{formatacaoData.formatarDataFormatoBrasil(aluno.dia_pago_aluno)}</td>
                <td>{formatacaoData.formatarDataFormatoBrasil(aluno.limite_estacionamento)}</td>
                <td>
                  <button className="pagar-button" onClick={() => togglePagarModal(aluno)}>
                    <img src={efetuarPagamentoIcone} alt="Efetuar Pagamento" />
                  </button>
                  {pagarModalAberto && alunoSelecionado && alunoSelecionado.aluno_id === aluno.aluno_id && (
                    <FazerPagamentoModal
                      aluno={aluno}
                      onPaySuccess={handlePaySuccess}
                      onClose={() => setPagarModalAberto(false)}
                    />
                  )}
                  <button className="editar-button" onClick={() => toggleEditarModal(aluno)}>
                    <img src={editarAlunoIcone} alt="Editar Aluno" />
                  </button>
                  {editarModalAberto && alunoSelecionado && alunoSelecionado.aluno_id === aluno.aluno_id && (
                    <EditarAlunoModal
                      aluno={aluno}
                      onEditSuccess={handleEditSuccess}
                      onClose={() => setEditarModalAberto(false)}
                    />
                  )}
                  <button className="deletar-button" onClick={() => toggleConfirmacaoModal(aluno)}>
                    <img src={removerAlunoIcone} alt="Remover Aluno" />
                  </button>
                  {confirmacaoModalAberto && alunoSelecionado && alunoSelecionado.aluno_id === aluno.aluno_id && (
                    <ConfirmarExclusaoModal
                      Text="Você tem certeza de que deseja remover este aluno da lista? Esta ação não poderá ser desfeita."
                      onConfirm={() => handleDeleteSuccess(alunoSelecionado.aluno_id)}
                      onCancel={() => setConfirmacaoModalAberto(false)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPaginas > 1 && (
          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            setPaginaAtual={setPaginaAtual}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
