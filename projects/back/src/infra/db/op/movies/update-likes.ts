import type { DbModels } from "../.."
import type { TmdbMovie } from "../../../tmdb/type"
import type { MovieData } from "../../models/movie"

export async function updateLikes(
  MODELS: DbModels,
  tmdb_id: number,
  operation: "SUM" | "SUBTRACT" = "SUM"
): Promise<MovieData> {
  const movie_doc = await MODELS.MOVIE.findOne({ tmdb_id: tmdb_id })
  if (!movie_doc) throw new Error("TILT")
  movie_doc.likes = movie_doc.likes + (operation === "SUM" ? 1 : -1)
  const tmdb_obj = movie_doc.tmdb_obj as Map<keyof TmdbMovie, unknown>;
  tmdb_obj.set("liked_at", new Date());

  await movie_doc.save()
  return {
    id: movie_doc.id,
    likes: movie_doc.likes,
    tmdb_id: movie_doc.tmdb_id,
    tmdb_obj: Object.fromEntries(movie_doc.tmdb_obj) as unknown as TmdbMovie
  }
}
