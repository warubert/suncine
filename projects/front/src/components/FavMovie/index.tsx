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

const FavMovie: React.FC<{ movie: MovieProps }> = ({ movie }) => {
  return (
    <div className="w-[60vw] h-[20vh] bg-[rgba(10,25,22,0.7)] rounded-md relative overflow-hidden mx-auto my-2 backdrop-blur-[4px]">
      <div className="h-full w-[30%]">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="absolute left-[30%] top-0 h-full w-[70%] bg-[rgba(23,23,23,0.6)]">
        <h1 className="text-lg font-bold text-left mt-3 ml-5">{movie.title}</h1>
        <h2 className="text-sm font-normal text-left ml-5 mt-1 w-[90%] line-clamp-2">
          {movie.overview}
        </h2>
        <p className="text-sm font-normal text-left text-gray-500 ml-5 mt-2">
          Data de lançamento:{' '}
          {movie.release_date.replace(/-/g, '/').split('/').reverse().join('/')}
        </p>
      </div>
      <div className="absolute top-0 left-0 w-9 h-9 rounded-full bg-[#FF5959] flex justify-center items-center mt-5 ml-2">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.68039 4.26172C4.76439 4.26172 2.40039 6.62572 2.40039 9.54172C2.40039 14.8217 8.64039 19.6217 12.0004 20.7382C15.3604 19.6217 21.6004 14.8217 21.6004 9.54172C21.6004 6.62572 19.2364 4.26172 16.3204 4.26172C14.5348 4.26172 12.9556 5.14828 12.0004 6.50524C11.5134 5.81182 10.8666 5.24592 10.1146 4.8554C9.36268 4.46488 8.52771 4.26124 7.68039 4.26172Z"
            fill="#F7F7F5"
          />
        </svg>
      </div>
    </div>
  );
};

export default FavMovie;
