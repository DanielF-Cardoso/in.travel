import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import * as participantsService from "../services/participantsService";
import {
  deleteParticipantSchema,
  getParticipantsSchema,
} from "../schemas/participantsSchemas";
import { createInviteSchema, getTripSchema } from "../schemas/tripSchemas";

export async function participantsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/api/v1/participants/:participantId/confirm",
    {
      schema: {
        params: getParticipantsSchema,
      },
    },
    async (request, reply) => {
      const { participantId } = request.params;
      const tripId = await participantsService.confirmParticipant(
        participantId
      );
      return reply.redirect(`${process.env.WEB_BASE_URL}/trips/${tripId}`);
    }
  ),
    app.withTypeProvider<ZodTypeProvider>().get(
      "/api/v1/participants/:participantId",
      {
        schema: {
          params: getParticipantsSchema,
        },
      },
      async (request) => {
        const { participantId } = request.params;
        const participant = await participantsService.getParticipant(
          participantId
        );
        return { participant };
      }
    );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/api/v1/trips/:tripId/participants",
    {
      schema: {
        params: getTripSchema,
      },
    },
    async (request) => {
      await participantsService.getParticipants(request.params.tripId);
      const participants = await participantsService.getParticipants(
        request.params.tripId
      );
      return { participants };
    }
  );

  app.withTypeProvider<ZodTypeProvider>().delete(
    "/api/v1/trips/:tripId/participants/:participantId",
    {
      schema: {
        params: deleteParticipantSchema,
      },
    },
    async (request) => {
      const { tripId, participantId } = request.params;
      const updatedParticipants = await participantsService.deleteParticipant(
        tripId,
        participantId
      );
      return { participants: updatedParticipants };
    }
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/api/v1/trips/:tripId/invite",
    {
      schema: {
        params: getTripSchema,
        body: createInviteSchema,
      },
    },
    async (request) => {
      const invite = await participantsService.createInvite(
        request.params.tripId,
        request.body
      );
      return { invite };
    }
  );
}
