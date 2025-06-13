import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useSpotlight } from "@/hooks/useSpotlight";
import { CardSpotlight } from "./Spotlight";

const services = [
  {
    icon: "fas fa-layer-group",
    title: "Full-Stack Development",
    description: "End-to-end web application development using React, Node.js, and modern cloud technologies for scalable solutions.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["React", "Node.js", "TypeScript"],
    color: "mars",
  },
  {
    icon: "fas fa-mobile-alt",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["React Native", "Flutter", "Swift"],
    color: "saturn",
  },
  {
    icon: "fas fa-paint-brush",
    title: "UI/UX Design",
    description: "User-centered design approaches that create intuitive and engaging digital experiences for your audience.",
    image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["Figma", "Adobe XD", "Principle"],
    color: "neptune",
  },
  {
    icon: "fas fa-cloud",
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and DevOps solutions for reliable, high-performance applications.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["AWS", "Docker", "Kubernetes"],
    color: "jupiter",
  },
  {
    icon: "fas fa-brain",
    title: "AI/ML Integration",
    description: "Intelligent features and machine learning capabilities to enhance your applications with cutting-edge AI.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["TensorFlow", "OpenAI", "Python"],
    color: "mars",
  },
  {
    icon: "fas fa-lightbulb",
    title: "Technology Consulting",
    description: "Strategic technology guidance and architecture planning to optimize your digital transformation journey.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["Strategy", "Architecture", "Planning"],
    color: "neptune",
  },
];

function getColorGradient(color: string) {
  switch (color) {
    case "mars":
      return "from-red-500 to-orange-500";
    case "saturn":
      return "from-yellow-500 to-yellow-400";
    case "neptune":
      return "from-blue-500 to-purple-500";
    case "jupiter":
      return "from-green-500 to-teal-500";
    default:
      return "from-gray-500 to-gray-400";
  }
}

// React Bits Interactive Service Card Component
const InteractiveServiceCard = ({ service, index }: { service: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      <Card className="bg-gray-900 border-gray-800 hover:border-red-500 transition-all duration-500 group h-full overflow-hidden relative">
        {/* Animated background gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 59, 48, 0.15), transparent 40%)`,
          }}
        />

        <CardHeader className="relative z-10">
          <div className="flex items-center mb-4">
            <motion.div 
              className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getColorGradient(service.color)} flex items-center justify-center text-white text-xl transition-transform duration-500`}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <i className={service.icon}></i>
            </motion.div>
          </div>
          <CardTitle className="text-white text-xl mb-2 group-hover:text-red-400 transition-colors duration-300">
            {service.title}
          </CardTitle>
          <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {service.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="aspect-video mb-4 rounded-lg overflow-hidden relative">
            <motion.img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech: string, techIndex: number) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge 
                  variant="secondary" 
                  className="bg-gray-800 text-gray-300 hover:bg-red-900 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-red-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ padding: '2px', background: 'linear-gradient(45deg, #ff3b30, #007aff)', borderRadius: '8px' }}
          animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gray-900 rounded-md" />
        </motion.div>
      </Card>
    </motion.div>
  );
};

export function ServicesSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #ff3b30 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #007aff 0%, transparent 50%)`,
          backgroundSize: '100px 100px',
          animation: 'float 20s ease-in-out infinite',
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our <span className="text-red-500 inline-block">
              <motion.span
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Services
              </motion.span>
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Comprehensive solutions tailored to elevate your digital presence and drive business growth.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <InteractiveServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
}