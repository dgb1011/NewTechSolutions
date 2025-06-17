import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types/project";
import { API_ENDPOINTS } from "@/lib/api";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Placeholder assets (replace with real assets as needed)
const metrics = [
  { label: "Monthly Active Users", value: "120K+" },
  { label: "Conversion Rate", value: "4.7%" },
  { label: "Avg. Order Value", value: "$89" },
  { label: "Uptime", value: "99.99%" },
];

const screenshots = [
  "/assets/case-study/demo-preview.png",
  "/assets/case-study/architecture-diagram.png",
  "/assets/case-study/team-collaboration.png",
];

const architectureDiagram = "/assets/case-study/architecture-diagram.png";
const adminDashboard = "/assets/case-study/demo-preview.png";

export default function ProjectDetail() {
  const params = useParams();
  const { id } = params;

  const { data, isLoading, isError } = useQuery<Project>({
    queryKey: [API_ENDPOINTS.projects.byId(id)],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/10 rounded w-1/4"></div>
          <div className="h-64 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
          <p>We couldn't find the project you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mars/20 to-saturn/20 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 gradient-text">
              {data.title}
            </h1>
            <p className="text-2xl text-neutral-200 max-w-2xl mx-auto mb-6">
              NextGen Commerce: Redefining Modern E-commerce Experiences
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="secondary" className="bg-mars/20 text-mars">
                {data.category}
              </Badge>
              {data.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-8">
              {metrics.map((m) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/10 rounded-xl py-6 px-4 text-center shadow"
                >
                  <div className="text-3xl font-bold text-white mb-1">{m.value}</div>
                  <div className="text-neutral-300 text-sm">{m.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Interactive Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
            aria-label="Interactive project preview"
          >
            <img
              src={data.imageUrl}
              alt={data.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
              <TabsTrigger value="journey">Journey</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            {/* Project Overview */}
            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                  <CardDescription>Business challenge, solution, and features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Business Challenge</h3>
                      <p className="text-neutral-300">
                        Building a scalable, high-converting e-commerce platform for a new generation of digital shoppers, with seamless UX and robust integrations.
                      </p>
                      <h3 className="text-xl font-semibold mt-8 mb-3">Solution Approach</h3>
                      <p className="text-neutral-300">
                        Leveraged a modern tech stack, microservices, and cloud-native architecture to deliver a performant, secure, and flexible commerce solution.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Core Features</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>Real-time product catalog & search</li>
                        <li>Personalized recommendations</li>
                        <li>One-click checkout & multiple payment options</li>
                        <li>Admin dashboard with analytics</li>
                        <li>Mobile-first responsive design</li>
                        <li>Role-based access & security</li>
                      </ul>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Interactive Screenshots</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {screenshots.map((src, i) => (
                        <motion.img
                          key={src}
                          src={src}
                          alt={`Screenshot ${i + 1}`}
                          className="rounded-xl shadow-lg w-full h-56 object-cover cursor-pointer hover:scale-105 transition-transform"
                          whileHover={{ scale: 1.05 }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Technical Implementation */}
            <TabsContent value="technical" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Implementation</CardTitle>
                  <CardDescription>Architecture, stack, performance, and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Architecture Diagram</h3>
                      <img
                        src={architectureDiagram}
                        alt="Architecture Diagram"
                        className="rounded-xl shadow-lg w-full h-56 object-contain bg-white/5"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Tech Stack Deep-Dive</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        {data.technologies.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                        <li>Microservices, REST APIs, GraphQL</li>
                        <li>CI/CD, Docker, Cloud Hosting</li>
                      </ul>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Performance Optimizations</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>Server-side rendering & code splitting</li>
                        <li>CDN caching & image optimization</li>
                        <li>Database indexing & query tuning</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Security Measures</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>OAuth2, JWT authentication</li>
                        <li>Rate limiting & DDoS protection</li>
                        <li>Data encryption in transit & at rest</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Live Demo Section */}
            <TabsContent value="demo" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Live Demo</CardTitle>
                  <CardDescription>Explore the product in action</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Product Catalog</h3>
                      <div className="aspect-video bg-neutral-900 rounded-lg flex items-center justify-center">
                        <span className="text-neutral-400">[Product catalog demo here]</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Shopping Cart Demo</h3>
                      <div className="aspect-video bg-neutral-900 rounded-lg flex items-center justify-center">
                        <span className="text-neutral-400">[Shopping cart demo here]</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Checkout Process</h3>
                      <div className="aspect-video bg-neutral-900 rounded-lg flex items-center justify-center">
                        <span className="text-neutral-400">[Checkout walkthrough here]</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Admin Dashboard Preview</h3>
                      <img
                        src={adminDashboard}
                        alt="Admin Dashboard Preview"
                        className="rounded-xl shadow-lg w-full h-56 object-cover bg-white/5"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Development Journey */}
            <TabsContent value="journey" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Development Journey</CardTitle>
                  <CardDescription>Timeline, challenges, team, and testing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Project Timeline</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>Q1: Discovery & Planning</li>
                        <li>Q2: MVP Development</li>
                        <li>Q3: Beta Launch & Feedback</li>
                        <li>Q4: Public Release</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Key Challenges Overcome</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>Scaling to 100K+ users</li>
                        <li>Integrating multiple payment gateways</li>
                        <li>Ensuring accessibility & performance</li>
                      </ul>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>Agile sprints & daily standups</li>
                        <li>Cross-functional teams (dev, design, QA)</li>
                        <li>Collaborative tools: Slack, Figma, Jira</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Testing Strategies</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>Unit & integration tests</li>
                        <li>Automated E2E testing</li>
                        <li>Continuous deployment with staging</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Results & Impact */}
            <TabsContent value="results" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Results & Impact</CardTitle>
                  <CardDescription>Performance, feedback, business outcomes, roadmap</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Performance Metrics</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>99.99% uptime</li>
                        <li>4.7% conversion rate</li>
                        <li>120K+ monthly active users</li>
                        <li>Page load &lt; 1s globally</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">User Feedback</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>"Seamless shopping experience!"</li>
                        <li>"Love the fast checkout."</li>
                        <li>"Admin dashboard is super intuitive."</li>
                      </ul>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Business Outcomes</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>Revenue growth +38% YoY</li>
                        <li>Reduced cart abandonment by 22%</li>
                        <li>Expanded to 3 new markets</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Future Roadmap</h3>
                      <ul className="list-disc list-inside text-neutral-300 space-y-2">
                        <li>AI-powered recommendations</li>
                        <li>Internationalization & localization</li>
                        <li>Progressive Web App (PWA) launch</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
} 