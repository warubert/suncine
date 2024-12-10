import type { FastifyInstance } from "fastify"
import { MOVIE_ROUTERS } from "./movies"
import { AUTH_ROUTERS } from "./auth"
import { USER_ROUTERS } from "./user"

export function addRouters(APP: FastifyInstance) {
  const ROUTERS = [...AUTH_ROUTERS, ...MOVIE_ROUTERS, ...USER_ROUTERS]
  for (const current of ROUTERS) {
    APP.route(current)
  }
}
