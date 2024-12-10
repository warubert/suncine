import type { DbModels } from "../.."
import type { TmdbMovie } from "../../../tmdb/type"
import { findLike } from "./find-like"
import { findUserLikes } from "./find-likes"
import { findOrCreateByTmdbIds } from "./find-or-create-by-tmdb-ids"
import { findUserLikesWithMovieId } from "./find-user-likes"
import { like } from "./like"
import { unlike } from "./unlike"

export function MoviesOp(MODELS: DbModels) {
  return {
    findOrCreateByTmdbIds(tmdb_movies: TmdbMovie[]) {
      return findOrCreateByTmdbIds(MODELS, tmdb_movies)
    },
    findUserLikes(user_id: string) {
      return findUserLikes(MODELS, user_id)
    },
    findUserLikesWithMovieId(user_id: string, tmdb_ids: number[]) {
      return findUserLikesWithMovieId(MODELS, user_id, tmdb_ids)
    },
    like(user_id: string, tmdb_id: number) {
      return like(MODELS, user_id, tmdb_id)
    },
    unlike(user_id: string, tmdb_id: number) {
      return unlike(MODELS, user_id, tmdb_id)
    },
    findLike(user_id: string, tmdb_id: number) {
      return findLike(MODELS, user_id, tmdb_id)
    }
  }
}
