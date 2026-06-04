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
import type { CardBehavior } from "@/lib/cards"

// Custom throw physics: a flung card reflects off a wall and keeps gliding in the
// bounce direction, slowly decelerating to a stop — no spring oscillation at the edge.
const FRICTION = 1.6      // exponential velocity decay per second (lower = glides longer)
const RESTITUTION = 0.6   // fraction of speed kept after a wall bounce
const STOP_SPEED = 16     // px/s below which the glide settles

interface PolaroidCardProps {
  id: string
  label: string
  size: number
  behavior: CardBehavior
  destination?: string
  /** Base position in the parent canvas's coordinate space — used for constraint math. */
  homeX: number
  homeY: number
  /** Parent canvas dimensions (design units) — the walls the card bounces off. */
  canvasW: number
  canvasH: number
  /** Throw momentum + edge bounce. Off on mobile / reduced motion. */
  physics: boolean
  floatDelay: number
  floatDur: number
  children: React.ReactNode
  onPeek: (id: string) => void
}

const LABEL_STYLE: React.CSSProperties = {
  position: 'absolute',
  left: 0, right: 0, bottom: 0,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 10px',
  fontFamily: 'var(--font-display)',
  fontStyle: 'italic',
  fontVariationSettings: '"opsz" 14, "SOFT" 100',
  fontSize: 14,
  color: 'var(--color-ink)',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  cursor: 'pointer',
  textDecoration: 'none',
  userSelect: 'none',
}

export default function PolaroidCard({
  id, label, size, behavior, destination,
  homeX, homeY, canvasW, canvasH, physics,
  floatDelay, floatDur, children, onPeek,
}: PolaroidCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  // Stays true long enough for the click event to fire after onDragEnd
  const hasDragged = useRef(false)

  // Velocity-driven tilt: the card leans into the direction it's flung, then relaxes.
  // This is the single biggest "physical object" cue.
  const xVelocity = useVelocity(mx)
  const rawTilt = useTransform(xVelocity, [-2200, 0, 2200], [-26, 0, 26], { clamp: true })
  const tilt = useSpring(rawTilt, { stiffness: 150, damping: 14, mass: 0.4 })

  // Card footprint (frame + label) — keeps the whole card inside the walls when bouncing.
  const cardW = size
  const cardH = size + 34

  const constraints = physics
    ? {
        left: -homeX,
        top: -homeY,
        right: Math.max(0, canvasW - homeX - cardW),
        bottom: Math.max(0, canvasH - homeY - cardH),
      }
    : undefined

  // ── Custom throw inertia: reflect off walls, glide on, decelerate to rest ──
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

      // Reflect at each wall: clamp to the edge and reverse that axis, bleeding energy
      if (x <= left)   { x = left;   vx = Math.abs(vx) * RESTITUTION }
      if (x >= right)  { x = right;  vx = -Math.abs(vx) * RESTITUTION }
      if (y <= top)    { y = top;    vy = Math.abs(vy) * RESTITUTION }
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

  // Subtle rotation wobble during idle float — oscillates around 0 (base tilt lives on the wrapper)
  const driftRot = id.charCodeAt(0) % 2 === 0 ? 1.2 : -1.2

  const floatAnimate = prefersReducedMotion
    ? { y: 0, rotate: 0, scale: 1 }
    : { y: [0, -4, 0], rotate: [0, driftRot, 0], scale: 1 }

  const floatTransition = prefersReducedMotion
    ? {}
    : {
        y: { duration: floatDur, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' as const },
        rotate: { duration: floatDur, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' as const },
      }

  function LabelEl() {
    if (behavior === 'external' && destination) {
      return (
        <a
          href={destination}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => { if (hasDragged.current) e.preventDefault() }}
          style={LABEL_STYLE}
        >
          {label}
        </a>
      )
    }
    return (
      <button
        onClick={() => { if (!hasDragged.current) onPeek(id) }}
        style={{ ...LABEL_STYLE, background: 'none', border: 'none' }}
      >
        {label}
      </button>
    )
  }

  return (
    <motion.div
      drag
      dragConstraints={constraints}
      dragElastic={0}
      dragMomentum={false}
      style={{
        x: mx, y: my,
        rotate: tilt,
        position: 'absolute',
        left: 0, top: 0,
        width: size,
        zIndex: isDragging ? 100 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onDragStart={() => { stopInertia(); setIsDragging(true); hasDragged.current = true }}
      onDragEnd={(_, info: PanInfo) => {
        setIsDragging(false)
        if (physics) startInertia(info.velocity.x, info.velocity.y)
        // Delay reset so the click event that fires on mouseup sees hasDragged = true
        setTimeout(() => { hasDragged.current = false }, 150)
      }}
      whileTap={{ cursor: 'grabbing' }}
    >
      <motion.div
        className={`polaroid${isDragging ? ' dragging' : ''}`}
        animate={isDragging
          ? { y: 0, rotate: 0, scale: 1.06 }
          : floatAnimate
        }
        transition={isDragging
          ? { duration: 0.18, ease: 'easeOut' }
          : floatTransition
        }
        style={{ originX: '50%', originY: '50%' }}
      >
        <div className="thumb">{children}</div>
        <LabelEl />
      </motion.div>
    </motion.div>
  )
}
