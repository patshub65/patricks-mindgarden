/* global React, Polaroid, THUMBS */
// ─────────────────────────────────────────────────────────────
// Mindgarden scene — composed into Desktop and Mobile variants.
// ─────────────────────────────────────────────────────────────

// ── Corner icons (stroke-only, olive ink) ────────────────────
const Icon = {
  Download: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 4v12" /><path d="M6 12l6 6 6-6" /><path d="M4 20h16" />
    </svg>
  ),
  Mail: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" />
    </svg>
  ),
  Home: (p) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 11l8-7 8 7" /><path d="M5 10v9h14v-9" />
    </svg>
  ),
  Arrow: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 19V5" /><path d="M5 12l7-7 7 7" />
    </svg>
  ),
  Play: (p) => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M6 4l14 8-14 8z" />
    </svg>
  ),
};

// ── Card catalogue ──────────────────────────────────────────
const CARDS = [
  { id: 'web',        label: 'Web Design',        size: 170 },
  { id: 'code',       label: "things I've coded", size: 150 },
  { id: 'sidequests', label: 'Side-quests',       size: 155 },
  { id: 'artblog',    label: 'my old art blog',   size: 140 },
  { id: 'writing',    label: 'things I wrote',    size: 165 },
  { id: 'music',      label: 'music I make',      size: 160 },
  { id: 'dj',         label: 'DJ sets',           size: 140 },
  { id: 'video',      label: 'Music Video',       size: 150 },
  { id: 'visuals',    label: 'visuals I made',    size: 150 },
  { id: 'ux',         label: 'UX Design',         size: 160 },
];

// Desktop positions (for 1440×900 artboard, top-left of each polaroid).
// Laid out radially around the center text block (~720, 450).
// Rotations are stored alongside; Tweaks scale them by rotationRange/8.
const DESKTOP_LAYOUT = {
  // LEFT SIDE
  web:        { x: 120,  y: 150, rot: -6 },
  code:       { x: 340,  y: 230, rot: 5  },
  sidequests: { x: 175,  y: 340, rot: -8 },
  artblog:    { x: 65,   y: 525, rot: 7  },
  writing:    { x: 305,  y: 500, rot: 4  },
  // RIGHT SIDE
  music:      { x: 880,  y: 165, rot: -5 },
  dj:         { x: 1120, y: 135, rot: 6  },
  video:      { x: 1165, y: 330, rot: -4 },
  ux:         { x: 840,  y: 485, rot: 8  },
  visuals:    { x: 1145, y: 555, rot: -7 },
};

// Mobile positions (for 375×812). Cards are smaller, arranged around
// a narrower central column.
const MOBILE_LAYOUT = {
  web:        { x: -18,  y: 150, rot: -8, size: 118 },
  code:       { x: 200,  y: 100, rot: 6,  size: 110 },
  sidequests: { x: 260,  y: 260, rot: -5, size: 110 },
  artblog:    { x: -30,  y: 310, rot: 7,  size: 105 },
  writing:    { x: -10,  y: 600, rot: -6, size: 115 },
  music:      { x: 260,  y: 450, rot: -4, size: 112 },
  dj:         { x: -30,  y: 455, rot: 4,  size: 100 },
  video:      { x: 280,  y: 600, rot: 8,  size: 105 },
  ux:         { x: 160,  y: 710, rot: -5, size: 110 },
  visuals:    { x: 25,   y: 60,  rot: 5,  size: 100 },
};

// ── Shared pieces ───────────────────────────────────────────
function NavPill({ active = null }) {
  const items = ['Playing', 'Creating', 'Thinking'];
  return (
    <div className="nav-pill">
      {items.map((i) => (
        <div key={i} className={`nav-pill-item${active === i ? ' active' : ''}`}>{i}</div>
      ))}
    </div>
  );
}

function CornerMail() {
  return (
    <div style={{ position: 'relative' }}>
      <button className="corner-btn" aria-label="Email Patrick"><Icon.Mail /></button>
    </div>
  );
}

function CornerDownload({ showHint = false }) {
  return (
    <div style={{ position: 'relative' }}>
      <button className="corner-btn" aria-label="Download CV"><Icon.Download /></button>
      {showHint && (
        <div className="download-flyout">
          <div className="download-flyout-arrow" />
          <span>CV + portfolio</span>
        </div>
      )}
    </div>
  );
}

function MusicPlayerPill({ expanded = false }) {
  if (!expanded) {
    return (
      <button className="corner-btn" aria-label="Music player">
        <Icon.Play style={{ marginLeft: 2 }} />
      </button>
    );
  }
  return (
    <div className="player-pill" style={{ width: 260 }}>
      <div className="track" style={{ flex: 1, minWidth: 0, paddingLeft: 6 }}>
        <div className="t" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Nachtgarten (Patrick's Edit)
        </div>
        <div className="a">caire</div>
      </div>
      <button className="play-btn" aria-label="Play"><Icon.Play style={{ marginLeft: 1 }} /></button>
    </div>
  );
}

function ChatBar() {
  return (
    <div className="chatbar">
      <input placeholder="What would you like to know?" readOnly />
      <button className="chatbar-send" aria-label="Send"><Icon.Arrow /></button>
    </div>
  );
}

function CenterText({ scale = 1 }) {
  const titleSize = 108 * scale;
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      width: 420 * scale,
      pointerEvents: 'none',
      zIndex: 5,
    }}>
      <div className="font-display" style={{
        fontSize: titleSize,
        lineHeight: 0.95,
        fontVariationSettings: '"opsz" 144, "SOFT" 30',
        letterSpacing: '-0.02em',
        marginBottom: 22 * scale,
      }}>
        Patrick
      </div>
      <p style={{
        margin: '0 auto 14px',
        maxWidth: 340 * scale,
        fontSize: 14 * scale,
        lineHeight: 1.55,
        color: 'var(--ink)',
        textAlign: 'center',
        textWrap: 'balance',
      }}>
        hello there! I'm a designer, creative developer and music nerd bridging craft and code in Berlin.
      </p>
      <p style={{
        margin: '0 auto',
        maxWidth: 340 * scale,
        fontSize: 14 * scale,
        lineHeight: 1.55,
        color: 'var(--ink)',
        textAlign: 'center',
        textWrap: 'balance',
      }}>
        Welcome to my <em className="font-italic" style={{ fontSize: 15 * scale }}>mindgarden</em> — explore.
      </p>
    </div>
  );
}

// ── Desktop scene ───────────────────────────────────────────
function DesktopScene({
  motionOn = false,
  rotationRange = 8,     // degrees, ±
  spreadAmount = 1.0,    // 0.8..1.2 multiplier on radial distance
  showAnnotations = true,
}) {
  const cx = 720, cy = 450;
  const [showDownloadHint, setShowDownloadHint] = React.useState(false);
  const [peekId, setPeekId] = React.useState(null);

  const PEEK_IDS = new Set(['sidequests', 'video', 'visuals']);
  const EXTERNAL_IDS = new Set(['artblog']);
  const handleTap = React.useCallback((id) => {
    if (PEEK_IDS.has(id)) { setPeekId(id); return; }
    // navigate/external — no-op in mock
  }, []);

  React.useEffect(() => {
    if (!peekId) return;
    const onKey = (e) => { if (e.key === 'Escape') setPeekId(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [peekId]);

  React.useEffect(() => {
    const t1 = setTimeout(() => setShowDownloadHint(true), 1200);
    const t2 = setTimeout(() => setShowDownloadHint(false), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Compute final positions from layout × spreadAmount × rotationRange
  const placed = CARDS.map((c, i) => {
    const base = DESKTOP_LAYOUT[c.id];
    // Scale positions radially from center
    const dx = base.x - (cx - c.size / 2);
    const dy = base.y - (cy - c.size / 2);
    const x = (cx - c.size / 2) + dx * spreadAmount;
    const y = (cy - c.size / 2) + dy * spreadAmount;
    const rot = (base.rot / 8) * rotationRange;
    return { ...c, x, y, rot, floatDelay: i * 0.4, floatDur: 7 + (i % 4) };
  });

  return (
    <div className="garden-bg" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="garden-grain" />

      {/* Corners */}
      <div style={{ position: 'absolute', top: 32, right: 32, zIndex: 30 }}>
        <CornerDownload showHint={showDownloadHint} />
      </div>
      <div style={{ position: 'absolute', bottom: 32, left: 32, zIndex: 30 }}>
        <CornerMail />
      </div>
      <div style={{ position: 'absolute', bottom: 32, right: 32, zIndex: 30 }}>
        <MusicPlayerPill expanded={true} />
      </div>

      {/* Top-center nav */}
      <div style={{ position: 'absolute', top: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
        <NavPill active={null} />
      </div>

      {/* Center copy */}
      <CenterText scale={1} />

      {/* Polaroids */}
      {placed.map((c, i) => {
        const Thumb = THUMBS[c.id];
        const isPeek = PEEK_IDS.has(c.id);
        const dimmed = peekId && peekId !== c.id;
        return (
          <div key={c.id} style={{ opacity: dimmed ? 0.25 : 1, transition: 'opacity 300ms ease', filter: dimmed ? 'blur(0.5px)' : 'none' }}>
            <Polaroid
              id={c.id}
              label={c.label}
              x={c.x} y={c.y} rot={c.rot}
              size={c.size}
              motionOn={motionOn && !peekId}
              floatDelay={c.floatDelay}
              floatDur={c.floatDur}
              driftRot={c.rot > 0 ? -1.2 : 1.2}
              annotIndex={showAnnotations ? ANNOT_INDEX[c.id] : undefined}
              onTap={handleTap}
            >
              <Thumb />
            </Polaroid>
          </div>
        );
      })}

      {/* Chat bar */}
      <div style={{ position: 'absolute', bottom: 64, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
        <ChatBar />
      </div>

      {/* Peek overlay */}
      {peekId && <PeekOverlay id={peekId} onClose={() => setPeekId(null)} />}

      {/* Motion annotations on the margin */}
      {showAnnotations && !motionOn && <MotionAnnotations />}
    </div>
  );
}

// ── Mobile scene ─────────────────────────────────────────────
function MobileScene({ motionOn = false, rotationRange = 8, spreadAmount = 1.0 }) {
  const placed = CARDS.map((c, i) => {
    const base = MOBILE_LAYOUT[c.id];
    const rot = (base.rot / 8) * rotationRange;
    return { ...c, ...base, rot, floatDelay: i * 0.35, floatDur: 7 + (i % 3) };
  });

  return (
    <div className="garden-bg" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div className="garden-grain" />

      {/* Corners — smaller on mobile */}
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 30 }}>
        <button className="corner-btn" style={{ width: 40, height: 40 }} aria-label="Download CV">
          <Icon.Download width="16" height="16" />
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: 90, left: 20, zIndex: 30 }}>
        <button className="corner-btn" style={{ width: 40, height: 40 }} aria-label="Email Patrick">
          <Icon.Mail width="16" height="16" />
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: 90, right: 20, zIndex: 30 }}>
        <button className="corner-btn" style={{ width: 40, height: 40 }} aria-label="Music player">
          <Icon.Play style={{ marginLeft: 1 }} />
        </button>
      </div>

      {/* Top-center nav (compact) */}
      <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
        <div className="nav-pill" style={{ padding: '5px 6px' }}>
          {['Playing', 'Creating', 'Thinking'].map((t) => (
            <div key={t} className="nav-pill-item" style={{ fontSize: 15, padding: '6px 12px' }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Center copy — stacked mid viewport */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)', textAlign: 'center',
        width: 260, zIndex: 5, pointerEvents: 'none',
      }}>
        <div className="font-display" style={{
          fontSize: 58, lineHeight: 0.95, marginBottom: 12,
          fontVariationSettings: '"opsz" 144, "SOFT" 30',
          letterSpacing: '-0.02em',
        }}>Patrick</div>
        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, textAlign: 'center', textWrap: 'balance' }}>
          designer, creative developer and music nerd bridging craft and code in Berlin.
        </p>
        <p style={{ margin: '10px 0 0', fontSize: 11.5, lineHeight: 1.55, textAlign: 'center', textWrap: 'balance' }}>
          Welcome to my <em className="font-italic" style={{ fontSize: 12.5 }}>mindgarden</em> — explore.
        </p>
      </div>

      {/* Polaroids */}
      {placed.map((c) => {
        const Thumb = THUMBS[c.id];
        return (
          <Polaroid
            key={c.id}
            id={c.id}
            label={c.label}
            x={c.x} y={c.y} rot={c.rot}
            size={c.size}
            motionOn={motionOn}
            floatDelay={c.floatDelay}
            floatDur={c.floatDur}
            driftRot={c.rot > 0 ? -1 : 1}
          >
            <Thumb />
          </Polaroid>
        );
      })}

      {/* Chat bar — compact */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 20, width: 'calc(100% - 32px)' }}>
        <div className="chatbar" style={{ width: '100%', padding: '6px 6px 6px 18px' }}>
          <input placeholder="What would you like to know?" readOnly style={{ fontSize: 13, padding: '8px 0' }} />
          <button className="chatbar-send" style={{ width: 32, height: 32 }} aria-label="Send"><Icon.Arrow /></button>
        </div>
      </div>
    </div>
  );
}

// ── Motion annotations (margin overlay) ─────────────────────
const ANNOT_INDEX = {
  web: 1, code: 2, music: 3, dj: 4, video: 5,
};

function MotionAnnotations() {
  const A = [
    { top: 80,  left: 24,  text: <><span className="dot">1</span>Idle float · ±4px Y, ±1° rot · 6–10s cycles · staggered</> },
    { top: 215, left: 24,  text: <><span className="dot">2</span>Hover → scale 1.03, settles upright. Drag → scale 1.05 + deeper shadow. Drop → stays where placed.</> },
    { top: 80,  left: 1260, text: <><span className="dot">3</span>Tap (no drag) → navigates to cluster page.</> },
    { top: 230, left: 1260, text: <><span className="dot">4</span>All cards drift ±3px with cursor (parallax).</> },
    { top: 405, left: 1260, text: <><span className="dot">5</span>Corner icons have magnetic pull (±6px toward cursor).</> },
    { top: 560, left: 24,  text: <>Nav-pill switching uses <em style={{ fontStyle:'italic', fontFamily:'Fraunces, serif' }}>layoutId</em> sliding (450ms spring).</> },
    { top: 720, left: 1240, text: <>"mindgarden" in Fraunces italic inside Manrope sentence — opsz 36, SOFT 100.</> },
  ];
  return (
    <>
      {A.map((a, i) => (
        <div key={i} className="annot" style={{ top: a.top, left: a.left, width: 170 }}>
          {a.text}
        </div>
      ))}
    </>
  );
}

// ── Peek overlay ────────────────────────────────────────────
function PeekOverlay({ id, onClose }) {
  const card = CARDS.find((c) => c.id === id);
  const label = card?.label || '';
  return (
    <div
      className="peek-scrim"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onPointerDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="peek-card" style={{ transform: 'rotate(1deg)' }}>
        <div className="peek-close" onClick={onClose} role="button" aria-label="Close">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </div>
        <div className="peek-content">
          {id === 'visuals' && <PeekVisuals />}
          {id === 'video' && <PeekMusicVideo />}
          {id === 'sidequests' && <PeekSideQuests />}
        </div>
        <div className="peek-label">{label}</div>
      </div>
    </div>
  );
}

function PeekVisuals() {
  // 9 colour-blocked poster thumbs — masonry-ish via varied aspect ratios
  const tiles = [
    { bg: 'var(--coral)',  shape: <svg viewBox="0 0 60 60"><circle cx="30" cy="26" r="18" fill="var(--ink)" /><rect x="6" y="46" width="48" height="10" fill="var(--butter)" /></svg>, h: 180 },
    { bg: 'var(--moss)',   shape: <svg viewBox="0 0 60 60"><path d="M10 50 L30 10 L50 50 Z" fill="var(--butter)" /></svg>, h: 140 },
    { bg: 'var(--butter)', shape: <svg viewBox="0 0 60 60"><rect x="14" y="14" width="32" height="32" fill="var(--coral)" /><circle cx="30" cy="30" r="8" fill="var(--ink)" /></svg>, h: 160 },
    { bg: 'var(--sage)',   shape: <svg viewBox="0 0 60 60"><path d="M0 40 Q15 10 30 40 T60 40 L60 60 L0 60 Z" fill="var(--moss)" /></svg>, h: 200 },
    { bg: '#2a3620',       shape: <svg viewBox="0 0 60 60"><circle cx="20" cy="20" r="10" fill="var(--butter)" /><circle cx="40" cy="40" r="14" fill="var(--coral)" /></svg>, h: 150 },
    { bg: 'var(--surface)',shape: <svg viewBox="0 0 60 60"><rect x="10" y="10" width="18" height="18" fill="var(--moss)" /><rect x="32" y="10" width="18" height="18" fill="var(--coral)" /><rect x="10" y="32" width="18" height="18" fill="var(--butter)" /><rect x="32" y="32" width="18" height="18" fill="var(--sage)" /></svg>, h: 170 },
    { bg: 'var(--ink)',    shape: <svg viewBox="0 0 60 60"><text x="30" y="36" textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="20" fill="var(--butter)">form</text></svg>, h: 140 },
    { bg: 'var(--coral)',  shape: <svg viewBox="0 0 60 60"><path d="M10 30 Q30 5 50 30 Q30 55 10 30 Z" fill="var(--ink)" /></svg>, h: 170 },
    { bg: 'var(--moss)',   shape: <svg viewBox="0 0 60 60"><rect x="8" y="28" width="44" height="4" fill="var(--butter)" /><rect x="28" y="8" width="4" height="44" fill="var(--butter)" /></svg>, h: 180 },
  ];
  return (
    <div className="peek-masonry">
      {tiles.map((t, i) => (
        <div key={i} className="peek-tile" style={{ background: t.bg, height: t.h }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '70%', height: '70%' }}>{t.shape}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PeekMusicVideo() {
  return (
    <div className="peek-video">
      <div className="peek-video-frame">
        {/* Cinematic moss/sage still */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #1f2d15 0%, #4F6B28 60%, #8ea665 100%)' }} />
        <div style={{ position: 'absolute', top: '22%', right: '26%', width: 48, height: 48, borderRadius: 999, background: 'var(--butter)', boxShadow: '0 0 40px rgba(247,223,160,0.6)' }} />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M 0 78 Q 25 72 50 76 T 100 74 L 100 100 L 0 100 Z" fill="rgba(0,0,0,0.35)" />
          <circle cx="38" cy="72" r="2.2" fill="rgba(255,255,255,0.7)" />
          <rect x="37.3" y="74" width="1.6" height="6" fill="rgba(255,255,255,0.7)" />
        </svg>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.4) 100%)' }} />

        {/* top-left title */}
        <div style={{ position: 'absolute', top: 18, left: 20, fontFamily: 'Manrope, sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.92)' }}>
          Nachtgarten · Music Video
        </div>
        {/* bottom-right duration */}
        <div style={{ position: 'absolute', bottom: 18, right: 20, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.85)', padding: '3px 8px', borderRadius: 999, background: 'rgba(0,0,0,0.35)' }}>
          3:42
        </div>
        {/* center play */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: 999, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--ink)"><path d="M6 4l14 8-14 8z" /></svg>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 16, padding: '0 4px' }}>
        <div>
          <div className="font-display" style={{ fontSize: 22, lineHeight: 1.1 }}>Nachtgarten</div>
          <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>Dir. Patrick Caire · 2025</div>
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>1080p · BERLIN</div>
      </div>
    </div>
  );
}

function PeekSideQuests() {
  const quests = [
    { bg: '#2a3620', caption: '3am color study', content: (
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div style={{ background: 'var(--coral)' }} />
        <div style={{ background: 'var(--butter)' }} />
        <div style={{ background: 'var(--sage)' }} />
        <div style={{ background: 'var(--moss)' }} />
      </div>
    ) },
    { bg: 'var(--sage)', caption: 'pixel weather', content: (
      <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <circle cx="22" cy="22" r="8" fill="var(--butter)" />
        <ellipse cx="34" cy="28" rx="16" ry="5" fill="var(--surface)" />
        <ellipse cx="26" cy="32" rx="14" ry="4" fill="rgba(255,255,255,0.7)" />
        {[...Array(6)].map((_, i) => (
          <line key={i} x1={14 + i*6} y1={42} x2={12 + i*6} y2={52} stroke="var(--moss)" strokeWidth="1.2" />
        ))}
      </svg>
    ) },
    { bg: '#1b1f1a', caption: 'ascii garden', content: (
      <div style={{ position: 'absolute', inset: 0, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 9, lineHeight: 1.2, color: 'var(--sage)' }}>
        <div>&nbsp;&nbsp;&nbsp;~~~</div>
        <div>&nbsp;&nbsp;<span style={{ color: 'var(--butter)' }}>*</span>&nbsp;|&nbsp;<span style={{ color: 'var(--coral)' }}>*</span></div>
        <div>&nbsp;&nbsp;&nbsp;|</div>
        <div>&nbsp;&nbsp;_|_</div>
        <div style={{ color: 'rgba(197,212,168,0.5)' }}>growing...</div>
      </div>
    ) },
    { bg: 'var(--butter)', caption: 'rotating shape', content: (
      <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <g transform="rotate(18 30 30)">
          <rect x="18" y="18" width="24" height="24" fill="var(--coral)" />
          <rect x="18" y="18" width="24" height="24" fill="none" stroke="var(--ink)" strokeWidth="1.2" />
        </g>
        <rect x="18" y="18" width="24" height="24" fill="none" stroke="var(--moss)" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ) },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 16, height: 500 }}>
      {quests.map((q, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            position: 'relative', background: q.bg,
            borderRadius: 14, overflow: 'hidden', flex: 1,
            border: '1px solid var(--ink-hair)',
          }}>
            {q.content}
          </div>
          <div className="font-italic" style={{ fontSize: 14, color: 'var(--ink)' }}>{q.caption}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { DesktopScene, MobileScene, Icon, NavPill, CornerMail, CornerDownload, MusicPlayerPill, PeekOverlay });

