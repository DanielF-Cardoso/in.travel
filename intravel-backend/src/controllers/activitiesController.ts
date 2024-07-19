import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getTripSchema } from "../schemas/tripSchemas";
import * as activitiesService from "../services/activitiesService";
import {
  createActivitySchema,
  deleteActivitySchema,
} from "../schemas/activitiesSchemas";

export async function activitiesController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/api/v1/trips/:tripId/activities",
    {
      schema: {
        params: getTripSchema,
        body: createActivitySchema,
      },
    },
    async (request) => {
      const activity = await activitiesService.createActivity(
        request.params.tripId,
        request.body
      );
      return { activityId: activity.activity.id };
    }
  ),
    app.withTypeProvider<ZodTypeProvider>().get(
      "/api/v1/trips/:tripId/activities",
      {
        schema: {
          params: getTripSchema,
        },
      },
      async (request) => {
        const activities = await activitiesService.getActivities(
          request.params.tripId
        );
        return { activities };
      }
    ),
    app.withTypeProvider<ZodTypeProvider>().delete(
      "/api/v1/trips/:tripId/activities/:activityId",
      {
        schema: {
          params: deleteActivitySchema,
        },
      },
      async (request) => {
        await activitiesService.deleteActivity(
          request.params.tripId,
          request.params.activityId
        );
        return { message: "Atividade deletada" };
      }
    );
}
