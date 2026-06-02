"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { X } from "@phosphor-icons/react"
import Link from "next/link"

interface PeekOverlayProps {
  id: string | null
  label: string
  onClose: () => void
}

export default function PeekOverlay({ id, label, onClose }: PeekOverlayProps) {
  useEffect(() => {
    if (!id) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [id, onClose])

  return (
    <AnimatePresence>
      {id && (
        <motion.div
          className="peek-scrim"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onPointerDown={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            className="peek-card"
            initial={{ opacity: 0, y: 24, scale: 0.96, rotate: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            <button className="peek-close" onClick={onClose} aria-label="Close">
              <X size={14} weight="bold" />
            </button>

            <div style={{ paddingTop: 8 }}>
              {id === 'ux-ui'   && <PeekUXUI />}
              {id === 'web'     && <PeekWeb />}
              {id === 'brand'   && <PeekBrand />}
              {id === 'product' && <PeekProduct />}
              {id === 'writing' && <PeekWriting />}
              {id === 'music'   && <PeekMusic />}
              {id === 'video'   && <PeekMusicVideo />}
              {id === 'visuals' && <PeekVisuals />}
              {id === 'about'   && <PeekAbout />}
            </div>

            <div className="peek-label">{label}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Shared components ────────────────────────────────────────────────────────

function captureCardOrigin(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  sessionStorage.setItem('detail-origin', JSON.stringify({
    top: r.top, left: r.left, width: r.width, height: r.height,
  }))
}

function ProjectTile({ slug, title, sub, accent, from }: { slug: string; title: string; sub: string; accent: string; from?: string }) {
  return (
    <Link
      href={`/creating/${slug}${from ? `?from=${from}` : ''}`}
      onClick={captureCardOrigin}
      style={{
        display: 'block',
        padding: '14px 16px',
        background: accent,
        borderRadius: 14,
        textDecoration: 'none',
        transition: 'opacity 150ms',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontVariationSettings: '"opsz" 36, "SOFT" 60', fontSize: 18, color: 'var(--color-ink)', lineHeight: 1.1 }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 4 }}>{sub}</div>
    </Link>
  )
}

function ComingSoonTile({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{
      padding: '14px 16px',
      background: 'var(--color-surface)',
      borderRadius: 14,
      border: '1px dashed var(--color-ink-faint)',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontVariationSettings: '"opsz" 36, "SOFT" 60', fontSize: 18, color: 'var(--color-ink)', lineHeight: 1.1 }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 4 }}>{sub}</div>
    </div>
  )
}

// ── UX/UI Design ─────────────────────────────────────────────────────────────

function PeekUXUI() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
        Product design + research — from first principles to shipped interfaces.
      </p>
      <ProjectTile slug="autonomies" title="Autonomies" sub="UX · AI-powered civic tools · Case study" accent="var(--color-sage)" from="ux-ui" />
      <ProjectTile slug="sponti" title="Sponti" sub="Product design + engineering · Live app" accent="var(--color-butter)" from="ux-ui" />
    </div>
  )
}

// ── Web Design ───────────────────────────────────────────────────────────────

function PeekWeb() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
        Full-site design for clients — editorial, brand-led, and handcoded.
      </p>
      <ProjectTile slug="frachtwerk" title="Frachtwerk" sub="Web design · New-Work IT · Full case study" accent="var(--color-sage)" from="web" />
      <ProjectTile slug="mxc" title="MXC" sub="Web design · Blockchain IoT · Full case study" accent="var(--color-coral)" from="web" />
      <ProjectTile slug="stetig-wandel" title="Stetig & Wandel" sub="Web design · German digital initiative" accent="var(--color-sage)" from="web" />
      <ProjectTile slug="green-visions" title="Green Visions" sub="Web design · Sustainability film festival" accent="var(--color-sage)" from="web" />
    </div>
  )
}

// ── Art & Brand ──────────────────────────────────────────────────────────────

function PeekBrand() {
  const projects = [
    { name: 'AFAR', sub: 'Brand identity · Travel startup', slug: 'afar' },
    { name: 'Chikai', sub: 'Visual identity · Sake brand', slug: 'chikai' },
    { name: 'Keyko', sub: 'Brand · Creative studio', slug: 'keyko' },
    { name: 'Loominate', sub: 'Identity · Ed-tech', slug: 'loominate' },
    { name: 'Bananas Are Berries', sub: 'Identity · Podcast', slug: 'bananas-are-berries' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
        Logos, visual systems, and creative direction across brands.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {projects.map(p => (
          <ProjectTile key={p.slug} slug={p.slug} title={p.name} sub={p.sub} accent="var(--color-surface)" from="brand" />
        ))}
      </div>
    </div>
  )
}

// ── Product Building ─────────────────────────────────────────────────────────

function PeekProduct() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
        Things I&rsquo;ve designed and shipped — from weekend experiments to live apps.
      </p>
      <a
        href="https://sponti.app"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block', padding: '14px 16px',
          background: 'var(--color-butter)', borderRadius: 14,
          textDecoration: 'none', transition: 'opacity 150ms',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontVariationSettings: '"opsz" 36, "SOFT" 60', fontSize: 18, color: 'var(--color-ink)', lineHeight: 1.1 }}>Sponti ↗</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 4 }}>Live app · spontaneous local events</div>
      </a>
      <a
        href="https://github.com/patrickcaire"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block', padding: '14px 16px',
          background: '#1b1f1a', borderRadius: 14,
          textDecoration: 'none', transition: 'opacity 150ms',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontVariationSettings: '"opsz" 36, "SOFT" 60', fontSize: 18, color: 'var(--color-sage)', lineHeight: 1.1 }}>GitHub ↗</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(197,212,168,0.6)', marginTop: 4 }}>Source code + side projects</div>
      </a>
      <ComingSoonTile title="This site" sub="Next.js · Framer Motion · mindgarden concept" />
    </div>
  )
}

// ── Written Things ───────────────────────────────────────────────────────────

function PeekWriting() {
  const posts = [
    { title: 'Design is a conversation with time', date: '2025', note: 'On why every design decision is also a prediction.' },
    { title: 'The tools are not neutral', date: '2024', note: 'AI in the design workflow — what it changes and what it doesn\'t.' },
    { title: 'Berlin is a brief', date: '2024', note: 'The city as constraint. What designing here teaches you.' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-ink-muted)', lineHeight: 1.55 }}>
        Thinking out loud — mostly on design, craft, and the city.
      </p>
      {posts.map(p => (
        <div key={p.title} style={{
          padding: '14px 16px',
          background: 'var(--color-surface)',
          borderRadius: 14,
          border: '1px solid var(--color-ink-hair)',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', color: 'var(--color-ink-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{p.date}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontVariationSettings: '"opsz" 36, "SOFT" 60', fontSize: 16, color: 'var(--color-ink)', lineHeight: 1.2 }}>{p.title}</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 4, lineHeight: 1.5 }}>{p.note}</div>
        </div>
      ))}
    </div>
  )
}

// ── Music Production ─────────────────────────────────────────────────────────

function PeekMusic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
          background: 'var(--color-moss)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(79,107,40,0.4)',
        }}>
          <svg viewBox="0 0 100 100" width="52" height="52">
            <circle cx="50" cy="50" r="42" fill="var(--coral)" opacity="0.95" />
            <circle cx="50" cy="50" r="14" fill="var(--moss)" />
            <circle cx="50" cy="50" r="3" fill="var(--butter)" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontVariationSettings: '"opsz" 36, "SOFT" 60', fontSize: 20, lineHeight: 1.1, color: 'var(--color-ink)' }}>Originals</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 4 }}>Electronic, ambient, bits of everything — recorded in Berlin</div>
        </div>
      </div>

      <div style={{
        padding: '12px 16px',
        background: 'var(--color-surface)',
        borderRadius: 14,
        border: '1px solid var(--color-ink-hair)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--color-moss)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontVariationSettings: '"opsz" 14, "SOFT" 80', fontSize: 13, color: 'var(--color-ink)' }}>untitled — Patrick Caire</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-ink-muted)', marginTop: 2 }}>Hit play in the corner ↘</div>
        </div>
      </div>

      <div style={{
        padding: '10px 14px',
        background: 'var(--color-surface)',
        borderRadius: 12,
        fontFamily: 'var(--font-body)',
        fontSize: 12,
        color: 'var(--color-ink-muted)',
        lineHeight: 1.5,
        textAlign: 'center',
      }}>
        More tracks dropping — DJing as{' '}
        <a href="https://soundcloud.com/uferkind" target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--color-moss)', textDecoration: 'none', borderBottom: '1px solid var(--color-moss)' }}>
          Uferkind
        </a>
      </div>
    </div>
  )
}

// ── Music Video ──────────────────────────────────────────────────────────────

function PeekMusicVideo() {
  return (
    <div>
      <div className="peek-video-frame">
        <iframe
          src="https://www.youtube.com/embed/Rk2tmIkQnAw?rel=0&modestbranding=1"
          title="Music Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 16, padding: '0 4px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontVariationSettings: '"opsz" 36, "SOFT" 60', fontSize: 22, lineHeight: 1.1, color: 'var(--color-ink)' }}>Nachtgarten</div>
          <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 4 }}>Patrick Caire · Berlin</div>
        </div>
        <a
          href="https://www.youtube.com/@motifsmusic"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-ink-muted)', letterSpacing: '0.08em', textDecoration: 'none', borderBottom: '1px solid var(--color-ink-faint)' }}
        >
          YouTube ↗
        </a>
      </div>
    </div>
  )
}

// ── Visuals ──────────────────────────────────────────────────────────────────

function PeekVisuals() {
  const tiles = [
    { bg: 'var(--coral)', h: 180, shape: <svg viewBox="0 0 60 60"><circle cx="30" cy="26" r="18" fill="var(--ink)" /><rect x="6" y="46" width="48" height="10" fill="var(--butter)" /></svg> },
    { bg: 'var(--moss)', h: 140, shape: <svg viewBox="0 0 60 60"><path d="M10 50 L30 10 L50 50 Z" fill="var(--butter)" /></svg> },
    { bg: 'var(--butter)', h: 160, shape: <svg viewBox="0 0 60 60"><rect x="14" y="14" width="32" height="32" fill="var(--coral)" /><circle cx="30" cy="30" r="8" fill="var(--ink)" /></svg> },
    { bg: 'var(--sage)', h: 200, shape: <svg viewBox="0 0 60 60"><path d="M0 40 Q15 10 30 40 T60 40 L60 60 L0 60 Z" fill="var(--moss)" /></svg> },
    { bg: '#2a3620', h: 150, shape: <svg viewBox="0 0 60 60"><circle cx="20" cy="20" r="10" fill="var(--butter)" /><circle cx="40" cy="40" r="14" fill="var(--coral)" /></svg> },
    { bg: 'var(--surface)', h: 170, shape: <svg viewBox="0 0 60 60"><rect x="10" y="10" width="18" height="18" fill="var(--moss)" /><rect x="32" y="10" width="18" height="18" fill="var(--coral)" /><rect x="10" y="32" width="18" height="18" fill="var(--butter)" /><rect x="32" y="32" width="18" height="18" fill="var(--sage)" /></svg> },
    { bg: 'var(--ink)', h: 140, shape: <svg viewBox="0 0 60 60"><text x="30" y="36" textAnchor="middle" fontFamily="var(--font-display)" fontStyle="italic" fontSize="20" fill="var(--butter)">form</text></svg> },
    { bg: 'var(--coral)', h: 170, shape: <svg viewBox="0 0 60 60"><path d="M10 30 Q30 5 50 30 Q30 55 10 30 Z" fill="var(--ink)" /></svg> },
    { bg: 'var(--moss)', h: 180, shape: <svg viewBox="0 0 60 60"><rect x="8" y="28" width="44" height="4" fill="var(--butter)" /><rect x="28" y="8" width="4" height="44" fill="var(--butter)" /></svg> },
  ]
  return (
    <div className="peek-masonry">
      {tiles.map((t, i) => (
        <div key={i} className="peek-tile" style={{ background: t.bg, height: t.h }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '70%', height: '70%' }}>{t.shape}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── About ────────────────────────────────────────────────────────────────────

function PeekAbout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'var(--color-sage)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'var(--color-moss)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 36,
            color: 'var(--color-butter)',
            fontVariationSettings: '"opsz" 36, "SOFT" 100',
          }}>P</span>
        </div>
        <div style={{
          position: 'absolute', bottom: 14, left: 16,
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--color-ink-muted)',
        }}>
          Berlin, 2025
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontVariationSettings: '"opsz" 36, "SOFT" 60',
          fontSize: 26,
          lineHeight: 1.1,
          color: 'var(--color-ink)',
        }}>
          Patrick Caire
        </div>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--color-ink)' }}>
          I&rsquo;m a designer, creative developer, and music nerd living in Berlin.
          I work across UX, web, brand, and code — usually at the point where the brief
          gets interesting and the tools start feeling like instruments.
        </p>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--color-ink)' }}>
          Currently open to new opportunities — especially teams where design and engineering sit at the same table.
        </p>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--color-ink)' }}>
          When I&rsquo;m not designing, I&rsquo;m making music, pressing vinyl, and DJing as{' '}
          <a
            href="https://soundcloud.com/uferkind"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-moss)', textDecoration: 'none', borderBottom: '1px solid var(--color-moss)' }}
          >
            Uferkind
          </a>
          .
        </p>

        <div style={{
          marginTop: 4,
          padding: '12px 16px',
          background: 'var(--color-surface)',
          borderRadius: 12,
          border: '1px solid var(--color-ink-hair)',
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'var(--color-ink-muted)',
          lineHeight: 1.5,
        }}>
          Want to know more?{' '}
          <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontVariationSettings: '"opsz" 14, "SOFT" 100', color: 'var(--color-ink)' }}>
            Ask below ↓
          </em>
        </div>
      </div>
    </div>
  )
}
