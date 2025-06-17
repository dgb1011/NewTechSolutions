const API_BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  projects: {
    all: `${API_BASE_URL}/api/projects`,
    featured: `${API_BASE_URL}/api/projects/featured`,
    byId: (id: string) => `${API_BASE_URL}/api/projects/${id}`,
  },
  articles: {
    all: `${API_BASE_URL}/api/articles`,
    featured: `${API_BASE_URL}/api/articles/featured`,
    byId: (id: string) => `${API_BASE_URL}/api/articles/${id}`,
    bySlug: (slug: string) => `${API_BASE_URL}/api/articles/slug/${slug}`,
  },
  testimonials: {
    all: `${API_BASE_URL}/api/testimonials`,
  },
  contact: {
    submit: `${API_BASE_URL}/api/contacts`,
  },
}; 