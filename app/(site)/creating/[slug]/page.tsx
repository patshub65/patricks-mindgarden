export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <main className="subpage-bg">
      <p style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>Case study: {slug} — coming soon</p>
    </main>
  )
}
