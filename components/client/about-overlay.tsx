"use client"

import { m, AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import Image from "next/image"
import { X } from "@phosphor-icons/react"

const linkStyle = {
  color: 'var(--color-moss)',
  textDecoration: 'none',
  borderBottom: '1px solid var(--color-moss)',
} as const

interface AboutOverlayProps {
  open: boolean
  onClose: () => void
}

export default function AboutOverlay({ open, onClose }: AboutOverlayProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label="About Patrick"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onPointerDown={e => { if (e.target === e.currentTarget) onClose() }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(20,24,20,0.38)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            style={{
              position: 'relative',
              background: 'var(--color-surface-raised)',
              borderRadius: 32,
              boxShadow: '0 20px 60px -16px rgba(0,0,0,0.28)',
              padding: '28px',
              width: 'min(480px, 100%)',
              maxHeight: 'min(680px, 90dvh)',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
            }}
          >
            <button
              type="button"
              className="peek-close"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={14} weight="bold" />
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Avatar area */}
              <div style={{
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: 16,
                overflow: 'hidden',
                background: 'var(--color-sage)',
                position: 'relative',
              }}>
                <Image
                  src="/images/about/patrick.jpg"
                  alt="Patrick Caire"
                  fill
                  sizes="(max-width: 480px) 100vw, 480px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority
                />
                <div style={{
                  position: 'absolute', bottom: 14, left: 16,
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--color-butter)',
                  textShadow: '0 1px 6px rgba(0,0,0,0.4)',
                }}>
                  Berlin, 2026
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'normal',
                  fontVariationSettings: '"opsz" 36, "SOFT" 60',
                  fontSize: 26,
                  lineHeight: 1.1,
                  color: 'var(--color-ink)',
                }}>
                  Patrick Caire
                </div>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--color-ink)' }}>
                  I&rsquo;m a Berlin-based designer who&rsquo;s spent the last seven-ish years refusing to
                  pick one medium — brand, web, photography, video, illustration, the occasional record.
                  I like the spots where disciplines overlap; that&rsquo;s usually where the work feels
                  most meaningful.
                </p>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--color-ink)' }}>
                  I grew up in France in a bilingual family, then lived in the UK, Canada, and now Berlin.
                  My education wandered too — from PoliSci to Design Thinking before I specialised in
                  visual communication. I cut my teeth at a couple of agencies, then ran my own studio
                  for a few years.
                </p>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--color-ink)' }}>
                  That broad background shapes how I work. Whatever the medium or industry, the process
                  holds: discover, research, ideate, prototype, test, iterate. And in the age of AI,
                  I&rsquo;ve made a point of folding these new tools into that process rather than around it.
                </p>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--color-ink)' }}>
                  Case in point: right now I&rsquo;m learning to code — partly to build my own ideas end to
                  end instead of handing them off, partly so I actually know what I&rsquo;m steering when
                  the tools do the heavy lifting.
                </p>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.65, color: 'var(--color-ink)' }}>
                  The other half of my life is music: producing as{' '}
                  <a href="https://www.instagram.com/motifs.music" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    motifs.music
                  </a>
                  , DJing as{' '}
                  <a href="https://soundcloud.com/uferkind" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    Uferkind
                  </a>
                  , and curating House music events for{' '}
                  <a href="https://www.bananasrberries.com/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    bananas are berries
                  </a>
                  , a series I co-create.
                </p>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
