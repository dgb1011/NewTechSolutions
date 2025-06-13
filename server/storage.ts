import { users, projects, testimonials, articles, contacts, type User, type InsertUser, type Project, type InsertProject, type Testimonial, type InsertTestimonial, type Article, type InsertArticle, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  getArticles(): Promise<Article[]>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  getFeaturedArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private testimonials: Map<number, Testimonial>;
  private articles: Map<number, Article>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentTestimonialId: number;
  private currentArticleId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.testimonials = new Map();
    this.articles = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentTestimonialId = 1;
    this.currentArticleId = 1;
    this.currentContactId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed projects
    const sampleProjects: InsertProject[] = [
      {
        title: "NextGen Commerce",
        description: "A modern e-commerce platform with AI-powered recommendations, real-time inventory management, and seamless checkout experience. Built with React, Node.js, and integrated with Stripe for payments.",
        category: "E-commerce",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        projectUrl: "https://nextgen-commerce.demo.com",
        timeline: "12 weeks",
        featured: true,
      },
      {
        title: "SecureBank Mobile",
        description: "A comprehensive mobile banking application with biometric authentication, real-time transactions, and advanced security features. Developed using React Native for cross-platform compatibility.",
        category: "FinTech",
        technologies: ["React Native", "Node.js", "PostgreSQL"],
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        timeline: "16 weeks",
        featured: true,
      },
      {
        title: "IntelliDash Analytics",
        description: "An intelligent analytics dashboard powered by machine learning algorithms for predictive insights and real-time data visualization. Built with React and Python backend for advanced data processing.",
        category: "AI/ML",
        technologies: ["React", "Python", "TensorFlow"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        timeline: "20 weeks",
        featured: true,
      },
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });

    // Seed testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Michael Chen",
        role: "CEO",
        company: "TechStart Inc.",
        content: "NewTech Agency transformed our digital presence completely. Their technical expertise and attention to detail exceeded our expectations. The project was delivered on time and within budget.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      },
      {
        name: "Sarah Johnson",
        role: "Founder",
        company: "RetailHub",
        content: "Working with NewTech was a game-changer for our e-commerce platform. Their innovative approach and cutting-edge solutions helped us achieve 300% growth in just six months.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      },
      {
        name: "David Rodriguez",
        role: "CTO",
        company: "FinanceFlow",
        content: "The mobile app they developed for us has been a tremendous success. The user experience is seamless, and our customer engagement has increased by 250%.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      },
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });

    // Seed articles
    const sampleArticles: InsertArticle[] = [
      {
        title: "The Future of React Development in 2024",
        slug: "future-react-development-2024",
        excerpt: "Exploring the latest React features, performance optimizations, and best practices that are shaping modern web development.",
        content: "React continues to evolve with new features and optimizations...",
        category: "Development",
        readTime: 5,
        imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        publishedAt: new Date("2023-12-15"),
        featured: true,
      },
      {
        title: "Design Systems That Scale",
        slug: "design-systems-that-scale",
        excerpt: "Building comprehensive design systems that grow with your product and maintain consistency across teams.",
        content: "Design systems are essential for maintaining consistency...",
        category: "Design",
        readTime: 7,
        imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        publishedAt: new Date("2023-12-12"),
        featured: true,
      },
      {
        title: "Integrating AI into Web Applications",
        slug: "integrating-ai-web-applications",
        excerpt: "Practical approaches to incorporating machine learning capabilities into modern web applications.",
        content: "AI integration in web applications opens new possibilities...",
        category: "AI/ML",
        readTime: 10,
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        publishedAt: new Date("2023-12-10"),
        featured: true,
      },
    ];

    sampleArticles.forEach(article => {
      this.createArticle(article);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.featured);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id,
      projectUrl: insertProject.projectUrl ?? null,
      featured: insertProject.featured ?? false
    };
    this.projects.set(id, project);
    return project;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.category === category)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values())
      .filter(article => article.featured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(article => article.slug === slug);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.currentArticleId++;
    const article: Article = { 
      ...insertArticle, 
      id,
      featured: insertArticle.featured ?? false
    };
    this.articles.set(id, article);
    return article;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();
