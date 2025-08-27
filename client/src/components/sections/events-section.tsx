import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function EventsSection() {
  const events = [
    {
      date: "March 15, 2024",
      title: "CodeQuity Hackathon 2024",
      description: "48-hour intensive hackathon focused on building innovative solutions for real-world problems.",
      location: "Virtual + Delhi",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
    {
      date: "March 22, 2024",
      title: "AI/ML Workshop Series",
      description: "Learn machine learning fundamentals and build your first AI model with industry experts.",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
    {
      date: "March 30, 2024",
      title: "Developer Meetup Mumbai",
      description: "Monthly meetup for developers to network, share knowledge, and discuss latest tech trends.",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    },
  ];

  return (
    <section id="events" className="py-20 circuit-pattern" data-testid="events-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Upcoming <span className="gradient-text">Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our hackathons, workshops, bootcamps, and meetups to learn, build, and network with fellow developers.
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
                    Register
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
