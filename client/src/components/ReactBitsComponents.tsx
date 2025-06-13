
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// React Bits Magnetic Component
export const MagneticElement = ({ 
  children, 
  strength = 0.1, 
  className = "",
  ...props 
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  [key: string]: any;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={elementRef}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// React Bits Tilt Component
export const TiltCard = ({ 
  children, 
  tiltStrength = 15,
  className = "",
  ...props 
}: {
  children: React.ReactNode;
  tiltStrength?: number;
  className?: string;
  [key: string]: any;
}) => {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -tiltStrength;
    const rotateY = ((x - centerX) / centerX) * tiltStrength;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

// React Bits Ripple Effect
export const RippleButton = ({ 
  children, 
  onClick,
  className = "",
  rippleColor = "rgba(255, 255, 255, 0.3)",
  ...props 
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  rippleColor?: string;
  [key: string]: any;
}) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <button 
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      {...props}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            backgroundColor: rippleColor,
            left: ripple.x - 50,
            top: ripple.y - 50,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 100, height: 100, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
      {children}
    </button>
  );
};

// React Bits Animated Text
export const AnimatedText = ({ 
  text, 
  animationType = "typewriter",
  className = "",
  speed = 100
}: {
  text: string;
  animationType?: "typewriter" | "fadeIn" | "slideUp";
  className?: string;
  speed?: number;
}) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (animationType === "typewriter") {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      
      return () => clearInterval(timer);
    } else {
      setDisplayText(text);
    }
  }, [text, animationType, speed]);

  if (animationType === "fadeIn") {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {text}
      </motion.span>
    );
  }

  if (animationType === "slideUp") {
    return (
      <motion.span
        className={className}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <span className={className}>
      {displayText}
      {animationType === "typewriter" && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

// React Bits Floating Particles
export const FloatingParticles = ({ 
  count = 20,
  colors = ["#ef4444", "#3b82f6", "#8b5cf6"],
  className = ""
}: {
  count?: number;
  colors?: string[];
  className?: string;
}) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// React Bits Glow Effect
export const GlowElement = ({ 
  children, 
  glowColor = "#ef4444",
  intensity = 0.5,
  className = "",
  ...props 
}: {
  children: React.ReactNode;
  glowColor?: string;
  intensity?: number;
  className?: string;
  [key: string]: any;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        filter: isHovered 
          ? `drop-shadow(0 0 20px ${glowColor}${Math.floor(intensity * 255).toString(16).padStart(2, '0')})` 
          : "drop-shadow(0 0 0px transparent)"
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// React Bits Parallax Element
export const ParallaxElement = ({ 
  children, 
  speed = 0.5,
  className = "",
  ...props 
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  [key: string]: any;
}) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        setOffset(scrolled * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{ transform: `translateY(${offset}px)` }}
      {...props}
    >
      {children}
    </div>
  );
};
