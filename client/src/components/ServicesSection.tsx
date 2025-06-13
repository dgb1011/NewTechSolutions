import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpotlight } from "@/hooks/useSpotlight";
import { Spotlight } from "@/components/ui/spotlight";

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

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className="service-card relative glass-card rounded-2xl p-8 hover-lift cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
      }}
    >
      <Spotlight className="absolute inset-0" size={300} />
      
      <div className="relative z-10">
        <div className={`w-16 h-16 bg-gradient-to-br from-${service.color} to-${service.color}/50 rounded-xl flex items-center justify-center mb-6 animate-pulse-glow`}>
          <i className={`${service.icon} text-white text-2xl`}></i>
        </div>
        <h3 className="text-2xl font-semibold mb-4 gradient-text">{service.title}</h3>
        <p className="text-neutral-300 mb-6 leading-relaxed">
          {service.description}
        </p>
        <motion.img 
          src={service.image} 
          alt={service.title} 
          className="rounded-lg w-full h-40 object-cover mb-4 opacity-80 hover:opacity-100 transition-opacity" 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="flex flex-wrap gap-2">
          {service.technologies.map((tech, techIndex) => (
            <motion.span 
              key={tech} 
              className="bg-white/10 px-3 py-1 rounded-full text-xs border border-white/5 hover:bg-white/20 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-light mb-6">
            <span className="gradient-text">Our</span> <span className="font-semibold">Services</span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            From concept to deployment, we deliver comprehensive digital solutions that drive growth and innovation.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
