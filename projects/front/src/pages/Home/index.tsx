import React, { useState } from 'react';
import './style.css';
import NavBar from '../../components/NavBar';
import FeaturedMovie from '../../components/FeaturedMovie';
import FavMovie from '../../components/FavMovie';

const Home: React.FC = () => {
   const filmes = [
    {
      "tmdb_id": 558449,
      "id": "6739f578aeafac0e04e2bf68",
      "likes": 1,
      "user_liked": true,
      "backdrop_path": "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      "title": "Gladiador II",
      "original_title": "Gladiator II",
      "poster_path": "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      "release_date": "2024-11-13",
      "overview": "Anos depois de testemunhar a trágica morte do reverenciado herói Maximus nas mãos de seu tio malvado, Lucius se vê forçado a lutar no Coliseu depois que sua terra natal é conquistada por dois imperadores tirânicos, que agora governam Roma. Com o coração ardendo de raiva e o destino do Império pendurado por um fio, Lucius deve enfrentar perigos e inimigos, redescobrindo em seu passado a força e a honra necessárias para trazer a glória de Roma de volta ao seu povo. Prepare-se para uma jornada épica de coragem e vingança na sangrenta arena do Coliseu.\n"
    },
    {
      "tmdb_id": 558449,
      "id": "6739f578aeafac0e04e2bf68",
      "likes": 1,
      "user_liked": false,
      "backdrop_path": "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      "title": "Gladiador II",
      "original_title": "Gladiator II",
      "poster_path": "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      "release_date": "2024-11-13",
      "overview": "Anos depois de testemunhar a trágica morte do reverenciado herói Maximus nas mãos de seu tio malvado, Lucius se vê forçado a lutar no Coliseu depois que sua terra natal é conquistada por dois imperadores tirânicos, que agora governam Roma. Com o coração ardendo de raiva e o destino do Império pendurado por um fio, Lucius deve enfrentar perigos e inimigos, redescobrindo em seu passado a força e a honra necessárias para trazer a glória de Roma de volta ao seu povo. Prepare-se para uma jornada épica de coragem e vingança na sangrenta arena do Coliseu.\n"
    },
    {
      "tmdb_id": 558449,
      "id": "6739f578aeafac0e04e2bf68",
      "likes": 1,
      "user_liked": true,
      "backdrop_path": "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      "title": "Gladiador II",
      "original_title": "Gladiator II",
      "poster_path": "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      "release_date": "2024-11-13",
      "overview": "Anos depois de testemunhar a trágica morte do reverenciado herói Maximus nas mãos de seu tio malvado, Lucius se vê forçado a lutar no Coliseu depois que sua terra natal é conquistada por dois imperadores tirânicos, que agora governam Roma. Com o coração ardendo de raiva e o destino do Império pendurado por um fio, Lucius deve enfrentar perigos e inimigos, redescobrindo em seu passado a força e a honra necessárias para trazer a glória de Roma de volta ao seu povo. Prepare-se para uma jornada épica de coragem e vingança na sangrenta arena do Coliseu.\n"
    },
    {
      "tmdb_id": 558449,
      "id": "6739f578aeafac0e04e2bf68",
      "likes": 1,
      "user_liked": true,
      "backdrop_path": "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      "title": "Gladiador II",
      "original_title": "Gladiator II",
      "poster_path": "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      "release_date": "2024-11-13",
      "overview": "Anos depois de testemunhar a trágica morte do reverenciado herói Maximus nas mãos de seu tio malvado, Lucius se vê forçado a lutar no Coliseu depois que sua terra natal é conquistada por dois imperadores tirânicos, que agora governam Roma. Com o coração ardendo de raiva e o destino do Império pendurado por um fio, Lucius deve enfrentar perigos e inimigos, redescobrindo em seu passado a força e a honra necessárias para trazer a glória de Roma de volta ao seu povo. Prepare-se para uma jornada épica de coragem e vingança na sangrenta arena do Coliseu.\n"
    },
    {
      "tmdb_id": 558449,
      "id": "6739f578aeafac0e04e2bf68",
      "likes": 1,
      "user_liked": true,
      "backdrop_path": "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      "title": "Gladiador II",
      "original_title": "Gladiator II",
      "poster_path": "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      "release_date": "2024-11-13",
      "overview": "Anos depois de testemunhar a trágica morte do reverenciado herói Maximus nas mãos de seu tio malvado, Lucius se vê forçado a lutar no Coliseu depois que sua terra natal é conquistada por dois imperadores tirânicos, que agora governam Roma. Com o coração ardendo de raiva e o destino do Império pendurado por um fio, Lucius deve enfrentar perigos e inimigos, redescobrindo em seu passado a força e a honra necessárias para trazer a glória de Roma de volta ao seu povo. Prepare-se para uma jornada épica de coragem e vingança na sangrenta arena do Coliseu.\n"
    },
    {
      "tmdb_id": 558449,
      "id": "6739f578aeafac0e04e2bf68",
      "likes": 1,
      "user_liked": true,
      "backdrop_path": "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      "title": "Gladiador II",
      "original_title": "Gladiator II",
      "poster_path": "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      "release_date": "2024-11-13",
      "overview": "Anos depois de testemunhar a trágica morte do reverenciado herói Maximus nas mãos de seu tio malvado, Lucius se vê forçado a lutar no Coliseu depois que sua terra natal é conquistada por dois imperadores tirânicos, que agora governam Roma. Com o coração ardendo de raiva e o destino do Império pendurado por um fio, Lucius deve enfrentar perigos e inimigos, redescobrindo em seu passado a força e a honra necessárias para trazer a glória de Roma de volta ao seu povo. Prepare-se para uma jornada épica de coragem e vingança na sangrenta arena do Coliseu.\n"
    },
    {
      "tmdb_id": 558449,
      "id": "6739f578aeafac0e04e2bf68",
      "likes": 1,
      "user_liked": true,
      "backdrop_path": "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      "title": "Gladiador II",
      "original_title": "Gladiator II",
      "poster_path": "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      "release_date": "2024-11-13",
      "overview": "Anos depois de testemunhar a trágica morte do reverenciado herói Maximus nas mãos de seu tio malvado, Lucius se vê forçado a lutar no Coliseu depois que sua terra natal é conquistada por dois imperadores tirânicos, que agora governam Roma. Com o coração ardendo de raiva e o destino do Império pendurado por um fio, Lucius deve enfrentar perigos e inimigos, redescobrindo em seu passado a força e a honra necessárias para trazer a glória de Roma de volta ao seu povo. Prepare-se para uma jornada épica de coragem e vingança na sangrenta arena do Coliseu.\n"
    },
    {
      "tmdb_id": 558449,
      "id": "6739f578aeafac0e04e2bf68",
      "likes": 1,
      "user_liked": true,
      "backdrop_path": "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      "title": "Gladiador II",
      "original_title": "Gladiator II",
      "poster_path": "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      "release_date": "2024-11-13",
      "overview": "Anos depois de testemunhar a trágica morte do reverenciado herói Maximus nas mãos de seu tio malvado, Lucius se vê forçado a lutar no Coliseu depois que sua terra natal é conquistada por dois imperadores tirânicos, que agora governam Roma. Com o coração ardendo de raiva e o destino do Império pendurado por um fio, Lucius deve enfrentar perigos e inimigos, redescobrindo em seu passado a força e a honra necessárias para trazer a glória de Roma de volta ao seu povo. Prepare-se para uma jornada épica de coragem e vingança na sangrenta arena do Coliseu.\n"
    }
   ]

   const favFilmes = [  
    {
      "tmdb_id": 558449,
      "id": "6739f578aeafac0e04e2bf68",
      "likes": 1,
      "user_liked": true,
      "backdrop_path": "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      "title": "Gladiador II",
      "original_title": "Gladiator II",
      "poster_path": "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      "release_date": "2024-11-13",
      "overview": "Anos depois de testemunhar a trágica morte do reverenciado herói Maximus nas mãos de seu tio malvado, Lucius se vê forçado a lutar no Coliseu depois que sua terra natal é conquistada por dois imperadores tirânicos, que agora governam Roma. Com o coração ardendo de raiva e o destino do Império pendurado por um fio, Lucius deve enfrentar perigos e inimigos, redescobrindo em seu passado a força e a honra necessárias para trazer a glória de Roma de volta ao seu povo. Prepare-se para uma jornada épica de coragem e vingança na sangrenta arena do Coliseu.\n"
    },
    {
      "tmdb_id": 558449,
      "id": "6739f578aeafac0e04e2bf68",
      "likes": 1,
      "user_liked": false,
      "backdrop_path": "https://image.tmdb.org/t/p/original/8mjYwWT50GkRrrRdyHzJorfEfcl.jpg",
      "title": "Gladiador II",
      "original_title": "Gladiator II",
      "poster_path": "https://image.tmdb.org/t/p/w500/z1hNoGhH12ISnPzPqMOq1QLVGdu.jpg",
      "release_date": "2024-11-13",
      "overview": "Anos depois de testemunhar a trágica morte do reverenciado herói Maximus nas mãos de seu tio malvado, Lucius se vê forçado a lutar no Coliseu depois que sua terra natal é conquistada por dois imperadores tirânicos, que agora governam Roma. Com o coração ardendo de raiva e o destino do Império pendurado por um fio, Lucius deve enfrentar perigos e inimigos, redescobrindo em seu passado a força e a honra necessárias para trazer a glória de Roma de volta ao seu povo. Prepare-se para uma jornada épica de coragem e vingança na sangrenta arena do Coliseu.\n"
    },
   ]

   const [user] = useState({
    id: "67394d15c7e82dea5228633d",
    login: "admin@email.com",
    name: "Dev"
  });

   const [currentPage, setCurrentPage] = useState<string>('featured');

   const handleSelectedPage = (page: string) => {
     setCurrentPage(page);
   };

  return (
    <div>
        <NavBar selectedPage={handleSelectedPage} />
      <div >
        {currentPage === 'featured' && (
          <div className='home'>
            <FeaturedMovie 
              movie={filmes[0]} 
              width={50} 
              image={filmes[0].backdrop_path}
            />
            <FeaturedMovie 
              movie={filmes[1]} 
              width={23} 
              image={filmes[1].poster_path}
            />
            <FeaturedMovie 
              movie={filmes[2]} 
              width={23} 
              image={filmes[2].poster_path}
            />
            {filmes.slice(3, 10).map((filme, index) => (
              <FeaturedMovie 
                key={index} 
                movie={filme} 
                width={18} 
                image={filme.poster_path} 
              />
            ))}
        </div>
        )}
        {currentPage === 'favorites' && (
          <div className='home favorites '>
            <h1>Minhas curtidas</h1>
            {favFilmes.map((filme, index) => (
              <FavMovie 
                key={index} 
                movie={filme} 
              />
            ))}
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
            <a>
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