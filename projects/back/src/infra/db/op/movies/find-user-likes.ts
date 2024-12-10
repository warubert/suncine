import type { DbModels } from "../.."
import type { UserLikeData } from "../../models/user-like"

export async function findUserLikesWithMovieId(
  MODELS: DbModels,
  user_id: string,
  tmdb_ids: number[]
): Promise<UserLikeData[]> {
  const existing_movies = await MODELS.USER_LIKE.find({
    user_id: user_id,
    tmdb_id: { $in: tmdb_ids }
  })
  return existing_movies.map((like) => ({
    id: like.id,
    user_id: like.user_id,
    tmdb_id: like.tmdb_id
  }))
}
