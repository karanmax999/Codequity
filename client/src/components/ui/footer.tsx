import { useState } from "react";
import codeQuityLogo from "@assets/codequity-logo.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { Twitter, Linkedin, Mail, Send, Github, Loader2, CheckCircle } from "lucide-react";
import { useNewsletter } from "@/hooks/use-newsletter";
import { useToast } from "@/hooks/use-toast";

// Lucide doesn't have a Discord icon, so we create a simple one
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0276c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const { subscribe, submitting } = useNewsletter();
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const result = await subscribe(email, 'footer');
    if (result.success) {
      toast({
        title: "Mission Successful",
        description: result.message,
      });
      setEmail("");
    } else {
      toast({
        title: "Transmission Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/CodequityOrg", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/codequity", label: "LinkedIn" },
    { icon: Send, href: "https://t.me/codequiity", label: "Telegram" },
    { icon: DiscordIcon, href: "https://discord.gg/Jt8WTKvV", label: "Discord" },
    { icon: Mail, href: "mailto:codequitycommunity@gmail.com", label: "Email" }
  ];

  const columns = [
    {
      title: "Services",
      links: [
        { label: "Smart Contract Audit", href: "https://discord.gg/Jt8WTKvV" },
        { label: "Blockchain Protocol Audit", href: "https://discord.gg/Jt8WTKvV" },
        { label: "dApp Security", href: "https://discord.gg/Jt8WTKvV" },
        { label: "Penetration Testing", href: "https://discord.gg/Jt8WTKvV" },
        { label: "Tokenomics Advisory", href: "https://discord.gg/Jt8WTKvV" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Case Studies", href: "/portfolio" },
        { label: "Builder Guild", href: "/#guild" },
        { label: "Events", href: "/events" },
        { label: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Whitepaper", href: "/whitepaper" },
        { label: "Bug Bounty", href: "https://discord.gg/Jt8WTKvV" },
        { label: "Documentation", href: "https://discord.gg/Jt8WTKvV" },
        { label: "Media Kit", href: "https://discord.gg/Jt8WTKvV" },
      ]
    }
  ];

  const partners = ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base", "Solana"];

  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden" data-testid="footer">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20">

          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={codeQuityLogo}
                  alt="CodeQuity Logo"
                  className="w-12 h-12 rounded-lg border border-white/10"
                />
                <span className="text-2xl font-orbitron font-bold text-white tracking-wide">
                  CODE<span className="text-primary">QUITY</span>
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                Securing Web3 projects across ecosystems & languages since 2024.
                From hackathon repo to on-chain revenue.
              </p>

              <div className="flex gap-3 mb-8">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white/10 hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Newsletter Form */}
              <div className="max-w-xs">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">join the network</h4>
                <form onSubmit={handleSubscribe} className="relative group">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Transmission Email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="absolute right-2 top-1.5 p-1.5 bg-primary text-black rounded-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </form>
                <p className="text-[9px] text-gray-600 mt-3 font-mono">
                  Secure transmission protocols active. No spam.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Links Columns (Span 8 -> grid-cols-3) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {columns.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
              >
                <h4 className="text-white font-bold font-orbitron mb-6">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-gray-500 text-sm hover:text-primary hover:pl-1 transition-all duration-200 block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Trust & Copy Strip */}
        <motion.div
          className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-xs text-gray-600 font-mono text-center md:text-left">
            © {currentYear} CodeQuity. All rights reserved.
            <span className="block md:inline md:ml-4 mt-2 md:mt-0">Privacy Policy • Terms of Service</span>
          </div>

          {/* Ecosystem / Trust Icons (Abstract Representation) */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using Lucide icons as placeholders for Chain logos for now to maintain pure lucide dependency where possible, 
                 or text labels if icons aren't available. Ideally SVGs would be used here. 
                 For now, text labels in Orbitron font look "techy". */}
            {partners.map((p, i) => (
              <span key={i} className="text-[10px] md:text-xs font-bold font-orbitron text-white/50 hover:text-primary cursor-default whitespace-nowrap">
                {p.toUpperCase()}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
