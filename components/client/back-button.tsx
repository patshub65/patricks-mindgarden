"use client"

import { ArrowLeft } from "@phosphor-icons/react"
import { useDetailExit } from "./detail-exit-context"

const CARD_LABELS: Record<string, string> = {
  'ux-ui': 'UX/UI Design',
  'web': 'Web Design',
  'brand': 'Art & Brand',
  'product': 'Product Building',
  'writing': 'Written Things',
  'music': 'Music Production',
  'video': 'Music Video',
  'visuals': 'Visual Gallery',
}

export default function BackButton({
  fromCard,
  variant = 'top',
}: {
  fromCard?: string | null
  variant?: 'top' | 'footer'
}) {
  const triggerExit = useDetailExit()
  const label = fromCard ? (CARD_LABELS[fromCard] ?? 'the garden') : 'the garden'

  if (variant === 'footer') {
    return (
      <button
        onClick={() => triggerExit?.()}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          fontStyle: 'normal',
          fontVariationSettings: '"opsz" 14, "SOFT" 80',
          fontSize: 15,
          color: 'var(--color-ink-muted)',
          transition: 'color 150ms',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-ink-muted)')}
      >
        ← back to the garden
      </button>
    )
  }

  return (
    <button
      onClick={() => triggerExit?.()}
      aria-label={`Back to ${label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: 'var(--color-ink-muted)',
        transition: 'color 150ms',
        marginBottom: 32,
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-ink-muted)')}
    >
      <ArrowLeft size={14} weight="regular" />
      <span>{label}</span>
    </button>
  )
}
