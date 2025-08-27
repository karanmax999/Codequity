export default function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border" data-testid="footer">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <div className="text-2xl font-orbitron font-bold text-white" data-testid="footer-logo-symbol">
                {"{}"}
              </div>
            </div>
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
