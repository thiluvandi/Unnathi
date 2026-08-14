import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Scene3D } from '../components/Scene3D'
import { RevealWords } from '../components/Reveal'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* soft radial wash behind everything */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_26%,_rgba(154,164,120,0.18),_transparent_55%)]" />

      <motion.div style={{ scale }} className="absolute inset-0">
        <Scene3D />
      </motion.div>

      {/* legibility veil — creams the central content column so the eyebrow and
          headline read over any block, while leaving the side blocks visible */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[16%] z-[5] bg-[radial-gradient(ellipse_72%_58%_at_50%_46%,_rgba(236,231,219,0.98)_40%,_rgba(236,231,219,0)_74%)]" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mt-[6vh] flex flex-col items-center px-2 text-center md:mt-[15vh]"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 27 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="eyebrow mt-8 mb-9 text-clay"
        >
          Empowering Adults with Autism
        </motion.p>

        <h1 className="font-serif text-[11vw] leading-[1.06] font-light tracking-[-0.01em] text-ink sm:text-7xl md:text-8xl">
          <RevealWords text="Made by hand," delay={0.5} />
          <span className="mt-2 block italic text-sage">
            <RevealWords text="and fairly paid." delay={0.75} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="mt-11 max-w-lg text-base leading-8 text-ink-soft md:text-lg"
        >
          A workers' co-operative where adults on the autism spectrum craft
          beautiful, eco-friendly products — and share in the pride, the profit,
          and the decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#products"
            className="rounded-full bg-clay px-7 py-3.5 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-xl"
          >
            Explore our craft
          </a>
          <a
            href="#work"
            className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:border-ink hover:-translate-y-0.5"
          >
            Our story
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
