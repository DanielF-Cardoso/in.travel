import { FastifyInstance } from "fastify";
import { activitiesController } from "../../controllers/activitiesController";

export async function activitiesRoutes(app: FastifyInstance) {
    app.register(activitiesController);
}

