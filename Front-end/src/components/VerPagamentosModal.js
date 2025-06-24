import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import pagamentosService from '../services/pagamentosService.js';

import Loading from './Loading.js';
import formatacaoData from '../utils/formatacaoData.js';

import '../styles/modal.css';

function VerPagamentosModal({ onClose }) {
    const [pagamentos, setPagamentos] = useState(null);
    const [pagamentosFiltrados, setPagamentosFiltrados] = useState(null);
    const [opcaoFiltro, setOpcaoFiltro] = useState('todos');
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(["token"]);

    useEffect(() => {

        const pegarPagamentos = async () => {

            setLoading(true);

            try {

                const pagamentosEfetuados = await pagamentosService.pegarPagamentos(cookies.token);
                
                if (pagamentosEfetuados) {

                    const pagamentosCrescente = pagamentosEfetuados.reverse();

                    setPagamentos(pagamentosCrescente);

                    aplicarFiltro(opcaoFiltro, pagamentosCrescente);
                } else {

                    setPagamentos(null);
                }

                setLoading(false);
            } catch (error) {

                toast.error(error.message);
            }
        };
        
        pegarPagamentos();
    }, [cookies.token]);

    useEffect(() => {

        if (pagamentos) {

            aplicarFiltro(opcaoFiltro, pagamentos);
        }
    }, [opcaoFiltro, pagamentos]);

    const aplicarFiltro = (opcaoFiltro, pagamentos) => {

        const hoje = new Date();
        const mesAtual = hoje.getMonth() + 1;
        const anoAtual = hoje.getFullYear();
        const dataAtual = hoje.getDate();

        let filtrado = pagamentos;

        if (opcaoFiltro === 'hoje') {

            filtrado = pagamentos.filter(pagamento => {
                const pagamentoData = new Date(pagamento.dia_pago_pagamento);

                return pagamentoData.getUTCFullYear() === anoAtual &&
                       (pagamentoData.getUTCMonth() + 1) === mesAtual &&
                       pagamentoData.getUTCDate() === dataAtual;
            });
        } else if (opcaoFiltro === 'mes') {

            filtrado = pagamentos.filter(pagamento => {
                const pagamentoData = new Date(pagamento.dia_pago_pagamento);
                
                return pagamentoData.getUTCFullYear() === anoAtual &&
                       (pagamentoData.getUTCMonth() + 1) === mesAtual;
            });
        } else if (opcaoFiltro === 'ano') {
            filtrado = pagamentos.filter(pagamento => {
                const pagamentoData = new Date(pagamento.dia_pago_pagamento);
                
                return pagamentoData.getUTCFullYear() === anoAtual;
            });
        }

        setPagamentosFiltrados(filtrado);
    };

    const fecharModalAoClicarFora = (e) => {

        if (e.target === e.currentTarget) {

            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={fecharModalAoClicarFora}>
            {loading && <Loading />}
            <div className="pagamentos-modal">
                <div>
                    <label htmlFor="filtro">Filtrar por: </label>
                    <select
                        id="filtro" 
                        value={opcaoFiltro} 
                        onChange={(e) => setOpcaoFiltro(e.target.value)}
                    >
                        <option value="todos">Todos</option>
                        <option value="hoje">Hoje</option>
                        <option value="mes">Neste Mês</option>
                        <option value="ano">Neste Ano</option>
                    </select>
                </div>
                <table className="pagamentos-modal-table">
                    <thead>
                        <tr>
                            <th className="pagamentos-modal-header">Valor</th>
                            <th className="pagamentos-modal-header">Data de Pagamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagamentosFiltrados && pagamentosFiltrados.map((pagamento, indice) => (
                            <tr key={indice}>
                                <td className="pagamentos-modal-text">{pagamento.valor}</td>
                                <td className="pagamentos-modal-text">
                                    {formatacaoData.formatarDataFormatoBrasil(pagamento.dia_pago_pagamento)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="modal-close">
                    <button className="close-button" type="button" onClick={onClose}>FECHAR</button>
                </div>
            </div>
        </div>
    );
}

export default VerPagamentosModal;