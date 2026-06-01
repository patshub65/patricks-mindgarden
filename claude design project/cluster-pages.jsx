/* global React */
// Cluster pages: Playing, Creating, Creating Detail, Thinking
// Each is a self-contained 1440x900 canvas that matches the homepage vocabulary.

const { useState } = React;

// ── Header that every cluster page shares ──────────────────
function ClusterHeader({ active, eyebrow, title, sub }) {
  return (
    <>
      {/* Corners */}
      <div style={{ position: 'absolute', top: 32, right: 32, zIndex: 30 }}>
        <CornerDownload />
      </div>
      <div style={{ position: 'absolute', bottom: 32, left: 32, zIndex: 30 }}>
        <CornerMail />
      </div>
      <div style={{ position: 'absolute', bottom: 32, right: 32, zIndex: 30 }}>
        <MusicPlayerPill expanded={true} />
      </div>
      <div style={{ position: 'absolute', top: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
        <NavPill active={active} />
      </div>
      {/* Patrick-mark (smaller, pinned top-left) */}
      <div style={{ position: 'absolute', top: 36, left: 48, zIndex: 30, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--moss)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="font-display" style={{ fontSize: 14, color: 'var(--butter)' }}>P</span>
        </div>
        <div className="font-italic" style={{ fontSize: 14, color: 'var(--ink)' }}>
          patrick
        </div>
      </div>

      <div className="subpage-header">
        {eyebrow && <div className="subpage-eyebrow">{eyebrow}</div>}
        <h1 className="subpage-h1">{title}</h1>
        {sub && <div className="subpage-sub">{sub}</div>}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Playing page — masonry of 12 tiles across 5 types
// Types: videoStill / photo / snippet / gif / quote
// ─────────────────────────────────────────────────────────────

const PLAYING_TILES = [
  { kind: 'videoStill', caption: 'Kreuzberg rooftops', stamp: '04:12 · 16mm', h: 260,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #F7DFA0 0%, #F0A488 55%, #4F6B28 100%)' }} />
        {/* skyline */}
        <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <rect x="0" y="95" width="22" height="45" fill="#141814" />
          <rect x="24" y="82" width="18" height="58" fill="#1a1f17" />
          <rect x="44" y="70" width="30" height="70" fill="#141814" />
          <rect x="76" y="88" width="14" height="52" fill="#1a1f17" />
          <rect x="92" y="64" width="28" height="76" fill="#141814" />
          <rect x="122" y="78" width="20" height="62" fill="#1a1f17" />
          <rect x="144" y="86" width="34" height="54" fill="#141814" />
          <rect x="180" y="74" width="20" height="66" fill="#1a1f17" />
          {/* scattered windows */}
          {[[6,110],[52,94],[98,88],[128,104],[156,102]].map(([x,y],i) => (
            <rect key={i} x={x} y={y} width="3" height="3" fill="#F7DFA0" opacity="0.8" />
          ))}
        </svg>
      </>
    )
  },
  { kind: 'photo', caption: 'morning tape', stamp: 'berlin · mar', h: 200,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#E8DCC5' }} />
        <div style={{ position: 'absolute', top: '38%', left: '22%', width: '56%', height: '18%', background: 'rgba(247, 223, 160, 0.85)', transform: 'rotate(-6deg)', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }} />
        <div style={{ position: 'absolute', top: '56%', left: '12%', width: '40%', height: '14%', background: 'rgba(240, 164, 136, 0.9)', transform: 'rotate(4deg)' }} />
      </>
    )
  },
  { kind: 'snippet', caption: 'shader experiment', stamp: 'glsl', h: 170,
    scene: (
      <div style={{ position: 'absolute', inset: 0, background: '#141814', padding: 14, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, lineHeight: 1.55, color: '#C5D4A8', overflow: 'hidden' }}>
        <div><span style={{ color: '#F0A488' }}>void</span> <span style={{ color: '#F7DFA0' }}>main</span>() {'{'}</div>
        <div>&nbsp;&nbsp;vec2 uv = gl_FragCoord.xy</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;/ u_resolution.xy;</div>
        <div>&nbsp;&nbsp;<span style={{ color: '#F0A488' }}>float</span> d = length(uv - .5);</div>
        <div>&nbsp;&nbsp;gl_FragColor = vec4(</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;sin(d*9. + u_time),</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;.6, .4, 1.);</div>
        <div>{'}'}</div>
      </div>
    )
  },
  { kind: 'gif', caption: 'loop #14', stamp: 'gif', h: 220,
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
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', color: 'var(--butter)', padding: '2px 6px', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.1em', borderRadius: 3 }}>GIF</div>
      </>
    )
  },
  { kind: 'quote', h: 160,
    scene: (
      <div style={{ position: 'absolute', inset: 0, background: 'var(--moss)', padding: '26px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 22, lineHeight: 1.25, fontVariationSettings: "'opsz' 36, 'SOFT' 100", color: 'var(--butter)' }}>
          The garden is not a metaphor. It is where I go.
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247, 223, 160, 0.65)' }}>— from an old notebook</div>
      </div>
    )
  },
  { kind: 'videoStill', caption: 'vinyl haul', stamp: '00:48', h: 190,
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
    )
  },
  { kind: 'photo', caption: 'studio midday', stamp: '35mm', h: 230,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #F5EFE1 0%, #E8DCC5 100%)' }} />
        <div style={{ position: 'absolute', left: '15%', top: '40%', width: '16%', height: '50%', background: '#4F6B28' }} />
        <div style={{ position: 'absolute', left: '32%', top: '55%', width: '28%', height: '35%', background: '#C5D4A8' }} />
        <div style={{ position: 'absolute', left: '62%', top: '45%', width: '24%', height: '45%', background: '#F0A488' }} />
      </>
    )
  },
  { kind: 'snippet', caption: 'parses markdown in 3 lines', stamp: 'js', h: 150,
    scene: (
      <div style={{ position: 'absolute', inset: 0, background: '#141814', padding: 14, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, lineHeight: 1.6, color: '#E8DCC5', overflow: 'hidden' }}>
        <div style={{ color: '#C5D4A8' }}>// probably buggy</div>
        <div>s.replace(/\*\*(.+?)\*\*/g,</div>
        <div>&nbsp;&nbsp;<span style={{ color: '#F7DFA0' }}>'&lt;b&gt;$1&lt;/b&gt;'</span>)</div>
      </div>
    )
  },
  { kind: 'quote', h: 130,
    scene: (
      <div style={{ position: 'absolute', inset: 0, background: 'var(--butter)', padding: '22px 22px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 18, lineHeight: 1.3, fontVariationSettings: "'opsz' 36, 'SOFT' 100", color: 'var(--ink)' }}>
          Keep the side quests side. That's the whole point.
        </div>
      </div>
    )
  },
  { kind: 'gif', caption: 'cursor trail', stamp: 'gif', h: 180,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--surface)' }} />
        <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M 20 120 Q 60 40 120 70 T 180 30" stroke="var(--coral)" strokeWidth="2" fill="none" />
          {[[20,120],[60,70],[100,75],[140,55],[180,30]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r={3 - i*0.3} fill="var(--moss)" opacity={1 - i*0.15} />
          ))}
        </svg>
      </>
    )
  },
  { kind: 'photo', caption: 'hands, at work', stamp: 'polaroid', h: 250,
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
    )
  },
  { kind: 'videoStill', caption: 'river walk', stamp: '02:34', h: 200,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #C5D4A8 0%, #4F6B28 60%, #2a3620 100%)' }} />
        <svg viewBox="0 0 200 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M 0 80 Q 50 70 100 85 T 200 78 L 200 140 L 0 140 Z" fill="#1a1f17" />
          <path d="M 0 100 Q 50 96 100 105 T 200 100 L 200 140 L 0 140 Z" fill="#141814" opacity="0.6" />
        </svg>
      </>
    )
  },
];

function PlayTile({ tile }) {
  const { kind, caption, stamp, h, scene } = tile;
  const showMeta = kind !== 'quote';
  return (
    <div className="play-tile">
      <div className="surface" style={{ height: h }}>
        {scene}
      </div>
      {showMeta && (
        <div className="meta">
          <div className="caption">{caption}</div>
          {stamp && <div className="stamp">{stamp}</div>}
        </div>
      )}
    </div>
  );
}

function PlayingPage() {
  return (
    <div className="subpage">
      <ClusterHeader
        active="Playing"
        eyebrow="Cluster · 01 of 03"
        title={<>Things I <em>play</em> with.</>}
        sub="Experiments, loops, and the half-finished tape. The rule of the garden: nothing has to become anything."
      />
      <div className="playing-masonry">
        {PLAYING_TILES.map((t, i) => <PlayTile key={i} tile={t} />)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Creating page — structured scatter of 9 tiles
// ─────────────────────────────────────────────────────────────

const CREATE_TILES = [
  // [x, y, w, h, rot, caption, scene]
  { x: 40,   y: 20,  w: 340, h: 240, rot: -2.4, caption: 'Nachtgarten · LP', z: 2,
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
    )
  },
  { x: 410,  y: 60,  w: 260, h: 180, rot: 1.8, caption: 'Kiosk — branding', z: 3,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#F0A488' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 54, color: '#141814', fontVariationSettings: "'opsz' 72, 'SOFT' 100" }}>k</div>
        <div style={{ position: 'absolute', top: 12, right: 14, fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.14em', color: '#141814', textTransform: 'uppercase' }}>kiosk / '24</div>
      </>
    )
  },
  { x: 700,  y: 30,  w: 300, h: 210, rot: -1.2, caption: 'Studio site rebuild', z: 1,
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
    )
  },
  { x: 1030, y: 80,  w: 220, h: 160, rot: 2.6, caption: '"Lichen" — zine', z: 2,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#F7DFA0' }} />
        <div style={{ position: 'absolute', top: '20%', left: '14%', right: '14%', fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 32, lineHeight: 1, fontVariationSettings: "'opsz' 36, 'SOFT' 100", color: '#141814' }}>
          Lichen
        </div>
        <div style={{ position: 'absolute', bottom: '14%', left: '14%', fontFamily: 'JetBrains Mono, monospace', fontSize: 8, letterSpacing: '0.16em', color: '#141814', textTransform: 'uppercase' }}>issue 02 · spring</div>
      </>
    )
  },
  { x: 80,   y: 290, w: 240, h: 200, rot: 2.4, caption: 'Dawn — film identity', z: 1,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#141814' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 70%, rgba(247, 223, 160, 0.8), transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 36, lineHeight: 1, fontVariationSettings: "'opsz' 60, 'SOFT' 100", color: '#F5EFE1' }}>
          dawn.
        </div>
      </>
    )
  },
  { x: 350,  y: 270, w: 300, h: 230, rot: -1.6, caption: 'NYT opinion illus.', z: 3,
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
    )
  },
  { x: 680,  y: 280, w: 280, h: 220, rot: 1.8, caption: 'wknd playlist art', z: 2,
    scene: (
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #C5D4A8 0%, #F0A488 100%)', padding: 18 }}>
        <div style={{ width: '100%', height: 5, background: '#141814', marginBottom: 14 }} />
        <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 26, lineHeight: 1.1, fontVariationSettings: "'opsz' 36, 'SOFT' 100", color: '#141814' }}>
          slow saturday
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.16em', color: '#141814', textTransform: 'uppercase', marginTop: 6 }}>04 · '26</div>
        <div style={{ position: 'absolute', bottom: 18, right: 18, width: 44, height: 44, borderRadius: 999, background: '#141814', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#F7DFA0"><path d="M6 4l14 8-14 8z" /></svg>
        </div>
      </div>
    )
  },
  { x: 990,  y: 300, w: 260, h: 190, rot: -2.8, caption: 'ceramic glaze tests', z: 1,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#E8DCC5' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 2, padding: 12 }}>
          {['#C5D4A8','#F7DFA0','#4F6B28','#F0A488','#E8845F','#2a3620'].map((c,i) => (
            <div key={i} style={{ background: c, borderRadius: 3, boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.15)' }} />
          ))}
        </div>
      </>
    )
  },
  { x: 170,  y: 540, w: 360, h: 240, rot: 1.4, caption: 'Residency — Porto', z: 2,
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
    )
  },
  { x: 580,  y: 560, w: 320, h: 210, rot: -0.8, caption: 'Small book — "Turning"', z: 3,
    scene: (
      <>
        <div style={{ position: 'absolute', inset: 0, background: '#4F6B28' }} />
        <div style={{ position: 'absolute', inset: 24, background: '#F5EFE1', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.14em', color: '#141814', textTransform: 'uppercase' }}>a small book</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 40, lineHeight: 1, fontVariationSettings: "'opsz' 60, 'SOFT' 100", color: '#141814' }}>
            Turning.
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.14em', color: '#141814', textTransform: 'uppercase', textAlign: 'right' }}>caire · 2026</div>
        </div>
      </>
    )
  },
  { x: 940,  y: 540, w: 280, h: 220, rot: 2.4, caption: 'UX — garden app', z: 1,
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
    )
  },
];

function CreatingPage({ onOpenDetail }) {
  // canvas sized so structured-scatter can extend below fold
  const CANVAS_H = 820;
  return (
    <div className="subpage">
      <ClusterHeader
        active="Creating"
        eyebrow="Cluster · 02 of 03"
        title={<>Things I <em>make</em>.</>}
        sub="Projects, identities, objects. Scroll, drift, click anything that catches."
      />
      <div className="creating-grid" style={{ height: CANVAS_H }}>
        {CREATE_TILES.map((t, i) => (
          <div
            key={i}
            className="create-tile"
            onClick={i === 0 ? onOpenDetail : undefined}
            style={{
              left: t.x, top: t.y, width: t.w, height: t.h,
              transform: `rotate(${t.rot}deg)`,
              zIndex: t.z,
            }}
          >
            <div className="surface">{t.scene}</div>
            <div className="caption">{t.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Creating detail — Nachtgarten LP
// ─────────────────────────────────────────────────────────────

function CreatingDetailPage({ onBack }) {
  return (
    <div className="subpage">
      <div style={{ position: 'absolute', top: 32, right: 32, zIndex: 30 }}><CornerDownload /></div>
      <div style={{ position: 'absolute', bottom: 32, left: 32, zIndex: 30 }}><CornerMail /></div>
      <div style={{ position: 'absolute', bottom: 32, right: 32, zIndex: 30 }}><MusicPlayerPill expanded={true} /></div>
      <div style={{ position: 'absolute', top: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
        <NavPill active="Creating" />
      </div>

      <div className="detail-layout">
        <div className="detail-imggrid">
          <div className="detail-img tall">
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #2a3620, #4F6B28)' }} />
            <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <circle cx="50" cy="65" r="40" fill="#141814" />
              <circle cx="50" cy="65" r="22" fill="#F0A488" />
              <circle cx="50" cy="65" r="8" fill="#141814" />
            </svg>
          </div>
          <div className="detail-img">
            <div style={{ position: 'absolute', inset: 0, background: '#F7DFA0' }} />
            <div style={{ position: 'absolute', inset: 18, border: '2px solid #141814', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 40, fontVariationSettings: "'opsz' 60, 'SOFT' 100" }}>NG</div>
          </div>
          <div className="detail-img">
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #C5D4A8, #4F6B28)' }} />
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d="M 0 60 Q 25 50 50 62 T 100 58 L 100 100 L 0 100 Z" fill="#2a3620" />
              <circle cx="74" cy="24" r="10" fill="#F7DFA0" />
            </svg>
          </div>
          <div className="detail-img wide">
            <div style={{ position: 'absolute', inset: 0, background: '#141814', padding: 16 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#C5D4A8', lineHeight: 1.6, letterSpacing: '0.05em' }}>
                <div>01 &nbsp; nachtgarten</div>
                <div>02 &nbsp; forg<span style={{ color: '#F0A488' }}>e</span>ry</div>
                <div>03 &nbsp; little hours</div>
                <div>04 &nbsp; slow lichen</div>
                <div style={{ color: 'rgba(197, 212, 168, 0.45)' }}>05 &nbsp; ——</div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-back" onClick={onBack} style={{ cursor: 'pointer' }}>
            <span>←</span> back to creating
          </div>
          <h2>Nachtgarten <em>— LP.</em></h2>
          <div className="role">Art direction · Packaging · Videography</div>
          <p>
            Eleven tracks written over eighteen months in a sublet apartment in
            Kreuzberg, mostly at night, mostly badly at first. The cover
            is the turntable I inherited from my grandfather; the type is set
            in a forgotten 1960s Czech sans and then drawn over by hand.
          </p>
          <p>
            The brief was small: "a garden you only visit after midnight."
            A moss‑and‑butter palette, the coral only where something is
            about to bloom or burn. I pressed 300 records and sent them out
            in hand‑stamped sleeves — the last one shipped in March.
          </p>
          <dl className="detail-meta">
            <dt>Client</dt><dd>caire — self-released</dd>
            <dt>Year</dt><dd>2025 — 2026</dd>
            <dt>Medium</dt><dd>Vinyl · digital · film</dd>
            <dt>Press</dt><dd>It's Nice That · The Wire</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Thinking page — 6 tile variants
// ─────────────────────────────────────────────────────────────

const THINK_TILES = [
  { variant: '', date: 'May 2026 · 8 min', title: <>On <em>keeping a garden</em> instead of a brand.</>,
    body: 'Loreming in a quiet voice about why the word "brand" might be the least useful word a person can own. Thesis forthcoming.',
    tag: 'essay' },
  { variant: 'variant-quote', date: '— a friend, in March',
    title: <>"You keep <em>underestimating</em> the slow parts."</>,
    body: 'A thing said to me on a long walk that I have not stopped thinking about. Filed here for later.',
    tag: 'overheard' },
  { variant: '', date: 'Apr 2026 · 4 min', title: <>The case for an <em>ugly</em> first draft.</>,
    body: 'Lorem on how I stopped making pretty outlines and started writing the worst possible version first. Spoiler: I finish things now.',
    tag: 'note' },
  { variant: 'variant-coral', date: 'Mar 2026 · 12 min',
    title: <>Notes from a month <em>without</em> my phone.</>,
    body: 'Thirty‑one days, a paper map, a small notebook, and an embarrassing number of things I used to know by heart.',
    tag: 'diary' },
  { variant: 'variant-pencil', date: 'Feb 2026 · draft',
    title: <>Why I stopped measuring <em>everything</em>.</>,
    body: 'Lorem draft, handwritten first in a paper notebook I lost on a train, reconstructed from memory. Still very messy.',
    tag: 'draft' },
  { variant: 'variant-butter', date: 'Jan 2026 · 6 min',
    title: <>A slow argument for <em>boring</em> typography.</>,
    body: 'On reading fifty book covers in one sitting and concluding that almost all of them were trying too hard. Including my own.',
    tag: 'essay' },
];

function ThinkingPage() {
  return (
    <div className="subpage">
      <ClusterHeader
        active="Thinking"
        eyebrow="Cluster · 03 of 03"
        title={<>Things I've <em>written</em>.</>}
        sub="Long essays, short notes, overheard lines. Placeholders for now — I write slowly on purpose."
      />
      <div className="thinking-grid">
        {THINK_TILES.map((t, i) => (
          <article key={i} className={`think-tile ${t.variant}`}>
            <div className="date">{t.date}</div>
            <h3>{t.title}</h3>
            <p>{t.body}</p>
            <div className="tag">· {t.tag}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CreatingDetailMobile() {
  return (
    <div className="subpage" style={{ overflow: 'auto' }}>
      {/* top nav strip */}
      <div style={{ position: 'sticky', top: 0, left: 0, right: 0, height: 54, background: 'rgba(245, 239, 225, 0.9)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid var(--ink-hair)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--moss)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="font-display" style={{ fontSize: 12, color: 'var(--butter)' }}>P</span>
          </div>
          <div className="font-italic" style={{ fontSize: 13, color: 'var(--ink)' }}>patrick</div>
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
          creating / 01
        </div>
      </div>

      <div style={{ padding: '22px 20px 40px' }}>
        <div className="detail-back" style={{ marginBottom: 14 }}>← back</div>

        {/* hero image */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 6, overflow: 'hidden', marginBottom: 14, boxShadow: 'var(--shadow-polaroid)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #2a3620, #4F6B28)' }} />
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <circle cx="50" cy="50" r="36" fill="#141814" />
            <circle cx="50" cy="50" r="18" fill="#F0A488" />
            <circle cx="50" cy="50" r="6" fill="#141814" />
          </svg>
        </div>

        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 300, fontSize: 34, lineHeight: 1, letterSpacing: '-0.02em', margin: '0 0 8px', color: 'var(--ink)' }}>
          Nachtgarten <em style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontVariationSettings: "'opsz' 36, 'SOFT' 100" }}>— LP.</em>
        </h2>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 18 }}>
          Art direction · Packaging · Videography
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink)', margin: '0 0 12px' }}>
          Eleven tracks written over eighteen months in a sublet apartment in
          Kreuzberg, mostly at night, mostly badly at first. The cover is the
          turntable I inherited from my grandfather.
        </p>

        {/* stacked image grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '20px 0' }}>
          <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 4, overflow: 'hidden', background: '#F7DFA0' }}>
            <div style={{ position: 'absolute', inset: 10, border: '2px solid #141814', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 26, fontVariationSettings: "'opsz' 60, 'SOFT' 100" }}>NG</div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 4, overflow: 'hidden', background: 'linear-gradient(180deg, #C5D4A8, #4F6B28)' }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <path d="M 0 60 Q 25 50 50 62 T 100 58 L 100 100 L 0 100 Z" fill="#2a3620" />
              <circle cx="74" cy="24" r="9" fill="#F7DFA0" />
            </svg>
          </div>
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink)', margin: '0 0 12px' }}>
          A moss‑and‑butter palette, the coral only where something is about
          to bloom or burn. I pressed 300 records and sent them out in
          hand‑stamped sleeves.
        </p>

        <dl className="detail-meta" style={{ marginTop: 28 }}>
          <dt>Client</dt><dd>caire — self-released</dd>
          <dt>Year</dt><dd>2025 — 2026</dd>
          <dt>Medium</dt><dd>Vinyl · digital · film</dd>
          <dt>Press</dt><dd>It's Nice That · The Wire</dd>
        </dl>
      </div>
    </div>
  );
}

Object.assign(window, { PlayingPage, CreatingPage, CreatingDetailPage, CreatingDetailMobile, ThinkingPage });
