import About from '@/components/About'
import PageLayout from '@/components/PageLayout'

export default function AboutPage() {
  return (
    <PageLayout
      title="About CodeQuity"
      description="Empowering the next generation of tech innovators through community, collaboration, and cutting-edge technology."
      breadcrumbItems={[{ label: 'About' }]}
    >
      <About />
    </PageLayout>
  )
} 