import mongoose from 'mongoose';
import { z } from 'zod';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UserDocument = mongoose.Document & {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}; 