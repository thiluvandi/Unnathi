import { useEffect, useRef } from 'react'
import type { MotionValue } from 'framer-motion'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion'

// Stages mapped to the video timeline (seconds). The last one is the closing line.
const stages = [
  { start: 0.0, end: 0.6, k: 'Preparing the Tools', t: 'The blocks that begin the journey.' },
  { start: 0.6, end: 1.3, k: 'Learning the Technique', t: 'Ink. Pressure. Precision.' },
  { start: 1.3, end: 1.9, k: 'Guided Practice', t: 'Learning by doing.' },
  { start: 1.9, end: 2.6, k: 'Finding Confidence', t: 'The moment it comes together.' },
  { start: 2.6, end: 3.5, k: 'Learning Together', t: 'Skills grow through collaboration.' },
  { start: 3.5, end: 4.2, k: 'Celebrating Progress', t: 'Every achievement matters.' },
  {
    start: 4.2,
    end: 5.0,
    k: 'From learning a craft to',
    accent: 'creating an opportunity.',
    finale: true,
  },
] as const

const DUR = 5.0
const SCRUB_START = 0.12
const SCRUB_END = 0.86

export function Training() {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  })

  // 0 → 1: the video panel expands into a full-height panel on the right
  const enter = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  // seconds of video, driven by scroll; holds first/last frame outside the range
  const videoSeconds = useTransform(scrollYProgress, [SCRUB_START, SCRUB_END], [0, DUR])
  const targetTime = useRef(0)
  useMotionValueEvent(videoSeconds, 'change', (s) => {
    targetTime.current = s
  })

  // iOS Safari throttles rapid currentTime assignments — use seeked-chaining
  // so only one seek is in flight at a time, then immediately re-seek if the
  // target moved while we were waiting. Falls back to rAF on desktop.
  useEffect(() => {
    const v = video.current
    if (!v) return

    const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent)

    if (isIOS) {
      const onSeeked = () => {
        if (!v.duration || Number.isNaN(v.duration)) return
        const target = Math.min(targetTime.current, v.duration - 0.05)
        if (Math.abs(v.currentTime - target) > 0.05) v.currentTime = target
      }
      v.addEventListener('seeked', onSeeked)

      // Kick off initial seek and poll lightly so new scroll positions trigger a seek
      let raf = 0
      let last = -1
      const poll = () => {
        if (!v.seeking) {
          const target = Math.min(targetTime.current, (v.duration || 0) - 0.05)
          if (Math.abs(target - last) > 0.05) {
            last = target
            v.currentTime = target
          }
        }
        raf = requestAnimationFrame(poll)
      }
      raf = requestAnimationFrame(poll)

      return () => {
        cancelAnimationFrame(raf)
        v.removeEventListener('seeked', onSeeked)
      }
    }

    // Desktop: rAF loop, one seek per frame when not already seeking
    let raf = 0
    const tick = () => {
      if (v.duration && !Number.isNaN(v.duration) && !v.seeking) {
        const target = Math.min(targetTime.current, v.duration - 0.05)
        if (Math.abs(v.currentTime - target) > 0.015) v.currentTime = target
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const barScaleX = useSpring(
    useTransform(scrollYProgress, [SCRUB_START, SCRUB_END], [0, 1]),
    { stiffness: 120, damping: 30 },
  )

  const onLoaded = () => {
    const v = video.current
    if (!v) return
    const activate = v.play()
    if (activate !== undefined) {
      activate.then(() => {
        v.pause()
        v.currentTime = 0.001
      }).catch(() => {
        v.currentTime = 0.001
      })
    } else {
      v.currentTime = 0.001
    }
  }

  return (
    <section ref={section} id="training" className="relative h-[720vh] bg-[#1f2735] text-cream">
      <style>{`
        .vpanel { --p:0; --t:0px; --r:0px; --l:0%; --le:0%; --rad:0px; }
        @media (min-width:768px){
          .vpanel { --t:7%; --r:4%; --l:53%; --le:42%; --rad:1.6rem; }
        }
      `}</style>

      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* expanding video panel */}
        <motion.div
          className="vpanel absolute overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
          style={{
            ['--p' as string]: enter,
            top: 'calc(var(--t) * (1 - var(--p)))',
            bottom: 'calc(var(--t) * (1 - var(--p)))',
            right: 'calc(var(--r) * (1 - var(--p)))',
            left: 'calc(var(--l) + (var(--le) - var(--l)) * var(--p))',
            borderRadius: 'calc(var(--rad) * (1 - var(--p)))',
          }}
        >
          <video
            ref={video}
            src="/training.mp4?v=720ai"
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={onLoaded}
            className="h-full w-full object-cover"
          />
          {/* legibility scrim — full on mobile (text overlays), light left-edge on desktop */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent md:bg-gradient-to-r md:from-[#1f2735]/70 md:via-transparent md:to-transparent" />
        </motion.div>

        {/* left content column */}
        <div className="absolute inset-y-0 left-0 z-10 flex w-full flex-col justify-end px-7 pb-16 md:justify-center md:pb-0 md:w-[45%] md:px-[5vw]">
          {/* On desktop: standalone eyebrow above the stage area */}
          <p className="eyebrow hidden w-fit rounded-md bg-cream/10 px-3 py-1 font-bold text-gold drop-shadow-lg backdrop-blur-sm md:block">Inside the studio · Training</p>

          {/* Mobile: semi-transparent box wrapping all text content */}
          <div className="rounded-xl bg-black/40 px-4 py-3 backdrop-blur-md md:rounded-none md:bg-transparent md:p-0 md:backdrop-blur-none">
            <p className="eyebrow text-xs font-bold text-white drop-shadow-lg md:hidden">Inside the studio · Training</p>

            {/* stage area */}
            <div className="relative mt-2 h-20 md:mt-8 md:h-60">
              {stages.map((s, i) => (
                <Stage key={s.k} s={s} i={i} last={i === stages.length - 1} vs={videoSeconds} />
              ))}
            </div>

            {/* progress ticks */}
            <div className="mt-3 flex items-center gap-1.5 md:mt-8">
              {stages.map((s, i) => (
                <Tick key={i} s={s} vs={videoSeconds} />
              ))}
            </div>

            {/* scrub bar */}
            <div className="mt-3 h-px w-32 overflow-hidden bg-cream/15 md:mt-5 md:w-44">
              <motion.div
                style={{ scaleX: barScaleX, transformOrigin: 'left' }}
                className="h-full w-full bg-clay"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type StageData = {
  start: number
  end: number
  k: string
  t?: string
  accent?: string
  finale?: boolean
}

function Stage({
  s,
  i,
  last,
  vs,
}: {
  s: StageData
  i: number
  last: boolean
  vs: MotionValue<number>
}) {
  const inA = i === 0 ? -1 : s.start - 0.14
  const inB = i === 0 ? -0.4 : s.start + 0.08
  const outA = s.end - 0.08
  const outB = last ? s.end + 2 : s.end + 0.14
  const opacity = useTransform(vs, [inA, inB, outA, outB], [0, 1, 1, 0])
  const y = useTransform(vs, [inA, inB], [22, 0])

  if (s.finale) {
    return (
      <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
        <p className="font-serif text-lg leading-tight font-light md:text-[2.9rem] md:leading-[1.14]">
          {s.k} <span className="italic text-gold">{s.accent}</span>
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <h3 className="font-serif text-xl leading-tight font-light md:text-[3.2rem] md:leading-[1.05]">{s.k}</h3>
      <p className="mt-1 text-sm text-cream/75 md:mt-4 md:text-lg">{s.t}</p>
    </motion.div>
  )
}

function Tick({ s, vs }: { s: { start: number; end: number }; vs: MotionValue<number> }) {
  const opacity = useTransform(vs, [s.start - 0.1, s.start, s.end, s.end + 0.1], [0.3, 1, 1, 0.3])
  const width = useTransform(vs, [s.start - 0.1, s.start, s.end, s.end + 0.1], [10, 26, 26, 10])
  return <motion.span style={{ opacity, width }} className="h-[3px] rounded-full bg-cream" />
}
