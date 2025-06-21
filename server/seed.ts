import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project } from './models/Project.js';
import { Article } from './models/Article.js';
import { Testimonial } from './models/Testimonial.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

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
    title: "React 18: Concurrent Rendering in Practice",
    slug: "react-18-concurrent-rendering",
    excerpt: "React 18 introduces concurrent rendering, enabling smoother user experiences. Learn how to leverage it in your projects.",
    content: `React 18 brings concurrent rendering, a major leap for React apps. With features like automatic batching, startTransition, and concurrent features in Suspense, developers can now build more responsive UIs. To get started, upgrade to React 18 and wrap your root with <React.StrictMode> and <ConcurrentMode>. For a deep dive, see the official [React 18 release blog](https://react.dev/blog/2022/03/29/react-v18).`,
    category: "Development",
    readTime: 6,
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=400&h=250",
    sourceUrl: "https://react.dev/blog/2022/03/29/react-v18",
    publishedAt: new Date("2024-06-01T00:00:00Z"),
    featured: true
  },
  {
    title: "Design Systems: The Secret to Scalable UI",
    slug: "design-systems-scalable-ui",
    excerpt: "A beginner-friendly guide to understanding and building design systems, based on atomic design principles and customer-driven methodologies.",
    content: `A comprehensive guide for those new to design systems, explaining the core concepts of atomic design and how to apply data-driven methodologies. It covers understanding products and customers, learning from existing systems, and treating the design system as a product. For more details, read the full article on [UX Planet](https://uxplanet.org/new-to-design-systems-heres-your-start-guide-f116abb4359d).`,
    category: "Design",
    readTime: 7,
    imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&h=250",
    sourceUrl: "https://uxplanet.org/new-to-design-systems-heres-your-start-guide-f116abb4359d",
    publishedAt: new Date("2024-06-19T00:00:00Z"),
    featured: true
  },
  {
    title: "AI in Frontend: How GPT-4 is Changing the Game",
    slug: "ai-frontend-gpt4",
    excerpt: "AI is revolutionizing frontend development. Explore how GPT-4 and similar models are being integrated into modern UIs.",
    content: `AI models like GPT-4 are now powering code completion, content generation, and even UI design. Tools like Copilot and ChatGPT are being integrated into IDEs and design tools, accelerating development and creativity. For more, see [OpenAI Blog](https://openai.com/blog/).`,
    category: "AI/ML",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&h=250",
    sourceUrl: "https://openai.com/blog/",
    publishedAt: new Date("2024-06-10T00:00:00Z"),
    featured: true
  },
  {
    title: "Mobile-First: Why It Still Matters in 2024",
    slug: "mobile-first-2024",
    excerpt: "Mobile-first design is more relevant than ever. Here's how to ensure your apps excel on every device.",
    content: `Mobile-first design ensures your app is accessible and performant on all devices. With mobile usage surpassing desktop, responsive layouts, touch-friendly UI, and performance optimizations are critical. For guidance, see [Google Web Fundamentals](https://web.dev/responsive-web-design-basics/).`,
    category: "Mobile",
    readTime: 4,
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&h=250",
    sourceUrl: "https://web.dev/responsive-web-design-basics/",
    publishedAt: new Date("2024-06-12T00:00:00Z"),
    featured: true
  },
  {
    title: "TypeScript in 2024: New Features and Best Practices",
    slug: "typescript-2024-features-best-practices",
    excerpt: "TypeScript continues to evolve. Discover the latest features and how to use them for safer, scalable code.",
    content: `TypeScript 5.x introduces new utility types, improved inference, and faster builds. Adopting strict mode and leveraging advanced types can help teams catch bugs early and scale large codebases. For details, see the [TypeScript blog](https://devblogs.microsoft.com/typescript/).`,
    category: "Development",
    readTime: 6,
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&h=250",
    sourceUrl: "https://devblogs.microsoft.com/typescript/",
    publishedAt: new Date("2024-06-15T00:00:00Z"),
    featured: false
  },
  {
    title: "The Rise of Serverless Architectures",
    slug: "serverless-architectures-rise",
    excerpt: "Serverless is transforming how we build and scale apps. Learn the pros, cons, and top use cases.",
    content: `Serverless platforms like AWS Lambda and Vercel enable rapid scaling and cost savings. However, cold starts and vendor lock-in are challenges to consider. For a deep dive, see [Serverless Stack](https://serverless-stack.com/).`,
    category: "Development",
    readTime: 5,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&h=250",
    sourceUrl: "https://serverless-stack.com/",
    publishedAt: new Date("2024-06-18T00:00:00Z"),
    featured: false
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
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
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