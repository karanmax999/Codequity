import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Build What Deserves To Exist
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              We bring together passionate hackers, innovative developers, creative designers, and visionary entrepreneurs. Our mission is to bridge the gap between academia and industry, fostering an ecosystem where talent meets opportunity and innovation thrives. Join us in shaping the future of technology in India.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white/80">Connect with industry leaders</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white/80">Access cutting-edge resources</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-white/80">Build meaningful projects</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="bg-white/10 border-white/20 p-6">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-white mb-4">Build. Ship. Make Noise.</h3>
                <p className="text-white/80 mb-4">
                  We don't care about fancy pitches or bloated docs. We care about real, functional MVPs — tools, products, platforms — the kind that you'd want to put your name on.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Start Building
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 p-6">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-white mb-4">Partner With Us</h3>
                <p className="text-white/80 mb-4">
                  Join our growing ecosystem of innovators and change-makers
                </p>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Become a Partner
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 