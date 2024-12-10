import type { TmdbMovie } from "./type"

export type TmdbApiContract = ReturnType<typeof TmdbApi>

export function TmdbApi(TOKEN: string) {
  const ROOT_URL = "https://api.themoviedb.org/3"
  return {
    info() {
      return {
        name: "TMDB API",
        URL: ROOT_URL
      }
    },
    trendingMovies(time_window: "day" | "week" = "week", language = "pt-BR") {
      return trendingMovies(ROOT_URL, TOKEN, time_window, language)
    }
  }
}

async function trendingMovies(
  ROOT_URL: string,
  TOKEN: string,
  time_window: "day" | "week" = "week",
  language = "pt-BR"
) {
  const PATH = `trending/movie/${time_window}?language=${language}`
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`
    }
  }
  try {
    const response = await fetch(`${ROOT_URL}/${PATH}`, options)
    const { results } = await response.json()
    return results as TmdbMovie[]
  } catch (error) {
    console.error(error)
    throw error
  }
}
