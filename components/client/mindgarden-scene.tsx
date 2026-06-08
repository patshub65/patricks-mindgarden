"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { resolveLayout } from "@/lib/cards"
import IllustrationCard from "@/components/client/illustration-card"
import GalleryOverlay from "@/components/client/gallery-overlay"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const CARD_STAGGER_S = 0.1
const TOTAL_CARDS = 6
const DONE_DELAY_MS = TOTAL_CARDS * CARD_STAGGER_S * 1000 + 1200

export default function MindgardenScene() {
  const [expandedId, setExpandedId]   = useState<string | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [viewSize, setViewSize]       = useState({ w: 1440, h: 800 })
  const [mounted, setMounted]         = useState(false)
  const [phase, setPhase]             = useState<"intro" | "done">("intro")
  const prefersReducedMotion          = useReducedMotion()

  useEffect(() => {
    const update = () => setViewSize({ w: window.innerWidth, h: window.innerHeight })
    update()
    setMounted(true)
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || sessionStorage.getItem("intro-seen")) {
      setPhase("done")
      return
    }
    const t = setTimeout(() => {
      setPhase("done")
      sessionStorage.setItem("intro-seen", "1")
    }, DONE_DELAY_MS)
    return () => clearTimeout(t)
  }, [prefersReducedMotion])

  // Collapse on Escape
  useEffect(() => {
    if (!expandedId) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpandedId(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expandedId])

  const introDone = phase === "done"
  const layout    = useMemo(() => resolveLayout(viewSize.w, viewSize.h), [viewSize])
  const isMobile  = layout.mode === "mobile"

  const heroTop       = isMobile ? 88 : "50%"
  const heroTransform = isMobile ? "translate(-50%, 0)" : "translate(-50%, -50%)"
  const heroW         = isMobile ? viewSize.w - 40 : 680
  const heroMaxW      = "90vw"

  return (
    <div
      style={{
        position: "relative",
        minHeight: isMobile ? layout.stageH : "100dvh",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed gradient background */}
      <div className="garden-bg" />
      <div className="garden-grain" />

      {/* Click-outside to collapse expanded card */}
      {expandedId && (
        <div
          style={{ position: "absolute", inset: 0, zIndex: 80, cursor: "default" }}
          onClick={() => setExpandedId(null)}
        />
      )}

      {/* Hero text — fades in after cards settle */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: heroTop,
        transform: heroTransform,
        textAlign: "center",
        width: heroW,
        maxWidth: heroMaxW,
        zIndex: 3,
        pointerEvents: "none",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 10 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: introDone ? 0.2 : 0 }}
        >
          <h1 style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontVariationSettings: '"opsz" 72, "SOFT" 20',
            fontSize: isMobile ? "clamp(36px, 10vw, 52px)" : "clamp(44px, 4.5vw, 68px)",
            lineHeight: 1.0,
            letterSpacing: "-0.025em",
            color: "rgba(255,255,255,0.96)",
            textShadow: "0 2px 24px rgba(0,0,0,0.15)",
            textWrap: "balance",
            marginBottom: isMobile ? 10 : 14,
          } as React.CSSProperties}>
            I design, create and play.
          </h1>
          <p style={{
            margin: 0,
            maxWidth: isMobile ? 260 : 480,
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: isMobile ? 13 : 14,
            lineHeight: 1.6,
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.72)",
            textAlign: "center",
            textWrap: "balance",
            textShadow: "0 1px 8px rgba(0,0,0,0.12)",
          } as React.CSSProperties}>
            I&rsquo;m Patrick, a designer with 8+ years in the industry, developer in training, AI-native creative and budding musician.
          </p>
        </motion.div>
      </div>

      {/* Card scatter */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {mounted && layout.cards.map((card) => {
          const isDimmed  = expandedId !== null && expandedId !== card.id
          const isExpanded = expandedId === card.id
          const delay     = card.entrance.rank * CARD_STAGGER_S
          const posDelay  = phase === "intro" ? delay : 0

          const centerX = layout.stageW / 2 - card.size / 2
          const centerY = layout.stageH / 2 - card.size / 2

          const initial = isMobile
            ? { opacity: 0, scale: 0.6, x: card.x, y: card.y, rotate: card.rot }
            : { opacity: 0, scale: 0.9, x: centerX, y: centerY, rotate: card.entrance.startRot }

          const transition = isMobile
            ? {
                ...{ type: "spring" as const, stiffness: 180, damping: 18, mass: 0.9 },
                delay: posDelay,
                opacity: { duration: 0.3, ease: EASE_OUT, delay: posDelay },
              }
            : {
                x: { type: "spring" as const, stiffness: 130, damping: 13, delay: posDelay },
                y: { type: "spring" as const, stiffness: 130, damping: 13, delay: posDelay },
                rotate: { type: "spring" as const, stiffness: 120, damping: 12, delay: posDelay },
                scale: { type: "spring" as const, stiffness: 200, damping: 18, delay: posDelay },
                opacity: { duration: 0.2, ease: EASE_OUT, delay: phase === "intro" ? Math.max(0, posDelay - 0.04) : 0 },
              }

          // On mobile, center the expanded card horizontally so right-column cards don't clip
          const expandW = Math.min(360, layout.stageW - 48)
          const targetX = isExpanded && isMobile ? (layout.stageW - expandW) / 2 : card.x

          return (
            <motion.div
              key={card.id}
              style={{ pointerEvents: "auto", position: "absolute", left: 0, top: 0, zIndex: isExpanded ? 90 : 8 }}
              initial={initial}
              animate={{
                opacity: 1,
                scale: 1,
                x: targetX,
                y: card.y,
                rotate: card.rot,
              }}
              transition={transition}
            >
              <IllustrationCard
                id={card.id}
                label={card.label}
                description={card.description}
                accentBg={card.accentBg}
                projects={card.projects}
                homeX={card.x}
                homeY={card.y}
                canvasW={layout.stageW}
                canvasH={layout.stageH}
                physics={!isMobile && !prefersReducedMotion}
                size={card.size}
                floatDelay={card.entrance.rank * 0.6}
                floatDur={7 + (card.entrance.rank % 4)}
                isExpanded={isExpanded}
                isDimmed={isDimmed}
                onExpand={setExpandedId}
                onCollapse={() => setExpandedId(null)}
                onOverlay={card.id === 'visuals' ? () => setGalleryOpen(true) : undefined}
              />
            </motion.div>
          )
        })}
      </div>

      <GalleryOverlay open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </div>
  )
}
