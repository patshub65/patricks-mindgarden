"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EnvelopeSimple, LinkedinLogo, DownloadSimple, ShareNetwork, User } from "@phosphor-icons/react"
import AboutOverlay from "@/components/client/about-overlay"

const SPRING = { type: "spring" as const, stiffness: 300, damping: 28 }

const CONTACT_ITEMS = [
  {
    href: "mailto:patrick.caire@gmail.com?subject=Hello from the garden",
    label: "Email Patrick",
    Icon: EnvelopeSimple,
  },
  {
    href: "https://www.linkedin.com/in/patrickcaire/",
    label: "LinkedIn",
    Icon: LinkedinLogo,
    external: true,
  },
]

function ContactFan() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <AnimatePresence>
        {open && CONTACT_ITEMS.map(({ href, label, Icon, external }, i) => (
          <motion.a
            key={label}
            href={href}
            aria-label={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="corner-btn"
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ ...SPRING, delay: i * 0.05 }}
            style={{ display: "flex", order: -(CONTACT_ITEMS.length - i) }}
            onClick={() => setOpen(false)}
          >
            <Icon size={20} weight="light" />
          </motion.a>
        ))}
      </AnimatePresence>

      <motion.button
        className="corner-btn"
        aria-label="Contact"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        animate={{ rotate: open ? 45 : 0 }}
        transition={SPRING}
        style={{ display: "flex" }}
      >
        <ShareNetwork size={20} weight="light" />
      </motion.button>
    </div>
  )
}

export default function CornerNav() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <>
      {/* Top-left: About */}
      <div style={{ position: "fixed", top: 28, left: 28, zIndex: 150 }}>
        <button
          className="corner-btn"
          aria-label="About Patrick"
          onClick={() => setAboutOpen(true)}
          style={{ display: "flex" }}
        >
          <User size={20} weight="light" />
        </button>
      </div>

      {/* Top-right: Download portfolio */}
      <div style={{
        position: "fixed",
        top: 28,
        right: 28,
        zIndex: 150,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        {!isMobile && (
          <>
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "rgba(255,255,255,0.82)",
              letterSpacing: "0.01em",
              pointerEvents: "none",
              userSelect: "none",
              textShadow: "0 1px 3px rgba(0,0,0,0.18)",
            }}>
              Download my portfolio
            </span>
            {/* curvy arrow */}
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
              <path d="M1 4 C4 1 9 1 12 4 C15 7 16 10 20 10" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M17 7 L20 10 L17 13" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
        <a
          href="/cv-patrick-caire.pdf"
          download
          className="corner-btn"
          aria-label="Download CV"
          style={{ display: "flex" }}
        >
          <DownloadSimple size={20} weight="light" />
        </a>
      </div>

      {/* Bottom-left: Contact fan-out */}
      <div style={{
        position: "fixed",
        bottom: 28,
        left: 28,
        zIndex: 150,
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        gap: 8,
      }}>
        <ContactFan />
      </div>

      {/* About overlay */}
      <AboutOverlay open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  )
}
