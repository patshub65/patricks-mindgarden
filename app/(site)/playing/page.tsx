import ClusterHeader from "@/components/server/cluster-header"

interface PlayTileData {
  kind: 'videoStill' | 'photo' | 'snippet' | 'gif' | 'quote'
  caption?: string
  stamp?: string
  h: number
  scene: React.ReactNode
}

function PlayTile({ tile }: { tile: PlayTileData }) {
  const showMeta = tile.kind !== 'quote'
  return (
    <div className="play-tile">
      <div className="surface" style={{ height: tile.h }}>
        {tile.scene}
      </div>
      {showMeta && (
        <div className="meta">
          <div className="caption">{tile.caption}</div>
          {tile.stamp && <div className="stamp">{tile.stamp}</div>}
        </div>
      )}
    </div>
  )
}

const FD = 'var(--font-display)'
const FM = 'var(--font-mono)'

const TILES: PlayTileData[] = [
  {
    kind: 'videoStill', caption: 'Kreuzberg rooftops', stamp: '04:12 · 16mm', h: 260,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #F7DFA0 0%, #F0A488 55%, #4F6B28 100%)' }} />
        <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <rect x="0" y="95" width="22" height="45" fill="#141814" />
          <rect x="24" y="82" width="18" height="58" fill="#1a1f17" />
          <rect x="44" y="70" width="30" height="70" fill="#141814" />
          <rect x="76" y="88" width="14" height="52" fill="#1a1f17" />
          <rect x="92" y="64" width="28" height="76" fill="#141814" />
          <rect x="122" y="78" width="20" height="62" fill="#1a1f17" />
          <rect x="144" y="86" width="34" height="54" fill="#141814" />
          <rect x="180" y="74" width="20" height="66" fill="#1a1f17" />
          {([[6,110],[52,94],[98,88],[128,104],[156,102]] as [number,number][]).map(([x,y],i) => (
            <rect key={i} x={x} y={y} width="3" height="3" fill="#F7DFA0" opacity="0.8" />
          ))}
        </svg>
      </>
    ),
  },
  {
    kind: 'photo', caption: 'morning tape', stamp: 'berlin · mar', h: 200,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#E8DCC5' }} />
        <div style={{ position: 'absolute', top: '38%', left: '22%', width: '56%', height: '18%', background: 'rgba(247,223,160,0.85)', transform: 'rotate(-6deg)', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }} />
        <div style={{ position: 'absolute', top: '56%', left: '12%', width: '40%', height: '14%', background: 'rgba(240,164,136,0.9)', transform: 'rotate(4deg)' }} />
      </>
    ),
  },
  {
    kind: 'snippet', caption: 'shader experiment', stamp: 'glsl', h: 170,
    scene: (
      <div style={{ position: 'absolute', inset: 0, background: '#141814', padding: 14, fontFamily: FM, fontSize: 10, lineHeight: 1.55, color: '#C5D4A8', overflow: 'hidden' }}>
        <div><span style={{ color: '#F0A488' }}>void</span> <span style={{ color: '#F7DFA0' }}>main</span>() {'{'}</div>
        <div>&nbsp;&nbsp;vec2 uv = gl_FragCoord.xy</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;/ u_resolution.xy;</div>
        <div>&nbsp;&nbsp;<span style={{ color: '#F0A488' }}>float</span> d = length(uv - .5);</div>
        <div>&nbsp;&nbsp;gl_FragColor = vec4(</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;sin(d*9. + u_time),</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;.6, .4, 1.);</div>
        <div>{'}'}</div>
      </div>
    ),
  },
  {
    kind: 'gif', caption: 'loop #14', stamp: 'gif', h: 220,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--sage)' }} />
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="50" cy="50" r="28" fill="var(--coral)">
            <animate attributeName="r" values="22;34;22" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="50" r="14" fill="var(--ink)">
            <animate attributeName="r" values="16;8;16" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', color: 'var(--butter)', padding: '2px 6px', fontFamily: FM, fontSize: 9, letterSpacing: '0.1em', borderRadius: 3 }}>GIF</div>
      </>
    ),
  },
  {
    kind: 'quote', h: 160,
    scene: (
      <div style={{ position: 'absolute', inset: 0, background: 'var(--moss)', padding: '26px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: FD, fontStyle: 'italic', fontSize: 22, lineHeight: 1.25, fontVariationSettings: '"opsz" 36, "SOFT" 100', color: 'var(--butter)' }}>
          The garden is not a metaphor. It is where I go.
        </div>
        <div style={{ fontFamily: FM, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,223,160,0.65)' }}>— from an old notebook</div>
      </div>
    ),
  },
  {
    kind: 'videoStill', caption: 'vinyl haul', stamp: '00:48', h: 190,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#1a1f17' }} />
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="30" cy="50" r="28" fill="#141814" />
          <circle cx="30" cy="50" r="10" fill="var(--coral)" />
          <circle cx="30" cy="50" r="2" fill="#141814" />
          <circle cx="70" cy="50" r="28" fill="#141814" />
          <circle cx="70" cy="50" r="10" fill="var(--butter)" />
          <circle cx="70" cy="50" r="2" fill="#141814" />
        </svg>
      </>
    ),
  },
  {
    kind: 'photo', caption: 'studio midday', stamp: '35mm', h: 230,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #F5EFE1 0%, #E8DCC5 100%)' }} />
        <div style={{ position: 'absolute', left: '15%', top: '40%', width: '16%', height: '50%', background: '#4F6B28' }} />
        <div style={{ position: 'absolute', left: '32%', top: '55%', width: '28%', height: '35%', background: '#C5D4A8' }} />
        <div style={{ position: 'absolute', left: '62%', top: '45%', width: '24%', height: '45%', background: '#F0A488' }} />
      </>
    ),
  },
  {
    kind: 'snippet', caption: 'parses markdown in 3 lines', stamp: 'js', h: 150,
    scene: (
      <div style={{ position: 'absolute', inset: 0, background: '#141814', padding: 14, fontFamily: FM, fontSize: 10, lineHeight: 1.6, color: '#E8DCC5', overflow: 'hidden' }}>
        <div style={{ color: '#C5D4A8' }}>{'// probably buggy'}</div>
        <div>{'s.replace(/\\*\\*(.+?)\\*\\*/g,'}</div>
        <div>&nbsp;&nbsp;<span style={{ color: '#F7DFA0' }}>{'\'<b>$1</b>\''}</span>{')'}</div>
      </div>
    ),
  },
  {
    kind: 'quote', h: 130,
    scene: (
      <div style={{ position: 'absolute', inset: 0, background: 'var(--butter)', padding: '22px 22px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontFamily: FD, fontStyle: 'italic', fontSize: 18, lineHeight: 1.3, fontVariationSettings: '"opsz" 36, "SOFT" 100', color: 'var(--ink)' }}>
          Keep the side quests side. That&apos;s the whole point.
        </div>
      </div>
    ),
  },
  {
    kind: 'gif', caption: 'cursor trail', stamp: 'gif', h: 180,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--surface)' }} />
        <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M 20 120 Q 60 40 120 70 T 180 30" stroke="var(--coral)" strokeWidth="2" fill="none" />
          {([[20,120],[60,70],[100,75],[140,55],[180,30]] as [number,number][]).map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r={3 - i * 0.3} fill="var(--moss)" opacity={1 - i * 0.15} />
          ))}
        </svg>
      </>
    ),
  },
  {
    kind: 'photo', caption: 'hands, at work', stamp: 'polaroid', h: 250,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#E8DCC5' }} />
        <svg viewBox="0 0 100 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <rect x="0" y="0" width="100" height="140" fill="#C5D4A8" />
          <ellipse cx="50" cy="80" rx="24" ry="30" fill="#F0A488" />
          <ellipse cx="38" cy="94" rx="6" ry="16" fill="#E8845F" transform="rotate(-20 38 94)" />
          <ellipse cx="62" cy="94" rx="6" ry="16" fill="#E8845F" transform="rotate(20 62 94)" />
          <rect x="30" y="58" width="40" height="10" fill="#4F6B28" />
        </svg>
      </>
    ),
  },
  {
    kind: 'videoStill', caption: 'river walk', stamp: '02:34', h: 200,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #C5D4A8 0%, #4F6B28 60%, #2a3620 100%)' }} />
        <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M 0 80 Q 50 70 100 85 T 200 78 L 200 140 L 0 140 Z" fill="#1a1f17" />
          <path d="M 0 100 Q 50 96 100 105 T 200 100 L 200 140 L 0 140 Z" fill="#141814" opacity="0.6" />
        </svg>
      </>
    ),
  },
]

export default function Playing() {
  return (
    <main className="subpage-bg">
      <ClusterHeader
        eyebrow="Cluster · 01 of 03"
        title={<>Things I <em>play</em> with.</>}
        sub="Experiments, loops, and the half-finished tape. The rule of the garden: nothing has to become anything."
      />
      <div className="playing-masonry">
        {TILES.map((tile, i) => <PlayTile key={i} tile={tile} />)}
      </div>
    </main>
  )
}
