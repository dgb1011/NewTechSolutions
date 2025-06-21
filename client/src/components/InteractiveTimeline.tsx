import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface TimelinePhase {
  phase: string;
  duration: string;
  progress: number;
  description?: string;
}

interface InteractiveTimelineProps {
  phases: TimelinePhase[];
}

export function InteractiveTimeline({ phases }: InteractiveTimelineProps) {
  return (
    <div className="space-y-8">
      {phases.map((phase, index) => (
        <motion.div
          key={phase.phase}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="relative"
        >
          {/* Connection line */}
          {index < phases.length - 1 && (
            <div className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-mars to-saturn" />
          )}
          
          <div className="flex items-start space-x-6">
            {/* Phase number */}
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-mars to-saturn rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {index + 1}
            </motion.div>
            
            {/* Phase content */}
            <div className="flex-1 space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">{phase.phase}</h4>
                <p className="text-neutral-400 text-sm mb-3">{phase.duration}</p>
                {phase.description && (
                  <p className="text-neutral-300 text-sm">{phase.description}</p>
                )}
              </div>
              
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Progress</span>
                  <span>{phase.progress}%</span>
                </div>
                <div className="relative">
                  <Progress 
                    value={phase.progress} 
                    className="h-2 bg-white/10"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-mars to-saturn rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${phase.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 