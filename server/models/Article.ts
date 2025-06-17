import mongoose from 'mongoose';
import { z } from 'zod';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export const Article = mongoose.model('Article', articleSchema);

export const insertArticleSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  category: z.string(),
  readTime: z.number(),
  imageUrl: z.string(),
  publishedAt: z.date(),
  featured: z.boolean().optional(),
});

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type ArticleDocument = mongoose.Document & {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  imageUrl: string;
  publishedAt: Date;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}; 