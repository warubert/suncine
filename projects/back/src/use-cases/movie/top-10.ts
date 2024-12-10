import type { DbContract } from "../../infra/db"
import type { MovieData } from "../../infra/db/models/movie"
import { formatToApp, formatToResponse, get10MostPopular } from "../../domain/movie/calcs"
import type { MovieInApp } from "../../domain/movie/type"
import type { TmdbApiContract } from "../../infra/tmdb"

export async function fetchTop10UseCase(
  DB: DbContract,
  MOVIE_API: TmdbApiContract,
  user_id: string
): Promise<MovieInApp[]> {
  const tmd_br_trend_page_1 = await MOVIE_API.trendingMovies()
  const top_10 = get10MostPopular(tmd_br_trend_page_1)
  const top_10_fields_formatted = formatToResponse(top_10)
  const ids_to_fetch = top_10_fields_formatted.map((m) => m.id)
  const [movies_like, user_likes] = await Promise.all([
    DB.OP.MOVIE.findOrCreateByTmdbIds(top_10),
    DB.OP.MOVIE.findUserLikesWithMovieId(user_id, ids_to_fetch)
  ])
  const user_likes_ids = user_likes.map((l) => l.tmdb_id)
  return top_10_fields_formatted.map((m) => {
    const movie_in_app = movies_like.find((ml) => ml.tmdb_id === m.id) as MovieData
    return formatToApp(movie_in_app, !!user_likes_ids.includes(movie_in_app.tmdb_id))
  })
}
