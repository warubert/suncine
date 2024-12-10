import type { DbModels } from "../.."
import type { TmdbMovie } from "../../../tmdb/type"
import type { MovieData } from "../../models/movie"

export async function findUserLikes(MODELS: DbModels, user_id: string): Promise<MovieData[]> {
  const existing_likes = await MODELS.USER_LIKE.find({
    user_id: user_id
  })
  const tmdb_ids = existing_likes.map((like) => like.tmdb_id)
  const existing_movies = await MODELS.MOVIE.find({
    tmdb_id: { $in: tmdb_ids }
  })
  return existing_movies.map((movie_mongo) => ({
    id: movie_mongo.id as string,
    tmdb_id: movie_mongo.tmdb_id,
    likes: movie_mongo.likes,
    tmdb_obj: Object.fromEntries(movie_mongo.tmdb_obj) as unknown as TmdbMovie
  }))
}
