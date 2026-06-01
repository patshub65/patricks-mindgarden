"use client"

import { motion, useMotionValue, useReducedMotion } from "framer-motion"
import { useState, useRef } from "react"
import Link from "next/link"
import type { CardBehavior } from "@/lib/cards"

const SPRING = { type: "spring" as const, stiffness: 180, damping: 22 }

interface PolaroidCardProps {
  id: string
  label: string
  x: number
  y: number
  rot: number
  size: number
  behavior: CardBehavior
  destination?: string
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
  id, label, x, y, rot, size, behavior, destination,
  floatDelay, floatDur, children, onPeek,
}: PolaroidCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const mx = useMotionValue(x)
  const my = useMotionValue(y)
  const [isDragging, setIsDragging] = useState(false)
  // Stays true long enough for the click event to fire after onDragEnd
  const hasDragged = useRef(false)

  // Subtle rotation wobble during idle float — works even when rot=0
  const driftRot = id.charCodeAt(0) % 2 === 0 ? 1.2 : -1.2

  const floatAnimate = prefersReducedMotion
    ? { rotate: rot, y: 0, scale: 1 }
    : { y: [0, -4, 0], rotate: [rot, rot + driftRot, rot], scale: 1 }

  const floatTransition = prefersReducedMotion
    ? {}
    : {
        y: { duration: floatDur, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' as const },
        rotate: { duration: floatDur, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' as const },
        scale: SPRING,
      }

  function LabelEl() {
    if (behavior === 'navigate' && destination) {
      return (
        <Link
          href={destination}
          onClick={(e) => { if (hasDragged.current) e.preventDefault() }}
          style={LABEL_STYLE}
        >
          {label}
        </Link>
      )
    }
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
      dragMomentum={false}
      dragElastic={0}
      style={{
        x: mx, y: my,
        position: 'absolute',
        left: 0, top: 0,
        width: size,
        zIndex: isDragging ? 100 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onDragStart={() => { setIsDragging(true); hasDragged.current = true }}
      onDragEnd={() => {
        setIsDragging(false)
        // Delay reset so the click event that fires on mouseup sees hasDragged = true
        setTimeout(() => { hasDragged.current = false }, 150)
      }}
      whileTap={{ cursor: 'grabbing' }}
    >
      <motion.div
        className={`polaroid${isDragging ? ' dragging' : ''}`}
        animate={isDragging
          ? { y: 0, rotate: rot, scale: 1.05 }
          : floatAnimate
        }
        transition={isDragging
          ? { duration: 0.2, ease: 'easeOut' }
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
