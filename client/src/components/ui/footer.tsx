import codeQuityLogo from "@assets/WhatsApp Image 2025-08-09 at 23.54.36_e9b4a964_1756273841031.jpg";

export default function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border" data-testid="footer">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src={codeQuityLogo} 
              alt="CodeQuity Logo" 
              className="w-12 h-12 object-contain"
              data-testid="footer-logo-image"
            />
            <span className="text-2xl font-orbitron font-semibold gradient-text" data-testid="footer-logo-text">
              CodeQuity
            </span>
          </div>
          <p className="text-muted-foreground mb-6" data-testid="footer-tagline">
            Together, we're building the future of Indian tech! 🇮🇳
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <span data-testid="footer-made-with-love">Made with ❤️ for the Indian developer community</span>
            <span>•</span>
            <span data-testid="footer-community-love">Community Love Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
