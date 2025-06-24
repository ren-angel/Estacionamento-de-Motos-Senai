import axiosInstance from './axiosInstance';

const pagamentosService = {

    pegarPagamentos: async (token) => {

        try {

            const response = await axiosInstance.get('/pagamentos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.status === 200) {

                return response.data.todosPagamentos;
            }
        } catch (error) {

            
            if (error.response && error.response.status === 401) {

                throw new Error("Sessão expirada. Por favor, faça login novamente.");
            }
            
            throw new Error(error.response.data.mensagem || 'Falha ao buscar os pagamentos');
        }
    },

    efetuarPagamento: async (token, id, meses) => {

        try {

            const response = await axiosInstance.post('/efetuar-pagamento', { id, meses }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.mensagem;
            }
        } catch (error) {

            if (error.response && error.response.status === 401) {

                throw new Error("Sessão expirada. Por favor, faça login novamente.");
            }

            throw new Error(error.response.data.mensagem || 'Falha ao efetuar o pagamento');
        }
    }
};

export default pagamentosService;
