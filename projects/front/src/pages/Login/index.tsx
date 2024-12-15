import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

import './Style.css'

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ login?: string; password?: string }>({});
  const navigate = useNavigate();
  
  const { setToken, setUser } = useAuth();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError({});
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'OK' && data.payload && data.payload.token) {
          console.log('Login bem-sucedido:', data);

          setToken(data.payload.token);
          setUser(data.payload.user);
          navigate("/home");
        } else {
          console.error('Resposta inesperada:', data);
          setError({ login: 'E-mail ou senha inválidos', password: 'E-mail ou senha inválidos' });
        }
      } else if (response.status === 401) {
        setError({ login: 'E-mail ou senha inválidos', password: 'E-mail ou senha inválidos' });
      } else {
        console.error('Erro ao fazer login:', response.statusText);
        setError({ login: 'Erro ao tentar fazer login', password: 'Erro ao tentar fazer login' });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError({ login: 'Erro ao conectar ao servidor' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginPage bg-cover bg-center">
      <div className="container absolute top-[5vh] left-[10vw]">
        <img src={logo} className="logo absolute h-[50px] left-0 top-[5vh]" alt="Vite logo" />
      
        <div className="card relative top-[20vh] w-[400px] p-[32px] rounded-[16px] bg-[#4F4F4F80] text-[#FFFFFFDE]">
          <h1 className="text-left text-[20px] font-medium m-0">Olá cinéfilo,</h1>
          <h2 className="text-left text-[20px] font-medium m-0 mb-6">que bom te ver por aqui!</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <h3 className={`${error.login ? 'text-[#FF5959]' : 'text-white'} text-left`}>E-mail</h3>
              <input
                type="text"
                name="login"
                placeholder="Insira seu e-mail"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                className={`w-[100%] p-[10px] rounded-[6px] bg-[#EDEDED] text-[#000000] mb-4 ${error.login ? 'border-[#FF5959]' : ''}`}
              />
              {error.login && <p className="text-[#FF5959] text-center ">{error.login}</p>}

              <h3 className={`${error.password ? 'text-[#FF5959]' : 'text-white'} text-left`}>Senha</h3>
              <input
                type="password"
                name="password"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-[100%] p-[10px] rounded-[6px] bg-[#EDEDED] text-[#000000] mb-4 ${error.password ? 'border-[#FF5959]' : ''}`}
              />
              {error.password && <p className="text-[#FF5959] text-center">{error.password}</p>}
            </div>
            
            <div>
              <p className="forgot text-right text-[#FF5F00] underline text-[16px] font-medium my-[20px]">Não consigo acessar minha conta</p>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full p-[14px] rounded-[80px] bg-[#20665D] text-white cursor-pointer"
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>  
    </div>
  );
}

export default Login;
