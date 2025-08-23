"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { MapPin, Mail, Smartphone } from "lucide-react"
import { useState } from "react"
import emailjs from "@emailjs/browser"

interface FormData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Animation helper
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
    viewport: { once: true },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage("")
    setErrorMessage("")

    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        first_name: formData.firstName,
        last_name: formData.lastName,
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setSuccessMessage("Message sent successfully! We'll get back to you soon.")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Failed to send message:", error)
      setErrorMessage("Failed to send message. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-6 section-roomy">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact info column */}
          <motion.div {...fadeUp(0.1)}>
            <h3 className="text-3xl font-bold text-white mb-8 heading-bold">Contact Information</h3>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-teal" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Address</h4>
                  <p className="text-white/80 leading-compact">
                    CodeQuity Community Hub<br />
                    Tech Innovation Center<br />
                    India
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-teal" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <p className="text-white/80 leading-compact">
                    codequitycommunity@gmail.com
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-start gap-4">
                <Smartphone className="w-8 h-8 text-teal" />
                <div>
                  <h4 className="font-semibold text-white mb-1">Social Media</h4>
                  <p className="text-white/80 leading-compact">
                    <a href="https://www.instagram.com/codequity_official/" target="_blank" rel="noopener noreferrer" className="hover:text-teal hover:underline">Instagram</a><br />
                    <a href="https://www.linkedin.com/company/codequitycommunity" target="_blank" rel="noopener noreferrer" className="hover:text-teal hover:underline">LinkedIn</a><br />
                    <a href="https://x.com/CodeQuity" target="_blank" rel="noopener noreferrer" className="hover:text-teal hover:underline">X (Twitter)</a><br />
                    <a href="https://chat.whatsapp.com/HgPHH53f1v9HV75YOscich" target="_blank" rel="noopener noreferrer" className="hover:text-teal hover:underline">WhatsApp Community</a><br />
                    <a href="https://lu.ma/CodeConnect" target="_blank" rel="noopener noreferrer" className="hover:text-teal hover:underline">Luma – CodeConnect</a>
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-8 bg-white/20" />

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="https://lu.ma/CodeConnect" target="_blank" rel="noopener noreferrer" className="block text-white/80 hover:text-teal hover:underline transition-colors">
                  Become a Partner
                </a>
                <a href="https://www.linkedin.com/company/codequitycommunity" target="_blank" rel="noopener noreferrer" className="block text-white/80 hover:text-teal hover:underline transition-colors">
                  Join as Ambassador
                </a>
                <a href="https://chat.whatsapp.com/HgPHH53f1v9HV75YOscich" target="_blank" rel="noopener noreferrer" className="block text-white/80 hover:text-teal hover:underline transition-colors">
                  Join WhatsApp Community
                </a>
                <a href="mailto:codequitycommunity@gmail.com" className="block text-white/80 hover:text-teal hover:underline transition-colors">
                  Sponsor an Event
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact form column */}
          <motion.div {...fadeUp(0.18)}>
            <Card className="card border-teal/20 shadow-lg hover:shadow-teal/10 transition-shadow duration-300 minimal-motion focus-improved">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 heading-bold">Send us a Message</h3>
                
                {successMessage && (
                  <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
                    {successMessage}
                  </div>
                )}
                
                {errorMessage && (
                  <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                    {errorMessage}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">First Name</label>
                      <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Last Name</label>
                      <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="event">Event Information</option>
                      <option value="ambassador">Ambassador Program</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-teal hover:bg-teal/90 text-gray-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-improved"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
