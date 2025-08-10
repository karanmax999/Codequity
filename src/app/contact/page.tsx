import Contact from '@/components/Contact'
import PageLayout from '@/components/PageLayout'

export default function ContactPage() {
  return (
    <PageLayout
      title="Get In Touch"
      description="Have questions or want to collaborate? We'd love to hear from you!"
      breadcrumbItems={[{ label: 'Contact' }]}
    >
      <Contact />
    </PageLayout>
  )
} 