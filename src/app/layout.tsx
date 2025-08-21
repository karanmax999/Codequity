

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
          min-h-screen transition-colors duration-500
        `}
      >
        {/* ThemeProvider (uncomment if using next-themes) */}
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        
        {/* Keyboard navigation helper */}
        <KeyboardNav />

        {/* Dark theme background */}
        <div className="fixed inset-0 -z-10">
          {/* Layered dark backgrounds */}
          <div className="absolute inset-0 bg-[var(--dark-bg-primary)]" />
          <div className="absolute inset-0 bg-[var(--dark-bg-secondary)] opacity-30" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          {/* Subtle accent lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[var(--dark-accent)]/10 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[var(--dark-accent)]/10 to-transparent" />
          
          {/* Minimal animated orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[var(--dark-accent)]/5 rounded-full blur-2xl minimal-motion" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--dark-accent)]/5 rounded-full blur-2xl minimal-motion" style={{ animationDelay: '2s' }} />
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
