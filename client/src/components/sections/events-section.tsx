import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function EventsSection() {
  const events = [
    {
      date: "April 2025",
      title: "On-Chain Hackathon",
      description: "Deploy your project on-chain (testnet or mainnet). Define problem, users, and business model.",
      location: "Virtual + Bangalore",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
    {
      date: "May 2025",
      title: "6-Week Shipping Sprint",
      description: "User onboarding challenges, L2 selection, smart contract audits, and tokenomics design.",
      location: "Virtual",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
    {
      date: "June 2025",
      title: "Funding Day",
      description: "Pitch to Web3 accelerators, launchpads, and angel investors. YC-style intensive session.",
      location: "Delhi + Virtual",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
  ];

  return (
    <section id="events" className="py-32 circuit-pattern" data-testid="events-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-6">
            <span className="gradient-text">The Pipeline</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three stages to take your project from hackathon demo to funded Web3 startup with real users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              className="event-card neon-border rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`event-card-${event.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-accent mb-2">
                  <Calendar className="w-4 h-4" />
                  <span data-testid={`event-date-${index}`}>{event.date}</span>
                </div>
                <h3 className="text-xl font-orbitron font-semibold mb-3" data-testid={`event-title-${index}`}>
                  {event.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`event-description-${index}`}>
                  {event.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1" data-testid={`event-location-${index}`}>
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid={`button-register-${index}`}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
