import { Card, CardContent } from '@/components/ui/card'

const services = [
  {
    title: 'National Events',
    description: 'Organizing premier tech events across India',
    icon: '🎯'
  },
  {
    title: 'Education Bridge',
    description: 'Connecting academia with industry needs',
    icon: '🌉'
  },
  {
    title: 'Tailored Programs',
    description: 'Custom solutions for skill development',
    icon: '⚡'
  }
]

export default function Mission() {
  return (
    <section className="py-20 px-6 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What We Do?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            The CodeQuity Community is an events driven and community focused organization of tech enthusiasts, developers, innovators, professionals, and students who share a mutual passion for technology and are committed to helping each other become better at whatever their aspirations are.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white/10 border-white/20 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/80">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-white/80 mb-8 max-w-4xl mx-auto">
            We focus on conducting large scale technical events including hackathons, boot camps, workshops, seminars, webinars, meetups, contests, etc., to provide a learning experience to all community members.
          </p>
        </div>
      </div>
    </section>
  )
} 