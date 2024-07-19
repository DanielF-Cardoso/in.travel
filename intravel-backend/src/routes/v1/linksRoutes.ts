import { FastifyInstance } from "fastify";
import { linksController } from "../../controllers/linksController";

export async function linksRoutes(app: FastifyInstance) {
    app.register(linksController);
}

