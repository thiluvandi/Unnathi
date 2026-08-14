import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Logo } from './Logo'

const links = [
  { label: 'What We Do', href: '#work' },
  { label: 'Our Way', href: '#approach' },
  { label: 'Products', href: '#products' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  // When the menu is open: lock scroll, pause Lenis, Esc closes, focus first link.
  useEffect(() => {
    if (!open) return
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-5 py-2.5 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ${scrolled || open
            ? 'border-ink/10 bg-cream/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),_0_10px_34px_-14px_rgba(32,28,22,0.3)]'
            : 'border-ink/10 bg-cream/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_8px_26px_-16px_rgba(32,28,22,0.3)]'
            }`}
        >
          <Logo />

          <ul className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-clay transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-sage px-5 py-2 text-sm font-medium text-cream transition-all duration-300 hover:bg-ink hover:shadow-lg md:inline-flex"
            >
              Support Us
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-1 flex h-10 w-10 items-center justify-center text-ink md:hidden"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                {open ? (
                  <>
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="8" x2="21" y2="8" />
                    <line x1="3" y1="16" x2="21" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-cream-deep px-8 pb-12 pt-28 md:hidden"
          >
            <nav className="flex flex-col">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink/10 py-4 font-serif text-3xl font-light text-ink"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-5">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="w-full rounded-full bg-clay py-4 text-center text-sm font-medium text-cream"
              >
                Support Us
              </a>
              <div className="flex flex-col gap-1 text-sm text-ink-soft">
                <a href="mailto:creativesunnathi@gmail.com" className="hover:text-ink">
                  creativesunnathi@gmail.com
                </a>
                <a href="tel:+919448803499" className="hover:text-ink">
                  +91 94488 03499
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
