import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BackgroundElements } from "@/components/BackgroundElements";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useState, useEffect } from "react";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import ProjectDetail from "@/pages/ProjectDetail";
import ArticleDetail from "@/pages/ArticleDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/articles/:id" component={ArticleDetail} />
      <Route path="/articles/slug/:slug" component={ArticleDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources
    const preloadPromises = [
      new Promise(resolve => setTimeout(resolve, 2000)), // Minimum loading time
    ];

    Promise.all(preloadPromises).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BackgroundElements />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
