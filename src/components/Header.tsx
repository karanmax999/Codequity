"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navigationLinks = [
  { href: "/about", label: "About" },
  { href: "/mission", label: "Mission" },
  { href: "/partners", label: "Partners" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} aria-current={isActive ? "page" : undefined}>
        <motion.span
          className={`relative inline-block px-2 py-1 cursor-pointer ${
            isActive
              ? "bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent"
              : "text-gray-300 hover:text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {children}
          {isActive && (
            <motion.span
              layoutId="activeNav"
              className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-white to-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.span>
      </Link>
    );
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="CodeQuity Home">
            <motion.span
              className="text-xl sm:text-2xl font-black text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CodeQuity
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
            <a
              href="https://linktr.ee/CodeQuity"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="bg-white text-gray-900 hover:bg-gray-100 border-2 border-white">
                Connect
                <ExternalLink className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden text-white p-2 mobile-touch-target"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navigationLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ x: 10 }}
                className="block"
              >
                <NavLink href={link.href}>{link.label}</NavLink>
              </motion.div>
            ))}
            <a
              href="https://linktr.ee/CodeQuity"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 border-2 border-white mobile-button">
                Connect
                <ExternalLink className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
