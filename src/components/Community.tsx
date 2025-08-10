import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Community() {
  return (
    <section id="community" className="py-20 px-6 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Connect with fellow developers, stay updated with events, and be part of the conversation that's shaping the future of tech in India.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🐦</div>
                <h3 className="text-2xl font-bold text-white mb-4">Follow Us on X (Twitter)</h3>
                <p className="text-white/80 mb-6">
                  Stay updated with our latest events, tech insights, and community highlights. Join the conversation with fellow developers and innovators.
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 w-full">
                  Follow on X
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-2xl font-bold text-white mb-4">Join Our WhatsApp Community</h3>
                <p className="text-white/80 mb-6">
                  Connect directly with our community members, get instant updates on events, share knowledge, and network with fellow tech enthusiasts.
                </p>
                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 w-full">
                  Join WhatsApp Group
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-8">Ready to Get Started?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
              Join Community
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg">
              Attend Event
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg">
              Become Ambassador
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 