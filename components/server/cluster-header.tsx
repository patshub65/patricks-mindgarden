import Link from "next/link"

interface ClusterHeaderProps {
  eyebrow: string
  title: React.ReactNode
  sub: string
}

export default function ClusterHeader({ eyebrow, title, sub }: ClusterHeaderProps) {
  return (
    <>
      {/* Top-left: back-to-home patrick mark */}
      <Link href="/" className="patrick-mark" aria-label="Back to home">
        <div className="patrick-mark-circle">
          <span style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontVariationSettings: '"opsz" 14, "SOFT" 80',
            fontSize: 14,
            color: "var(--color-butter)",
            lineHeight: 1,
          }}>
            P
          </span>
        </div>
        <span className="patrick-mark-label">patrick</span>
      </Link>

      {/* Page title block */}
      <div className="subpage-header">
        <div className="subpage-eyebrow">{eyebrow}</div>
        <h1 className="subpage-h1">{title}</h1>
        <p className="subpage-sub">{sub}</p>
      </div>
    </>
  )
}
