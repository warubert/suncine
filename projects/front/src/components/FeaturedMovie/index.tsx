import React, { useState, useEffect } from 'react';
import './style.css';

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

const FeaturedMovie: React.FC<{ movie: MovieProps, width: number, image: string }> = ({movie, width, image}) => {//     api

  return (
    <div>
      <div className='card' style={{ width: `${width}vw` }}>
        <img src={image || movie.poster_path} alt={movie.title} />
        <div className='desc'>
          <h1>{movie.title}</h1>
          <h2>{movie.overview}</h2>
        </div>
        {movie.user_liked ? (
          <div className='liked'>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.68039 4.26172C4.76439 4.26172 2.40039 6.62572 2.40039 9.54172C2.40039 14.8217 8.64039 19.6217 12.0004 20.7382C15.3604 19.6217 21.6004 14.8217 21.6004 9.54172C21.6004 6.62572 19.2364 4.26172 16.3204 4.26172C14.5348 4.26172 12.9556 5.14828 12.0004 6.50524C11.5134 5.81182 10.8666 5.24592 10.1146 4.8554C9.36268 4.46488 8.52771 4.26124 7.68039 4.26172Z" fill="#F7F7F5"/>
            </svg>
          </div>
        ) : (
          <div className='liked noliked'>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.68039 4.26172C4.76439 4.26172 2.40039 6.62572 2.40039 9.54172C2.40039 14.8217 8.64039 19.6217 12.0004 20.7382C15.3604 19.6217 21.6004 14.8217 21.6004 9.54172C21.6004 6.62572 19.2364 4.26172 16.3204 4.26172C14.5348 4.26172 12.9556 5.14828 12.0004 6.50524C11.5134 5.81182 10.8666 5.24592 10.1146 4.8554C9.36268 4.46488 8.52771 4.26124 7.68039 4.26172Z" fill="#F7F7F5"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedMovie;