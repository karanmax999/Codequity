

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import KeyboardNav from "@/components/KeyboardNav";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "CodeQuity - India's Largest Tech Community",
  description:
    "Building India's largest tech community through innovation, collaboration, and excellence. Join passionate hackers, developers, designers, and entrepreneurs.",
  keywords: [
    "tech community",
    "developers",
    "hackers",
    "innovation",
    "collaboration",
    "India tech",
  ],
  authors: [{ name: "CodeQuity Team" }],
  openGraph: {
    title: "CodeQuity - India's Largest Tech Community",
    description:
      "Building India's largest tech community through innovation, collaboration, and excellence.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeQuity - India's Largest Tech Community",
    description:
      "Building India's largest tech community through innovation, collaboration, and excellence.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased dark">
      <body
        className={`
          ${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground
          min-h-screen transition-colors duration-500 cosmic-bg-primary
        `}
      >
        {/* ThemeProvider (uncomment if using next-themes) */}
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        
        {/* Keyboard navigation helper */}
        <KeyboardNav />

        {/* Cosmic theme background */}
        <div className="fixed inset-0 -z-10">
          {/* Cosmic gradient background */}
          <div className="absolute inset-0 cosmic-bg-primary" />
          
          {/* Animated cosmic particles */}
          <div className="absolute inset-0">
            {/* Large cosmic orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/10 to-pink-500/10 blur-3xl cosmic-float" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-pink-500/10 to-yellow-500/10 blur-3xl cosmic-float" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-3xl cosmic-float" style={{ animationDelay: '2s' }} />
            
            {/* Smaller floating particles */}
            <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-cyan-400/60 cosmic-pulse" />
            <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-pink-400/60 cosmic-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-yellow-400/60 cosmic-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/2 w-3 h-3 rounded-full bg-purple-400/60 cosmic-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
          
          {/* Cosmic grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          {/* Cosmic accent lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-pink-400/20 to-transparent" />
          
          {/* Cosmic nebula effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/5 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-pink-500/5 to-transparent" />
        </div>

        {/* Main content */}
        <div className="relative min-h-screen flex flex-col">
          {children}
        </div>

        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
