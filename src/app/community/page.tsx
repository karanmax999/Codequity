import Community from '@/components/Community'
import PageLayout from '@/components/PageLayout'

export default function CommunityPage() {
  return (
    <PageLayout
      title="Join Our Community"
      description="Connect with fellow developers, share knowledge, and grow together in our vibrant tech community."
      breadcrumbItems={[{ label: 'Community' }]}
    >
      <Community />
    </PageLayout>
  )
} 