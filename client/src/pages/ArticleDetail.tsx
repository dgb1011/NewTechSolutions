import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Article } from "@/types/article";
import { API_ENDPOINTS } from "@/lib/api";

export default function ArticleDetail() {
  const params = useParams();
  const { id, slug } = params;

  const endpoint = slug
    ? API_ENDPOINTS.articles.bySlug(slug)
    : id
    ? API_ENDPOINTS.articles.byId(id)
    : null;

  const { data, isLoading, isError } = useQuery<Article>({
    queryKey: [endpoint],
    enabled: !!endpoint,
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading article...</div>;
  }

  if (isError || !data) {
    return <div className="text-center py-20 text-red-500">Article not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-4 gradient-text">{data.title}</h1>
      <img src={data.imageUrl} alt={data.title} className="rounded-xl shadow-2xl w-full max-w-lg mb-6" />
      <div className="mb-4">
        <span className="bg-mars/20 text-mars px-3 py-1 rounded-full text-sm font-medium mr-2">{data.category}</span>
        <span className="text-neutral-400 text-xs ml-2">{data.readTime} min read</span>
      </div>
      <div className="mb-2 text-neutral-400 text-sm">{new Date(data.publishedAt).toLocaleDateString()}</div>
      <p className="text-neutral-300 mb-6 leading-relaxed">{data.content}</p>
    </div>
  );
} 