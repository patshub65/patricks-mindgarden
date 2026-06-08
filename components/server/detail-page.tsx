import Image from "next/image"
import type { ProjectMeta } from "@/lib/content"

interface DetailPageProps {
  meta: ProjectMeta
  content: React.ReactNode
  backNav?: React.ReactNode
  footerNav?: React.ReactNode
}

function H1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 style={{
    fontFamily: 'var(--font-display)', fontStyle: 'normal',
    fontVariationSettings: '"opsz" 72, "SOFT" 20',
    fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.05,
    letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '0 0 28px',
  }} {...props} />
}

function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 style={{
    fontFamily: 'var(--font-display)', fontStyle: 'normal',
    fontVariationSettings: '"opsz" 36, "SOFT" 40',
    fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.1,
    color: 'var(--color-ink)', margin: '48px 0 16px',
  }} {...props} />
}

function H3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 style={{
    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16,
    color: 'var(--color-ink)', margin: '32px 0 10px', letterSpacing: '0.01em',
  }} {...props} />
}

function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p style={{
    fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.75,
    color: 'var(--color-ink)', margin: '0 0 20px',
  }} {...props} />
}

function UL(props: React.HTMLAttributes<HTMLUListElement>) {
  return <ul style={{
    fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7,
    color: 'var(--color-ink)', margin: '0 0 20px', paddingLeft: '1.4em',
  }} {...props} />
}

function OL(props: React.HTMLAttributes<HTMLOListElement>) {
  return <ol style={{
    fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7,
    color: 'var(--color-ink)', margin: '0 0 20px', paddingLeft: '1.4em',
  }} {...props} />
}

function LI(props: React.HTMLAttributes<HTMLLIElement>) {
  return <li style={{ marginBottom: '6px' }} {...props} />
}

function Blockquote(props: React.HTMLAttributes<HTMLQuoteElement>) {
  return <blockquote style={{
    borderLeft: '3px solid var(--color-moss)', paddingLeft: 20,
    margin: '28px 0', color: 'var(--color-ink-muted)',
    fontFamily: 'var(--font-display)', fontStyle: 'normal',
    fontVariationSettings: '"opsz" 36, "SOFT" 60', fontSize: 18, lineHeight: 1.5,
  }} {...props} />
}

function HR() {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--color-ink-faint)', margin: '48px 0' }} />
}

function A(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a style={{
    color: 'var(--color-moss)', textDecoration: 'none',
    borderBottom: '1px solid var(--color-moss)', transition: 'opacity 150ms',
  }} {...props} />
}

function Strong(props: React.HTMLAttributes<HTMLElement>) {
  return <strong style={{ fontWeight: 600, color: 'var(--color-ink)' }} {...props} />
}

function Code(props: React.HTMLAttributes<HTMLElement>) {
  return <code style={{
    fontFamily: 'var(--font-mono)', fontSize: '0.88em',
    background: 'var(--color-surface)', border: '1px solid var(--color-ink-faint)',
    borderRadius: 4, padding: '1px 5px',
  }} {...props} />
}

function Img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={props.alt ?? ''} {...props} style={{
    width: '100%', height: 'auto',
    borderRadius: 'var(--radius-thumb)', margin: '8px 0', display: 'block',
  }} />
}

export const MDX_COMPONENTS = {
  h1: H1, h2: H2, h3: H3,
  p: P, ul: UL, ol: OL, li: LI,
  blockquote: Blockquote, hr: HR,
  a: A, strong: Strong, code: Code, img: Img,
}

export default function DetailPage({ meta, content, backNav, footerNav }: DetailPageProps) {
  const isCaseStudy = meta.kind === 'case-study'

  return (
    <div className="subpage-bg" style={{ minHeight: '100dvh' }}>
      {/* Content column */}
      <article style={{
        maxWidth: isCaseStudy ? 720 : 640,
        margin: '0 auto',
        padding: isCaseStudy ? '72px 24px 120px' : '64px 24px 100px',
      }}>
        {/* Back navigation */}
        {backNav}

        {/* Eyebrow */}
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--color-ink-muted)', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          {meta.category && <span>{meta.category}</span>}
          {meta.category && meta.date && <span style={{ color: 'var(--color-ink-faint)' }}>·</span>}
          {meta.date && <span>{meta.date}</span>}
          {meta.kind === 'showcase' && (
            <>
              <span style={{ color: 'var(--color-ink-faint)' }}>·</span>
              <span>Showcase</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontStyle: 'normal',
          fontVariationSettings: '"opsz" 72, "SOFT" 20',
          fontSize: 'clamp(42px, 6vw, 72px)', lineHeight: 1.0,
          letterSpacing: '-0.02em', color: 'var(--color-ink)',
          margin: '0 0 24px', textWrap: 'balance' as React.CSSProperties['textWrap'],
        }}>
          {meta.title}
        </h1>

        {/* Summary */}
        {meta.summary && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.65,
            color: 'var(--color-ink-muted)', margin: '0 0 48px',
            textWrap: 'balance' as React.CSSProperties['textWrap'],
          }}>
            {meta.summary}
          </p>
        )}

        {/* Hero image */}
        {meta.heroImage && (
          <div style={{
            position: 'relative', width: '100%',
            aspectRatio: isCaseStudy ? '16/9' : '4/3',
            borderRadius: 'var(--radius-detail)', overflow: 'hidden',
            marginBottom: 56, background: 'var(--color-surface)',
          }}>
            <Image
              src={meta.heroImage}
              alt={meta.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 720px"
              priority
            />
          </div>
        )}

        {/* Tags */}
        {meta.tags && meta.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}>
            {meta.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--color-ink-muted)', padding: '4px 10px',
                background: 'var(--color-surface)', borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-ink-faint)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* MDX body */}
        <div>{content}</div>

        {/* External link CTA */}
        {meta.externalUrl && (
          <div style={{ marginTop: 48 }}>
            <a
              href={meta.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 22px', background: 'var(--color-moss)', color: 'white',
                borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-body)',
                fontSize: 14, fontWeight: 500, textDecoration: 'none',
                transition: 'opacity 150ms',
              }}
            >
              View project ↗
            </a>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 80, paddingTop: 32,
          borderTop: '1px solid var(--color-ink-faint)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {footerNav}
          {meta.category && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-ink-faint)',
            }}>
              {meta.category}
            </span>
          )}
        </div>
      </article>
    </div>
  )
}
