import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import { getProjectSlugs, getProjectSource, getProjectMeta } from "@/lib/content"
import DetailPage, { MDX_COMPONENTS } from "@/components/server/detail-page"
import DetailPageWrapper from "@/components/client/detail-page-wrapper"
import BackButton from "@/components/client/back-button"

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const slugs = getProjectSlugs()
  if (!slugs.includes(slug)) return {}
  const meta = getProjectMeta(slug)
  return {
    title: `${meta.title} — Patrick Caire`,
    description: meta.summary,
  }
}

export default async function CaseStudy({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string>>
}) {
  const { slug } = await params
  const { from } = await searchParams
  const slugs = getProjectSlugs()
  if (!slugs.includes(slug)) notFound()

  const source = getProjectSource(slug)

  const { content, frontmatter } = await compileMDX<{
    title: string
    kind: string
    category?: string
    heroImage?: string
    summary?: string
    tags?: string[]
    externalUrl?: string | null
    date?: string
  }>({
    source,
    options: { parseFrontmatter: true },
    components: MDX_COMPONENTS,
  })

  const meta = {
    slug,
    title: frontmatter.title,
    kind: frontmatter.kind as 'case-study' | 'showcase' | 'external-link',
    category: frontmatter.category as 'ux-ui' | 'web' | 'brand' | undefined,
    heroImage: frontmatter.heroImage,
    summary: frontmatter.summary,
    tags: frontmatter.tags,
    externalUrl: frontmatter.externalUrl,
    date: frontmatter.date,
  }

  return (
    <DetailPageWrapper fromCard={from ?? null}>
      <DetailPage
        meta={meta}
        content={content}
        backNav={<BackButton fromCard={from ?? null} />}
        footerNav={<BackButton fromCard={from ?? null} variant="footer" />}
      />
    </DetailPageWrapper>
  )
}
