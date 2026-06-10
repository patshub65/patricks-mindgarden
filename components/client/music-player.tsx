"use client"

import { useState, useRef, useEffect } from "react"
import { m, AnimatePresence } from "framer-motion"
import { Play, Pause, X } from "@phosphor-icons/react"

const TRACK_SRC = "/music/track.mp3" // drop your MP3 here
const TRACK_TITLE = "untitled — Patrick Caire"

const SPRING = { type: "spring" as const, stiffness: 260, damping: 28 }

const LABEL_STYLE = {
  fontFamily: "var(--font-body)",
  fontSize: 13,
  color: "rgba(255,255,255,0.82)",
  letterSpacing: "0.01em",
  pointerEvents: "none" as const,
  userSelect: "none" as const,
  textShadow: "0 1px 3px rgba(0,0,0,0.18)",
  whiteSpace: "nowrap" as const,
}

function fmt(s: number) {
  if (!s || isNaN(s)) return "0:00"
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export default function MusicPlayer() {
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buttonHovered, setButtonHovered] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  function tick() {
    const audio = audioRef.current
    if (!audio) return
    setProgress(audio.currentTime / (audio.duration || 1))
    rafRef.current = requestAnimationFrame(tick)
  }

  async function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      cancelAnimationFrame(rafRef.current)
      setPlaying(false)
    } else {
      await audio.play().catch(() => {})
      rafRef.current = requestAnimationFrame(tick)
      setPlaying(true)
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current
    if (!audio) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * audio.duration
    setProgress(ratio)
  }

  function seekKeyboard(e: React.KeyboardEvent<HTMLDivElement>) {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    if (e.key === 'ArrowRight') {
      const t = Math.min(audio.duration, audio.currentTime + 5)
      audio.currentTime = t
      setProgress(t / audio.duration)
    } else if (e.key === 'ArrowLeft') {
      const t = Math.max(0, audio.currentTime - 5)
      audio.currentTime = t
      setProgress(t / audio.duration)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={TRACK_SRC}
        aria-label={TRACK_TITLE}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => { setPlaying(false); setProgress(0) }}
      />

      <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 150, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <AnimatePresence>
          {expanded && (
            <m.div
              key="player-expanded"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={SPRING}
              style={{
                width: 280,
                background: "var(--color-surface-raised)",
                borderRadius: 20,
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--color-ink-hair)",
                padding: "16px 16px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {/* Track info */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "normal",
                  fontVariationSettings: '"opsz" 14, "SOFT" 80',
                  fontSize: 13,
                  color: "var(--color-ink)",
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {TRACK_TITLE}
                </div>
                <button
                  type="button"
                  onClick={() => { setExpanded(false) }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-ink-muted)", display: "flex", padding: 2 }}
                  aria-label="Close player"
                >
                  <X size={14} weight="bold" />
                </button>
              </div>

              {/* Scrubber */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  onClick={seek}
                  onKeyDown={seekKeyboard}
                  tabIndex={0}
                  style={{
                    height: 4,
                    background: "var(--color-sage)",
                    borderRadius: 99,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  role="slider"
                  aria-label="Seek"
                  aria-valuenow={Math.round(progress * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <m.div
                    style={{
                      position: "absolute",
                      left: 0, top: 0, bottom: 0,
                      background: "var(--color-moss)",
                      borderRadius: 99,
                      width: `${progress * 100}%`,
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-ink-muted)", letterSpacing: "0.06em" }}>
                  <span>{fmt(progress * duration)}</span>
                  <span>{fmt(duration)}</span>
                </div>
              </div>

              {/* Play/pause */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={togglePlay}
                  style={{
                    width: 40, height: 40,
                    borderRadius: "50%",
                    background: "var(--color-moss)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing
                    ? <Pause size={16} weight="fill" />
                    : <Play size={16} weight="fill" style={{ marginLeft: 2 }} />
                  }
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Collapsed pill + hover label */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AnimatePresence>
            {buttonHovered && !expanded && (
              <m.span
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 4 }}
                transition={{ duration: 0.15 }}
                style={LABEL_STYLE}
              >
                play my music
              </m.span>
            )}
          </AnimatePresence>
          <m.button
            type="button"
            className="corner-btn"
            onClick={() => {
              setExpanded(o => !o)
              if (!expanded && !playing) togglePlay()
            }}
            onHoverStart={() => setButtonHovered(true)}
            onHoverEnd={() => setButtonHovered(false)}
            aria-label={playing ? "Pause music" : "Play music"}
            whileTap={{ scale: 0.94 }}
            style={{ display: "flex", position: "relative" }}
          >
            {playing
              ? <Pause size={14} weight="fill" />
              : <Play size={14} weight="fill" style={{ marginLeft: 2 }} />
            }
            {/* Coral pulse when playing */}
            {playing && (
              <m.span
                style={{
                  position: "absolute",
                  inset: -3,
                  borderRadius: "50%",
                  border: "1.5px solid var(--color-coral)",
                  pointerEvents: "none",
                }}
                animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </m.button>
        </div>
      </div>
    </>
  )
}
