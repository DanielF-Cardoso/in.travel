import { z } from "zod";

export const createLinkSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

export const deleteLinkSchema = z.object({
  tripId: z.string(),
  linkId: z.string(),
});

export type CreateLinkSchema = z.infer<typeof createLinkSchema>;
export type DeleteLinkSchema = z.infer<typeof deleteLinkSchema>;
