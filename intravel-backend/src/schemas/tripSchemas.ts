import { z } from "zod";

const participantSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const createTripSchema = z.object({
  destination: z.string(),
  starts_at: z.string(),
  ends_at: z.string(),
  owner_name: z.string(),
  owner_email: z.string().email(),
  participants: z.array(participantSchema),
});
export const getTripSchema = z.object({
  tripId: z.string().uuid(),
});

export const updateTripSchema = z.object({
  destination: z.string().min(4),
  starts_at: z.coerce.date(),
  ends_at: z.coerce.date(),
});

export const createActivitySchema = z.object({
  title: z.string(),
  occurs_at: z.coerce.date(),
});

export const createInviteSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
});

export type CreateInviteSchema = z.infer<typeof createInviteSchema>;
export type CreateActivitySchema = z.infer<typeof createActivitySchema>;
export type GetTripSchema = z.infer<typeof getTripSchema>;
export type UpdateTripSchema = z.infer<typeof updateTripSchema>;
export type CreateTripSchema = z.infer<typeof createTripSchema>;
