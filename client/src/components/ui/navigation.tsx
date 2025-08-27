import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/community", label: "Community" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 nav-blur border-b border-border" data-testid="main-navigation">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-orbitron font-bold gradient-text" data-testid="logo-symbol">
              {"{}"}
            </div>
            <span className="text-xl font-orbitron font-semibold" data-testid="logo-text">
              CodeQuity
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ) : (
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
              )
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
              link.href.startsWith('#') ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-3 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ) : (
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
              )
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
