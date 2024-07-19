import { FastifyInstance } from "fastify";
import { tripController } from "../../controllers/tripController";

export async function tripRoutes(app: FastifyInstance) {
    await tripController(app);
}
