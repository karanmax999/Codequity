import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const partnerCategories = [
  {
    title: 'Sponsors',
    description: 'Supporting innovation and growth',
    partners: ['TechCorp', 'InnovateLab', 'FutureTech', 'CodeHub', 'DevStudio']
  },
  {
    title: 'Community Partners',
    description: 'Building together, growing together',
    partners: ['TechMeet', 'HackSpace', 'CodeCraft', 'InnovateHub', 'DevConnect']
  },
  {
    title: 'Campus Evangelists',
    description: 'Spreading the word across campuses',
    partners: ['Campus Lead 1', 'Campus Lead 2', 'Campus Lead 3', 'Campus Lead 4', 'Campus Lead 5']
  }
]

export default function Partners() {
  return (
    <section id="partners" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 section-roomy">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 heading-bold">
            Our Ecosystem
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-compact">
            We're proud to work with amazing organizations and individuals who share our vision of building India's largest tech community.
          </p>
        </div>
        
        <div className="partner-logos">
          {partnerCategories.map((category, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-bold text-white mb-4 text-teal">{category.title}</h3>
              <p className="text-white/60 text-sm mb-6">{category.description}</p>
              <div className="space-y-3">
                {category.partners.map((partner, partnerIndex) => (
                  <div key={partnerIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border-teal/20">
                    <span className="text-white/80">{partner}</span>
                    <Badge variant="secondary" className="bg-teal/10 text-teal border-teal/20">
                      Partner
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-white/80 mb-8">
            Interested in becoming a partner? Let's build something amazing together.
          </p>
        </div>
      </div>
    </section>
  )
}
