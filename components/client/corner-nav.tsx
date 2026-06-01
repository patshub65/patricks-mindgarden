"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EnvelopeSimple, LinkedinLogo, DownloadSimple, ShareNetwork } from "@phosphor-icons/react"

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
      {/* Fan items — slide up above the trigger */}
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

      {/* Trigger button */}
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
  return (
    <>
      {/* Top-right: Download CV */}
      <div style={{ position: "fixed", top: 32, right: 32, zIndex: 150 }}>
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
        bottom: 32,
        left: 32,
        zIndex: 150,
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        gap: 8,
      }}>
        <ContactFan />
      </div>

      {/* Bottom-right: MusicPlayer — rendered via site layout */}
    </>
  )
}
