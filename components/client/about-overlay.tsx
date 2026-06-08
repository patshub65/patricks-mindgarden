"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { X } from "@phosphor-icons/react"

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
        <motion.div
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
          <motion.div
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
                    fontStyle: 'normal',
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
                  fontStyle: 'normal',
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
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
