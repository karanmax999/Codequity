import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="relative bg-black/30 border-t border-white/10 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white mb-4 hover:text-blue-400 transition-colors duration-300">
              CodeQuity
            </h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Building India's largest tech community through innovation, collaboration, and excellence. 
              Join us in shaping the future of technology.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#partners" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Partners
                </a>
              </li>
              <li>
                <a href="#community" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Community
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-4 text-lg">Programs</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Hackathons
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Workshops
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Bootcamps
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Meetups
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-4 text-lg">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block flex items-center space-x-2">
                  <span>🐦</span>
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block flex items-center space-x-2">
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block flex items-center space-x-2">
                  <span>💼</span>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block flex items-center space-x-2">
                  <span>🐙</span>
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-white/20 mb-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-6 md:mb-0">
            © 2024 CodeQuity Community. All rights reserved.
          </div>
          
          <div className="flex space-x-8">
            <a href="#" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:scale-105">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:scale-105">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-all duration-300 text-sm hover:scale-105">
              Cookie Policy
            </a>
          </div>
        </div>
        
        {/* Bottom accent */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-white/40 text-xs">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Made with ❤️ for the tech community</span>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </footer>
  )
} 