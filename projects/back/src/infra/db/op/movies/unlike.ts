import type { DbModels } from "../.."
import { updateLikes } from "./update-likes"

export async function unlike(MODELS: DbModels, user_id: string, tmdb_id: number): Promise<void> {
  await MODELS.USER_LIKE.findOneAndDelete({
    user_id: user_id,
    tmdb_id: tmdb_id
  })
  await updateLikes(MODELS, tmdb_id, "SUBTRACT")
}
