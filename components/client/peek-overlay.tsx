"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { X } from "@phosphor-icons/react"

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
              {id === 'visuals'    && <PeekVisuals />}
              {id === 'video'     && <PeekMusicVideo />}
              {id === 'sidequests' && <PeekSideQuests />}
              {id === 'about'     && <PeekAbout />}
            </div>

            <div className="peek-label">{label}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

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
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontVariationSettings: '"opsz" 36, "SOFT" 60', fontSize: 22, lineHeight: 1.1, color: 'var(--color-ink)' }}>Music Video</div>
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

function PeekSideQuests() {
  const quests = [
    {
      bg: '#2a3620', caption: '3am color study',
      content: (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div style={{ background: 'var(--coral)' }} />
          <div style={{ background: 'var(--butter)' }} />
          <div style={{ background: 'var(--sage)' }} />
          <div style={{ background: 'var(--moss)' }} />
        </div>
      ),
    },
    {
      bg: 'var(--sage)', caption: 'pixel weather',
      content: (
        <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="22" cy="22" r="8" fill="var(--butter)" />
          <ellipse cx="34" cy="28" rx="16" ry="5" fill="var(--surface)" />
          <ellipse cx="26" cy="32" rx="14" ry="4" fill="rgba(255,255,255,0.7)" />
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1={14 + i * 6} y1={42} x2={12 + i * 6} y2={52} stroke="var(--moss)" strokeWidth="1.2" />
          ))}
        </svg>
      ),
    },
    {
      bg: '#1b1f1a', caption: 'ascii garden',
      content: (
        <div style={{ position: 'absolute', inset: 0, padding: 12, fontFamily: 'var(--font-mono)', fontSize: 9, lineHeight: 1.2, color: 'var(--sage)' }}>
          <div>&nbsp;&nbsp;&nbsp;~~~</div>
          <div>&nbsp;&nbsp;<span style={{ color: 'var(--butter)' }}>*</span>&nbsp;|&nbsp;<span style={{ color: 'var(--coral)' }}>*</span></div>
          <div>&nbsp;&nbsp;&nbsp;|</div>
          <div>&nbsp;&nbsp;_|_</div>
          <div style={{ color: 'rgba(197,212,168,0.5)' }}>growing...</div>
        </div>
      ),
    },
    {
      bg: 'var(--butter)', caption: 'rotating shape',
      content: (
        <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <g transform="rotate(18 30 30)">
            <rect x="18" y="18" width="24" height="24" fill="var(--coral)" />
            <rect x="18" y="18" width="24" height="24" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
          </g>
          <rect x="18" y="18" width="24" height="24" fill="none" stroke="var(--moss)" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      ),
    },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {quests.map((q, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            position: 'relative', background: q.bg,
            borderRadius: 14, overflow: 'hidden', aspectRatio: '1',
            border: '1px solid var(--color-ink-hair)',
          }}>
            {q.content}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--color-ink)' }}>
            {q.caption}
          </div>
        </div>
      ))}
    </div>
  )
}

function PeekAbout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Photo placeholder until real asset is provided */}
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

      {/* Bio */}
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
          When I&rsquo;m not designing, I&rsquo;m making music, pressing vinyl, and DJing as{' '}
          <a
            href="https://soundcloud.com/uferkind"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-moss)', textDecoration: 'none', borderBottom: '1px solid var(--color-moss)' }}
          >
            Uferkind
          </a>
          . This site is my mindgarden — everything I make, think about, and play with, in the same place.
        </p>

        {/* Chat nudge */}
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
