import { motion } from "framer-motion";

interface SpotlightProps {
  x: number;
  y: number;
  visible: boolean;
  size?: number;
  color?: string;
  intensity?: number;
  className?: string;
}

export function Spotlight({ 
  x, 
  y, 
  visible, 
  size = 300, 
  color = "rgba(255, 255, 255, 0.1)",
  intensity = 0.05,
  className = "" 
}: SpotlightProps) {
  return (
    <motion.div
      className={`spotlight ${className}`}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, ${color.replace(/[\d.]+\)$/, `${intensity})`)} 40%, transparent 70%)`,
      }}
      animate={{
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.5,
      }}
    />
  );
}

export function CardSpotlight({ 
  x, 
  y, 
  visible, 
  size = 200, 
  color = "rgba(205, 92, 92, 0.15)",
  intensity = 0.05,
  className = "" 
}: SpotlightProps) {
  return (
    <motion.div
      className={`card-spotlight ${className}`}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, ${color.replace(/[\d.]+\)$/, `${intensity})`)} 40%, transparent 70%)`,
      }}
      animate={{
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.5,
      }}
    />
  );
}
