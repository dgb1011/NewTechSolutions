import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "@/lib/api";
import { useLocation } from "wouter";
import { Project } from "@/types/project";

export function PortfolioSection() {
  const [, navigate] = useLocation();
  const { data, isLoading, isError } = useQuery<Project[]>({
    queryKey: [API_ENDPOINTS.projects.featured],
  });

  // Map _id to id for frontend use
  const projects = data?.map((p) => ({ ...p, id: p._id }));

  const handleViewProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const handleViewAllProjects = () => {
    navigate('/projects');
  };

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-light mb-6">
              <span className="gradient-text">Featured</span> <span className="font-semibold">Projects</span>
            </h2>
          </div>
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-white/10 rounded w-1/4"></div>
                      <div className="h-8 bg-white/10 rounded w-3/4"></div>
                      <div className="h-24 bg-white/10 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-mars/20 to-saturn/20 p-8 flex items-center justify-center">
                    <div className="animate-pulse bg-white/10 rounded-xl w-full max-w-md h-64"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section id="portfolio" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-light mb-6">
              <span className="gradient-text">Featured</span> <span className="font-semibold">Projects</span>
            </h2>
            <p className="text-red-500">Failed to load projects. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="portfolio" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-light mb-6">
              <span className="gradient-text">Featured</span> <span className="font-semibold">Projects</span>
            </h2>
            <p className="text-neutral-400">No featured projects found.</p>
          </div>
        </div>
      </section>
    );
  }

  const getColorClasses = (category: string, index: number) => {
    const colors = ['mars', 'neptune', 'saturn'];
    const color = colors[index % colors.length];
    return {
      badge: `bg-${color}/20 text-${color}`,
      gradient: `from-${color}/20 to-${color === 'mars' ? 'saturn' : color === 'neptune' ? 'jupiter' : 'mars'}/20`,
      button: `text-${color} hover:text-${color}/80`,
    };
  };

  return (
    <section id="portfolio" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-light mb-6">
            <span className="gradient-text">Featured</span> <span className="font-semibold">Projects</span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Discover our latest work and the innovative solutions we've crafted for forward-thinking clients.
          </p>
        </motion.div>
        
        <div className="space-y-12">
          {projects?.map((project, index) => {
            const colors = getColorClasses(project.category, index);
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className={`p-8 lg:p-12 flex flex-col justify-center ${!isEven ? 'order-2 lg:order-1' : ''}`}>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <span className={`${colors.badge} px-3 py-1 rounded-full text-sm font-medium`}>
                          {project.category}
                        </span>
                        {project.technologies.slice(0, 2).map((tech) => (
                          <span key={tech} className="bg-white/10 text-neutral-300 px-3 py-1 rounded-full text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-semibold gradient-text">{project.title}</h3>
                      <p className="text-neutral-300 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-white font-medium">Technologies</div>
                          <div className="text-neutral-400">{project.technologies.join(', ')}</div>
                        </div>
                        <div>
                          <div className="text-white font-medium">Timeline</div>
                          <div className="text-neutral-400">{project.timeline}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleViewProject(project.id)}
                        className={`inline-flex items-center space-x-2 ${colors.button} transition-colors group`}
                      >
                        <span>View Case Study</span>
                        <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                      </button>
                    </div>
                  </div>
                  <div className={`bg-gradient-to-br ${colors.gradient} p-8 flex items-center justify-center ${!isEven ? 'order-1 lg:order-2' : ''}`}>
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="rounded-xl shadow-2xl w-full max-w-md" 
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button 
            onClick={handleViewAllProjects}
            className="bg-gradient-to-r from-mars to-saturn hover:from-mars/80 hover:to-saturn/80 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}
