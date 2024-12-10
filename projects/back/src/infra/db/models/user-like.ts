import { model, Schema, type Document } from "mongoose"

export interface UserLikeData {
  id: string
  user_id: string
  tmdb_id: number
}

interface UserLikeRawData extends Document {
  user_id: string
  tmdb_id: number
}

const USER_LIKE_SCHEMA: Schema = new Schema({
  user_id: { type: String, required: true },
  tmdb_id: { type: Number, required: true }
})

export const USER_LIKE_MODEL = model<UserLikeRawData>("UserLike", USER_LIKE_SCHEMA)
