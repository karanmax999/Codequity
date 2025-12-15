import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import codeQuityLogo from "@assets/codequity-logo.jpg";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [location] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/community", label: "Community" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    ...(isAuthenticated ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 inset-x-0 mx-auto w-[90%] md:w-fit z-50 pointer-events-none"
      >
        <div className="pointer-events-auto relative flex items-center justify-between gap-4 md:gap-1 p-2 bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] rounded-full md:rounded-full md:pl-4 md:pr-2">

          {/* Logo Section */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group px-2">
              <div className="relative w-8 h-8 md:w-9 md:h-9 overflow-hidden rounded-full ring-2 ring-white/10 group-hover:ring-primary/50 transition-all duration-300">
                <img
                  src={codeQuityLogo}
                  alt="CodeQuity"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="hidden md:block font-orbitron font-bold text-base tracking-wide text-white group-hover:text-primary transition-colors">
                CodeQuity
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center mx-2 bg-white/5 rounded-full p-1 border border-white/5">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <div className="relative px-5 py-2 rounded-full cursor-pointer transition-colors hover:text-white group">
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/20 rounded-full border border-primary/20"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 text-sm font-medium transition-colors ${isActive ? "text-primary shadow-[0_0_20px_rgba(var(--primary),0.5)]" : "text-muted-foreground group-hover:text-primary"
                        }`}
                    >
                      {link.label}
                    </span>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-full bg-white/5 scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 -z-0" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Call to Action & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link href="/signin">
              <button
                className="hidden md:flex items-center gap-2 group bg-white text-black hover:bg-primary hover:text-white px-5 py-2.5 rounded-full font-bold text-xs transition-all duration-300 ease-out shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.6)]"
              >
                <span>Join Now</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-white border border-white/10"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -90 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-4 right-4 z-40 md:hidden"
          >
            <div className="bg-black/90 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 shadow-2xl overflow-hidden relative">
              {/* Background Effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 blur-[100px] -z-10" />

              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setIsOpen(false)}
                      className={`
                        p-4 rounded-xl flex items-center justify-between group transition-all duration-300
                        ${location === link.href ? 'bg-white/10 border-white/10' : 'hover:bg-white/5 border-transparent'}
                        border
                      `}
                    >
                      <span className={`text-lg font-orbitron font-medium ${location === link.href ? 'text-primary' : 'text-muted-foreground group-hover:text-white'}`}>
                        {link.label}
                      </span>
                      {location === link.href && (
                        <motion.div layoutId="mobile-dot" className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                      )}
                    </motion.div>
                  </Link>
                ))}

                <div className="h-px bg-white/10 my-2" />

                <Link href="/signin">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 rounded-xl bg-primary text-white font-bold font-orbitron uppercase tracking-widest hover:bg-primary/80 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Join the Revolution</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
