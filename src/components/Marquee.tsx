import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const items = [
  'Hand block-printed apparel',
  'Cotton cloth bags',
  'Jute pouches & potlis',
  'Hand-painted stoles',
  'Eco paper bags',
  'Customised gifts',
]

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Drifts only while you scroll past it — no perpetual motion.
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-18%'])

  const row = [...items, ...items]
  return (
    <div ref={ref} className="relative overflow-hidden border-y border-ink/10 bg-cream-deep py-5">
      <motion.div style={{ x }} className="flex w-max gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-serif text-2xl font-light text-ink/70"
          >
            {item}
            <span className="text-clay">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
