import mongoose from 'mongoose';
import { z } from 'zod';

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  budget: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

export const Contact = mongoose.model('Contact', contactSchema);

export const insertContactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  service: z.string(),
  budget: z.string(),
  message: z.string(),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactDocument = mongoose.Document & {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}; 