/* global React */
// ─────────────────────────────────────────────────────────────
// Polaroid — scattered draggable card with curved Fraunces label
// ─────────────────────────────────────────────────────────────

const { useState, useRef, useEffect } = React;

function StraightLabel({ text }) {
  return (
    <div style={{
      position: 'absolute',
      left: 0, right: 0, bottom: 0,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 10px',
      fontFamily: 'Fraunces, serif',
      fontStyle: 'italic',
      fontVariationSettings: '"opsz" 14, "SOFT" 100',
      fontSize: 14,
      color: 'var(--ink)',
      textAlign: 'center',
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}>
      {text}
    </div>
  );
}

function Polaroid({
  id, label, x, y, rot, size = 160, children,
  motionOn = false, floatDelay = 0, floatDur = 8, driftRot = 1.2,
  onDragEnd, onTap, annotIndex,
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x, y });
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ startX: 0, startY: 0, baseX: 0, baseY: 0, moved: false });

  // Keep pos synced with prop changes (e.g. when Tweaks regenerate positions)
  useEffect(() => { setPos({ x, y }); }, [x, y]);

  const onPointerDown = (e) => {
    e.target.setPointerCapture?.(e.pointerId);
    drag.current = { startX: e.clientX, startY: e.clientY, baseX: pos.x, baseY: pos.y, moved: false };
    if (motionOn) setDragging(true);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true;
    setPos({ x: drag.current.baseX + dx, y: drag.current.baseY + dy });
  };
  const onPointerUp = (e) => {
    if (dragging) {
      setDragging(false);
      onDragEnd?.(id, pos);
    }
    // Tap → navigate/peek, only if the user didn't drag
    if (!drag.current.moved && onTap) onTap(id);
  };

  const style = {
    left: pos.x,
    top: pos.y,
    width: size,
    '--base-rot': `${rot}deg`,
    '--float-delay': `${floatDelay}s`,
    '--float-dur': `${floatDur}s`,
    '--drift-rot': `${driftRot}deg`,
    transform: `rotate(${rot}deg)`,
    cursor: motionOn ? 'grab' : (onTap ? 'pointer' : 'default'),
  };

  return (
    <div
      ref={ref}
      className={`polaroid${motionOn ? ' motion-on' : ''}${dragging ? ' dragging' : ''}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      data-polaroid-id={id}
    >
      <div className="thumb">
        {children}
      </div>
      <StraightLabel text={label} />
      {typeof annotIndex === 'number' && (
        <div style={{
          position: 'absolute', top: -10, right: -10,
          width: 22, height: 22, borderRadius: 999,
          background: 'rgba(255,255,255,0.9)', border: '1px solid var(--ink-faint)',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ink)', pointerEvents: 'none',
        }}>{annotIndex}</div>
      )}
    </div>
  );
}

Object.assign(window, { Polaroid, StraightLabel });
