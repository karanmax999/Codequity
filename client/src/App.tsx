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
import Program from "@/pages/program";
import ProgramInitiative from "@/pages/program-initiative";
import Apply from "@/pages/apply";
import Portfolio from "@/pages/portfolio";
import Partners from "@/pages/partners";
import Portal from "@/pages/portal";
import Founder from "@/pages/founder";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import AdminLogs from "@/pages/admin-logs";
import Whitepaper from "@/pages/whitepaper";

import { ThemeProvider } from "next-themes";

function Router() {
  useScrollTop();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/program/initiative" component={ProgramInitiative} />
      <Route path="/program" component={Program} />
      <Route path="/apply" component={Apply} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/partners" component={Partners} />
      <Route path="/community" component={Community} />
      <Route path="/events" component={Events} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/portal" component={Portal} />
      <Route path="/founder" component={Founder} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/admin/logs" component={AdminLogs} />
      <Route path="/whitepaper" component={Whitepaper} />

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
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />


          {!loadingComplete && (
            <VideoPreloader onLoadingComplete={handleLoadingComplete} />
          )}

          {loadingComplete && <Router />}
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
