import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DynamicLogo } from "./DynamicLogo";

export function ImmersiveNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#insights", label: "Insights" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (elementId: string) => {
    const element = document.querySelector(elementId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <DynamicLogo />
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 text-base font-medium transition-colors duration-200
                    ${isActive ? 'text-mars' : 'text-white/80 hover:text-white'}
                  `}
                  style={{ background: 'none', border: 'none' }}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-mars rounded-full" />
                  )}
                </button>
              );
            })}
            <button
              onClick={() => scrollToSection('#contact')}
              className="ml-4 px-4 py-2 rounded bg-mars text-white font-medium transition-colors duration-200 hover:bg-mars/80"
              style={{ background: 'var(--mars)' }}
            >
              Contact
            </button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 transition-colors"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            >
              <span className="block w-6 h-0.5 bg-white rounded mb-1" />
              <span className="block w-6 h-0.5 bg-white rounded mb-1" />
              <span className="block w-6 h-0.5 bg-white rounded" />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-md">
            <div className="py-4 flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-4 py-3 text-base font-medium text-left transition-colors duration-200
                      ${isActive ? 'text-mars' : 'text-white/80 hover:text-white'}
                    `}
                    style={{ background: 'none', border: 'none' }}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => scrollToSection('#contact')}
                className="px-4 py-3 rounded bg-mars text-white font-medium transition-colors duration-200 hover:bg-mars/80 mt-2"
                style={{ background: 'var(--mars)' }}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 