import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Cluster = 'creating' | 'playing' | 'thinking'

export interface ContentMeta {
  slug: string
  cluster: Cluster
  title: string
  kind: string
  heroImage?: string
  summary?: string
  tags?: string[]
  externalUrl?: string | null
  date?: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content')

export function getContentSlugs(cluster: Cluster): string[] {
  const dir = path.join(CONTENT_DIR, cluster)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getContentMeta(cluster: Cluster, slug: string): ContentMeta {
  const filePath = path.join(CONTENT_DIR, cluster, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  return { slug, cluster, ...data } as ContentMeta
}

export function getAllContentMeta(cluster: Cluster): ContentMeta[] {
  return getContentSlugs(cluster).map((slug) => getContentMeta(cluster, slug))
}

export function getContentRaw(cluster: Cluster, slug: string): string {
  const filePath = path.join(CONTENT_DIR, cluster, `${slug}.mdx`)
  return fs.readFileSync(filePath, 'utf-8')
}
