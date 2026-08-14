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

  // Chase the target with one seek in flight at a time. Firing a new
  // currentTime on every scroll tick piles up seeks the decoder can't finish
  // (the "stuck" scrub); waiting for `seeked` keeps it smooth.
  useEffect(() => {
    const v = video.current
    if (!v) return
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
    if (video.current) video.current.currentTime = 0.001
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
        <div className="absolute inset-y-0 left-0 z-10 flex w-full flex-col justify-center px-7 md:w-[45%] md:px-[5vw]">
          <p className="eyebrow text-clay-soft">Inside the studio · Training</p>

          {/* stage area */}
          <div className="relative mt-8 h-56 md:h-60">
            {stages.map((s, i) => (
              <Stage key={s.k} s={s} i={i} last={i === stages.length - 1} vs={videoSeconds} />
            ))}
          </div>

          {/* progress ticks */}
          <div className="mt-8 flex items-center gap-1.5">
            {stages.map((s, i) => (
              <Tick key={i} s={s} vs={videoSeconds} />
            ))}
          </div>

          {/* scrub bar */}
          <div className="mt-5 h-px w-44 overflow-hidden bg-cream/15">
            <motion.div
              style={{ scaleX: barScaleX, transformOrigin: 'left' }}
              className="h-full w-full bg-clay"
            />
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
        <p className="font-serif text-3xl leading-[1.14] font-light md:text-[2.9rem]">
          {s.k} <span className="italic text-gold">{s.accent}</span>
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <h3 className="font-serif text-4xl leading-[1.05] font-light md:text-[3.2rem]">{s.k}</h3>
      <p className="mt-4 text-base text-cream/75 md:text-lg">{s.t}</p>
    </motion.div>
  )
}

function Tick({ s, vs }: { s: { start: number; end: number }; vs: MotionValue<number> }) {
  const opacity = useTransform(vs, [s.start - 0.1, s.start, s.end, s.end + 0.1], [0.3, 1, 1, 0.3])
  const width = useTransform(vs, [s.start - 0.1, s.start, s.end, s.end + 0.1], [10, 26, 26, 10])
  return <motion.span style={{ opacity, width }} className="h-[3px] rounded-full bg-cream" />
}
