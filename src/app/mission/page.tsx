import Mission from '@/components/Mission'
import PageLayout from '@/components/PageLayout'

export default function MissionPage() {
  return (
    <PageLayout
      title="Our Mission"
      description="Empowering developers with the tools, knowledge, and community they need to build the future."
      breadcrumbItems={[{ label: 'Mission' }]}
    >
      <Mission />
    </PageLayout>
  )
} 