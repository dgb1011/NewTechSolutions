import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function HeroSection() {

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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex h-full">
            {/* Left content */}
            <motion.div 
              className="flex-1 p-8 lg:p-12 relative z-10 flex flex-col justify-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
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
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
              </div>
            </motion.div>

            {/* Right content - 3D Scene */}
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
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
}
