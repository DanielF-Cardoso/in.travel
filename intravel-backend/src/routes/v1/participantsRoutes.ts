import { FastifyInstance } from "fastify";
import { participantsController } from "../../controllers/participantsController";

export async function participantsRoutes(app: FastifyInstance) {
    await participantsController(app);
}
