"use client"

import { m, AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { X } from "@phosphor-icons/react"
import Image from "next/image"

const GALLERY_IMAGES: [string, number, number][] = [
  ['01.webp', 1024, 564], ['02.jpg', 684, 1024], ['03.jpg', 1024, 693],
  ['04.jpg', 1024, 1024], ['05.png', 1024, 533], ['06.png', 1024, 784],
  ['07.jpg', 1024, 683], ['08.jpg', 1024, 683], ['09.png', 819, 1024],
  ['10.png', 1024, 680], ['11.png', 1024, 1024], ['12.jpg', 1024, 576],
  ['13.jpg', 1024, 576], ['14.jpg', 1024, 577], ['15.jpg', 1024, 683],
  ['16.jpg', 1024, 931], ['17.jpg', 703, 1024], ['18.jpg', 1024, 725],
  ['19.jpg', 1024, 725], ['20.png', 1024, 725], ['21.jpg', 920, 1024],
  ['22.jpg', 1024, 385], ['23.png', 483, 482], ['24.png', 1024, 512],
  ['25.png', 1024, 576], ['26.jpg', 1024, 681], ['27.jpg', 1024, 576],
  ['28.png', 1024, 576], ['29.jpg', 725, 1024], ['30.png', 1024, 574],
  ['31.jpg', 1024, 683], ['32.jpg', 900, 900], ['33.png', 1024, 1024],
  ['34.png', 300, 300], ['35.jpg', 1024, 682], ['36.png', 1024, 533],
  ['37.png', 1024, 1024], ['38.jpg', 1024, 682], ['39.jpg', 1024, 680],
  ['40.jpg', 737, 1024], ['41.jpg', 704, 973], ['42.png', 1024, 1024],
  ['43.jpg', 1024, 682], ['44.jpg', 700, 467], ['45.jpg', 724, 1024],
  ['46.jpg', 724, 1024], ['47.jpg', 683, 1024], ['48.jpg', 1024, 682],
]

interface GalleryOverlayProps {
  open: boolean
  onClose: () => void
}

export default function GalleryOverlay({ open, onClose }: GalleryOverlayProps) {
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
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgb(20 24 20 / 0.45)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onPointerDown={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <m.div
            style={{
              position: 'relative',
              background: 'var(--color-surface-raised)',
              borderRadius: 'var(--radius-detail)',
              boxShadow: 'var(--shadow-lg)',
              padding: '28px',
              width: 'min(780px, 100%)',
              maxHeight: 'min(740px, 92dvh)',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              style={{
                position: 'absolute',
                top: 18, right: 18,
                width: 32, height: 32,
                borderRadius: '50%',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-ink-hair)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-ink-muted)',
                zIndex: 10,
                transition: 'background 150ms, color 150ms',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'color-mix(in oklch, var(--color-surface), black 6%)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-ink)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-ink-muted)'
              }}
            >
              <X size={14} weight="bold" />
            </button>

            {/* Header */}
            <div style={{ paddingTop: 4, marginBottom: 20, paddingRight: 40 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'normal',
                fontVariationSettings: '"opsz" 36, "SOFT" 60',
                fontSize: 28,
                lineHeight: 1.0,
                color: 'var(--color-ink)',
                marginBottom: 6,
              }}>
                Bits & Bobs
              </div>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                lineHeight: 1.55,
                color: 'var(--color-ink-muted)',
              }}>
                Motion, collage, brand work, and things without a brief.
              </p>
            </div>

            {/* 3-col masonry grid */}
            <div style={{ columns: 3, columnGap: 10 }}>
              {GALLERY_IMAGES.map(([file, w, h]) => (
                <div
                  key={file}
                  style={{
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginBottom: 10,
                    breakInside: 'avoid',
                  }}
                >
                  <Image
                    src={`/images/visuals/${file}`}
                    alt=""
                    width={w}
                    height={h}
                    sizes="(max-width: 860px) 30vw, 230px"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
