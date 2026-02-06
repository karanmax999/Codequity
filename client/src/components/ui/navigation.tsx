import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import codeQuityLogo from "@assets/codequity-logo.jpg";
import PopupBanner from "@/components/ui/popup-banner";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast, toast } from "@/hooks/use-toast";

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

const navLinks: NavItem[] = [
  { label: "about", href: "/about" },
  { label: "portfolio", href: "/portfolio" },
  {
    label: "program",
    children: [
      { label: "Program Details", href: "/program" },
      { label: "Initiative", href: "/program/initiative" },
      { label: "Apply for Cohort 3", href: "/apply" },
    ],
  },
  {
    label: "ecosystem",
    children: [
      { label: "Partners", href: "/partners" },
      { label: "Community", href: "/community" },
      { label: "Events", href: "/events" },
    ],
  },
  { label: "blog", href: "/blog" },
  { label: "contact", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTelegramPopup, setShowTelegramPopup] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [location, setLocation] = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useToast();
  const account = useActiveAccount();
  const address = account?.address || "";
  const isAdmin = useQuery(api.auth.checkIsAdmin, { address: address || "" });

  const handlePortalClick = () => {
    if (!address) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to access the portal.",
      });
      return;
    }

    // Always allow navigation to /portal if address exists
    // The Portal page itself handles the isAdmin check
    setLocation("/portal");
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY;
    setLastScrollY(latest);
    setScrolled(latest > 20);

    // Show if scrolling up or at the top
    if (latest < previous || latest < 50) {
      setVisible(true);
    } else if (latest > previous && latest > 50) {
      // Hide if scrolling down and past threshold
      setVisible(false);
    }
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen
          ? ""
          : ""
          }`}
      >
        {/* Background Glass (Full Width) */}
        <div className="absolute inset-0 nav-hyper-bg nav-scanner overflow-hidden">
          <div className="nav-border-glow"></div>
        </div>

        {/* Content Container */}
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between relative z-20">

          {/* Logo Section */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group relative z-50">
              <motion.div
                className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 group-hover:border-primary/50 transition-colors duration-500 bg-black/50 backdrop-blur-sm"
                whileHover={{ scale: 1.5, borderColor: "rgba(0, 212, 255, 0.8)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {/* Lens Flare/Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />

                <motion.img
                  src={codeQuityLogo}
                  alt="CodeQuity Logo"
                  className="w-full h-full object-cover relative z-10"
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />
              </motion.div>
              <span className="font-orbitron font-bold text-lg tracking-wide text-white group-hover:text-primary transition-colors group-hover:ml-3">
                CodeQuity
              </span>
            </div>
          </Link>

          {/* Right Group (Links + Actions) */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="relative h-full flex items-center"
                >
                  {link.children ? (
                    <button className="flex items-center gap-1 text-sm font-medium tracking-wider text-white hover:text-primary transition-colors py-8 drop-shadow-sm">
                      <span className={activeDropdown === link.label ? "text-primary" : ""}>{link.label}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180 text-primary" : ""}`} />
                    </button>
                  ) : (
                    <Link href={link.href!}>
                      <div className={`cursor-pointer text-sm font-medium tracking-wider transition-colors hover:text-primary drop-shadow-sm ${location === link.href ? 'text-primary' : 'text-white'}`}>
                        {link.label}
                      </div>
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[80%] -left-4 w-56 bg-[#0a0a1a] border border-white/10 rounded-sm shadow-xl overflow-hidden py-2"
                      >
                        <div className="flex flex-col">
                          {link.children.map((child) => (
                            <Link key={child.label} href={child.href!}>
                              <div className="px-5 py-3 hover:bg-white/5 transition-colors cursor-pointer group/item flex items-center justify-between border-l-2 border-transparent hover:border-primary">
                                <span className={`text-sm font-medium ${location === child.href ? 'text-primary' : 'text-gray-400 group-hover/item:text-white'}`}>
                                  {child.label}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Portal Text Link */}
              <button
                onClick={handlePortalClick}
                className="hidden lg:block text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-white cursor-pointer transition-colors"
              >
                Portal
              </button>

              {/* Connect Wallet / Dashboard Access */}
              <div className="hidden lg:flex items-center gap-4">
                <ConnectButton
                  client={client}
                  theme="dark"
                  connectButton={{
                    className: "!bg-white/5 !border !border-white/10 !rounded-none !skew-x-[-10deg] !px-4 xl:!px-6 !py-2 !text-[10px] xl:!text-xs !font-orbitron !font-bold !uppercase !tracking-widest !hover:!bg-white/10 !transition-all !duration-300",
                    label: "Connect"
                  }}
                />
              </div>

              {/* Button triggers Popup instead of link */}
              <button
                onClick={() => setShowTelegramPopup(true)}
                className="hidden lg:flex items-center px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold font-orbitron uppercase tracking-wider text-sm skew-x-[-10deg] transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                <div className="skew-x-[10deg]">Join</div>
              </button>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] lg:hidden bg-background text-white flex flex-col"
          >
            {/* Mobile Header with Logo and Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 overflow-hidden rounded-full ring-2 ring-white/20">
                  <img src={codeQuityLogo} alt="CodeQuity" className="w-full h-full object-cover" />
                </div>
                <span className="font-orbitron font-bold text-lg tracking-wide">CodeQuity</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto pt-4 px-6 pb-20">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <div key={link.label} className="border-b border-white/10 last:border-0">
                    {link.children ? (
                      <div className="py-4">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                          className="flex items-center justify-between w-full text-left"
                        >
                          <span className="text-xl font-orbitron font-bold uppercase tracking-wider">{link.label}</span>
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-4 pl-4 pt-4 pb-2">
                                {link.children.map((child) => (
                                  <Link key={child.label} href={child.href!}>
                                    <div onClick={() => setIsOpen(false)} className="text-base font-medium text-white/80 hover:text-white uppercase tracking-wide">
                                      {child.label}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link href={link.href!}>
                        <div onClick={() => setIsOpen(false)} className="py-4 text-xl font-orbitron font-bold uppercase tracking-wider flex justify-between items-center group">
                          {link.label}
                        </div>
                      </Link>
                    )}
                  </div>
                ))}

                <div
                  onClick={() => {
                    setIsOpen(false);
                    handlePortalClick();
                  }}
                  className="py-4 text-xl font-orbitron font-bold uppercase tracking-wider border-b border-white/10 cursor-pointer"
                >
                  PORTAL
                </div>

                <div className="pt-8 space-y-4">
                  <div className="flex justify-center">
                    <ConnectButton client={client} theme="dark" />
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowTelegramPopup(true);
                    }}
                    className="w-full py-4 bg-primary text-black font-black font-orbitron uppercase tracking-widest hover:bg-primary/90 transition-all rounded-sm text-lg"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <PopupBanner isOpen={showTelegramPopup} onClose={() => setShowTelegramPopup(false)} />
    </>
  );
}
