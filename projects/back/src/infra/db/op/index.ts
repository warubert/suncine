import type { DbModels } from ".."
import { MoviesOp } from "./movies"
import { UserOp } from "./user"

export function DbOp(MODEL: DbModels) {
  return {
    MOVIE: MoviesOp(MODEL),
    USER: UserOp(MODEL)
  }
}
