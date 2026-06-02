---
name: component-scaffold
description: Auto-invoked when creating or modifying React components. Encodes the mindgarden file structure, naming conventions, RSC/client split, styling approach, and export patterns. Prevents generic React output.
model_invocable: true
user_invocable: false
---

# Component Scaffold — Mindgarden Conventions

Apply these rules whenever creating or modifying a component in this project. Do not ask the user to confirm — just follow them.

## File location

- Server Components (no state, no effects, no motion): `components/server/{name}.tsx`
- Client Components (`"use client"`): `components/client/{name}.tsx`
- Page-level files: `app/(site)/` — always RSC, never `"use client"`
- A page imports client leaves; it is never a client component itself

## When a component must be client

Only mark `"use client"` if the component uses ANY of:
- `useState`, `useReducer`, `useEffect`, `useRef` (when used for DOM interaction)
- Framer Motion (`motion.*`, `useMotionValue`, `useReducedMotion`, `AnimatePresence`)
- Browser APIs (`window`, `document`, `navigator`, `sessionStorage`)
- Event handlers that need state (`onClick` that updates state, `onDrag`, etc.)
- `"use client"` goes on the FIRST line of the file, before all imports

If a Server Component needs one interactive piece, extract that piece into a client leaf in `components/client/` and import it. Never make the parent client.

## Naming

- **Filenames**: kebab-case (`polaroid-card.tsx`, `peek-overlay.tsx`)
- **Components**: PascalCase (`PolaroidCard`, `PeekOverlay`)
- **Exports**: `export default function ComponentName` — this project uses default exports
- **Props interface**: `interface ComponentNameProps` defined above the component

## Props and TypeScript

```tsx
interface MyComponentProps {
  label: string
  size?: number
  children?: React.ReactNode
}

export default function MyComponent({ label, size = 160, children }: MyComponentProps) {
  // ...
}
```

- Always type props with an explicit interface, not inline
- Use `React.ReactNode` for children, not `JSX.Element`
- Import types from `@/lib/` when shared (e.g., `CardBehavior`, `Cluster`)

## Styling approach

This project uses a hybrid of **Tailwind v4 utility classes** and **CSS classes defined in `globals.css`**.

- Design tokens live in the `@theme` block of `globals.css` — never inline hex values
- Complex, reusable component styles (`.polaroid`, `.nav-pill`, `.corner-btn`, `.chatbar`, `.peek-*`) are in `globals.css`
- Simple layout/spacing uses Tailwind utilities
- When a component needs styles beyond simple utilities, prefer adding a class to `globals.css` over complex inline `style` objects
- Reference tokens via CSS variables: `var(--color-ink)`, `var(--shadow-md)`, `var(--radius-card)`

**Inline styles are acceptable** for dynamic values computed from props (positions, sizes, transforms). The existing codebase uses `style` objects for these — follow the pattern.

## Motion conventions

- Import from `framer-motion`, not `motion/react` or other paths
- Shared spring config: `{ type: "spring", stiffness: 180, damping: 22 }`
- Shared ease: `[0.16, 1, 0.3, 1]` for page-level transitions
- Define constants at module level, not inside the component body
- Always call `useReducedMotion()` and respect it — skip idle/perpetual animations when true
- Use `useMotionValue` + `useTransform` for hover physics, never `useState` for values that change at 60fps
- Memoize perpetual-motion components with `React.memo` if they re-render parents

## Icons

- Use `@phosphor-icons/react` — already installed
- Global strokeWidth: 1.5
- Import specific icons: `import { ArrowUp } from "@phosphor-icons/react"`
- Never use emoji in markup, text, or alt text

## Import aliases

- `@/components/client/...` — client components
- `@/components/server/...` — server components
- `@/lib/...` — utilities, types, data
- `@/content/...` — MDX content (rarely imported directly; use `lib/content.ts` helpers)

## Layout rules

- Never `h-screen` — always `min-h-[100dvh]`
- Never `calc()` width math — use CSS Grid
- Max page width: `max-w-7xl mx-auto` or constrain in `globals.css`
- Mobile: single column, `px-4 py-8` or `px-6`, no horizontal scroll
- Breakpoints: Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280)

## Dependency discipline

Before importing any package not in the list below, run `cat package.json` to verify it's installed. If not, output the install command and wait for confirmation.

**Installed** (safe to import without checking):
- `next`, `react`, `react-dom`
- `framer-motion`
- `@phosphor-icons/react`
- `gray-matter`, `@next/mdx`, `@mdx-js/loader`

## What NOT to generate

- No `console.log` left in components
- No `any` types — always explicit
- No `useEffect` for derived state (compute inline or use `useMemo`)
- No default Inter/Roboto/system-ui font usage — this project uses Fraunces + Manrope via `next/font/google`
- No `window.addEventListener('scroll')` — use Framer's `useScroll` / `useMotionValue`
