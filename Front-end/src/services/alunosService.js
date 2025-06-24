import axiosInstance from './axiosInstance';

const alunosService = {

    pegarAlunos: async (token) => {
        
        try {

            const response = await axiosInstance.get('/alunos', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.todosAlunos;
            }
        } catch (error) {

            if (error.response && error.response.status === 401) {

                throw new Error("Sessão expirada. Por favor, faça login novamente.");
            }

            throw new Error(error.response.data.mensagem || 'Falha ao buscar os alunos');
        }
    },

    pegarAlunoPorNome: async (token, nome) => {
        
        try {

            const response = await axiosInstance.get(`/aluno/${nome}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.alunoEspecifico;
            }
        } catch (error) {

            if (error.response && error.response.status === 401) {

                throw new Error("Sessão expirada. Por favor, faça login novamente.");
            }

            throw new Error(error.response.data.mensagem || 'Falha ao buscar o aluno pelo nome');
        }
    },

    barraDeBusca: async (token, pesquisa) => {

        try {

            const response = await axiosInstance.get(`/busca`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { pesquisa }
            });

            if (response.status === 200) {
            
                return response.data.alunosEncontrados;
            }
        } catch (error) {

            if (error.response && error.response.status === 401) {

                throw new Error("Sessão expirada. Por favor, faça login novamente.");
            }

            throw new Error(error.response.data.mensagem || 'Falha ao realizar a busca');
        }
    },

    criarAluno: async (token, alunoInfo) => {

        try {

            const response = await axiosInstance.post('/novo-aluno', alunoInfo, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.mensagem;
            }
        } catch (error) {

            if (error.response && error.response.status === 401) {

                throw new Error("Sessão expirada. Por favor, faça login novamente.");
            }

            throw new Error(error.response.data.mensagem || 'Falha ao criar o aluno');
        }
    },

    editarAluno: async (token, alunoInfo) => {

        try {

            const response = await axiosInstance.put('/editar-aluno', alunoInfo, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
            
                return response.data.mensagem;
            }
        } catch (error) {

            if (error.response && error.response.status === 401) {

                throw new Error("Sessão expirada. Por favor, faça login novamente.");
            }

            throw new Error(error.response.data.mensagem || 'Falha ao editar o aluno');
        }
    },

    removerAluno: async (token, id) => {

        try {

            const response = await axiosInstance.delete('/remover-aluno', {
                headers: { Authorization: `Bearer ${token}` },
                params: { id }
            });

            if (response.status === 200) {
            
                return response.data.mensagem;
            }
        } catch (error) {

            if (error.response && error.response.status === 401) {

                throw new Error("Sessão expirada. Por favor, faça login novamente.");
            }

            throw new Error(error.response.data.mensagem || 'Falha ao remover o aluno');
        }
    }
};

export default alunosService;
