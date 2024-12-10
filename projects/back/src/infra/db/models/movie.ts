import { type Document, Schema, model } from "mongoose"
import type { TmdbMovie } from "../../tmdb/type"

export class MovieData {
  id: string
  tmdb_id: number
  likes: number
  tmdb_obj: TmdbMovie
}

interface MovieRawData extends Document {
  tmdb_id: number
  likes: number
  tmdb_obj: Map<keyof TmdbMovie, unknown>
}

const MOVIE_SCHEMA: Schema = new Schema({
  tmdb_id: { type: Number, required: true },
  likes: { type: Number, required: true },
  tmdb_obj: {
    type: Map,
    of: Schema.Types.Mixed,
    required: true
  }
})

export const MOVIE_MODEL = model<MovieRawData>("Movie", MOVIE_SCHEMA)
