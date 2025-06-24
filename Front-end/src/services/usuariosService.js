import axiosInstance from './axiosInstance';

const usuariosService = {

    login: async (SN, senha) => {
        
        try {

            const response = await axiosInstance.post('/login', { SN, senha });

            if (response.status === 200) {
            
                return response.data.token;
            }
        } catch (error) {

            throw new Error(error.response.data.mensagem || 'Falha ao fazer login');
        }
    },

    logout: async () => {

        try {

            const response = await axiosInstance.get('/logout');

            if (response.status === 200) {
            
                return response.data.mensagem;
            }
        } catch (error) {

            throw new Error('Falha ao deslogar');
        }
    }
};

export default usuariosService;
