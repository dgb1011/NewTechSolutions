import { z } from "zod";

export const insertContactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  service: z.string(),
  budget: z.string(),
  message: z.string(),
});
export type InsertContact = z.infer<typeof insertContactSchema>; 