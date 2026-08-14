import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

export function Counter({
  to,
  suffix = '',
  duration = 1800,
}: {
  to: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced motion: show the final figure immediately, no count-up.
    if (reduced) {
      el.textContent = to.toLocaleString() + suffix
      return
    }

    let done = false
    let raf = 0
    const run = () => {
      const start = performance.now()
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.round(eased * to).toLocaleString() + suffix
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done) {
          done = true
          io.disconnect()
          run()
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, suffix, duration, reduced])

  return <span ref={ref}>0{suffix}</span>
}
