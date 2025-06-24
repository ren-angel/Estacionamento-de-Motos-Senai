import axiosInstance from './axiosInstance';

const excelService = {

    download: async (token) => {

        try {

            const response = await axiosInstance.get('/download-excel', {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });
            
            if (response.status === 200) {

                return response;
            }
        } catch (error) {

            if (error.response && error.response.status === 401) {

                throw new Error("Sessão expirada. Por favor, faça login novamente.");
            }

            if (error.response && error.response.status === 404) {

                throw new Error('Não há dados para se criar a panilha com');
            }

            console.error(error.message)
            throw new Error(error.response?.data?.mensagem || 'Falha ao realizar o download da planilha Excel');
        }
    }
};

export default excelService;
