import { MOVIE_MODEL } from "./models/movie"
import { USER_MODEL } from "./models/user"
import { USER_LIKE_MODEL } from "./models/user-like"
import { DbOp } from "./op"

export type DbContract = ReturnType<typeof DB>

export type DbModels = typeof MODELS

const MODELS = {
  MOVIE: MOVIE_MODEL,
  USER: USER_MODEL,
  USER_LIKE: USER_LIKE_MODEL
}

export function DB() {
  return {
    MODELS,
    OP: DbOp(MODELS)
  }
}
