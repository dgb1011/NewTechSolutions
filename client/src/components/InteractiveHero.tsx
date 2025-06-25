import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springMouseY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -200]);
  const y3 = useTransform(scrollY, [0, 500], [0, -300]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToSection = (elementId: string) => {
    const element = document.querySelector(elementId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Interactive Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(205, 92, 92, 0.1) 0%, transparent 50%)`
        }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Floating 3D Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 border border-mars/30 rounded-full"
        style={{ y: y1 }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute top-1/3 right-20 w-24 h-24 border border-saturn/30 rounded-lg"
        style={{ y: y2 }}
        animate={{
          rotate: [0, -360],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex h-full">
            {/* Left content with interactive elements */}
            <motion.div 
              className="flex-1 p-8 lg:p-12 relative z-10 flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-6">
                {/* Interactive Title */}
                <motion.h1 
                  className="text-4xl lg:text-6xl font-light leading-tight cursor-default"
                  style={{
                    x: useTransform(springMouseX, [0, 800], [-10, 10]),
                    y: useTransform(springMouseY, [0, 600], [-5, 5]),
                  }}
                >
                  <motion.span 
                    className="gradient-text inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Building Tomorrow's
                  </motion.span>
                  <br />
                  <motion.span 
                    className="font-semibold text-white inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Digital Solutions
                  </motion.span>
                </motion.h1>

                <motion.p 
                  className="text-xl text-neutral-300 leading-relaxed max-w-lg"
                  style={{ opacity }}
                >
                  We craft cutting-edge web applications, mobile solutions, and digital experiences that push the boundaries of technology.
                </motion.p>
                
                {/* Interactive CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.button 
                    onClick={() => scrollToSection('#contact')}
                    className="relative bg-mars hover:bg-mars/80 px-8 py-4 rounded-lg font-medium transition-all duration-300 overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-mars to-jupiter opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        x: useTransform(springMouseX, [0, 800], [-20, 20]),
                      }}
                    />
                    <span className="relative z-10">Start Your Project</span>
                  </motion.button>
                  
                  <motion.button 
                    onClick={() => scrollToSection('#portfolio')}
                    className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-white/5 relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        x: useTransform(springMouseX, [0, 800], [-10, 10]),
                      }}
                    />
                    <span className="relative z-10">View Our Work</span>
                  </motion.button>
                </div>
                
                {/* Interactive Stats */}
                <motion.div 
                  className="flex items-center space-x-8 pt-8"
                  style={{ opacity }}
                >
                  {[
                    { value: "50+", label: "Projects Delivered", color: "mars" },
                    { value: "98%", label: "Client Satisfaction", color: "saturn" },
                    { value: "24/7", label: "Support", color: "neptune" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={stat.label}
                      className="text-center group cursor-default"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <motion.div 
                        className={`text-2xl font-semibold gradient-text`}
                        animate={{
                          color: ["hsl(0, 48%, 58%)", "hsl(43, 74%, 49%)", "hsl(207, 44%, 49%)", "hsl(0, 48%, 58%)"]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-neutral-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right content - Enhanced 3D Scene */}
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
              
              {/* Interactive overlay elements */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(205, 92, 92, 0.1) 0%, transparent 50%)`
                }}
              />
            </motion.div>
          </div>
        </Card>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
} 