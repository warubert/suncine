import { formatBackdropImg, formatPosterImg, get10MostPopular } from "../../domain/movie/calcs"
import type { MovieInApp } from "../../domain/movie/type"
import type { TmdbApiContract } from "../../infra/tmdb"

export async function mostTrendedUseCase(MOVIE_API: TmdbApiContract): Promise<MovieInApp> {
  const tmd_br_trend_page_1 = await MOVIE_API.trendingMovies()
  const [most_trended] = get10MostPopular(tmd_br_trend_page_1)
  return {
    user_liked: false,
    backdrop_path: formatBackdropImg(most_trended.backdrop_path),
    poster_path: formatPosterImg(most_trended.poster_path),
    title: most_trended.title,
    original_title: most_trended.original_title,
    tmdb_id: most_trended.id,
    id: "",
    likes: 0,
    release_date: most_trended.release_date,
    overview: most_trended.overview
  }
}
