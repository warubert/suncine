import type { DbContract } from "../../infra/db"

export async function meUseCase(DB: DbContract, id: string) {
  const user = await DB.OP.USER.fetchById(id)
  if (!user) {
    return {
      status: "ERROR",
      payload: undefined
    }
  }
  return {
    status: "OK",
    payload: user
  }
}
