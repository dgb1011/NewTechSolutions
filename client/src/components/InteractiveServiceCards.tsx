import { useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    icon: "fas fa-layer-group",
    title: "Full-Stack Development",
    description: "End-to-end web application development using React, Node.js, and modern cloud technologies for scalable solutions.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["React", "Node.js", "TypeScript"],
    color: "mars",
    gradient: "from-mars to-red-600",
    features: ["Scalable Architecture", "Performance Optimized", "Cloud-Native"]
  },
  {
    icon: "fas fa-mobile-alt",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["React Native", "Flutter", "Swift"],
    color: "saturn",
    gradient: "from-saturn to-yellow-500",
    features: ["Cross-Platform", "Native Performance", "App Store Ready"]
  },
  {
    icon: "fas fa-paint-brush",
    title: "UI/UX Design",
    description: "User-centered design approaches that create intuitive and engaging digital experiences for your audience.",
    image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["Figma", "Adobe XD", "Principle"],
    color: "neptune",
    gradient: "from-neptune to-blue-500",
    features: ["User Research", "Prototyping", "Design Systems"]
  },
  {
    icon: "fas fa-cloud",
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and DevOps solutions for reliable, high-performance applications.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["AWS", "Docker", "Kubernetes"],
    color: "jupiter",
    gradient: "from-jupiter to-orange-500",
    features: ["Auto-Scaling", "High Availability", "Cost Optimized"]
  },
  {
    icon: "fas fa-brain",
    title: "AI/ML Integration",
    description: "Intelligent features and machine learning capabilities to enhance your applications with cutting-edge AI.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["TensorFlow", "OpenAI", "Python"],
    color: "mars",
    gradient: "from-mars to-purple-600",
    features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision"]
  },
  {
    icon: "fas fa-lightbulb",
    title: "Technology Consulting",
    description: "Strategic technology guidance and architecture planning to optimize your digital transformation journey.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    technologies: ["Strategy", "Architecture", "Planning"],
    color: "neptune",
    gradient: "from-neptune to-cyan-500",
    features: ["Technology Audit", "Roadmap Planning", "Team Training"]
  },
];

function InteractiveServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative glass-card rounded-2xl p-8 overflow-hidden h-full"
        whileHover={{ 
          y: -8,
          scale: 1.03,
          boxShadow: `0 25px 50px -12px hsla(var(--${service.color}-hsl), 0.25)`
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative z-10 flex flex-col h-full">
          <motion.div 
            className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6`}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <i className={`${service.icon} text-white text-2xl`} />
          </motion.div>

          <h3 className="text-2xl font-semibold mb-4 gradient-text">
            {service.title}
          </h3>

          <p className="text-neutral-300 mb-6 leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {service.technologies.map((tech) => (
              <motion.span 
                key={tech} 
                className={`bg-${service.color}/10 px-3 py-1 rounded-full text-xs border border-${service.color}/20`}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function InteractiveServiceCards() {
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
            <InteractiveServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 