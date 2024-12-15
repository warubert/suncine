import type { DbContract } from "../../infra/db"

export async function likesCountUseCase(DB: DbContract, user_id: string): Promise<number> {
  const likes_raw = await DB.OP.MOVIE.findUserLikes(user_id)
  return (likes_raw.length)
}
