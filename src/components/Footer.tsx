import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="relative bg-cosmic-card border-t border-cosmic overflow-hidden backdrop-blur-md">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-cosmic-gradient mb-4 hover:text-cosmic-cyan transition-colors duration-300 cosmic-shimmer">
              CodeQuity
            </h3>
            <p className="cosmic-text-secondary text-sm leading-relaxed max-w-xs">
              Building India&apos;s largest tech community through innovation, collaboration, and excellence. 
              Join us in shaping the future of technology.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="cosmic-text-primary font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#partners" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Partners
                </a>
              </li>
              <li>
                <a href="#community" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Community
                </a>
              </li>
              <li>
                <a href="#contact" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="cosmic-text-primary font-semibold mb-4 text-lg">Programs</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Hackathons
                </a>
              </li>
              <li>
                <a href="#" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Workshops
                </a>
              </li>
              <li>
                <a href="#" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Bootcamps
                </a>
              </li>
              <li>
                <a href="#" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Meetups
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="cosmic-text-primary font-semibold mb-4 text-lg">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://x.com/CodeQuity" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:translate-x-1 inline-block flex items-center space-x-2">
                  <span>🐦</span>
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/HgPHH53f1v9HV75YOscich" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:translate-x-1 inline-block flex items-center space-x-2">
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/codequitycommunity/" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:translate-x-1 inline-block flex items-center space-x-2">
                  <span>💼</span>
                  <span>LinkedIn</span>
                </a>
              </li>
              
            </ul>
          </div>
        </div>
        
        <Separator className="bg-cosmic-border mb-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="cosmic-text-muted text-sm mb-6 md:mb-0">
            © 2024 CodeQuity Community. All rights reserved.
          </div>
          
          <div className="flex space-x-8">
            <a href="#" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:scale-105">
              Privacy Policy
            </a>
            <a href="#" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:scale-105">
              Terms of Service
            </a>
            <a href="#" className="cosmic-text-muted hover:text-cosmic-cyan transition-all duration-300 text-sm hover:scale-105">
              Cookie Policy
            </a>
          </div>
        </div>
        
        {/* Bottom accent */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 cosmic-text-muted text-xs">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full cosmic-pulse" />
            <span>Made with ❤️ for the tech community</span>
            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full cosmic-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </footer>
  )
}
