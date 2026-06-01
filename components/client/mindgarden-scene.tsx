"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { HOME_CARDS, DESIGN_W, DESIGN_H } from "@/lib/cards"
import { THUMBS } from "@/components/client/thumbnails"
import PolaroidCard from "@/components/client/polaroid-card"
import PeekOverlay from "@/components/client/peek-overlay"

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const SPRING_POP = { type: "spring" as const, stiffness: 180, damping: 18, mass: 0.9 }

const CARD_STAGGER_S = 0.18
const TOTAL_CARDS = HOME_CARDS.length
const DONE_DELAY_MS = TOTAL_CARDS * CARD_STAGGER_S * 1000 + 1200

export default function MindgardenScene() {
  const [peekId, setPeekId]     = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [viewSize, setViewSize] = useState({ w: DESIGN_W, h: DESIGN_H })
  // Start in "intro" — useEffect transitions to "done" after animation or immediately if already seen
  const [phase, setPhase]       = useState<"intro" | "done">("intro")
  const prefersReducedMotion    = useReducedMotion()

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768)
      setViewSize({ w: window.innerWidth, h: window.innerHeight })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    // Skip intro if reduced motion or already seen this session
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

  const peekCard  = HOME_CARDS.find(c => c.id === peekId)
  const introDone = phase === "done"

  // ── Canvas scaling: fit the design canvas centered in the viewport ──
  const canvasScale = useMemo(() => {
    if (isMobile) return 1
    const sx = viewSize.w / DESIGN_W
    const sy = viewSize.h / DESIGN_H
    return Math.min(sx, sy, 1.1) // allow slight upscale on huge monitors
  }, [viewSize, isMobile])

  return (
    <>
      <div
        className="garden-bg"
        style={{ position: "relative", minHeight: "100dvh", overflow: "hidden" }}
      >
        <div className="garden-grain" />

        {/* "Patrick" wordmark — fades in after cards have settled */}
        <div style={{
          position: "absolute",
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: isMobile ? 260 : 420,
          zIndex: 5,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 8 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: introDone ? 0.15 : 0 }}
          >
            <button
              onClick={() => setPeekId("about")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "block",
                width: "100%",
                marginBottom: isMobile ? 12 : 22,
              }}
              aria-label="About Patrick"
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: isMobile ? 58 : 108,
                  lineHeight: 0.95,
                  fontVariationSettings: '"opsz" 144, "SOFT" 30',
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                  transition: "opacity 150ms",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Patrick
              </div>
            </button>
            <p style={{
              margin: "0 auto",
              maxWidth: isMobile ? 200 : 300,
              fontSize: isMobile ? 11.5 : 13,
              lineHeight: 1.6,
              fontFamily: "var(--font-body)",
              color: "var(--color-ink-muted)",
              textAlign: "center",
              textWrap: "balance",
              pointerEvents: "none",
            } as React.CSSProperties}>
              designer · developer · musician · Berlin
            </p>
          </motion.div>
        </div>

        {/* ── Card canvas — centered + scaled to viewport ── */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: DESIGN_W,
              height: DESIGN_H,
              transform: `translate(-50%, -50%) scale(${canvasScale})`,
              transformOrigin: "center center",
              pointerEvents: "none", // let cards handle their own pointer events
            }}
          >
            {HOME_CARDS.map((card) => {
              const pos      = card.desktop
              const cardSize = card.size
              const Thumb    = THUMBS[card.id]
              const dimmed   = peekId !== null && peekId !== card.id
              const entrance = card.entrance
              const delay    = entrance.rank * CARD_STAGGER_S

              // Cards emanate FROM center outward to their scattered positions
              const centerX = DESIGN_W / 2 - cardSize / 2
              const centerY = DESIGN_H / 2 - cardSize / 2

              // Opacity fades in LATER than position starts — card is invisible during flight,
              // only materializes near its final spot with a hint of remaining drift
              const opacityDelay = (phase === "intro" ? delay + 0.35 : 0)
              const posDelay     = (phase === "intro" ? delay : 0)

              return (
                <motion.div
                  key={card.id}
                  style={{ pointerEvents: "auto" }}
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    x: centerX,
                    y: centerY,
                    rotate: entrance.startRot,
                  }}
                  animate={{
                    opacity: dimmed ? 0.2 : 1,
                    scale: 1,
                    x: pos.x,
                    y: pos.y,
                    rotate: pos.rot,
                  }}
                  transition={{
                    // Position: spring starts early (card flies invisibly)
                    x: { type: "spring", stiffness: 90, damping: 16, mass: 1.2, delay: posDelay },
                    y: { type: "spring", stiffness: 90, damping: 16, mass: 1.2, delay: posDelay },
                    // Scale: gentle scale-up timed with opacity
                    scale: { type: "spring", stiffness: 200, damping: 22, delay: opacityDelay },
                    // Rotation: settles with position
                    rotate: { type: "spring", stiffness: 90, damping: 16, delay: posDelay },
                    // Opacity: delayed so card only appears near final position
                    opacity: { duration: 0.4, ease: EASE_OUT, delay: opacityDelay },
                  }}
                >
                  <PolaroidCard
                    id={card.id}
                    label={card.label}
                    x={0}
                    y={0}
                    rot={0}
                    size={cardSize}
                    behavior={card.behavior}
                    destination={card.destination}
                    floatDelay={entrance.rank * 0.6}
                    floatDur={7 + (entrance.rank % 4)}
                    onPeek={setPeekId}
                  >
                    {Thumb ? <Thumb /> : null}
                  </PolaroidCard>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* ── Mobile cards — simple vertical stack ── */}
        {isMobile && (
          <div style={{ position: "relative", minHeight: "100dvh" }}>
            {HOME_CARDS.map((card, i) => {
              const pos      = card.mobile
              const cardSize = card.mobile.size
              const Thumb    = THUMBS[card.id]
              const dimmed   = peekId !== null && peekId !== card.id
              const delay    = card.entrance.rank * CARD_STAGGER_S

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{
                    opacity: dimmed ? 0.2 : 1,
                    scale: 1,
                  }}
                  transition={{
                    ...SPRING_POP,
                    delay: phase === "intro" ? delay : 0,
                    opacity: {
                      duration: 0.3,
                      ease: EASE_OUT,
                      delay: phase === "intro" ? delay : 0,
                    },
                  }}
                >
                  <PolaroidCard
                    id={card.id}
                    label={card.label}
                    x={pos.x}
                    y={pos.y}
                    rot={pos.rot}
                    size={cardSize}
                    behavior={card.behavior}
                    destination={card.destination}
                    floatDelay={i * 0.4}
                    floatDur={7 + (i % 4)}
                    onPeek={setPeekId}
                  >
                    {Thumb ? <Thumb /> : null}
                  </PolaroidCard>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Chat bar */}
        <div style={{
          position: "absolute",
          bottom: isMobile ? 28 : 32,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 20,
          padding: "0 60px",
        }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: introDone ? 0.3 : 0 }}
            style={{ width: isMobile ? "100%" : "auto" }}
          >
            <div className="chatbar" style={isMobile ? { width: "100%" } : undefined}>
              <input
                placeholder="What would you like to know?"
                readOnly
                style={isMobile ? { fontSize: 13 } : undefined}
              />
              <button className="chatbar-send" aria-label="Send">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5" /><path d="M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <PeekOverlay
        id={peekId}
        label={peekCard?.label ?? ""}
        onClose={() => setPeekId(null)}
      />
    </>
  )
}
