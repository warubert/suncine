import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


// Definindo o tipo do contexto para incluir o usuário
interface AuthContextType {
  token: string | null;
  user: object | null;
  setToken: (token: string | null) => void;
  setUser: (user: object | null) => void;
  logout: () => void;
}

// Cria o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider que gerencia o token e o usuário
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<object | null>(null);

  // Carrega o token e o usuário salvos no localStorage quando o app inicializa
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (storedToken) {
      setTokenState(storedToken);
    }
    if (storedUser) {
      setUserState(JSON.parse(storedUser)); // Parse the stored user
    }
  }, []);

  // Função para atualizar o token no estado e no localStorage
  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('authToken', newToken);
    } else {
      localStorage.removeItem('authToken');
    }
  };

  // Função para atualizar o usuário no estado e no localStorage
  const setUser = (newUser: object | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  };

  // Função para fazer logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
