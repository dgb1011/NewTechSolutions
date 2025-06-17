export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  imageUrl: string;
  publishedAt: string;
  featured: boolean;
} 