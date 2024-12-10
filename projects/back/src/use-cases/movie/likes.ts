import type { DbContract } from "../../infra/db"
import type { MovieInApp } from "../../domain/movie/type"
import { formatToApp } from "../../domain/movie/calcs"

export async function likesUseCase(DB: DbContract, user_id: string): Promise<MovieInApp[]> {
  const likes_raw = await DB.OP.MOVIE.findUserLikes(user_id)
  return likes_raw.map((m) => formatToApp(m, true))
}
