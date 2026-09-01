"use client"

import { useState } from "react"
import { m, AnimatePresence } from "framer-motion"
import { EnvelopeSimple, LinkedinLogo, DownloadSimple, ShareNetwork, User } from "@phosphor-icons/react"
import AboutOverlay from "@/components/client/about-overlay"
import { useCornerLabelStyle } from "@/components/client/use-corner-label-style"

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

const BTN = 44
const GAP = 8

function ContactFan() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const labelStyle = useCornerLabelStyle()

  return (
    <div style={{ position: "relative" }}>
      {/* Fan items float above the button, out of document flow */}
      <AnimatePresence>
        {open && CONTACT_ITEMS.map(({ href, label, Icon, external }, i) => (
          <m.a
            key={label}
            href={href}
            aria-label={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="corner-btn"
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ ...SPRING, delay: i * 0.05 }}
            style={{
              display: "flex",
              position: "absolute",
              bottom: (i + 1) * (BTN + GAP),
              left: 0,
            }}
            onClick={() => setOpen(false)}
          >
            <Icon size={20} weight="light" />
          </m.a>
        ))}
      </AnimatePresence>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <m.button
          type="button"
          className="corner-btn"
          aria-label="Contact"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{ rotate: open ? 45 : 0 }}
          transition={SPRING}
          style={{ display: "flex" }}
        >
          <ShareNetwork size={20} weight="light" />
        </m.button>
        <AnimatePresence>
          {hovered && !open && (
            <m.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.15 }}
              style={labelStyle}
            >
              reach out
            </m.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function CornerNav() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [aboutHovered, setAboutHovered] = useState(false)
  const [downloadHovered, setDownloadHovered] = useState(false)
  const labelStyle = useCornerLabelStyle()

  return (
    <>
      {/* Top-left: About */}
      <div style={{ position: "fixed", top: 28, left: 28, zIndex: 150, display: "flex", alignItems: "center", gap: 10 }}>
        <button
          type="button"
          className="corner-btn"
          aria-label="About Patrick"
          onClick={() => setAboutOpen(true)}
          onMouseEnter={() => setAboutHovered(true)}
          onMouseLeave={() => setAboutHovered(false)}
          style={{ display: "flex" }}
        >
          <User size={20} weight="light" />
        </button>
        <AnimatePresence>
          {aboutHovered && (
            <m.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.15 }}
              style={labelStyle}
            >
              about me
            </m.span>
          )}
        </AnimatePresence>
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
        <AnimatePresence>
          {downloadHovered && (
            <m.span
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 4 }}
              transition={{ duration: 0.15 }}
              style={labelStyle}
            >
              download portfolio
            </m.span>
          )}
        </AnimatePresence>
        <a
          href="/patrick-caire-portfolio-2026-sm.pdf"
          download
          className="corner-btn"
          aria-label="Download portfolio"
          style={{ display: "flex" }}
          onMouseEnter={() => setDownloadHovered(true)}
          onMouseLeave={() => setDownloadHovered(false)}
        >
          <DownloadSimple size={20} weight="light" />
        </a>
      </div>

      {/* Bottom-left: Contact fan-out */}
      <div style={{ position: "fixed", bottom: 28, left: 28, zIndex: 150 }}>
        <ContactFan />
      </div>

      {/* About overlay */}
      <AboutOverlay open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  )
}
