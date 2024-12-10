import type { FastifyReply, FastifyRequest } from "fastify"
import { DB } from "../db"
import { AuthHandler } from "../auth"
import type { User } from "../../domain/user/type"
import { meUseCase } from "../../use-cases/user/me"

const ME = {
  method: "GET",
  url: "/user/me",
  preHandler: AuthHandler,
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    const { user } = req as FastifyRequest & { user: User }
    try {
      const payload = await meUseCase(DB(), user.id)
      return reply.status(200).send(payload)
    } catch (error) {
      console.error(error)
      return reply.status(500).send()
    }
  }
}

export const USER_ROUTERS = [ME]
