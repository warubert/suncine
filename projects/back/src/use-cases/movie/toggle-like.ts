import type { DbContract } from "../../infra/db"

export async function toggleLikeUseCase(DB: DbContract, user_id: string, tmdb_id: number) {
  const like = await DB.OP.MOVIE.findLike(user_id, tmdb_id)
  if (!like) {
    await DB.OP.MOVIE.like(user_id, tmdb_id)
    return {
      status: "LIKE"
    }
  }
  await DB.OP.MOVIE.unlike(user_id, tmdb_id)
  return {
    status: "UNLIKE"
  }
}
