import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project } from './models/Project.js';
import { Article } from './models/Article.js';
import { Testimonial } from './models/Testimonial.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

const projects = [
  {
    title: "NextGen Commerce",
    description: "A modern e-commerce platform with AI-powered recommendations, real-time inventory management, and a seamless checkout experience. Built with React, Node.js, and integrated with Stripe for payments.",
    category: "E-commerce",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&h=400",
    projectUrl: "https://nextgen-commerce.demo.com",
    timeline: "12 weeks",
    featured: true
  },
  {
    title: "SecureBank Mobile",
    description: "A comprehensive mobile banking application with biometric authentication, real-time transactions, and advanced security features. Developed using React Native for cross-platform compatibility.",
    category: "FinTech",
    technologies: ["React Native", "Node.js", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&h=400",
    timeline: "16 weeks",
    featured: true
  }
];

const articles = [
  {
    title: "The Future of React Development in 2024",
    slug: "future-react-development-2024",
    excerpt: "Explore the latest React features, performance optimizations, and best practices shaping modern web development.",
    content: "React continues to evolve with new features and optimizations. In this article, we cover the most important updates and how to leverage them in your projects.",
    category: "Development",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=400&h=250",
    publishedAt: new Date("2024-06-01T00:00:00Z"),
    featured: true
  },
  {
    title: "Design Systems That Scale",
    slug: "design-systems-that-scale",
    excerpt: "Building comprehensive design systems that grow with your product and maintain consistency across teams.",
    content: "Design systems are essential for maintaining consistency and scalability. Learn how to build and implement one for your organization.",
    category: "Design",
    readTime: 7,
    imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&h=250",
    publishedAt: new Date("2024-05-15T00:00:00Z"),
    featured: true
  }
];

const testimonials = [
  {
    name: "Michael Chen",
    role: "CEO",
    company: "TechStart Inc.",
    content: "NewTech Agency transformed our digital presence. Their technical expertise and attention to detail exceeded our expectations.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100"
  },
  {
    name: "Sarah Johnson",
    role: "Founder",
    company: "RetailHub",
    content: "Working with NewTech was a game-changer for our e-commerce platform. Their innovative approach helped us achieve 300% growth in six months.",
    rating: 5,
    avatarUrl: "/sarah-johnson.jpg"
  },
  {
    name: "Ava Martinez",
    role: "Operations Manager",
    company: "SynergyWorks",
    content: "The NewTech team embodies integrity, collaboration, and a relentless drive for excellence. Their work ethic and commitment to our success made them feel like an extension of our own company.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=100&h=100"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding.');

    await Project.deleteMany({});
    await Article.deleteMany({});
    await Testimonial.deleteMany({});

    await Project.insertMany(projects);
    await Article.insertMany(articles);
    await Testimonial.insertMany(testimonials);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed(); 