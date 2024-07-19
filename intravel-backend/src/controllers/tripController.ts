import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  createTripSchema,
  getTripSchema,
  updateTripSchema,
} from "../schemas/tripSchemas";
import * as tripService from "../services/tripService";

export async function tripController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/api/v1/trips",
    {
      schema: {
        body: createTripSchema,
      },
    },
    async (request) => {
      const trip = await tripService.createTrip(request.body);
      return { tripId: trip.id };
    }
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/api/v1/trips/:tripId",
    {
      schema: {
        params: getTripSchema,
      },
    },
    async (request) => {
      const trip = await tripService.getTrip(request.params.tripId);
      return { trip };
    }
  ),
    app.withTypeProvider<ZodTypeProvider>().get(
      "/api/v1/trips/:tripId/confirm",
      {
        schema: {
          params: getTripSchema,
        },
      },
      async (request, reply) => {
        await tripService.confirmTrip(request.params.tripId);
        return reply.redirect(
          `${process.env.WEB_BASE_URL}/trips/${request.params.tripId}`
        );
      }
    ),
    app.withTypeProvider<ZodTypeProvider>().put(
      "/api/v1/trips/:tripId",
      {
        schema: {
          params: getTripSchema,
          body: updateTripSchema,
        },
      },
      async (request) => {
        await tripService.updateTrip(request.params.tripId, request.body);
        return { tripId: request.params.tripId };
      }
    );
}
