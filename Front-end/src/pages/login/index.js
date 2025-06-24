import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import usuariosService from '../../services/usuariosService.js'

import Loading from '../../components/Loading';

import '../../styles/login.css';

function Login() {

  const [SN, setSN] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {

    if (cookies.token) {

      navigate("/dashboard");
    }
  }, [cookies.token, navigate]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const token = await usuariosService.login(SN, senha);

      setLoading(false);
      setCookie("token", token, { path: '/' });
      navigate("/dashboard");
    } catch (error) {

      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className='login-container'>
      {loading && <Loading />}
      <div className="container">
        <div className="welcome">
          <h2>Bem-vindo!</h2>
        </div>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='form-group'>
            <label htmlFor='SN'>SN</label>
            <input
              type="text"
              id="SN"
              value={SN}
              onChange={(e) => setSN(e.target.value)}
              placeholder="00000"
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='senha'>Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
            />
          </div>
          <div className='form-group'>
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;