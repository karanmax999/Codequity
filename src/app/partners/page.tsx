import Partners from '@/components/Partners'
import PageLayout from '@/components/PageLayout'

export default function PartnersPage() {
  return (
    <PageLayout
      title="Our Partners"
      description="Building strong partnerships with industry leaders, educational institutions, and community organizations."
      breadcrumbItems={[{ label: 'Partners' }]}
    >
      <Partners />
    </PageLayout>
  )
} 