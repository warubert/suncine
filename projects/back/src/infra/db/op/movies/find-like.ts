import type { DbModels } from "../.."
import type { UserLikeData } from "../../models/user-like"

export async function findLike(
  MODELS: DbModels,
  user_id: string,
  tmdb_id: number
): Promise<UserLikeData | undefined> {
  const like = await MODELS.USER_LIKE.findOne({
    user_id,
    tmdb_id
  })
  if (!like) return
  return {
    id: like.id,
    user_id: like.user_id,
    tmdb_id: like.tmdb_id
  }
}
