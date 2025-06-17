import { User, insertUserSchema } from './models/User';
import { Project, insertProjectSchema } from './models/Project';
import { Testimonial, insertTestimonialSchema } from './models/Testimonial';
import { Article, insertArticleSchema } from './models/Article';
import { Contact, insertContactSchema } from './models/Contact';

// USER
export async function getUserById(id: string) {
  return User.findById(id);
}

export async function getUserByUsername(username: string) {
  return User.findOne({ username });
}

export async function createUser(data: any) {
  const parsed = insertUserSchema.parse(data);
  return User.create(parsed);
}

// PROJECTS
export async function getProjects() {
  return Project.find();
}

export async function getFeaturedProjects() {
  return Project.find({ featured: true });
}

export async function getProjectById(id: string) {
  return Project.findById(id);
}

export async function createProject(data: any) {
  const parsed = insertProjectSchema.parse(data);
  return Project.create(parsed);
}

// TESTIMONIALS
export async function getTestimonials() {
  return Testimonial.find();
}

export async function createTestimonial(data: any) {
  const parsed = insertTestimonialSchema.parse(data);
  return Testimonial.create(parsed);
}

// ARTICLES
export async function getArticles() {
  return Article.find();
}

export async function getArticlesByCategory(category: string) {
  return Article.find({ category });
}

export async function getFeaturedArticles() {
  return Article.find({ featured: true });
}

export async function getArticleById(id: string) {
  return Article.findById(id);
}

export async function getArticleBySlug(slug: string) {
  return Article.findOne({ slug });
}

export async function createArticle(data: any) {
  const parsed = insertArticleSchema.parse(data);
  return Article.create(parsed);
}

// CONTACTS
export async function createContact(data: any) {
  const parsed = insertContactSchema.parse(data);
  return Contact.create(parsed);
}

export async function getContacts() {
  return Contact.find();
}
