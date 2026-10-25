import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stages = [
  { start: 0.0, end: 0.6, k: 'Handmade blocks', t: 'That begin the journey.' },
  { start: 0.6, end: 1.3, k: 'Learning the art of printing', t: 'Ink. Pressure. Precision. Repeat.' },
  { start: 1.3, end: 1.9, k: 'Guided Practice', t: 'Learning by doing to print independently.' },
  { start: 1.9, end: 2.6, k: 'Finding Confidence', t: 'The moment it comes together.' },
  { start: 2.6, end: 3.5, k: 'Learning Together', t: 'Skills grow through collaboration.' },
  { start: 3.5, end: 4.2, k: 'Celebrating Progress', t: 'Even a small achievement matters.' },
  {
    start: 4.2,
    end: 5.0,
    k: 'From learning to',
    accent: 'creating an opportunity.',
    finale: true,
  },
] as const

export function Training() {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const music = useRef<HTMLAudioElement>(null)
  const vo = useRef<HTMLAudioElement>(null)
  const [stageIndex, setStageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  // Pause/play video + audio based on visibility
  useEffect(() => {
    const el = section.current
    const v = video.current
    const m = music.current
    const r = vo.current
    if (!el || !v) return
    v.playbackRate = 1
    if (m) m.volume = 0.25  // music sits quietly under the voiceover
    if (r) r.volume = 1.0
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.play().catch(() => {})
          m?.play().catch(() => {})
          r?.play().catch(() => {})
        } else {
          v.pause()
          if (m) { m.pause(); m.currentTime = 0 }
          if (r) { r.pause(); r.currentTime = 0 }
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Advance slideshow on a fixed timer — independent of video speed
  const STAGE_DURATION = 2500 // ms per stage
  useEffect(() => {
    const id = setInterval(() => {
      setStageIndex((i) => {
        const next = (i + 1) % stages.length
        setProgress((next + 1) / stages.length)
        return next
      })
    }, STAGE_DURATION)
    return () => clearInterval(id)
  }, [])

  const s = stages[stageIndex]

  return (
    <section ref={section} id="training" className="relative bg-[#1f2735] text-cream">
      <audio ref={music} src="/media/training-music.mp3" loop preload="none" style={{ display: 'none' }} />
      <audio ref={vo} src="/media/training-vo.mp3" preload="none" style={{ display: 'none' }} />
      <div className="relative h-[100svh] overflow-hidden">
        {/* Video panel — full bg on mobile, right column on desktop */}
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
          {/* scrim: full gradient on mobile (text sits over video), subtle edge on desktop */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent md:bg-gradient-to-r md:from-[#1f2735]/70 md:via-transparent md:to-transparent" />
        </div>

        {/* Left text column */}
        <div className="absolute inset-y-0 left-0 z-10 flex w-full flex-col justify-end px-7 pb-16 md:justify-center md:pb-0 md:w-[45%] md:px-[5vw]">
          {/* Desktop eyebrow */}
          <p className="eyebrow hidden w-fit rounded-md bg-cream/10 px-3 py-1 font-bold text-gold drop-shadow-lg backdrop-blur-sm md:block">
            Inside the studio · Training
          </p>

          {/* Mobile wrapper */}
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
                      <span className="italic text-gold">
                        {'accent' in s ? s.accent : ''}
                      </span>
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
                  animate={{
                    opacity: i === stageIndex ? 1 : 0.3,
                    width: i === stageIndex ? 26 : 10,
                  }}
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
