import { motion } from "framer-motion";

interface PerformanceMetric {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

interface BusinessOutcome {
  metric: string;
  value: string;
}

interface ResultsComparisonProps {
  performance: PerformanceMetric[];
  business: BusinessOutcome[];
}

export function ResultsComparison({ performance, business }: ResultsComparisonProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Performance Metrics */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-mars">Performance Metrics</h3>
        <div className="space-y-4">
          {performance.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl border-white/10 hover:border-mars/30 transition-colors"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-white">{metric.metric}</span>
                <span className="text-mars font-bold text-lg">{metric.improvement}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-neutral-400 mb-1">Before</div>
                  <div className="text-red-400 font-semibold">{metric.before}</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-neutral-400 mb-1">After</div>
                  <div className="text-green-400 font-semibold">{metric.after}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Business Outcomes */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-saturn">Business Outcomes</h3>
        <div className="space-y-4">
          {business.map((outcome, index) => (
            <motion.div
              key={outcome.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl border-white/10 hover:border-saturn/30 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">{outcome.metric}</span>
                <span className="text-saturn font-bold text-lg">{outcome.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 