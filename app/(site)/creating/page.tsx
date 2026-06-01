import Link from "next/link"
import ClusterHeader from "@/components/server/cluster-header"

const FD = 'var(--font-display)'
const FM = 'var(--font-mono)'

interface CreateTile {
  x: number; y: number; w: number; h: number
  rot: number; z: number
  caption: string
  slug?: string
  scene: React.ReactNode
}

const TILES: CreateTile[] = [
  {
    x: 40, y: 20, w: 340, h: 240, rot: -2.4, z: 2,
    caption: 'Nachtgarten — LP', slug: 'nachtgarten-lp',
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #2a3620 0%, #4F6B28 100%)' }} />
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="50" cy="50" r="34" fill="#141814" />
          <circle cx="50" cy="50" r="18" fill="#F0A488" />
          <circle cx="50" cy="50" r="6" fill="#141814" />
          <circle cx="50" cy="50" r="2" fill="#F7DFA0" />
        </svg>
      </>
    ),
  },
  {
    x: 410, y: 60, w: 260, h: 180, rot: 1.8, z: 3,
    caption: 'Kiosk — branding',
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#F0A488' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontStyle: 'italic', fontSize: 54, color: '#141814', fontVariationSettings: '"opsz" 72, "SOFT" 100' }}>k</div>
        <div style={{ position: 'absolute', top: 12, right: 14, fontFamily: FM, fontSize: 9, letterSpacing: '0.14em', color: '#141814', textTransform: 'uppercase' }}>kiosk / &apos;24</div>
      </>
    ),
  },
  {
    x: 700, y: 30, w: 300, h: 210, rot: -1.2, z: 1,
    caption: 'Studio site rebuild',
    scene: (
      <div style={{ position: 'absolute', inset: 0, background: '#F5EFE1', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ height: 10, width: '40%', background: '#141814' }} />
        <div style={{ height: 6, width: '80%', background: 'rgba(20,24,20,0.35)' }} />
        <div style={{ height: 6, width: '72%', background: 'rgba(20,24,20,0.35)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 8 }}>
          {['#C5D4A8','#F7DFA0','#F0A488'].map((c,i) => (
            <div key={i} style={{ aspectRatio: '1', background: c, borderRadius: 4 }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    x: 1030, y: 80, w: 220, h: 160, rot: 2.6, z: 2,
    caption: '"Lichen" — zine',
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#F7DFA0' }} />
        <div style={{ position: 'absolute', top: '20%', left: '14%', right: '14%', fontFamily: FD, fontStyle: 'italic', fontSize: 32, lineHeight: 1, fontVariationSettings: '"opsz" 36, "SOFT" 100', color: '#141814' }}>Lichen</div>
        <div style={{ position: 'absolute', bottom: '14%', left: '14%', fontFamily: FM, fontSize: 8, letterSpacing: '0.16em', color: '#141814', textTransform: 'uppercase' }}>issue 02 · spring</div>
      </>
    ),
  },
  {
    x: 80, y: 290, w: 240, h: 200, rot: 2.4, z: 1,
    caption: 'Dawn — film identity',
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#141814' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 70%, rgba(247,223,160,0.8), transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, fontFamily: FD, fontStyle: 'italic', fontSize: 36, lineHeight: 1, fontVariationSettings: '"opsz" 60, "SOFT" 100', color: '#F5EFE1' }}>dawn.</div>
      </>
    ),
  },
  {
    x: 350, y: 270, w: 300, h: 230, rot: -1.6, z: 3,
    caption: 'NYT opinion illus.',
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#FAF4E8' }} />
        <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="30" cy="40" r="20" fill="#4F6B28" />
          <rect x="25" y="40" width="10" height="24" fill="#141814" />
          <circle cx="70" cy="30" r="14" fill="#F0A488" />
          <path d="M60 44 Q70 52 80 44 L80 70 L60 70 Z" fill="#141814" />
          <line x1="40" y1="65" x2="80" y2="65" stroke="#141814" strokeWidth="1" />
        </svg>
      </>
    ),
  },
  {
    x: 680, y: 280, w: 280, h: 220, rot: 1.8, z: 2,
    caption: 'wknd playlist art',
    scene: (
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #C5D4A8 0%, #F0A488 100%)', padding: 18 }}>
        <div style={{ width: '100%', height: 5, background: '#141814', marginBottom: 14 }} />
        <div style={{ fontFamily: FD, fontStyle: 'italic', fontSize: 26, lineHeight: 1.1, fontVariationSettings: '"opsz" 36, "SOFT" 100', color: '#141814' }}>slow saturday</div>
        <div style={{ fontFamily: FM, fontSize: 9, letterSpacing: '0.16em', color: '#141814', textTransform: 'uppercase', marginTop: 6 }}>04 · &apos;26</div>
        <div style={{ position: 'absolute', bottom: 18, right: 18, width: 44, height: 44, borderRadius: 999, background: '#141814', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#F7DFA0"><path d="M6 4l14 8-14 8z" /></svg>
        </div>
      </div>
    ),
  },
  {
    x: 990, y: 300, w: 260, h: 190, rot: -2.8, z: 1,
    caption: 'ceramic glaze tests',
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#E8DCC5' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 2, padding: 12 }}>
          {['#C5D4A8','#F7DFA0','#4F6B28','#F0A488','#E8845F','#2a3620'].map((c,i) => (
            <div key={i} style={{ background: c, borderRadius: 3, boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.15)' }} />
          ))}
        </div>
      </>
    ),
  },
  {
    x: 170, y: 540, w: 360, h: 240, rot: 1.4, z: 2,
    caption: 'Residency — Porto',
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #F7DFA0 0%, #F5EFE1 50%, #C5D4A8 100%)' }} />
        <svg viewBox="0 0 200 130" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <rect x="30" y="50" width="30" height="60" fill="#F5EFE1" stroke="#141814" strokeWidth="1" />
          <rect x="64" y="40" width="36" height="70" fill="#F0A488" stroke="#141814" strokeWidth="1" />
          <rect x="104" y="55" width="28" height="55" fill="#F5EFE1" stroke="#141814" strokeWidth="1" />
          <rect x="136" y="45" width="34" height="65" fill="#E8DCC5" stroke="#141814" strokeWidth="1" />
          <path d="M 30 50 L 45 30 L 60 50 Z" fill="#4F6B28" />
          <path d="M 64 40 L 82 20 L 100 40 Z" fill="#4F6B28" />
          <path d="M 104 55 L 118 35 L 132 55 Z" fill="#4F6B28" />
          <path d="M 136 45 L 153 25 L 170 45 Z" fill="#4F6B28" />
        </svg>
      </>
    ),
  },
  {
    x: 580, y: 560, w: 320, h: 210, rot: -0.8, z: 3,
    caption: 'Small book — "Turning"',
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#4F6B28' }} />
        <div style={{ position: 'absolute', inset: 24, background: '#F5EFE1', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: FM, fontSize: 9, letterSpacing: '0.14em', color: '#141814', textTransform: 'uppercase' }}>a small book</div>
          <div style={{ fontFamily: FD, fontStyle: 'italic', fontSize: 40, lineHeight: 1, fontVariationSettings: '"opsz" 60, "SOFT" 100', color: '#141814' }}>Turning.</div>
          <div style={{ fontFamily: FM, fontSize: 9, letterSpacing: '0.14em', color: '#141814', textTransform: 'uppercase', textAlign: 'right' }}>caire · 2026</div>
        </div>
      </>
    ),
  },
  {
    x: 940, y: 540, w: 280, h: 220, rot: 2.4, z: 1,
    caption: 'UX — garden app',
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#F5EFE1' }} />
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 120, height: 180, background: '#FAF4E8', borderRadius: 14, boxShadow: '0 12px 30px -10px rgba(0,0,0,0.2)', padding: '18px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 20, width: '60%', background: '#4F6B28', borderRadius: 3 }} />
          <div style={{ height: 50, background: '#C5D4A8', borderRadius: 8 }} />
          <div style={{ height: 32, background: '#F0A488', borderRadius: 8 }} />
          <div style={{ height: 20, background: '#F7DFA0', borderRadius: 8 }} />
        </div>
      </>
    ),
  },
]

export default function Creating() {
  return (
    <main className="subpage-bg">
      <ClusterHeader
        eyebrow="Cluster · 02 of 03"
        title={<>Things I <em>make</em>.</>}
        sub="Projects, identities, objects. Scroll, drift, click anything that catches."
      />
      <div className="creating-scroll">
        <div className="creating-canvas">
          {TILES.map((tile, i) => {
            const style: React.CSSProperties = {
              left: tile.x, top: tile.y,
              width: tile.w, height: tile.h,
              transform: `rotate(${tile.rot}deg)`,
              zIndex: tile.z,
            }
            const inner = (
              <>
                <div className="surface">{tile.scene}</div>
                <div className="caption">{tile.caption}</div>
              </>
            )
            return tile.slug ? (
              <Link key={i} href={`/creating/${tile.slug}`} className="create-tile" style={style}>
                {inner}
              </Link>
            ) : (
              <div key={i} className="create-tile" style={style}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
