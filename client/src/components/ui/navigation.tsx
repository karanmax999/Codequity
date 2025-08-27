import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import codeQuityLogo from "@assets/WhatsApp Image 2025-08-09 at 23.54.36_e9b4a964_1756273841031.jpg";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/community", label: "Community" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    ...(isAuthenticated ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <nav className="fixed top-0 w-full z-50 nav-blur border-b border-border" data-testid="main-navigation">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src={codeQuityLogo} 
              alt="CodeQuity Logo" 
              className="w-10 h-10 object-contain"
              data-testid="logo-image"
            />
            <span className="text-xl font-orbitron font-semibold gradient-text" data-testid="logo-text">
              CodeQuity
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-primary transition-colors ${
                  location === link.href ? 'text-primary' : ''
                }`}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-button"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border" data-testid="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 hover:text-primary transition-colors ${
                  location === link.href ? 'text-primary' : ''
                }`}
                onClick={() => setIsOpen(false)}
                data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
