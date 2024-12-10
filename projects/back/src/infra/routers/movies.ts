import type { FastifyReply, FastifyRequest } from "fastify"
import { mostTrendedUseCase } from "../../use-cases/movie/most-trended"
import { TmdbApi } from "../tmdb"
import { ENV_VAR } from "../../../env"
import { fetchTop10UseCase } from "../../use-cases/movie/top-10"
import type { User } from "../../domain/user/type"
import { DB } from "../db"
import { AuthHandler } from "../auth"
import { toggleLikeUseCase } from "../../use-cases/movie/toggle-like"
import { likesUseCase } from "../../use-cases/movie/likes"

const MOVIE_PATH = "/movie"

const MOST_TRENDED = {
  method: "GET",
  url: `${MOVIE_PATH}/most-trended`,
  handler: async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const payload = await mostTrendedUseCase(TmdbApi(ENV_VAR.TMDB_TOKEN))
      return reply.status(200).send(payload)
    } catch (error) {
      console.error(error)
      return reply.status(500).send()
    }
  }
}

const TOP_10 = {
  method: "GET",
  url: `${MOVIE_PATH}/top-10`,
  preHandler: AuthHandler,
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    const { user } = req as FastifyRequest & { user: User }
    try {
      const payload = await fetchTop10UseCase(DB(), TmdbApi(ENV_VAR.TMDB_TOKEN), user.id)
      return reply.status(200).send(payload)
    } catch (error) {
      console.error(error)
      return reply.status(500).send()
    }
  }
}

const TOGGLE_LIKE = {
  method: "PUT",
  url: `${MOVIE_PATH}/like/:tmdb_id`,
  preHandler: AuthHandler,
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    const { user } = req as FastifyRequest & { user: User }
    const { tmdb_id } = req.params as { tmdb_id: number }
    try {
      const payload = await toggleLikeUseCase(DB(), user.id, tmdb_id)
      return reply.status(200).send(payload)
    } catch (error) {
      console.error(error)
      return reply.status(500).send()
    }
  }
}

const LIKES = {
  method: "GET",
  url: `${MOVIE_PATH}/likes`,
  preHandler: AuthHandler,
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    const { user } = req as FastifyRequest & { user: User }
    try {
      const payload = await likesUseCase(DB(), user.id)
      return reply.status(200).send(payload)
    } catch (error) {
      console.error(error)
      return reply.status(500).send()
    }
  }
}

export const MOVIE_ROUTERS = [MOST_TRENDED, TOP_10, LIKES, TOGGLE_LIKE]
