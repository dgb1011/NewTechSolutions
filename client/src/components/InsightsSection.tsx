import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Article } from "@/types/article";
import { API_ENDPOINTS } from "@/lib/api";
import { useLocation } from "wouter";

const categories = [
  { id: "all", label: "All" },
  { id: "Development", label: "Development" },
  { id: "Design", label: "Design" },
  { id: "AI/ML", label: "AI/ML" },
  { id: "Mobile", label: "Mobile" },
];

export function InsightsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [, navigate] = useLocation();

  const { data, isLoading, isError } = useQuery<Article[]>({
    queryKey: [API_ENDPOINTS.articles.all, activeCategory === "all" ? undefined : activeCategory].filter(Boolean),
  });

  // Map _id to id for frontend use
  const articles = data?.map((a) => ({ ...a, id: a._id }));

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <section id="insights" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-light mb-6">
              <span className="gradient-text">Latest</span> <span className="font-semibold">Insights</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden">
                <div className="animate-pulse">
                  <div className="w-full h-48 bg-white/10"></div>
                  <div className="p-6 space-y-4">
                    <div className="flex space-x-3">
                      <div className="h-6 bg-white/10 rounded-full w-20"></div>
                      <div className="h-6 bg-white/10 rounded w-16"></div>
                    </div>
                    <div className="h-6 bg-white/10 rounded w-3/4"></div>
                    <div className="h-16 bg-white/10 rounded"></div>
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
      <section id="insights" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-light mb-6">
              <span className="gradient-text">Latest</span> <span className="font-semibold">Insights</span>
            </h2>
            <p className="text-red-500">Failed to load articles. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <section id="insights" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-light mb-6">
              <span className="gradient-text">Latest</span> <span className="font-semibold">Insights</span>
            </h2>
            <p className="text-neutral-400">No articles found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="insights" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-light mb-6">
            <span className="gradient-text">Latest</span> <span className="font-semibold">Insights</span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Stay updated with the latest trends, technologies, and best practices in software development.
          </p>
        </motion.div>
        
        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium border transition-colors ${
                activeCategory === category.id
                  ? 'bg-mars/20 text-mars border-mars/30 hover:bg-mars/30'
                  : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((article, index) => (
            <motion.article
              key={article.id}
              className="glass-card rounded-2xl overflow-hidden hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-mars/20 text-mars px-3 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="text-neutral-400 text-xs">{article.readTime} min read</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 gradient-text">{article.title}</h3>
                <p className="text-neutral-300 text-sm mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-neutral-400">
                    {formatDate(article.publishedAt)}
                  </div>
                  <button 
                    className="text-mars hover:text-mars/80 transition-colors"
                    onClick={() => navigate(`/articles/${article.id}`)}
                  >
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:bg-white/5">
            View All Articles
          </button>
        </motion.div>
      </div>
    </section>
  );
}
