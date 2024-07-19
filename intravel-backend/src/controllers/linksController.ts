import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getTripSchema } from "../schemas/tripSchemas";
import * as linksService from "../services/linksService";
import { createLinkSchema, deleteLinkSchema } from "../schemas/linksSchemas";

export async function linksController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/api/v1/trips/:tripId/links",
    {
      schema: {
        params: getTripSchema,
        body: createLinkSchema,
      },
    },
    async (request) => {
      const link = await linksService.createLink(
        request.params.tripId,
        request.body
      );
      return { linkId: link.link.id };
    }
  ),
    app.withTypeProvider<ZodTypeProvider>().get(
      "/api/v1/trips/:tripId/links",
      {
        schema: {
          params: getTripSchema,
        },
      },
      async (request) => {
        const links = await linksService.getLinks(request.params.tripId);
        return { links };
      }
    ),
    app.withTypeProvider<ZodTypeProvider>().delete(
      "/api/v1/trips/:tripId/links/:linkId",
      {
        schema: {
          params: deleteLinkSchema,
        },
      },
      async (request) => {
        const links = await linksService.deleteLink(
          request.params.tripId,
          request.params.linkId
        );
        return { links };
      }
    );
}
