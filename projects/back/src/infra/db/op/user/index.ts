import type { DbModels } from "../.."
import type { UserData } from "../../models/user"
import { fetchById } from "./fetch-by-id"
import { fetchByLogin } from "./fetch-by-login"
import { findByLoginOrCreate } from "./find-by-login-or-create"

export function UserOp(MODELS: DbModels) {
  return {
    fetchById(id: string) {
      return fetchById(MODELS, id)
    },
    fetchByLogin(login: string) {
      return fetchByLogin(MODELS, login)
    },
    findByLoginOrCreate(user_raw: Omit<UserData, "id">) {
      return findByLoginOrCreate(MODELS, user_raw)
    }
  }
}
