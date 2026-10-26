import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stages = [
  { k: 'Handmade blocks', t: 'That begin the journey.' },
  { k: 'Learning the art of printing', t: 'Ink. Pressure. Precision. Repeat.' },
  { k: 'Guided Practice', t: 'Learning by doing to print independently.' },
  { k: 'Finding Confidence', t: 'The moment it comes together.' },
  { k: 'Learning Together', t: 'Skills grow through collaboration.' },
  { k: 'Celebrating Progress', t: 'Even a small achievement matters.' },
  { k: 'From learning to', accent: 'creating an opportunity.', finale: true },
] as const

// Timestamps (seconds) when each stage's narration begins in training-vo.mp3
const VO_CUE = [0, 2.59, 6.68, 8.15, 10.24, 12.87, 14.84]
const VO_DUR = 21.16
const STAGE_MS = 2500 // fallback timer when sound is off

export function Training() {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const voEl = useRef<HTMLAudioElement>(null)

  const [stageIndex, setStageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [soundOn, setSoundOn] = useState(false)

  const inViewRef = useRef(false)
  const soundOnRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ─── VO helpers ──────────────────────────────────────────────────────────
  const playVO = useCallback(() => {
    const r = voEl.current
    if (!r) return
    r.volume = 1.0
    r.play().catch(() => {})
  }, [])

  const stopVO = useCallback(() => {
    const r = voEl.current
    if (!r) return
    r.pause()
    r.currentTime = 0
  }, [])

  // ─── sync slideshow to VO timeupdate ─────────────────────────────────────
  useEffect(() => {
    const r = voEl.current
    if (!r) return
    const onTime = () => {
      if (!soundOnRef.current) return
      const t = r.currentTime
      let idx = 0
      for (let i = VO_CUE.length - 1; i >= 0; i--) {
        if (t >= VO_CUE[i]) { idx = i; break }
      }
      setStageIndex(idx)
      setProgress(Math.min(t / VO_DUR, 1))
    }
    r.addEventListener('timeupdate', onTime)
    return () => r.removeEventListener('timeupdate', onTime)
  }, [])

  // ─── fallback timer (runs when sound is off) ──────────────────────────────
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (soundOnRef.current) return
      setStageIndex((i) => {
        const next = (i + 1) % stages.length
        setProgress((next + 1) / stages.length)
        return next
      })
    }, STAGE_MS)
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }, [])

  // ─── visibility observer ─────────────────────────────────────────────────
  useEffect(() => {
    const el = section.current
    const v = video.current
    if (!el || !v) return
    const io = new IntersectionObserver(
      ([e]) => {
        inViewRef.current = e.isIntersecting
        if (e.isIntersecting) {
          v.play().catch(() => {})
          voEl.current?.load() // pre-buffer so toggle is instant
          startTimer()
          if (soundOnRef.current) playVO()
        } else {
          v.pause()
          stopTimer()
          stopVO()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => { io.disconnect(); stopTimer() }
  }, [playVO, stopVO, startTimer, stopTimer])

  // ─── sound toggle — truth comes from the audio element, not a ref ─────────
  const toggleSound = useCallback(() => {
    const r = voEl.current
    if (!r) return
    if (r.paused) {
      soundOnRef.current = true
      setSoundOn(true)
      r.volume = 1.0
      r.play().catch(() => {})
    } else {
      soundOnRef.current = false
      setSoundOn(false)
      r.pause()
      r.currentTime = 0
      setStageIndex(0)
      setProgress(0)
    }
  }, [])

  const s = stages[stageIndex]

  return (
    <section ref={section} id="training" className="relative bg-[#1f2735] text-cream">
      <audio ref={voEl} src="/media/training-vo.mp3" loop preload="auto" style={{ display: 'none' }} />

      <div className="relative h-[100svh] overflow-hidden">
        {/* Video panel */}
        <div
          className="absolute inset-0 overflow-hidden
            md:top-[7%] md:bottom-[7%] md:right-[4%] md:left-[53%] md:rounded-[1.6rem]
            shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
        >
          <video
            ref={video}
            src="/training.mp4"
            muted
            playsInline
            loop
            preload="auto"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent md:bg-gradient-to-r md:from-[#1f2735]/70 md:via-transparent md:to-transparent" />

          {/* Speaker toggle — top-right of video */}
          <button
            onClick={toggleSound}
            aria-label={soundOn ? 'Mute' : 'Unmute'}
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition hover:bg-black/60 md:right-4 md:top-4"
          >
            {soundOn ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-white">
                <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinejoin="round" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-white/60">
                <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinejoin="round" />
                <line x1="23" y1="9" x2="17" y2="15" strokeLinecap="round" />
                <line x1="17" y1="9" x2="23" y2="15" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Left text column */}
        <div className="absolute inset-y-0 left-0 z-10 flex w-full flex-col justify-end px-7 pb-16 md:justify-center md:pb-0 md:w-[45%] md:px-[5vw]">
          <p className="eyebrow hidden w-fit rounded-md bg-cream/10 px-3 py-1 font-bold text-gold drop-shadow-lg backdrop-blur-sm md:block">
            Inside the studio · Training
          </p>

          <div className="rounded-xl bg-black/40 px-4 py-3 backdrop-blur-md md:rounded-none md:bg-transparent md:p-0 md:backdrop-blur-none">
            <p className="eyebrow text-xs font-bold text-white drop-shadow-lg md:hidden">
              Inside the studio · Training
            </p>

            {/* Slideshow */}
            <div className="relative mt-2 h-20 md:mt-8 md:h-60">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stageIndex}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  {'finale' in s && s.finale ? (
                    <p className="font-serif text-lg leading-tight font-light md:text-[2.9rem] md:leading-[1.14]">
                      {s.k}{' '}
                      <span className="italic text-gold">{'accent' in s ? s.accent : ''}</span>
                    </p>
                  ) : (
                    <>
                      <h3 className="font-serif text-xl leading-tight font-light md:text-[3.2rem] md:leading-[1.05]">
                        {s.k}
                      </h3>
                      {'t' in s && (
                        <p className="mt-1 text-sm text-cream/75 md:mt-4 md:text-lg">{s.t}</p>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stage ticks */}
            <div className="mt-3 flex items-center gap-1.5 md:mt-8">
              {stages.map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: i === stageIndex ? 1 : 0.3, width: i === stageIndex ? 26 : 10 }}
                  transition={{ duration: 0.3 }}
                  className="h-[3px] rounded-full bg-cream"
                  style={{ display: 'inline-block' }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-px w-32 overflow-hidden bg-cream/15 md:mt-5 md:w-44">
              <motion.div
                animate={{ scaleX: progress }}
                transition={{ duration: 0.1, ease: 'linear' }}
                style={{ transformOrigin: 'left' }}
                className="h-full w-full bg-clay"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
