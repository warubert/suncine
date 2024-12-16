import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

import './Style.css'

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState('');
  const [error, setError] = useState<{ login?: string; password?: string }>({});
  const navigate = useNavigate();
  
  const { setToken, setUser } = useAuth();

  const [selectedOption, setSelectedOption] = useState<string>(''); // Estado para o botão selecionado

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmitProblem = (event: React.FormEvent) => {
    event.preventDefault();
    if(selectedOption == 'esqueci'){
      setEstado('email')
    } else {
      setEstado('senha')
    }
  };

  const handleSubmitSenha = (event: React.FormEvent) => {
    event.preventDefault();
    setEstado('newSenha')
  };

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
      
        {estado === '' && (
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
              <p onClick={() => setEstado('problemas')} className="forgot text-right text-[#FF5F00] underline text-[16px] font-medium my-[20px]">Não consigo acessar minha conta</p>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full p-[14px] rounded-[80px] bg-[#20665D] text-white cursor-pointer"
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </button>
          </form>
        </div>)}
        {estado === 'problemas' && (
        <div className="card relative top-[20vh] left-[20vw] w-[40vw] p-[32px] rounded-[16px] bg-[#4F4F4F80] text-[#FFFFFFDE]">
          <h1 className="text-center text-[20px] font-medium m-0 mb-4">Problemas para entrar?</h1>
          <h2 className="text-center m-0 mb-6">
            Selecione o que aconteceu e digite seu e-mail para comprovar sua identidade!
          </h2>

          <form onSubmit={handleSubmitProblem}>
            <div>
              <div className="flex flex-col my-2.5">
                <label className="my-2.5">
                  <input
                    type="radio"
                    value="esqueci"
                    checked={selectedOption === 'esqueci'}
                    onChange={handleRadioChange}
                    className="mr-2.5 w-[20px] h-[20px] border-2 border-white bg-transparent checked:bg-[rgba(128,191,186,1)] checked:border-[rgba(128,191,186,1)] appearance-none rounded-full focus:outline-none"
                  />
                  Esqueci minha senha
                </label>

                <label className="my-2.5">
                  <input
                    type="radio"
                    value="redefinir"
                    checked={selectedOption === 'redefinir'}
                    onChange={handleRadioChange}
                    className="mr-2.5 w-[20px] h-[20px] border-2 border-white bg-transparent checked:bg-[rgba(128,191,186,1)] checked:border-[rgba(128,191,186,1)] appearance-none rounded-full focus:outline-none"
                  />
                  Redefinir senha
                </label>
              </div>

              <h3 className={`${error.login ? 'text-[#FF5959]' : 'text-white'} text-left`}>{ selectedOption == 'esqueci'? 'CPF cadastrado' : 'Digite seu e-mail'}</h3>
              <input
                type="text"
                name="login"
                placeholder="Insira seu e-mail"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                className={`w-[100%] p-[10px] rounded-[6px] bg-[#EDEDED] text-[#000000] mb-4`}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full p-[14px] rounded-[80px] bg-[#20665D] text-white cursor-pointer"
            >
              {loading ? 'Carregando...' : 'Salvar e continuar'}
            </button>
            
            <div>
              <p className="forgot text-center text-[#FF5F00] underline text-[16px] font-medium my-[20px] mb-1" onClick={() => setEstado('')}>Voltar para o login</p>
            </div>
          </form>
        </div>)}
        {estado === 'email' && (
        <div className="card backdrop-blur-sm shadow-orange relative top-[20vh] left-[20vw] w-[40vw] p-[32px] rounded-[16px] bg-[#4F4F4F80] text-[#FFFFFFDE]">
          <h1 className="text-center text-[20px] font-medium m-0 mb-4">Link de recuperação enviado</h1>
          <h2 className="text-center m-0">
          O link de recuperação de senha foi enviado para o 
          </h2>
          <h2 className="text-center m-0 mb-6">e-mail: <span className="text-green-400" >desen******r@s***e.com.</span></h2>
          <h2 className="text-center m-0 mb-6">
          Verifique sua caixa de entrada, spam e lixo eletrônico.
          </h2>
          <p className="forgot text-center text-[#FF5F00] underline text-[16px] font-medium my-[20px] mb-1" onClick={() => setEstado('')}>Voltar para o login</p>
        </div>)}
        {estado === 'senha' && (
        <div className="card relative top-[20vh] left-[20vw] w-[40vw] p-[32px] rounded-[16px] bg-[#4F4F4F80] text-[#FFFFFFDE]">
          <h1 className="text-center text-[20px] font-medium m-0 mb-4">Defina sua nova senha</h1>
          <h2 className="text-center m-0 mb-6">
            Crie uma senha que fácil de lembrar
          </h2>

          <form onSubmit={handleSubmitSenha}>
            <div>
              <h3 className='text-white text-left'>Digite nova senha</h3>
              <input
                type="password"
                required
                className={`w-[100%] p-[10px] rounded-[6px] bg-[#EDEDED] text-[#000000]`}
              />
              <p className="text-[12px] font-normal text-left text-[#A1A1A1] mt-0 mb-4">Sua senha deve ter de 8 a 12 caracteres.</p>

              <h3 className='text-white text-left'>Confirme a nova senha</h3>
              <input
                type="password"
                required
                className={`w-[100%] p-[10px] rounded-[6px] bg-[#EDEDED] text-[#000000] mb-4`}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full p-[14px] rounded-[80px] bg-[#20665D] text-white cursor-pointer"
            >
              {loading ? 'Carregando...' : 'Salvar e atualizar senha'}
            </button>
            
            <div>
              <p className="forgot text-center text-[#FF5F00] underline text-[16px] font-medium my-[20px] mb-1" onClick={() => setEstado('')}>Voltar para o login</p>
            </div>
          </form>
        </div>)}
        {estado === 'newSenha' && (
        <div className="card backdrop-blur-sm shadow-orange relative top-[20vh] left-[20vw] w-[40vw] p-[32px] rounded-[16px] bg-[#4F4F4F80] text-[#FFFFFFDE]">
          <h1 className="text-center text-[20px] font-medium m-0 mb-4">Sua senha foi atualizada!</h1>
          <h2 className="text-center m-0">
          Acesse agora a plataforma
          </h2>
          <p className="forgot text-center text-[#FF5F00] underline text-[16px] font-medium my-[20px] mb-1" onClick={() => setEstado('')}>Fazer login novamente</p>
        </div>)}

      </div>  
    </div>
  );
}

export default Login;
