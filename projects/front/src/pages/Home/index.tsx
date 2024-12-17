import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import FeaturedMovie from '../../components/FeaturedMovie';
import FavMovie from '../../components/FavMovie';
import { useNavigate } from 'react-router-dom';
import './style.css'

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [filmes, setFilmes] = useState<any[]>([]);
  const [favFilmes, setFavFilmes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{
    id: string,
    login: string,
    name: string,
  }>({
    id: "",
    login: "",
    name: ""
  });
  
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
    
      if (storedUser) {
        setUser(JSON.parse(storedUser)); 
      } else {
        setUser({ id: '', login: '', name: '' });
      }

      if (!token) {
        navigate('/');
      } else {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/movie/top-10', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
        
            if (response.ok) {
              const data = await response.json();
              setFilmes(data); // Atualiza o estado de filmes
            } else {
              console.error('Resposta inesperada:', response);
            }
          } catch (error) {
            console.error('Erro na requisição:', error);
          }

          try {
            const response = await fetch('http://localhost:3000/movie/likes', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
        
            if (response.ok) {
              const data = await response.json();
              setFavFilmes(data);
            } else {
              console.error('Resposta inesperada:', response);
            }
          } catch (error) {
            console.error('Erro na requisição:', error);
          } finally {
            setLoading(false);
          }
        };
        
        fetchData();
      }
    };
    checkAuth();
  }, [navigate]);

  const [currentPage, setCurrentPage] = useState<string>('featured');

  const handleSelectedPage = (page: string) => {
    setCurrentPage(page);
  };

  const atualizarLikedStatus = (id: any, novoStatus: any) => {    
    setFilmes((prevFilmes) =>      
      prevFilmes.map((filme) =>        
        filme.tmdb_id === id ? { ...filme, user_liked: novoStatus } : filme
        )    
      );      
      setFavFilmes((prevFavFilmes) => {      
        const filmeAtualizado = filmes.find((filme) => filme.tmdb_id === id);
        if (!filmeAtualizado) return prevFavFilmes;
        const novoFilme = { ...filmeAtualizado, user_liked: novoStatus };
        if (novoStatus) {
          return [...prevFavFilmes, novoFilme];
        } else {
          return prevFavFilmes.filter((filme) => filme.tmdb_id !== id);
        }    
      });  
    };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div>
      <NavBar selectedPage={handleSelectedPage} />
      <div>
        {loading ? (
          <p>Carregando filmes...</p>
        ) : (
          currentPage === 'featured' && (
            <div className="absolute top-32 left-0 w-full max-w-full mt-5 flex flex-wrap justify-between">
              {filmes.length > 0 ? (
                <>
                  <FeaturedMovie 
                    movie={filmes[0]} 
                    width={45} 
                    image={filmes[0].backdrop_path}
                    atualizarLikedStatus={atualizarLikedStatus}
                  />
                  <FeaturedMovie 
                    movie={filmes[1]} 
                    width={23} 
                    image={filmes[1].poster_path}
                    atualizarLikedStatus={atualizarLikedStatus}
                  />
                  <FeaturedMovie 
                    movie={filmes[2]} 
                    width={23} 
                    image={filmes[2].poster_path}
                    atualizarLikedStatus={atualizarLikedStatus}
                  />
                  {filmes.slice(3, 10).map((filme, index) => (
                    <FeaturedMovie 
                      key={index} 
                      movie={filme} 
                      width={17} 
                      image={filme.poster_path}
                      atualizarLikedStatus={atualizarLikedStatus} 
                      dark={true}
                    />
                  ))}
                </>
              ) : (
                <p>Não há filmes disponíveis</p>
              )}
            </div>
          )
        )}
        {currentPage === 'favorites' && (
          <div className="absolute top-32 left-0 w-full max-w-full mt-5 flex flex-col">
            <h1 className="text-xl text-left mt-0 mb-2 mx-auto w-3/5">Minhas curtidas</h1>
            {favFilmes.length > 0 ? (
              favFilmes.map((filme, index) => (
                  <FavMovie
                    key={index} 
                    movie={filme}
                    atualizarLikedStatus={atualizarLikedStatus}
                  />
              ))
            ) : (
              <p>Não há filmes Curtidos</p>
            )}            
          </div>
        )}
        {currentPage === 'perfil' && (
          <div className="absolute top-32 left-0 w-full max-w-full mt-5">
            <div className="flex flex-col items-center mt-8">
              <div className="relative bg-gray-600 text-center w-44 h-44 rounded-full mx-2 mb-6">
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-bold">
                  {user.name[0]}
                </h1>
              </div>
              <h2 className="text-2xl">{user.name}</h2>
              <h3 className="text-xl text-gray-400 mt-2 mb-6">{user.login}</h3>
              <a onClick={handleLogout} className="text-sm underline cursor-pointer">
                Sair
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
