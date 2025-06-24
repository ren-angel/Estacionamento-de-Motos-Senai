import { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import excelService from '../services/excelService';

import baixarExcelIcone from '../assets/excel.png';

import '../styles/dashboard.css';

function ExcelBotao() {

    const [downloadUrl, setDownloadUrl] = useState(null);
    const downloadLinkRef = useRef(null);
    const [cookies] = useCookies(["token"]);

    const handleDownload = async () => {

        try {

            const excel = await excelService.download(cookies.token);

            const blob = new Blob([excel.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            setDownloadUrl(url);
        } catch (error) {

            toast.error(error.message);
        }
    };

    useEffect(() => {

        if (downloadUrl && downloadLinkRef.current) {

            downloadLinkRef.current.click();
            window.URL.revokeObjectURL(downloadUrl);
            setDownloadUrl(null);
        }
    }, [downloadUrl]);

    return (
        <div>
            <button className='excel-button' onClick={handleDownload}>
                <img src={baixarExcelIcone} alt="Baixar Excel" />
                Baixar Excel
            </button>
            <a
                href={downloadUrl || '#'}
                download="Dados_do_Estacionamento_Motos.xlsx"
                ref={downloadLinkRef}
                style={{ display: 'none' }}
            />
        </div>
    );
}

export default ExcelBotao;
