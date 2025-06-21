import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types/project";
import { API_ENDPOINTS } from "@/lib/api";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FloatingMetrics } from "@/components/FloatingMetrics";
import { InteractiveTimeline } from "@/components/InteractiveTimeline";
import { ResultsComparison } from "@/components/ResultsComparison";
import { TechStackShowcase } from "@/components/TechStackShowcase";

// Project-specific data
const projectData = {
  "nextgen-commerce": {
    title: "NextGen Commerce",
    subtitle: "Redefining Modern E-commerce Experiences",
    category: "E-commerce",
    metrics: [
      { label: "Monthly Active Users", value: "120K+", icon: "👥", color: "mars" },
      { label: "Conversion Rate", value: "4.7%", icon: "📈", color: "saturn" },
      { label: "Avg. Order Value", value: "$89", icon: "💰", color: "neptune" },
      { label: "Uptime", value: "99.99%", icon: "⚡", color: "jupiter" },
    ],
    challenges: [
      "Scaling to handle 100K+ concurrent users",
      "Integrating multiple payment gateways seamlessly",
      "Implementing real-time inventory management",
      "Ensuring PCI DSS compliance for payments"
    ],
    solutions: [
      "Microservices architecture with auto-scaling",
      "Unified payment API with fallback systems",
      "Redis-based caching for real-time updates",
      "End-to-end encryption and security audits"
    ],
    features: [
      "AI-powered product recommendations",
      "Real-time inventory tracking",
      "One-click checkout with multiple payment options",
      "Advanced admin dashboard with analytics",
      "Mobile-first responsive design",
      "Multi-language and currency support"
    ],
    techStack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "Express", "MongoDB", "Redis"],
      infrastructure: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      integrations: ["Stripe", "SendGrid", "Algolia", "Google Analytics"]
    },
    timeline: [
      { phase: "Discovery & Planning", duration: "2 weeks", progress: 100, description: "Requirements gathering and architecture planning" },
      { phase: "MVP Development", duration: "6 weeks", progress: 100, description: "Core features development and testing" },
      { phase: "Beta Testing", duration: "2 weeks", progress: 100, description: "User acceptance testing and feedback" },
      { phase: "Public Launch", duration: "2 weeks", progress: 100, description: "Production deployment and monitoring" }
    ],
    results: {
      performance: [
        { metric: "Page Load Time", before: "3.2s", after: "0.8s", improvement: "75%" },
        { metric: "Mobile Performance", before: "45/100", after: "95/100", improvement: "111%" },
        { metric: "Conversion Rate", before: "2.1%", after: "4.7%", improvement: "124%" }
      ],
      business: [
        { metric: "Revenue Growth", value: "+38% YoY" },
        { metric: "Cart Abandonment", value: "-22%" },
        { metric: "Customer Satisfaction", value: "4.8/5" }
      ]
    }
  },
  "securebank-mobile": {
    title: "SecureBank Mobile",
    subtitle: "Next-Generation Mobile Banking Security",
    category: "FinTech",
    metrics: [
      { label: "Active Users", value: "85K+", icon: "📱", color: "mars" },
      { label: "Transaction Volume", value: "$2.1M", icon: "💳", color: "saturn" },
      { label: "Security Score", value: "99.9%", icon: "🔒", color: "neptune" },
      { label: "App Store Rating", value: "4.9/5", icon: "⭐", color: "jupiter" },
    ],
    challenges: [
      "Implementing biometric authentication across platforms",
      "Ensuring real-time transaction processing",
      "Meeting strict banking security regulations",
      "Creating seamless cross-platform experience"
    ],
    solutions: [
      "Native biometric APIs with fallback authentication",
      "WebSocket-based real-time updates",
      "SOC 2 Type II compliance implementation",
      "React Native with platform-specific optimizations"
    ],
    features: [
      "Face ID and Touch ID authentication",
      "Real-time transaction monitoring",
      "Advanced fraud detection algorithms",
      "Investment portfolio management",
      "Bill payment and money transfers",
      "Financial insights and budgeting tools"
    ],
    techStack: {
      mobile: ["React Native", "TypeScript", "Redux Toolkit"],
      backend: ["Node.js", "PostgreSQL", "Redis"],
      security: ["JWT", "OAuth2", "SSL Pinning", "Certificate Pinning"],
      integrations: ["Plaid", "Stripe", "Twilio", "Firebase"]
    },
    timeline: [
      { phase: "Security Planning", duration: "3 weeks", progress: 100, description: "Security architecture and compliance planning" },
      { phase: "Core Development", duration: "8 weeks", progress: 100, description: "Mobile app development with security features" },
      { phase: "Security Audits", duration: "3 weeks", progress: 100, description: "Penetration testing and security validation" },
      { phase: "App Store Approval", duration: "2 weeks", progress: 100, description: "App store submission and approval process" }
    ],
    results: {
      performance: [
        { metric: "App Launch Time", before: "4.1s", after: "1.2s", improvement: "71%" },
        { metric: "Transaction Speed", before: "8.5s", after: "2.1s", improvement: "75%" },
        { metric: "Security Incidents", before: "12/month", after: "0/month", improvement: "100%" }
      ],
      business: [
        { metric: "User Adoption", value: "+156% in 6 months" },
        { metric: "Transaction Volume", value: "+89% increase" },
        { metric: "Customer Retention", value: "94%" }
      ]
    }
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const { id } = params;
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const { data, isLoading, isError } = useQuery<Project>({
    queryKey: [API_ENDPOINTS.projects.byId(id || '')],
    enabled: !!id,
  });

  // Get project-specific data based on title
  const getProjectData = () => {
    if (!data) return null;
    const projectKey = data.title.toLowerCase().replace(/\s+/g, '-');
    return projectData[projectKey as keyof typeof projectData];
  };

  const projectInfo = getProjectData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-mars mx-auto"></div>
          <p className="text-neutral-400">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (isError || !data || !projectInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-red-500">Case Study Not Found</h2>
          <p className="text-neutral-400">We couldn't find the project you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-mars/30 via-saturn/20 to-neptune/30"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge variant="secondary" className="bg-mars/20 text-mars text-sm px-4 py-2">
              {projectInfo.category}
            </Badge>
            
            <h1 className="text-6xl lg:text-8xl font-bold gradient-text leading-tight">
              {projectInfo.title}
            </h1>
            
            <p className="text-2xl lg:text-3xl text-neutral-200 max-w-4xl mx-auto leading-relaxed">
              {projectInfo.subtitle}
            </p>

            {/* Interactive Metrics */}
            <FloatingMetrics metrics={projectInfo.metrics} />

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-mars to-saturn hover:from-mars/80 hover:to-saturn/80 px-8 py-4 text-lg"
                onClick={() => setActiveTab("demo")}
              >
                🎥 Watch Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                onClick={() => setActiveTab("technical")}
              >
                🔧 Technical Deep Dive
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-mars/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-saturn/20 rounded-full blur-xl"
        />
      </section>

      {/* Main Content */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
            <TabsList className="grid w-full grid-cols-5 mb-12 bg-white/5 backdrop-blur-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-mars/20">Overview</TabsTrigger>
              <TabsTrigger value="technical" className="data-[state=active]:bg-saturn/20">Technical</TabsTrigger>
              <TabsTrigger value="demo" className="data-[state=active]:bg-neptune/20">Demo</TabsTrigger>
              <TabsTrigger value="journey" className="data-[state=active]:bg-jupiter/20">Journey</TabsTrigger>
              <TabsTrigger value="results" className="data-[state=active]:bg-venus/20">Results</TabsTrigger>
            </TabsList>

            {/* Project Overview */}
            <TabsContent value="overview" className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-3xl gradient-text">Project Overview</CardTitle>
                    <CardDescription className="text-lg text-neutral-300">
                      Business challenge, solution approach, and key features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-12">
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-semibold mb-4 text-mars">Business Challenge</h3>
                          <div className="space-y-3">
                            {projectInfo.challenges.map((challenge, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex items-start space-x-3"
                              >
                                <div className="w-2 h-2 bg-mars rounded-full mt-2 flex-shrink-0" />
                                <p className="text-neutral-300">{challenge}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-semibold mb-4 text-saturn">Solution Approach</h3>
                          <div className="space-y-3">
                            {projectInfo.solutions.map((solution, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex items-start space-x-3"
                              >
                                <div className="w-2 h-2 bg-saturn rounded-full mt-2 flex-shrink-0" />
                                <p className="text-neutral-300">{solution}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-semibold mb-6 text-neptune">Core Features</h3>
                        <div className="grid gap-4">
                          {projectInfo.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="glass-card p-4 rounded-xl border-white/5 hover:border-neptune/30 transition-colors"
                            >
                              <p className="text-neutral-200">{feature}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Technical Implementation */}
            <TabsContent value="technical" className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-3xl gradient-text">Technical Implementation</CardTitle>
                    <CardDescription className="text-lg text-neutral-300">
                      Architecture, technology stack, and performance optimizations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-12">
                    <div className="grid lg:grid-cols-2 gap-12">
                      <div>
                        <h3 className="text-2xl font-semibold mb-6 text-mars">Technology Stack</h3>
                        <TechStackShowcase techStack={projectInfo.techStack} />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-semibold mb-6 text-saturn">Architecture Highlights</h3>
                        <div className="space-y-4">
                          <div className="glass-card p-6 rounded-xl">
                            <h4 className="font-semibold text-white mb-2">Scalability</h4>
                            <p className="text-neutral-300">Microservices architecture with auto-scaling capabilities</p>
                          </div>
                          <div className="glass-card p-6 rounded-xl">
                            <h4 className="font-semibold text-white mb-2">Security</h4>
                            <p className="text-neutral-300">End-to-end encryption and comprehensive security audits</p>
                          </div>
                          <div className="glass-card p-6 rounded-xl">
                            <h4 className="font-semibold text-white mb-2">Performance</h4>
                            <p className="text-neutral-300">Optimized for sub-second response times and 99.9% uptime</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Live Demo Section */}
            <TabsContent value="demo" className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-3xl gradient-text">Interactive Demo</CardTitle>
                    <CardDescription className="text-lg text-neutral-300">
                      Experience the product in action
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="aspect-video bg-gradient-to-br from-mars/20 to-saturn/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      {!isVideoPlaying ? (
                        <div className="text-center space-y-4">
                          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                            <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                          </div>
                          <p className="text-white text-lg">Click to play demo</p>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-black/50 flex items-center justify-center">
                          <p className="text-white">Demo video would play here</p>
                        </div>
                      )}
                      <Button
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        className="absolute inset-0 w-full h-full bg-transparent hover:bg-white/5"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-mars">Key Interactions</h3>
                        <ul className="space-y-2 text-neutral-300">
                          <li>• User authentication flow</li>
                          <li>• Core functionality demonstration</li>
                          <li>• Performance metrics</li>
                          <li>• Mobile responsiveness</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-saturn">Technical Highlights</h3>
                        <ul className="space-y-2 text-neutral-300">
                          <li>• Real-time data updates</li>
                          <li>• Smooth animations</li>
                          <li>• Cross-platform compatibility</li>
                          <li>• Security features</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Development Journey */}
            <TabsContent value="journey" className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-3xl gradient-text">Development Journey</CardTitle>
                    <CardDescription className="text-lg text-neutral-300">
                      Timeline, challenges overcome, and team collaboration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-12">
                    <InteractiveTimeline phases={projectInfo.timeline} />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Results & Impact */}
            <TabsContent value="results" className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="glass-card border-white/10">
                  <CardHeader>
                    <CardTitle className="text-3xl gradient-text">Results & Impact</CardTitle>
                    <CardDescription className="text-lg text-neutral-300">
                      Performance improvements, business outcomes, and user feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-12">
                    <ResultsComparison 
                      performance={projectInfo.results.performance}
                      business={projectInfo.results.business}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
} 