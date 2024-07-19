import { z } from "zod";

export const getParticipantsSchema = z.object({
  participantId: z.string().uuid(),
});

export const deleteParticipantSchema = z.object({
  tripId: z.string(),
  participantId: z.string(),
});

export type GetParticipantsSchema = z.infer<typeof getParticipantsSchema>;
export type DeleteParticipantSchema = z.infer<typeof deleteParticipantSchema>;
