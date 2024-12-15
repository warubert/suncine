import React, { useEffect, useState } from 'react';
import './style.css';
import NavBar from '../../components/NavBar';
import FeaturedMovie from '../../components/FeaturedMovie';
import FavMovie from '../../components/FavMovie';
import { useNavigate } from 'react-router-dom';

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
    name:""
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
            const token = localStorage.getItem('authToken');
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
          } finally {
          }

          try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:3000/movie/likes', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
        
            if (response.ok) {
              const data = await response.json();
              setFavFilmes(data); // Atualiza o estado de filmes              
            } else {
              console.error('Resposta inesperada:', response);
            }
          } catch (error) {
            console.error('Erro na requisição:', error);
          } finally {
            setLoading(false); // Atualiza o estado de carregamento para false
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

   const atualizarLikedStatus = (id:any, novoStatus:any) => {
    setFilmes(prevFilmes => 
      prevFilmes.map(filme =>
        filme.tmdb_id === id ? { ...filme, user_liked: novoStatus } : filme
      )
    );
    setFavFilmes(prevFilmes => 
      prevFilmes.map(filme =>
        filme.tmdb_id === id ? { ...filme, user_liked: novoStatus } : filme
      )
    );
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
            <div className='home'>
              {filmes.length > 0 ? (
                <>
                  <FeaturedMovie 
                    movie={filmes[0]} 
                    width={50} 
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
                      width={18} 
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
          <div className='home favorites'>
            <h1>Minhas curtidas</h1>
            {favFilmes.length > 0 ? (
              favFilmes.map((filme, index) => (
                <FavMovie 
                  key={index} 
                  movie={filme} 
                />
              ))
            ) : (
              <p>Não há filmes Curtidos</p>
            )}
          </div>
        )}
        {currentPage === 'perfil' && (
          <div className='home perfil'>
        <div className='userInfo'>
            <div className='avatar'>
              <h1>{user.name[0]}</h1>
            </div>
            <h2>
              {user.name}
            </h2>
            <h3>
              {user.login}
            </h3>
            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
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