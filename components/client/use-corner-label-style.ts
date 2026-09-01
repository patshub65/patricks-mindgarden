"use client"

import { usePathname } from "next/navigation"

const BASE = {
  fontFamily: "var(--font-body)",
  fontSize: 13,
  letterSpacing: "0.01em",
  pointerEvents: "none" as const,
  userSelect: "none" as const,
  whiteSpace: "nowrap" as const,
}

/**
 * Corner buttons live in the shared (site) layout, so their hover labels sit on
 * two very different grounds: the fuchsia scene on `/`, and the warm light
 * surface of every detail/legal page. White text is unreadable on the latter.
 */
export function useCornerLabelStyle() {
  const onScene = usePathname() === "/"

  return {
    ...BASE,
    color: onScene ? "rgba(255,255,255,0.82)" : "var(--color-ink)",
    textShadow: onScene ? "0 1px 3px rgba(0,0,0,0.18)" : "none",
  }
}
