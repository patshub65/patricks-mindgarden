"use client"

import { useState, useEffect, useMemo, useRef, FormEvent, useCallback } from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { ChatCircleDots, CaretDown } from "@phosphor-icons/react"
import { HOME_CARDS, resolveLayout } from "@/lib/cards"
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

// Deck-deal stagger — cards leave the center stack one after another
const CARD_STAGGER_S = 0.1
const TOTAL_CARDS = HOME_CARDS.length
const DONE_DELAY_MS = TOTAL_CARDS * CARD_STAGGER_S * 1000 + 1400

export default function MindgardenScene() {
  const [peekId, setPeekId]       = useState<string | null>(null)
  const [viewSize, setViewSize]   = useState({ w: 1440, h: 800 })
  const [mounted, setMounted]     = useState(false)
  const [chatOpen, setChatOpen]   = useState(false)
  const [chatExpanded, setChatExpanded] = useState(false)
  const [phase, setPhase]         = useState<"intro" | "done">("intro")
  const prefersReducedMotion      = useReducedMotion()
  const messagesEndRef             = useRef<HTMLDivElement>(null)
  const inputRef                   = useRef<HTMLInputElement>(null)

  const { messages, input, setInput, isLoading, submit } = useStreamingChat()

  useEffect(() => {
    const update = () => setViewSize({ w: window.innerWidth, h: window.innerHeight })
    update()
    setMounted(true)
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

  // Focus the input the moment the mobile chat expands.
  useEffect(() => {
    if (chatExpanded) inputRef.current?.focus()
  }, [chatExpanded])

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

  // ── Resolve the responsive scatter from the live viewport ──
  const layout   = useMemo(() => resolveLayout(viewSize.w, viewSize.h), [viewSize])
  const isMobile = layout.mode === "mobile"

  // Fluid wordmark size — scales smoothly with the viewport, never a binary jump.
  const wordmarkSize = isMobile
    ? Math.round(Math.max(46, Math.min(viewSize.w * 0.15, 66)))
    : Math.round(Math.max(54, Math.min(Math.min(viewSize.w, 1600) * 0.072, 112)))

  // Wordmark sits in the centre clearing on wide, in a clear top band on mobile.
  const wordmarkTop  = isMobile ? Math.round(layout.stageH * 0.085) : "50%"
  const wordmarkTransform = isMobile ? "translate(-50%, 0)" : "translate(-50%, -50%)"

  // On mobile the chat starts as a compact launcher button so it doesn't eat the
  // bottom of the scene; tapping it reveals the full input + thread. Wide is always on.
  const showChatPanel = !isMobile || chatExpanded

  return (
    <>
      <div
        className="garden-bg"
        style={{
          position: "relative",
          minHeight: isMobile ? layout.stageH : "100dvh",
          overflow: "hidden",
        }}
      >
        <div className="garden-grain" />

        {/* "Patrick" wordmark — fades in after cards have settled */}
        <div style={{
          position: "absolute",
          left: "50%", top: wordmarkTop,
          transform: wordmarkTransform,
          textAlign: "center",
          width: isMobile ? 260 : 420,
          maxWidth: "86vw",
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
                marginBottom: isMobile ? 10 : 18,
              }}
              aria-label="About Patrick"
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: wordmarkSize,
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
              maxWidth: isMobile ? 220 : 300,
              fontSize: isMobile ? 12 : 13,
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

        {/* ── Card scatter — real pixel positions, reflowed to the viewport ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {mounted && layout.cards.map((card) => {
            const Thumb  = THUMBS[card.id]
            const dimmed = peekId !== null && peekId !== card.id
            const delay  = card.entrance.rank * CARD_STAGGER_S
            const posDelay = phase === "intro" ? delay : 0

            // Wide: deck-deal — every card starts stacked at stage centre, then is
            // flung out spinning to its spot. Mobile: a calmer pop in place.
            const centerX = layout.stageW / 2 - card.size / 2
            const centerY = layout.stageH / 2 - card.size / 2

            const initial = isMobile
              ? { opacity: 0, scale: 0.6, x: card.x, y: card.y, rotate: card.rot }
              : { opacity: 0, scale: 0.92, x: centerX, y: centerY, rotate: card.entrance.startRot }

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

            return (
              <motion.div
                key={card.id}
                style={{ pointerEvents: "auto", position: "absolute", left: 0, top: 0 }}
                initial={initial}
                animate={{
                  opacity: dimmed ? 0.2 : 1,
                  scale: 1,
                  x: card.x,
                  y: card.y,
                  rotate: card.rot,
                }}
                transition={transition}
              >
                <PolaroidCard
                  id={card.id}
                  label={card.label}
                  homeX={card.x}
                  homeY={card.y}
                  canvasW={layout.stageW}
                  canvasH={layout.stageH}
                  physics={!isMobile && !prefersReducedMotion}
                  size={card.size}
                  behavior={card.behavior}
                  destination={card.destination}
                  floatDelay={card.entrance.rank * 0.6}
                  floatDur={7 + (card.entrance.rank % 4)}
                  onPeek={setPeekId}
                >
                  {Thumb ? <Thumb /> : null}
                </PolaroidCard>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Chat area — fixed to the viewport so it stays reachable while the
          mobile garden scrolls behind it. */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 20,
        // Mobile: the collapsed launcher sits level with the bottom corner buttons;
        // the expanded input lifts above them so the full-width pill doesn't collide.
        padding: !isMobile
          ? "0 24px max(24px, env(safe-area-inset-bottom))"
          : chatExpanded
            ? "0 20px max(92px, calc(env(safe-area-inset-bottom) + 84px))"
            : "0 20px max(32px, env(safe-area-inset-bottom))",
        pointerEvents: "none",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: introDone ? 0.3 : 0 }}
          style={{
            width: "100%",
            maxWidth: 420,
            display: "flex",
            flexDirection: "column",
            alignItems: showChatPanel ? "stretch" : "center",
            gap: 10,
            pointerEvents: "auto",
          }}
        >
          {/* Mobile launcher — compact button that opens the chat */}
          {!showChatPanel && (
            <motion.button
              type="button"
              onClick={() => { setChatExpanded(true); setChatOpen(true) }}
              aria-label="Ask me anything about Patrick"
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "var(--color-surface-raised)",
                borderRadius: "var(--radius-full)",
                padding: "12px 20px",
                boxShadow: "var(--shadow-pill)",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--color-ink)",
              }}
            >
              <ChatCircleDots size={19} weight="light" color="var(--color-moss)" />
              Ask me anything
            </motion.button>
          )}

          {/* Message thread */}
          {showChatPanel && (
          <>
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
            <div className="chatbar" style={{ width: "100%", paddingLeft: isMobile ? 10 : undefined }}>
              {isMobile && (
                <button
                  type="button"
                  onClick={() => setChatExpanded(false)}
                  aria-label="Close chat"
                  style={{
                    flexShrink: 0,
                    width: 30, height: 30,
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-surface)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-ink-muted)",
                  }}
                >
                  <CaretDown size={15} weight="bold" />
                </button>
              )}
              <input
                ref={inputRef}
                placeholder="What would you like to know?"
                value={input}
                onChange={e => setInput(e.target.value)}
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
          </>
          )}
        </motion.div>
      </div>

      <PeekOverlay
        id={peekId}
        label={peekCard?.label ?? ""}
        onClose={() => setPeekId(null)}
      />
    </>
  )
}
