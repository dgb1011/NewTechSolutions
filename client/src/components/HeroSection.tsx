import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpotlight } from "@/hooks/useSpotlight";
import { Spotlight } from "./Spotlight";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { position, isVisible, bindSpotlight } = useSpotlight();

  useEffect(() => {
    const cleanup = bindSpotlight(heroRef.current);
    return cleanup;
  }, [bindSpotlight]);

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
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      <Spotlight x={position.x} y={position.y} visible={isVisible} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-light leading-tight">
                <span className="gradient-text">Building Tomorrow's</span><br />
                <span className="font-semibold text-white">Digital Solutions</span>
              </h1>
              <p className="text-xl text-neutral-300 leading-relaxed max-w-lg">
                We craft cutting-edge web applications, mobile solutions, and digital experiences that push the boundaries of technology.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                onClick={() => scrollToSection('#contact')}
                className="bg-mars hover:bg-mars/80 px-8 py-4 rounded-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('#portfolio')}
                className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.button>
            </div>
            
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-semibold gradient-text">50+</div>
                <div className="text-sm text-neutral-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold gradient-text">98%</div>
                <div className="text-sm text-neutral-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold gradient-text">24/7</div>
                <div className="text-sm text-neutral-400">Support</div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="glass-card rounded-2xl p-8 space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern tech office workspace" 
                className="rounded-xl shadow-lg w-full h-64 object-cover" 
              />
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <i className="fas fa-code text-mars text-2xl mb-2"></i>
                  <div className="text-sm text-neutral-300">Full-Stack</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <i className="fas fa-mobile-alt text-saturn text-2xl mb-2"></i>
                  <div className="text-sm text-neutral-300">Mobile</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <i className="fas fa-cloud text-neptune text-2xl mb-2"></i>
                  <div className="text-sm text-neutral-300">Cloud</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-mars to-transparent rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-saturn to-transparent rounded-full opacity-20 animate-float-delayed"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
