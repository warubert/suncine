export interface Movie {
  id: number
  backdrop_path: string
  title: string
  original_title: string
  poster_path: string
}

export interface MovieInApp {
  tmdb_id: number
  id: string
  likes: number
  liked_at: Date
  user_liked: boolean
  backdrop_path: string
  title: string
  original_title: string
  poster_path: string
  release_date: string // YYYY-MM-DD
  overview: string
}
