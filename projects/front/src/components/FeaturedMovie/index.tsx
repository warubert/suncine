import React from 'react';

interface MovieProps {
  tmdb_id: number;
  id: string;
  likes: number;
  user_liked: boolean;
  backdrop_path: string;
  title: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

const FeaturedMovie: React.FC<{ movie: MovieProps, width: number, image: string, atualizarLikedStatus: any, dark?: boolean }> = ({ movie, width, image, atualizarLikedStatus, dark = false }) => {

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3000/movie/like/${movie.tmdb_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({})
      });
      if (response.ok) {
        atualizarLikedStatus(movie.tmdb_id, !movie.user_liked);
      } else {
        console.error('Resposta inesperada:', response);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div>
      <div className="relative overflow-hidden m-2.5 w-full h-[35vh] rounded-md" style={{ width: `${width}vw` }}>
        <img className="w-full h-full object-cover object-top" src={image || movie.poster_path} alt={movie.title} />
        <div className={`absolute left-0 bottom-0 w-full h-2/5 ${dark ? 'bg-gray-900' : 'bg-gray-900 bg-opacity-60'}`}>
          <h1 className="text-xl font-bold text-left m-3 mb-0 truncate">{movie.title}</h1>
          <h2 className="text-sm font-normal text-left m-3 mt-0 h-2/5 overflow-hidden text-ellipsis line-clamp-2">{movie.overview}</h2>
        </div>
        {movie.user_liked ? (
          <div className="absolute bg-red-600 text-center w-9 h-9 rounded-full m-5 z-10 top-0 cursor-pointer" onClick={handleLike}>
            <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.68039 4.26172C4.76439 4.26172 2.40039 6.62572 2.40039 9.54172C2.40039 14.8217 8.64039 19.6217 12.0004 20.7382C15.3604 19.6217 21.6004 14.8217 21.6004 9.54172C21.6004 6.62572 19.2364 4.26172 16.3204 4.26172C14.5348 4.26172 12.9556 5.14828 12.0004 6.50524C11.5134 5.81182 10.8666 5.24592 10.1146 4.8554C9.36268 4.46488 8.52771 4.26124 7.68039 4.26172Z" fill="#F7F7F5"/>
            </svg>
          </div>
        ) : (
          <div className="absolute bg-gray-600 bg-opacity-50 text-center w-9 h-9 rounded-full m-5 z-10 top-0 cursor-pointer" onClick={handleLike}>
            <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.68039 4.26172C4.76439 4.26172 2.40039 6.62572 2.40039 9.54172C2.40039 14.8217 8.64039 19.6217 12.0004 20.7382C15.3604 19.6217 21.6004 14.8217 21.6004 9.54172C21.6004 6.62572 19.2364 4.26172 16.3204 4.26172C14.5348 4.26172 12.9556 5.14828 12.0004 6.50524C11.5134 5.81182 10.8666 5.24592 10.1146 4.8554C9.36268 4.46488 8.52771 4.26124 7.68039 4.26172Z" fill="#F7F7F5"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedMovie;
