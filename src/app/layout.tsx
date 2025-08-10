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
  description: "Building India's largest tech community through innovation, collaboration, and excellence. Join passionate hackers, developers, designers, and entrepreneurs.",
  keywords: ["tech community", "developers", "hackers", "innovation", "collaboration", "India tech"],
  authors: [{ name: "CodeQuity Team" }],
  openGraph: {
    title: "CodeQuity - India's Largest Tech Community",
    description: "Building India's largest tech community through innovation, collaboration, and excellence.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeQuity - India's Largest Tech Community",
    description: "Building India's largest tech community through innovation, collaboration, and excellence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <KeyboardNav />
        {children}
      </body>
    </html>
  );
}
