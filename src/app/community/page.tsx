"use client"

import { motion } from "framer-motion"
import Community from "@/components/Community"
import PageLayout from "@/components/PageLayout"

export default function CommunityPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <PageLayout
          title="Join Our Community"
          description="Connect with fellow developers, share knowledge, and grow together in our vibrant tech community."
          breadcrumbItems={[{ label: "Community" }]}
        >
          <Community />
        </PageLayout>
      </motion.div>
    </main>
  )
}
