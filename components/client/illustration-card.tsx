"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion"
import { useState, useRef, useEffect } from "react"
import type { PanInfo } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { CardProject } from "@/lib/cards"
import { WRITING_POSTS } from "@/lib/cards"

const FRICTION = 1.6
const RESTITUTION = 0.6
const STOP_SPEED = 16

const EXPANDED_W = 360

// One easing curve for the whole morph. width, height, borderRadius,
// backgroundColor and boxShadow are ALL animated by Framer on a single
// timeline, so every property reaches target on the same frame. Height is
// animated to a measured pixel value (never 'auto') — animating to 'auto'
// makes Framer re-measure a reflowing box mid-animation, which is what caused
// the height to pop on open and snap on close (and dragged the shadow with it).
const EASE_MORPH = [0.32, 0.72, 0, 1] as const
const SHELL_OPEN  = { duration: 0.42, ease: EASE_MORPH }
const SHELL_CLOSE = { duration: 0.34, ease: EASE_MORPH }

const REST_SHADOW  = '0 8px 24px -6px rgba(68,60,40,0.18), 0 2px 6px -2px rgba(68,60,40,0.12)'
const HOVER_SHADOW = '0 16px 40px -10px rgba(68,60,40,0.28), 0 4px 12px -4px rgba(68,60,40,0.16)'
const DRAG_SHADOW  = '0 32px 64px -16px rgba(76,60,30,0.28), 0 8px 24px -8px rgba(76,60,30,0.14)'
const OPEN_SHADOW  = '0 20px 60px -16px rgba(40,30,20,0.32), 0 4px 12px -4px rgba(40,30,20,0.10)'

interface IllustrationCardProps {
  id: string
  label: string
  description: string
  accentBg: string
  projects: CardProject[]
  size: number
  homeX: number
  homeY: number
  canvasW: number
  canvasH: number
  physics: boolean
  floatDelay: number
  floatDur: number
  isExpanded: boolean
  isDimmed: boolean
  onExpand: (id: string) => void
  onCollapse: () => void
  onOverlay?: () => void
}

function ProjectThumb({ project }: { project: CardProject }) {
  const hasImage = !!project.slug
  const imgSrc = project.slug ? `/images/creating/${project.slug}/hero` : null

  const inner = (
    <div style={{
      flexShrink: 0,
      width: 184,
      height: 124,
      borderRadius: 12,
      background: hasImage ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.18)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '8px 10px',
      cursor: 'pointer',
      transition: 'background 150ms, transform 150ms',
      overflow: 'hidden',
      position: 'relative' as const,
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.background = hasImage ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.28)';
      (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.background = hasImage ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.18)';
      (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
    }}
    >
      {hasImage && imgSrc && (
        <ProjectHeroImage slug={project.slug!} />
      )}
      <span style={{
        position: 'relative',
        zIndex: 2,
        display: 'inline-block',
        background: 'rgba(255,255,255,0.92)',
        color: '#141814',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        padding: '4px 9px',
        borderRadius: 5,
        lineHeight: 1.4,
        maxWidth: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}>
        {project.title}
      </span>
    </div>
  )

  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer"
        style={{ textDecoration: 'none', flexShrink: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {inner}
      </a>
    )
  }
  if (project.slug) {
    return (
      <Link href={`/creating/${project.slug}`}
        style={{ textDecoration: 'none', flexShrink: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {inner}
      </Link>
    )
  }
  return <div style={{ flexShrink: 0 }}>{inner}</div>
}

function ProjectHeroImage({ slug }: { slug: string }) {
  const extensions = ['png', 'jpg', 'webp']
  const [ext, setExt] = useState(0)
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      src={`/images/creating/${slug}/hero.${extensions[ext]}`}
      alt={slug}
      fill
      sizes="184px"
      style={{
        objectFit: 'cover',
        borderRadius: 12,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 200ms',
        zIndex: 1,
      }}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (ext < extensions.length - 1) setExt(e => e + 1)
      }}
    />
  )
}

function ScrollStrip({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  // Tracks whether the pointer moved enough to count as a drag (vs a click).
  // Used to swallow the click that would otherwise navigate a child link.
  const movedRef = useRef(false)

  return (
    <div
      ref={scrollRef}
      style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        paddingBottom: 2,
        cursor: 'grab',
        touchAction: 'pan-x',
        WebkitOverflowScrolling: 'touch',
      }}
      // Kill the browser's native link/image ghost-drag, which hijacks the
      // press-drag-to-scroll gesture on the text-and-link cards.
      onDragStart={e => e.preventDefault()}
      onMouseDown={e => {
        isDraggingRef.current = true
        movedRef.current = false
        startXRef.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0)
        scrollLeftRef.current = scrollRef.current?.scrollLeft ?? 0
        if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing'
      }}
      onMouseMove={e => {
        if (!isDraggingRef.current || !scrollRef.current) return
        e.preventDefault()
        const x = e.pageX - scrollRef.current.offsetLeft
        const delta = x - startXRef.current
        if (Math.abs(delta) > 4) movedRef.current = true
        scrollRef.current.scrollLeft = scrollLeftRef.current - delta
      }}
      onMouseUp={() => {
        isDraggingRef.current = false
        if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
      }}
      onMouseLeave={() => {
        isDraggingRef.current = false
        if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
      }}
      // If the gesture was a drag, swallow the click so child links don't fire.
      onClickCapture={e => {
        if (movedRef.current) {
          e.preventDefault()
          e.stopPropagation()
          movedRef.current = false
        }
      }}
    >
      {children}
    </div>
  )
}

function WritingGallery() {
  return (
    <ScrollStrip>
      {WRITING_POSTS.map(p => (
        <a
          key={p.title}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            flexShrink: 0,
            width: 248,
            display: 'flex',
            flexDirection: 'column',
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.78)',
            borderRadius: 14,
            border: '1px solid rgba(20,24,20,0.06)',
            textDecoration: 'none',
            transition: 'background 150ms',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.95)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.78)')}
        >
          {p.date && (
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em',
              color: 'rgba(20,24,20,0.45)', textTransform: 'uppercase', marginBottom: 6,
            }}>{p.date}</div>
          )}
          <div style={{
            fontFamily: 'var(--font-display)', fontStyle: 'normal',
            fontVariationSettings: '"opsz" 14, "SOFT" 80',
            fontSize: 15, lineHeight: 1.2, color: 'rgba(20,24,20,0.88)',
          }}>{p.title}</div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 11.5, lineHeight: 1.5,
            color: 'rgba(20,24,20,0.55)', marginTop: 7,
          }}>{p.excerpt}</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.06em',
            color: 'var(--color-moss)', marginTop: 10,
          }}>Read on LinkedIn ↗</div>
        </a>
      ))}
    </ScrollStrip>
  )
}


export default function IllustrationCard({
  id, label, description, accentBg, projects,
  size, homeX, homeY, canvasW, canvasH, physics,
  floatDelay, floatDur,
  isExpanded, isDimmed, onExpand, onCollapse, onOverlay,
}: IllustrationCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const hasDragged = useRef(false)

  // Measure the expanded content's natural height so the morph animates to a
  // concrete pixel value instead of 'auto'. A child's offsetHeight is not
  // clamped by the parent's overflow:hidden, so this reads correctly even
  // while the card is collapsed. ResizeObserver keeps it fresh across font/
  // image load and viewport resize.
  const contentRef = useRef<HTMLDivElement>(null)
  const [expandedH, setExpandedH] = useState(size)
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const measure = () => setExpandedH(el.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const xVelocity = useVelocity(mx)
  const rawTilt = useTransform(xVelocity, [-2200, 0, 2200], [-18, 0, 18], { clamp: true })
  const tilt = useSpring(rawTilt, { stiffness: 150, damping: 14, mass: 0.4 })

  const cardH = size
  const constraints = canvasW > 0 && canvasH > 0
    ? {
        left:   -homeX,
        top:    -homeY,
        right:  Math.max(0, canvasW - homeX - size),
        bottom: Math.max(0, canvasH - homeY - cardH),
      }
    : undefined

  const rafRef = useRef<number | null>(null)

  const stopInertia = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  const startInertia = (vx: number, vy: number) => {
    if (!constraints) return
    const { left, right, top, bottom } = constraints
    let last = performance.now()

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const decay = Math.exp(-FRICTION * dt)
      vx *= decay
      vy *= decay

      let x = mx.get() + vx * dt
      let y = my.get() + vy * dt

      if (x <= left)   { x = left;   vx =  Math.abs(vx) * RESTITUTION }
      if (x >= right)  { x = right;  vx = -Math.abs(vx) * RESTITUTION }
      if (y <= top)    { y = top;    vy =  Math.abs(vy) * RESTITUTION }
      if (y >= bottom) { y = bottom; vy = -Math.abs(vy) * RESTITUTION }

      mx.set(x)
      my.set(y)

      if (Math.hypot(vx, vy) > STOP_SPEED) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        rafRef.current = null
      }
    }

    stopInertia()
    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => stopInertia, [])

  const driftRot = id.charCodeAt(0) % 2 === 0 ? 1.0 : -1.0

  const floatAnimate = prefersReducedMotion || isExpanded
    ? { y: 0, rotate: 0, scale: 1 }
    : { y: [0, -5, 0], rotate: [0, driftRot, 0], scale: 1 }

  const floatTransition = prefersReducedMotion || isExpanded
    ? {}
    : {
        y:      { duration: floatDur, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' as const },
        rotate: { duration: floatDur, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' as const },
      }

  // Clamp expanded card width so it doesn't run off screen
  const expandW = Math.min(EXPANDED_W, canvasW - 48)
  const expandedZIndex = isExpanded ? 150 : isDimmed ? 1 : 1

  return (
    <motion.div
      drag={!isExpanded}
      dragConstraints={constraints}
      dragElastic={0}
      dragMomentum={false}
      style={{
        x: mx, y: my,
        rotate: isExpanded ? 0 : tilt,
        position: 'absolute',
        left: 0, top: 0,
        width: size,
        zIndex: isDragging ? 100 : expandedZIndex,
        cursor: isExpanded ? 'default' : isDragging ? 'grabbing' : 'grab',
      }}
      onDragStart={() => { stopInertia(); setIsDragging(true); hasDragged.current = true }}
      onDragEnd={(_, info: PanInfo) => {
        setIsDragging(false)
        if (physics) startInertia(info.velocity.x, info.velocity.y)
        setTimeout(() => { hasDragged.current = false }, 150)
      }}
      animate={{ opacity: isDimmed ? 0.18 : 1 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        animate={isExpanded
          ? { y: 0, rotate: 0, scale: 1 }
          : (isDragging ? { y: 0, rotate: 0, scale: 1.05 } : floatAnimate)
        }
        transition={isExpanded || isDragging
          ? { duration: 0.18, ease: 'easeOut' }
          : floatTransition
        }
        style={{ originX: '50%', originY: '50%' }}
      >
        {/* Card shell — animates from square illustration to expanded panel */}
        <motion.div
          onClick={() => {
            if (hasDragged.current) return
            if (isExpanded) return
            if (onOverlay) { onOverlay(); return }
            onExpand(id)
          }}
          animate={{
            width:  isExpanded ? expandW : size,
            height: isExpanded ? expandedH : size,
            borderRadius: isExpanded ? 20 : 22,
            backgroundColor: isExpanded ? accentBg : 'rgba(0,0,0,0)',
            boxShadow: isExpanded ? OPEN_SHADOW : isDragging ? DRAG_SHADOW : REST_SHADOW,
          }}
          whileHover={!isExpanded && !isDragging ? { scale: 1.04, boxShadow: HOVER_SHADOW } : undefined}
          whileTap={!isExpanded ? { scale: 0.96 } : undefined}
          transition={isExpanded ? SHELL_OPEN : SHELL_CLOSE}
          style={{
            position: 'relative',
            overflow: 'hidden',
            cursor: isExpanded ? 'default' : 'grab',
            userSelect: 'none',
            touchAction: isExpanded ? 'auto' : 'none',
          }}
        >
          {/* Illustration — always absolute so it never reflows; fades out when expanded */}
          <motion.div
            animate={{ opacity: isExpanded ? 0 : 1 }}
            onHoverStart={() => { if (!isExpanded && !isDragging) setIsHovered(true) }}
            onHoverEnd={() => setIsHovered(false)}
            onTapStart={() => { if (!isExpanded) setIsHovered(true) }}
            onTap={() => setIsHovered(false)}
            onTapCancel={() => setIsHovered(false)}
            transition={isExpanded
              ? { duration: 0.2, ease: EASE_MORPH }
              : { duration: 0.3, ease: EASE_MORPH, delay: 0.04 }
            }
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: size, height: size,
            }}
          >
            <Image
              src={`/images/cards/card-${id}.png`}
              alt={label}
              fill
              sizes="(max-width: 700px) 150px, 220px"
              style={{ objectFit: 'cover', borderRadius: 22, pointerEvents: 'none', userSelect: 'none' }}
              draggable={false}
              priority={false}
            />

            {/* Hover title overlay */}
            <motion.div
              animate={{ opacity: isHovered && !isExpanded ? 1 : 0 }}
              transition={{ duration: 0.18 }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 22,
                background: 'linear-gradient(to top, rgba(0,0,0,0.52) 40%, transparent 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '14px 14px',
                pointerEvents: 'none',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'normal',
                fontVariationSettings: '"opsz" 14, "SOFT" 100',
                fontSize: Math.max(13, size * 0.09),
                lineHeight: 1.1,
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                textWrap: 'balance',
              } as React.CSSProperties}>
                {label}
              </span>
            </motion.div>
          </motion.div>

          {/* Expanded content — always mounted; opacity/pointerEvents gate show/hide */}
          <motion.div
            ref={contentRef}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={isExpanded
              ? { duration: 0.26, ease: EASE_MORPH, delay: 0.1 }
              : { duration: 0.16, ease: EASE_MORPH }
            }
            style={{
              pointerEvents: isExpanded ? 'auto' : 'none',
              padding: '18px 18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              minWidth: expandW,
            }}
          >
                {/* Close button */}
                <button
                  onClick={e => { e.stopPropagation(); onCollapse() }}
                  aria-label="Close"
                  style={{
                    position: 'absolute',
                    top: 12, right: 12,
                    width: 28, height: 28,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.18)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: 16,
                    lineHeight: 1,
                    fontFamily: 'sans-serif',
                    zIndex: 10,
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.3)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.18)')}
                >
                  ×
                </button>

                {/* Project thumbnail strip */}
                {projects.length > 0 && (
                  <ScrollStrip>
                    {projects.map(p => (
                      <ProjectThumb key={p.slug || p.href || p.title} project={p} />
                    ))}
                  </ScrollStrip>
                )}

                {/* Writing card — post gallery */}
                {id === 'writing' && <WritingGallery />}

                {/* Title + description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingRight: 32 }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'normal',
                    fontVariationSettings: '"opsz" 36, "SOFT" 60',
                    fontSize: 26,
                    lineHeight: 1.0,
                    letterSpacing: '-0.01em',
                    color: 'rgba(20,24,20,0.9)',
                    textWrap: 'balance',
                  } as React.CSSProperties}>
                    {label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: 'rgba(20,24,20,0.65)',
                    textWrap: 'balance',
                  } as React.CSSProperties}>
                    {description}
                  </div>
                </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
