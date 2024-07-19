import { FastifyInstance } from "fastify";
import { ClientError } from "../errors/client-error";
import { ZodError } from "zod";

type FastifyErrorHandlers = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandlers = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Campos inválidos",
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof ClientError) {
    return reply.status(400).send({
      message: error.message,
    });
  }

  return reply.status(500).send({ message: "Internal server error" });
};
