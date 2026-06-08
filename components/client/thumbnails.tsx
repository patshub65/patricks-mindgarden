"use client"

const wrap: React.CSSProperties = {
  position: 'absolute', inset: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  overflow: 'hidden',
}

export function ThumbWebDesign() {
  return (
    <div style={{ ...wrap, padding: 10, background: '#F6EED7', flexDirection: 'column', alignItems: 'stretch', gap: 6 }}>
      <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--coral)' }} />
        <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--butter)' }} />
        <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--sage)' }} />
      </div>
      <div style={{ height: 20, background: 'var(--moss)', borderRadius: 3, width: '62%' }} />
      <div style={{ height: 28, background: 'rgba(20,24,20,0.07)', borderRadius: 4, flex: 1 }} />
      <div style={{ height: 6, background: 'rgba(20,24,20,0.14)', borderRadius: 2, width: '78%' }} />
      <div style={{ height: 6, background: 'rgba(20,24,20,0.10)', borderRadius: 2, width: '52%' }} />
    </div>
  )
}

export function ThumbProduct() {
  return (
    <div style={{
      ...wrap, background: '#1b1f1a', padding: '10px 12px',
      flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
      fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C5D4A8', lineHeight: 1.7,
    }}>
      <div style={{ color: 'rgba(197,212,168,0.4)', marginBottom: 6, fontSize: 8.5 }}>{'~/garden $'}</div>
      <div><span style={{ color: 'var(--coral)' }}>grow</span>{'(seed)'}</div>
      <div><span style={{ color: 'var(--butter)' }}>water</span>{'()'}</div>
      <div style={{ color: 'rgba(197,212,168,0.45)', marginTop: 8 }}>▍</div>
    </div>
  )
}

export function ThumbBrand() {
  return (
    <div style={{ ...wrap, background: '#2a1f14' }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="38" fill="none" stroke="var(--butter)" strokeWidth="2.5" />
        <text x="50" y="58" textAnchor="middle"
          fontFamily="var(--font-display)" fontStyle="normal" fontSize="22" fill="var(--butter)">
          art
        </text>
      </svg>
    </div>
  )
}

export function ThumbWriting() {
  return (
    <div style={{ ...wrap, background: '#F5EAD6', flexDirection: 'column', justifyContent: 'center', padding: '0 18px', gap: 12 }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontStyle: 'normal',
        fontSize: 22, color: 'var(--ink)', lineHeight: 1.1,
      }}>
        on craft.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 2, background: 'rgba(20,24,20,0.18)', borderRadius: 1 }} />
        <div style={{ height: 2, background: 'rgba(20,24,20,0.10)', borderRadius: 1 }} />
        <div style={{ height: 2, background: 'rgba(20,24,20,0.14)', borderRadius: 1, width: '70%' }} />
      </div>
    </div>
  )
}

export function ThumbMusic() {
  return (
    <div style={{ ...wrap, background: 'var(--moss)' }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" r="42" fill="var(--coral)" opacity="0.95" />
        <circle cx="50" cy="50" r="14" fill="var(--moss)" />
        <circle cx="50" cy="50" r="3" fill="var(--butter)" />
        {[22, 28, 34, 38].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="rgba(20,24,20,0.12)" strokeWidth="0.5" />
        ))}
      </svg>
    </div>
  )
}

export function ThumbDJ() {
  const bars = Array.from({ length: 14 }, (_, i) => {
    const h = 22 + Math.abs(Math.sin(i * 0.9) * 62) + Math.sin(i * 0.4) * 14
    return Math.max(14, Math.min(94, h))
  })
  return (
    <div style={{ ...wrap, background: '#141814', padding: '0 8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: '100%', height: '100%' }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            flex: 1, height: `${h}%`,
            background: i < 6 ? 'var(--sage)' : (i === 6 ? 'var(--coral)' : 'rgba(197,212,168,0.38)'),
            borderRadius: 2,
          }} />
        ))}
      </div>
      <div style={{ position: 'absolute', top: 8, bottom: 8, left: '46%', width: 1.5, background: 'var(--coral)' }} />
    </div>
  )
}

export function ThumbMusicVideo() {
  return (
    <div style={{ ...wrap, background: 'linear-gradient(180deg, #F0A488 0%, #F7DFA0 58%, #F5EFE1 100%)' }}>
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M 40 34 L 66 50 L 40 66 Z" fill="rgba(20,24,20,0.52)" />
      </svg>
    </div>
  )
}

export function ThumbVisuals() {
  return (
    <div style={{ ...wrap, background: 'var(--butter)' }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <circle cx="30" cy="40" r="26" fill="var(--coral)" />
        <rect x="50" y="20" width="45" height="45" fill="var(--moss)" />
        <path d="M 20 80 L 50 65 L 80 80 Z" fill="var(--ink)" />
      </svg>
    </div>
  )
}

export function ThumbUXUI() {
  return (
    <div style={{ ...wrap, background: '#2c3526', padding: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '12px 12px',
      }} />
      <div style={{
        position: 'absolute', left: '20%', top: '12%',
        width: '60%', height: '76%',
        background: 'var(--surface)', borderRadius: 6,
        boxShadow: '0 6px 20px rgba(0,0,0,0.38)',
        display: 'flex', flexDirection: 'column', gap: 6, padding: 9,
      }}>
        <div style={{ height: 14, background: 'var(--moss)', borderRadius: 3 }} />
        <div style={{ height: 9, background: 'rgba(20,24,20,0.13)', borderRadius: 2, width: '65%' }} />
        <div style={{ height: 22, background: 'var(--sage)', borderRadius: 3, opacity: 0.75 }} />
        <div style={{ height: 18, background: 'var(--butter)', borderRadius: 3 }} />
      </div>
    </div>
  )
}

export const THUMBS: Record<string, React.ComponentType> = {
  web:      ThumbWebDesign,
  product:  ThumbProduct,
  brand:    ThumbBrand,
  writing:  ThumbWriting,
  music:    ThumbMusic,
  dj:       ThumbDJ,
  video:    ThumbMusicVideo,
  visuals:  ThumbVisuals,
  'ux-ui':  ThumbUXUI,
}
