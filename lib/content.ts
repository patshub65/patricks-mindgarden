import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type ProjectKind = 'case-study' | 'showcase' | 'external-link'
export type ProjectCategory = 'ux-ui' | 'web' | 'brand'

export interface ProjectMeta {
  slug: string
  title: string
  kind: ProjectKind
  category?: ProjectCategory
  heroImage?: string
  summary?: string
  tags?: string[]
  externalUrl?: string | null
  date?: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'creating')

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getProjectMeta(slug: string): ProjectMeta {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(raw)
  return { slug, ...data } as ProjectMeta
}


export function getProjectSource(slug: string): string {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  return fs.readFileSync(filePath, 'utf-8')
}
