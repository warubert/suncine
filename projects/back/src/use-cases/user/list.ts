import type { DbContract } from "../../infra/db"
import { likesCountUseCase } from "../movie/likes-count"

export async function listCase(DB: DbContract, id: string) {
  const user = await DB.OP.USER.fetchById(id)
  if (!user) {
    return {
      status: "ERROR",
      payload: undefined
    }
  }
  const likes = await likesCountUseCase(DB, user.id)
  return {
    status: "OK",
    payload: user,
    likes
  }
}
