"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState, useCallback, useRef } from "react"
import { DetailExitContext } from "./detail-exit-context"

const INSET = 12
const RADIUS = 20
const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)"
const EASE_FM: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface OriginRect {
  top: number
  left: number
  width: number
  height: number
}

function readOrigin(): OriginRect | null {
  if (typeof window === "undefined") return null
  const raw = sessionStorage.getItem("detail-origin")
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export default function DetailPageWrapper({
  children,
  fromCard,
}: {
  children: React.ReactNode
  fromCard?: string | null
}) {
  const router = useRouter()
  const navigated = useRef(false)

  const [origin] = useState<OriginRect | null>(readOrigin)
  const [viewport] = useState(() => {
    if (typeof window === "undefined") return { w: 0, h: 0 }
    return { w: window.innerWidth, h: window.innerHeight }
  })
  const [contentVisible, setContentVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    sessionStorage.removeItem("detail-origin")
  }, [])

  const hasOrigin = origin !== null && viewport.w > 0

  useEffect(() => {
    if (!hasOrigin) {
      setContentVisible(true)
      return
    }
    const t = setTimeout(() => setContentVisible(true), 200)
    return () => clearTimeout(t)
  }, [hasOrigin])

  const doNav = useCallback(() => {
    if (navigated.current) return
    navigated.current = true
    router.push(fromCard ? `/?open=${fromCard}` : "/")
  }, [fromCard, router])

  const triggerExit = useCallback(() => {
    if (exiting) return
    setExiting(true)
    setContentVisible(false)
    setTimeout(doNav, 50)
  }, [exiting, doNav])

  if (!hasOrigin) {
    return (
      <DetailExitContext.Provider value={triggerExit}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.3, ease: EASE_FM }}
        >
          {children}
        </motion.div>
      </DetailExitContext.Provider>
    )
  }

  const panelW = viewport.w - INSET * 2
  const panelH = viewport.h - INSET * 2
  const clipTop = Math.max(0, origin.top - INSET)
  const clipLeft = Math.max(0, origin.left - INSET)
  const clipBottom = Math.max(0, panelH - clipTop - origin.height)
  const clipRight = Math.max(0, panelW - clipLeft - origin.width)

  const clipFrom = `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px round 14px)`
  const clipOpen = "inset(0px 0px 0px 0px round 0px)"
  const clipExit = "inset(32% 28% 32% 28% round 24px)"

  return (
    <DetailExitContext.Provider value={triggerExit}>
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(20, 24, 20, 0.3)",
          zIndex: 49,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: exiting ? 0.3 : 0.45, ease: EASE_FM }}
      />

      <motion.div
        style={{
          position: "fixed",
          top: INSET,
          left: INSET,
          right: INSET,
          bottom: INSET,
          borderRadius: RADIUS,
          overflow: "hidden",
          background: "var(--color-base)",
          zIndex: 50,
          boxShadow: "0 24px 80px -16px rgba(20, 24, 20, 0.25)",
          willChange: "clip-path",
        }}
        initial={{ clipPath: clipFrom, opacity: 0.85 }}
        animate={{
          clipPath: exiting ? clipExit : clipOpen,
          opacity: exiting ? 0 : 1,
        }}
        transition={{
          clipPath: { duration: exiting ? 0.4 : 0.5, ease: EASE_FM },
          opacity: { duration: exiting ? 0.35 : 0.3, ease: EASE_FM },
        }}
        onAnimationComplete={() => {
          if (exiting) doNav()
        }}
      >
        <div
          style={{
            height: "100%",
            overflowY: "auto",
            opacity: contentVisible && !exiting ? 1 : 0,
            transition: `opacity ${exiting ? "0.15s" : "0.35s"} ${EASE_CSS}`,
          }}
        >
          {children}
        </div>
      </motion.div>
    </DetailExitContext.Provider>
  )
}
