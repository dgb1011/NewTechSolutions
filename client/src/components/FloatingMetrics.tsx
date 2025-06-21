import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Metric {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface FloatingMetricsProps {
  metrics: Metric[];
}

export function FloatingMetrics({ metrics }: FloatingMetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="glass-card rounded-2xl p-6 text-center backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <motion.div 
            className="text-4xl mb-2"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5
            }}
          >
            {metric.icon}
          </motion.div>
          <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
          <div className="text-neutral-300 text-sm">{metric.label}</div>
          <div className={`w-1 h-1 rounded-full mx-auto mt-2 bg-${metric.color}`} />
        </motion.div>
      ))}
    </div>
  );
} 