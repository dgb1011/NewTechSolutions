import mongoose from 'mongoose';
import { z } from 'zod';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  avatarUrl: { type: String, required: true },
}, { timestamps: true });

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export const insertTestimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  company: z.string(),
  content: z.string(),
  rating: z.number(),
  avatarUrl: z.string(),
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type TestimonialDocument = mongoose.Document & {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}; 