import mongoose from 'mongoose';
import { z } from 'zod';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  projectUrl: { type: String },
  timeline: { type: String, required: true },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);

export const insertProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  technologies: z.array(z.string()),
  imageUrl: z.string(),
  projectUrl: z.string().optional(),
  timeline: z.string(),
  featured: z.boolean().optional(),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type ProjectDocument = mongoose.Document & {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  timeline: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}; 