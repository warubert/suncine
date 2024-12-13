import { useState } from 'react';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ login?: string; password?: string }>({});

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError({}); // Limpar erros antes de fazer a requisição

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
          alert(`Login bem-sucedido! Bem-vindo, ${data.payload.user.name}`);
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
    <>
      <div className="container">
        <img src={logo} className="logo" alt="Vite logo" />
      
      <div className="card">
        <h1>Olá cinéfilo,</h1>
        <h2>que bom te ver por aqui!</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <h3
              style={{
                color: error.login ? '#FF5959' : 'white',
              }}
            >
              E-mail
            </h3>
            <input
              type="text"
              name="login"
              placeholder="Insira seu e-mail"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              style={{
                borderColor: error.login ? '#FF5959' : 'initial',
                color: error.login ? '#FF5959' : 'initial',
              }}
            />
            {error.login && <p className="error">{error.login}</p>}

            <h3
              style={{
                color: error.password ? '#FF5959' : 'white',
              }}
            >
              Senha
            </h3>
            <input
              type="password"
              name="password"
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderColor: error.password ? '#FF5959' : 'initial',
                color: error.password ? '#FF5959' : 'initial',
              }}
            />
            {error.password && <p className="error">{error.password}</p>}
          </div>
          
          {/* Link acima do botão Entrar */}
          <div>
            <p className='forgot'>
              Não consigo acessar minha conta
            </p>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </div>
      </div>  
    </>
  );
}

export default App;
