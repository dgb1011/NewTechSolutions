'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

// 3D CSS Animation fallback component
function Interactive3DFallback({ className }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center relative overflow-hidden`}>
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-32 h-32 border-2 border-mars/30 rounded-xl"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-24 h-24 border-2 border-saturn/40 rounded-full"
          animate={{
            rotateZ: [0, -360],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-16 h-16 bg-gradient-to-br from-neptune/20 to-jupiter/20 rounded-lg"
          animate={{
            rotateY: [0, 360],
            x: [-20, 20, -20],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Tech stack visualization */}
      <div className="relative z-10 grid grid-cols-2 gap-4 p-8">
        {[
          { icon: "fab fa-react", label: "React", color: "text-cyan-400" },
          { icon: "fab fa-node-js", label: "Node.js", color: "text-green-400" },
          { icon: "fas fa-database", label: "Database", color: "text-blue-400" },
          { icon: "fas fa-cloud", label: "Cloud", color: "text-purple-400" },
        ].map((tech, index) => (
          <motion.div
            key={tech.label}
            className="bg-white/5 rounded-lg p-4 text-center backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <i className={`${tech.icon} ${tech.color} text-2xl mb-2`}></i>
            <div className="text-xs text-neutral-300">{tech.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
          </div>
        </div>
      }
    >
      {hasError ? (
        <Interactive3DFallback className={className} />
      ) : (
        <div className={className}>
          <Spline
            scene={scene}
            className="w-full h-full"
            onError={() => setHasError(true)}
          />
        </div>
      )}
    </Suspense>
  )
}