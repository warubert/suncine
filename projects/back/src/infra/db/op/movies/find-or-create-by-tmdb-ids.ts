import type { DbModels } from "../.."
import type { TmdbMovie } from "../../../tmdb/type"
import type { MovieData } from "../../models/movie"

export async function findOrCreateByTmdbIds(
  MODEL: DbModels,
  tmdb_movies: TmdbMovie[]
): Promise<MovieData[]> {
  const tmdb_ids = tmdb_movies.map((m) => m.id)
  const existing_movies = await MODEL.MOVIE.find({
    tmdb_id: { $in: tmdb_ids }
  })
  const existing_tmdb_ids = existing_movies.map((movie) => movie.tmdb_id)
  const missing_tmdb_ids_promise = tmdb_ids
    .filter((tmdb_id) => !existing_tmdb_ids.includes(tmdb_id))
    .map((tmdb_id) =>
      MODEL.MOVIE.create({
        tmdb_id,
        likes: 0,
        tmdb_obj: tmdb_movies.find((m) => m.id === tmdb_id)
      })
    )
  const new_movies = await Promise.all(missing_tmdb_ids_promise)
  return [...existing_movies, ...new_movies].map((movie_mongo) => ({
    id: movie_mongo.id,
    tmdb_id: movie_mongo.tmdb_id,
    likes: movie_mongo.likes,
    tmdb_obj: Object.fromEntries(movie_mongo.tmdb_obj) as unknown as TmdbMovie
  }))
}
