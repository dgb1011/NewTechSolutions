import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export function DynamicLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.8]);
  const logoRotation = useTransform(scrollY, [0, 500], [0, 360]);
  const logoOpacity = useTransform(scrollY, [0, 200], [1, 0.7]);

  return (
    <motion.div
      className="relative flex items-center space-x-3 cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ scale: logoScale, rotate: logoRotation, opacity: logoOpacity }}
    >
      {/* Animated Logo Icon */}
      <motion.div 
        className="relative w-10 h-10 bg-gradient-to-br from-mars via-jupiter to-neptune rounded-xl flex items-center justify-center overflow-hidden"
        animate={{
          rotate: isHovered ? [0, 360] : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Inner geometric pattern */}
        <motion.div
          className="absolute inset-1 bg-black/20 rounded-lg"
          animate={{
            rotate: isHovered ? [0, -360] : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Code symbol */}
        <motion.i 
          className="fas fa-code text-white text-lg relative z-10"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Particle effects */}
        {isHovered && (
          <>
            <motion.div
              className="absolute w-1 h-1 bg-white rounded-full"
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-1 h-1 bg-mars rounded-full"
              animate={{
                x: [0, -15, 0],
                y: [0, 15, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
            />
          </>
        )}
      </motion.div>

      {/* Text Logo */}
      <motion.div className="flex flex-col">
        <motion.span 
          className="text-xl font-bold bg-gradient-to-r from-white via-mars to-jupiter bg-clip-text text-transparent"
          animate={{
            backgroundPosition: isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        >
          NewTech
        </motion.span>
        <motion.span 
          className="text-xs text-neutral-400 font-light"
          animate={{
            opacity: isHovered ? [0.6, 1, 0.6] : 0.6,
          }}
          transition={{ duration: 1 }}
        >
          Agency
        </motion.span>
      </motion.div>
    </motion.div>
  );
} 