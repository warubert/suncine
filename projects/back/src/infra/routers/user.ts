import type { FastifyReply, FastifyRequest } from "fastify"
import { DB } from "../db"
import { AuthHandler } from "../auth"
import type { User } from "../../domain/user/type"
import { meUseCase } from "../../use-cases/user/me"
import { listCase } from "../../use-cases/user/list"
import { likesUseCase } from "../../use-cases/movie/likes"

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

const FAV = {
  method: "GET",
  url: "/user/list",
  preHandler: AuthHandler,
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    const { user } = req as FastifyRequest & { user: User }
    try {
      const payload = await listCase(DB(), user.id)
      return reply.status(200).send(payload)
    } catch (error) {
      console.error(error)
      return reply.status(500).send()
    }
  }
}

const USER_LIKES = {
  method: "GET",
  url: "/user/:id/:page",
  preHandler: AuthHandler,
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id, page } = req.params as { id: string, page: number };
    const { user } = req as FastifyRequest & { user: User };

    if(id !== user.id) {
      return reply.status(401).send()
    }

    try {
      const payload = await likesUseCase(DB(), user.id)
      const sortedPayload = payload.sort((a, b) => b.liked_at.getTime() - a.liked_at.getTime());
      const payloadPaged = splitArray(sortedPayload, 3);

      return reply.status(200).send(
        {
          status: "OK",
          payload: {
            id: user.id,
            login: user.login,
            name: user.name
          },
          likes: payload.length,
          movies: payloadPaged[page] || []
        })        
    } catch (error) {
      console.error(error)
      return reply.status(500).send()
    }
  }
};

function splitArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  
  return result;
}

export const USER_ROUTERS = [ME, FAV, USER_LIKES]
