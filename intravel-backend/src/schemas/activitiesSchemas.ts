import { z } from "zod";

export const createActivitySchema = z.object({
  title: z.string(),
  occurs_at: z.coerce.date(),
});

export const deleteActivitySchema = z.object({
  tripId: z.string(),
  activityId: z.string(),
});

export type CreateActivitySchema = z.infer<typeof createActivitySchema>;
export type DeleteActivitySchema = z.infer<typeof deleteActivitySchema>;
