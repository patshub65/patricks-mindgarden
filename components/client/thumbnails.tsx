"use client"

// Abstract SVG/CSS thumbnail compositions for each home card.
// Uses --coral, --butter etc. shorthand aliases defined in globals.css.

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
      <div style={{ height: 18, background: 'var(--moss)', borderRadius: 3, width: '60%' }} />
      <div style={{ display: 'flex', gap: 4, flex: 1 }}>
        <div style={{ flex: 1, background: 'var(--sage)', borderRadius: 4, opacity: 0.6 }} />
        <div style={{ flex: 2, background: 'rgba(20,24,20,0.08)', borderRadius: 4 }} />
      </div>
      <div style={{ height: 4, background: 'rgba(20,24,20,0.12)', borderRadius: 2, width: '80%' }} />
      <div style={{ height: 4, background: 'rgba(20,24,20,0.12)', borderRadius: 2, width: '55%' }} />
    </div>
  )
}

export function ThumbCode() {
  return (
    <div style={{
      ...wrap, background: '#1b1f1a', padding: 10,
      flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
      fontFamily: 'var(--font-mono)', fontSize: 7.5, color: '#C5D4A8', lineHeight: 1.4,
    }}>
      <div style={{ color: 'rgba(197,212,168,0.5)' }}>{'~ patrick/garden $'}</div>
      <div><span style={{ color: 'var(--coral)' }}>const</span>{' grow = () => {'}</div>
      <div>&nbsp;&nbsp;<span style={{ color: 'var(--butter)' }}>plant</span>(seed)</div>
      <div>&nbsp;&nbsp;<span style={{ color: 'var(--butter)' }}>water</span>()</div>
      <div>{'}'}</div>
      <div style={{ color: 'rgba(197,212,168,0.5)', marginTop: 2 }}>▍</div>
    </div>
  )
}

export function ThumbSideQuests() {
  return (
    <div style={{ ...wrap, background: '#B88A5A', padding: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage:
          'radial-gradient(rgba(80,50,20,0.25) 1px, transparent 1.5px), radial-gradient(rgba(255,230,190,0.15) 1px, transparent 1.2px)',
        backgroundSize: '5px 5px, 9px 9px',
        backgroundPosition: '0 0, 2px 3px',
        mixBlendMode: 'multiply',
      }} />
      <div style={{
        position: 'absolute', left: '12%', top: '16%',
        width: '38%', height: '40%', background: 'var(--coral)',
        transform: 'rotate(-6deg)', boxShadow: '0 3px 6px rgba(40,20,0,0.25)',
      }}>
        <div style={{ position: 'absolute', top: 3, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, borderRadius: 999, background: 'var(--ink)', boxShadow: '0 1px 1px rgba(0,0,0,0.4)' }} />
      </div>
      <div style={{
        position: 'absolute', right: '10%', top: '10%',
        width: '40%', height: '32%', background: 'var(--butter)',
        transform: 'rotate(5deg)', boxShadow: '0 3px 6px rgba(40,20,0,0.25)',
      }}>
        <div style={{ position: 'absolute', top: 3, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, borderRadius: 999, background: 'var(--ink)', boxShadow: '0 1px 1px rgba(0,0,0,0.4)' }} />
        <div style={{ position: 'absolute', left: 6, right: 6, top: 14, height: 1, background: 'rgba(40,20,0,0.25)' }} />
        <div style={{ position: 'absolute', left: 6, right: 16, top: 22, height: 1, background: 'rgba(40,20,0,0.2)' }} />
        <div style={{ position: 'absolute', left: 6, right: 10, top: 30, height: 1, background: 'rgba(40,20,0,0.2)' }} />
      </div>
      <div style={{
        position: 'absolute', left: '22%', bottom: '10%',
        width: '44%', height: '38%', background: 'var(--surface)',
        transform: 'rotate(3deg)', boxShadow: '0 3px 6px rgba(40,20,0,0.3)', padding: 3,
      }}>
        <div style={{ width: '100%', height: '75%', background: 'var(--moss)' }} />
      </div>
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} preserveAspectRatio="none">
        <path d="M 15 20 Q 50 45 80 18" stroke="rgba(30,15,0,0.35)" strokeWidth="0.6" fill="none" strokeDasharray="1.5 2" />
      </svg>
    </div>
  )
}

export function ThumbArtBlog() {
  return (
    <div style={{ ...wrap, background: 'linear-gradient(180deg, #D4B88A 0%, #A88B5C 60%, #6B5433 100%)' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 3px)',
        mixBlendMode: 'multiply',
      }} />
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <circle cx="32" cy="38" r="14" fill="rgba(30,20,10,0.5)" />
        <rect x="30" y="50" width="4" height="22" fill="rgba(30,20,10,0.5)" />
        <ellipse cx="50" cy="95" rx="60" ry="8" fill="rgba(30,20,10,0.4)" />
      </svg>
      <div style={{ position: 'absolute', bottom: 6, left: 8, fontFamily: 'var(--font-mono)', fontSize: 7, color: 'rgba(255,240,210,0.8)' }}>MMIX</div>
    </div>
  )
}

export function ThumbWriting() {
  return (
    <div style={{ ...wrap, background: '#7a9a5c', padding: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 4px)',
        mixBlendMode: 'multiply',
      }} />
      <div style={{
        position: 'absolute', left: '8%', top: '12%', right: '8%', bottom: '12%',
        background: '#FBF5E8', boxShadow: '0 4px 10px rgba(20,20,0,0.25)',
        transform: 'rotate(-3deg)', display: 'flex',
      }}>
        <div style={{ width: 2, background: 'rgba(20,24,20,0.3)' }} />
        <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 8, color: 'var(--ink)' }}>on craft</div>
          {[88, 72, 80, 64, 50].map((w, i) => (
            <div key={i} style={{ height: 1.2, background: 'rgba(20,24,20,0.4)', width: `${w}%` }} />
          ))}
        </div>
        <div style={{ width: 2, background: 'rgba(20,24,20,0.2)' }} />
        <div style={{ flex: 1, padding: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[76, 84, 60, 72, 40].map((w, i) => (
            <div key={i} style={{ height: 1.2, background: 'rgba(20,24,20,0.4)', width: `${w}%` }} />
          ))}
        </div>
      </div>
      <div style={{
        position: 'absolute', right: '6%', bottom: '8%',
        width: '45%', height: 4,
        background: 'linear-gradient(90deg, var(--ink) 0 70%, var(--coral) 70% 100%)',
        borderRadius: 2, transform: 'rotate(22deg)', boxShadow: '0 2px 3px rgba(0,0,0,0.3)',
      }} />
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
  const bars = Array.from({ length: 32 }, (_, i) => {
    const h = 20 + Math.abs(Math.sin(i * 1.1) * 50) + Math.sin(i * 0.3) * 20
    return Math.max(10, Math.min(90, h))
  })
  return (
    <div style={{ ...wrap, background: '#141814', padding: '0 6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', height: '100%' }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            flex: 1, height: `${h}%`,
            background: i < 14 ? 'var(--sage)' : (i === 14 ? 'var(--coral)' : 'rgba(197,212,168,0.35)'),
            borderRadius: 1,
          }} />
        ))}
      </div>
      <div style={{ position: 'absolute', top: 8, bottom: 8, left: '45%', width: 1, background: 'var(--coral)' }} />
    </div>
  )
}

export function ThumbMusicVideo() {
  return (
    <div style={{ ...wrap, background: 'linear-gradient(160deg, #2a3b20 0%, #4F6B28 60%, #7a8c4e 100%)' }}>
      <div style={{ position: 'absolute', top: '18%', right: '22%', width: 22, height: 22, borderRadius: 999, background: 'var(--butter)', boxShadow: '0 0 18px rgba(247,223,160,0.6)' }} />
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M 0 78 Q 25 72 50 76 T 100 74 L 100 100 L 0 100 Z" fill="rgba(0,0,0,0.35)" />
        <circle cx="38" cy="72" r="3" fill="rgba(255,255,255,0.7)" />
        <rect x="37" y="74" width="2" height="8" fill="rgba(255,255,255,0.7)" />
      </svg>
      <div style={{ position: 'absolute', left: 3, top: 0, bottom: 0, width: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', padding: '4px 0' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ width: 4, height: 4, background: 'rgba(0,0,0,0.4)', borderRadius: 1 }} />
        ))}
      </div>
    </div>
  )
}

export function ThumbVisuals() {
  return (
    <div style={{ ...wrap, background: 'var(--butter)' }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <rect x="0" y="0" width="100" height="100" fill="var(--butter)" />
        <circle cx="30" cy="40" r="26" fill="var(--coral)" />
        <rect x="50" y="20" width="45" height="45" fill="var(--moss)" />
        <path d="M 20 80 L 50 65 L 80 80 Z" fill="var(--ink)" />
        <text x="50" y="95" textAnchor="middle"
          fontFamily="var(--font-display)" fontStyle="italic" fontSize="8" fill="var(--ink)">
          form / feeling
        </text>
      </svg>
    </div>
  )
}

export function ThumbUX() {
  return (
    <div style={{ ...wrap, background: '#3a4a6e', padding: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '8px 8px',
      }} />
      <div style={{
        position: 'absolute', left: '28%', top: '10%',
        width: '44%', height: '80%',
        background: 'var(--surface)', border: '1.5px solid var(--ink)',
        borderRadius: 6, padding: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
      }}>
        <div style={{ height: '12%', background: 'var(--moss)', borderRadius: 2, marginBottom: 3 }} />
        <div style={{ height: '6%', background: 'rgba(20,24,20,0.15)', borderRadius: 1, marginBottom: 2, width: '70%' }} />
        <div style={{ height: '6%', background: 'rgba(20,24,20,0.15)', borderRadius: 1, marginBottom: 4, width: '50%' }} />
        <div style={{ height: '22%', background: 'var(--sage)', borderRadius: 2, marginBottom: 3 }} />
        <div style={{ height: '18%', background: 'var(--butter)', borderRadius: 2 }} />
      </div>
      <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} preserveAspectRatio="none">
        <path d="M 18 35 Q 28 32 40 30" stroke="var(--coral)" strokeWidth="0.8" fill="none" />
        <path d="M 38 30 L 40 30 L 39 32" stroke="var(--coral)" strokeWidth="0.8" fill="none" />
        <path d="M 82 68 Q 75 72 62 70" stroke="var(--coral)" strokeWidth="0.8" fill="none" />
        <path d="M 64 70 L 62 70 L 63 68" stroke="var(--coral)" strokeWidth="0.8" fill="none" />
      </svg>
      <div style={{
        position: 'absolute', left: 4, top: '18%',
        width: '22%', height: '14%', background: 'var(--butter)',
        transform: 'rotate(-6deg)', boxShadow: '0 2px 3px rgba(0,0,0,0.3)', padding: 3,
      }}>
        <div style={{ height: 1, background: 'rgba(20,24,20,0.5)', width: '80%', marginBottom: 2 }} />
        <div style={{ height: 1, background: 'rgba(20,24,20,0.5)', width: '60%' }} />
      </div>
      <div style={{
        position: 'absolute', right: 3, bottom: '14%',
        width: '22%', height: '14%', background: 'var(--coral)',
        transform: 'rotate(5deg)', boxShadow: '0 2px 3px rgba(0,0,0,0.3)', padding: 3,
      }}>
        <div style={{ height: 1, background: 'rgba(20,24,20,0.5)', width: '80%', marginBottom: 2 }} />
        <div style={{ height: 1, background: 'rgba(20,24,20,0.5)', width: '50%' }} />
      </div>
    </div>
  )
}

export const THUMBS: Record<string, React.ComponentType> = {
  web:        ThumbWebDesign,
  code:       ThumbCode,
  sidequests: ThumbSideQuests,
  artblog:    ThumbArtBlog,
  writing:    ThumbWriting,
  music:      ThumbMusic,
  dj:         ThumbDJ,
  video:      ThumbMusicVideo,
  visuals:    ThumbVisuals,
  ux:         ThumbUX,
}
