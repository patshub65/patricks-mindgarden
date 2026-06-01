"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, LayoutGroup, AnimatePresence } from "framer-motion"

const ITEMS = [
  { label: "Playing",  href: "/playing" },
  { label: "Creating", href: "/creating" },
  { label: "Thinking", href: "/thinking" },
]

export default function NavPill() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <div
      style={{
        position: "fixed",
        top: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 150,
      }}
    >
      <AnimatePresence>
        {!isHome && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <LayoutGroup id="nav-pill">
              <nav className="nav-pill" aria-label="Main navigation">
                {ITEMS.map(({ label, href }) => {
                  const active = pathname?.startsWith(href) ?? false
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="nav-pill-item"
                      aria-current={active ? "page" : undefined}
                      style={{ position: "relative", color: active ? "var(--color-ink)" : undefined }}
                    >
                      {active && (
                        <motion.div
                          layoutId="nav-pill-active"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: 9999,
                            background: "var(--color-surface)",
                            boxShadow: "var(--shadow-xs)",
                            zIndex: 0,
                          }}
                        />
                      )}
                      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
                    </Link>
                  )
                })}
              </nav>
            </LayoutGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
