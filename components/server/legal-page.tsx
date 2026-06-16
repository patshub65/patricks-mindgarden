import Link from "next/link"
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr"
import SiteFooter from "@/components/server/site-footer"

interface LegalPageProps {
  title: string
  children: React.ReactNode
}

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-surface)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 680,
          margin: "0 auto",
          padding: "clamp(48px, 9vw, 96px) 24px 56px",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--color-ink-muted)",
            textDecoration: "none",
            marginBottom: 40,
          }}
        >
          <ArrowLeft size={15} /> Back to the garden
        </Link>

        <h1
          style={{
            margin: "0 0 32px",
            fontFamily: "var(--font-display)",
            fontVariationSettings: '"opsz" 48, "SOFT" 40',
            fontSize: "clamp(32px, 6vw, 46px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
          }}
        >
          {title}
        </h1>

        <div className="legal-prose">{children}</div>
      </main>

      <SiteFooter tone="dark" />
    </div>
  )
}
