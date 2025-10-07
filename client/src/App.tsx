import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import VideoPreloader from "@/components/ui/video-preloader";
import { useScrollTop } from "@/hooks/use-scroll-top";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Events from "@/pages/events";
import Community from "@/pages/community";
import About from "@/pages/about";
import Contact from "@/pages/contact";

function Router() {
  useScrollTop();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/events" component={Events} />
      <Route path="/community" component={Community} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        
        {!loadingComplete && (
          <VideoPreloader onLoadingComplete={handleLoadingComplete} />
        )}
        
        {loadingComplete && <Router />}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
