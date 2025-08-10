import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Footer from '@/components/Footer'
import ProgressBar from '@/components/ProgressBar'
import FloatingActionButton from '@/components/FloatingActionButton'
import FeaturesSection from '@/components/FeaturesSection'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden royal-section-primary">
      {/* Royal animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-amber-50" />
        
        {/* Royal animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-amber-400/10 rounded-full blur-3xl animate-royal-float" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/10 to-blue-600/10 rounded-full blur-3xl animate-royal-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-blue-600/10 to-amber-500/10 rounded-full blur-3xl animate-royal-float" style={{ animationDelay: '2s' }} />
        
        {/* Royal grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Royal accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
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
