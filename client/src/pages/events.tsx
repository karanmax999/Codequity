import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

// Define Event type matching your backend schema
type Event = {
  _id: string;
  Date: string;
  Hadding: string;
  Discription: string;
  location: string;
  Link: string;
  Image: string;
  ImageId: string;
};

export default function Events() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/admin/events");
        console.log("Events from API:", res.data);
        setEvents(res.data); // assuming API returns array of all events
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  //  animation for cards
  useEffect(() => {
    if (loading || events.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".event-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, cardsRef);

    return () => ctx.revert();
  }, [loading, events]);

  if (loading) return <div className="text-center py-20">Loading events...</div>;

  return (
    <div ref={heroRef} className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-orbitron font-black gradient-text mb-8 glow-text">
            TECH EVENTS
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            🚀 Join India's most exciting tech events. From hackathons to conferences, level up your skills and network with the best developers.
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 relative" ref={cardsRef}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card
                key={event._id}
                className="event-card overflow-hidden rounded-2xl shadow-lg bg-gradient-to-b from-gray-900 to-black text-white"
              >
                <CardContent className="p-0">
                  {/* /* Event Image */ }
                  {event.Image && (
                    <div className="relative">
                      <img
                        src={event.Image}
                        alt={event.Hadding}
                        className="w-full h-48 object-cover"
                      />
                      {/* Tags */} 
                       {/* <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                          Registration Open
                        </span>
                        <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                          Hackathon
                        </span>
                      </div> */}
                    </div>
                  )
                  }

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-2xl font-bold mb-2">{event.Hadding}</h3>
                    <p className="text-gray-300 text-sm mb-4">{event.Discription}</p>

                    {/* Event Info */}
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>📅 {event.Date}</p>
                      <p>📍 {event.location}</p>
                      <p>⏳ 48 Hours</p>
                      <p>👥 500+ Participants</p>
                    </div>

                    {/* Button */}
                    {event.Link && (
                      <a
                        href={event.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg text-center hover:opacity-90 transition"
                      >
                        Register Now
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
