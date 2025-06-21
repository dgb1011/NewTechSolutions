import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface TechStack {
  [category: string]: string[];
}

interface TechStackShowcaseProps {
  techStack: TechStack;
}

export function TechStackShowcase({ techStack }: TechStackShowcaseProps) {
  const categories = Object.keys(techStack);
  
  return (
    <div className="space-y-8">
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          className="space-y-4"
        >
          <h4 className="text-lg font-medium text-neutral-200 capitalize">
            {category}
          </h4>
          <div className="flex flex-wrap gap-3">
            {techStack[category].map((tech, techIndex) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: categoryIndex * 0.1 + techIndex * 0.05 
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, 0]
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  variant="outline" 
                  className="bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-sm px-4 py-2"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
} 