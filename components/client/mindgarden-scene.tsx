"use client"

import { useState, useEffect, useMemo, useRef, FormEvent, useCallback } from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { HOME_CARDS, DESIGN_W, DESIGN_H } from "@/lib/cards"
import { THUMBS } from "@/components/client/thumbnails"
import PolaroidCard from "@/components/client/polaroid-card"
import PeekOverlay from "@/components/client/peek-overlay"

interface ChatMessage { id: string; role: "user" | "assistant"; content: string }

function useStreamingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const submit = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: text }
    const allMessages = [...messages, userMsg]
    setMessages(allMessages)
    setInput("")
    setIsLoading(true)

    const assistantId = (Date.now() + 1).toString()
    setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages.map(m => ({ role: m.role, content: m.content })) }),
      })
      if (!res.body) throw new Error("No response body")
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      while (!done) {
        const { value, done: streamDone } = await reader.read()
        done = streamDone
        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: m.content + chunk } : m))
        }
      }
    } catch {
      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: "Something went wrong. Please try again." } : m))
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  return { messages, input, setInput, isLoading, submit }
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const SPRING_POP = { type: "spring" as const, stiffness: 180, damping: 18, mass: 0.9 }

// Deck-deal stagger — cards leave the center stack one after another
const CARD_STAGGER_S = 0.1
const TOTAL_CARDS = HOME_CARDS.length
const DONE_DELAY_MS = TOTAL_CARDS * CARD_STAGGER_S * 1000 + 1400

export default function MindgardenScene() {
  const [peekId, setPeekId]       = useState<string | null>(null)
  const [isMobile, setIsMobile]   = useState(false)
  const [viewSize, setViewSize]   = useState({ w: DESIGN_W, h: DESIGN_H })
  const [chatOpen, setChatOpen]   = useState(false)
  const [phase, setPhase]         = useState<"intro" | "done">("intro")
  const prefersReducedMotion      = useReducedMotion()
  const messagesEndRef             = useRef<HTMLDivElement>(null)

  const { messages, input, setInput, isLoading, submit } = useStreamingChat()

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768)
      setViewSize({ w: window.innerWidth, h: window.innerHeight })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Re-open card peek when returning from a detail page via ?open=CARD_ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const open = params.get("open")
    if (open) {
      setPeekId(open)
      window.history.replaceState({}, "", "/")
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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

              // Deck deal: every card starts stacked at center, then is flung out
              // spinning to its scattered spot, overshooting and wobbling to rest.
              const centerX = DESIGN_W / 2 - cardSize / 2
              const centerY = DESIGN_H / 2 - cardSize / 2

              const posDelay = phase === "intro" ? delay : 0

              return (
                <motion.div
                  key={card.id}
                  style={{ pointerEvents: "auto", position: "absolute", left: 0, top: 0 }}
                  initial={{
                    opacity: 0,
                    scale: 0.92,
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
                    // Position: bouncy spring (low damping) → overshoot + wobble on landing
                    x: { type: "spring", stiffness: 130, damping: 13, delay: posDelay },
                    y: { type: "spring", stiffness: 130, damping: 13, delay: posDelay },
                    // Rotation: spins from the dramatic launch angle to its resting tilt
                    rotate: { type: "spring", stiffness: 120, damping: 12, delay: posDelay },
                    scale: { type: "spring", stiffness: 200, damping: 18, delay: posDelay },
                    // Opacity: snaps on just before the card leaves the stack
                    opacity: { duration: 0.2, ease: EASE_OUT, delay: phase === "intro" ? Math.max(0, posDelay - 0.04) : 0 },
                  }}
                >
                  <PolaroidCard
                    id={card.id}
                    label={card.label}
                    homeX={pos.x}
                    homeY={pos.y}
                    canvasW={DESIGN_W}
                    canvasH={DESIGN_H}
                    physics={!prefersReducedMotion}
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
                  style={{ position: "absolute", left: 0, top: 0 }}
                  initial={{ opacity: 0, scale: 0.6, x: pos.x, y: pos.y, rotate: pos.rot }}
                  animate={{
                    opacity: dimmed ? 0.2 : 1,
                    scale: 1,
                    x: pos.x,
                    y: pos.y,
                    rotate: pos.rot,
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
                    homeX={pos.x}
                    homeY={pos.y}
                    canvasW={viewSize.w}
                    canvasH={viewSize.h}
                    physics={false}
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

        {/* Chat area */}
        <div style={{
          position: "absolute",
          bottom: isMobile ? 28 : 32,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 20,
          padding: "0 60px",
          gap: 10,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: introDone ? 0.3 : 0 }}
            style={{ width: isMobile ? "100%" : 420, display: "flex", flexDirection: "column", gap: 10 }}
          >
            {/* Message thread */}
            <AnimatePresence initial={false}>
              {chatOpen && messages.length > 0 && (
                <motion.div
                  key="chat-thread"
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  style={{
                    background: "var(--color-surface-raised)",
                    borderRadius: 20,
                    padding: 16,
                    boxShadow: "var(--shadow-lg)",
                    maxHeight: 300,
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {messages.map(m => (
                    <div key={m.id} style={{
                      display: "flex",
                      justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                    }}>
                      <div style={{
                        maxWidth: "80%",
                        padding: "8px 12px",
                        borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        background: m.role === "user" ? "var(--color-moss)" : "var(--color-surface)",
                        color: m.role === "user" ? "white" : "var(--color-ink)",
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        lineHeight: 1.55,
                        border: m.role === "assistant" ? "1px solid var(--color-ink-hair)" : "none",
                      }}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div style={{ display: "flex", gap: 4, paddingLeft: 8 }}>
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-ink-muted)" }}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input bar */}
            <form
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                setChatOpen(true)
                submit(input)
              }}
            >
              <div className="chatbar" style={isMobile ? { width: "100%" } : undefined}>
                <input
                  placeholder="What would you like to know?"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  style={isMobile ? { fontSize: 13 } : undefined}
                  onFocus={() => setChatOpen(true)}
                  disabled={isLoading}
                />
                <button className="chatbar-send" aria-label="Send" type="submit" disabled={isLoading || !input.trim()}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5" /><path d="M5 12l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </form>
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
