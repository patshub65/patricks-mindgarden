import Link from "next/link"

interface SiteFooterProps {
  /** "light" for the dark/fuchsia homepage, "dark" for light legal pages. */
  tone?: "light" | "dark"
}

export default function SiteFooter({ tone = "light" }: SiteFooterProps) {
  const isLight = tone === "light"
  const base = isLight ? "rgba(255,255,255,0.62)" : "var(--color-ink-muted)"
  const strong = isLight ? "rgba(255,255,255,0.85)" : "var(--color-ink)"

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 5,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "20px 24px calc(20px + env(safe-area-inset-bottom))",
        fontFamily: "var(--font-body)",
        fontSize: 12,
        lineHeight: 1.6,
        color: base,
        textShadow: isLight ? "0 1px 6px rgba(0,0,0,0.18)" : "none",
      }}
    >
      <span>© Patrick Caire 2026</span>
      <span aria-hidden="true">·</span>
      <Link href="/impressum" style={{ color: strong, textDecoration: "none" }}>
        Impressum
      </Link>
      <span aria-hidden="true">·</span>
      <Link href="/datenschutz" style={{ color: strong, textDecoration: "none" }}>
        Datenschutz
      </Link>
    </footer>
  )
}
