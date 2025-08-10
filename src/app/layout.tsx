

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import KeyboardNav from "@/components/KeyboardNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en" className="antialiased">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} bg-background text-foreground
          min-h-screen transition-colors duration-500
        `}
      >
        {/* ThemeProvider (uncomment if using next-themes) */}
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        
        {/* Keyboard navigation helper */}
        <KeyboardNav />

        {/* Animated Royal Background (matches all main pages) */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900" />
          {/* Animated orbs — no motion here for SSR, but can add if you want */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-amber-400/10 rounded-full blur-3xl animate-royal-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-blue-600/10 rounded-full blur-3xl animate-royal-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-blue-600/10 to-amber-500/10 rounded-full blur-3xl animate-royal-float" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
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
