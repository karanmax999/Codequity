import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Footer from '@/components/Footer'
import ProgressBar from '@/components/ProgressBar'
import FloatingActionButton from '@/components/FloatingActionButton'
import FeaturesSection from '@/components/FeaturesSection'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Modern animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>
      
      <ProgressBar />
      <Hero />
      <FeaturesSection />
      <Stats />
      <Footer />
      <FloatingActionButton />
    </main>
  )
}
