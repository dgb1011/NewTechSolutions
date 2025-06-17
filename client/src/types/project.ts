export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  timeline: string;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
} 