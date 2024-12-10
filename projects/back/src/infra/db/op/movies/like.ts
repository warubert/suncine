import type { DbModels } from "../.."
import type { UserLikeData } from "../../models/user-like"
import { updateLikes } from "./update-likes"

export async function like(
  MODELS: DbModels,
  user_id: string,
  tmdb_id: number
): Promise<UserLikeData> {
  const like = await MODELS.USER_LIKE.create({
    user_id: user_id,
    tmdb_id: tmdb_id
  })
  await updateLikes(MODELS, tmdb_id)
  return {
    id: like.id,
    user_id: like.user_id,
    tmdb_id: like.tmdb_id
  }
}
