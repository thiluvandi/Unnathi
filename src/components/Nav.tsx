import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Logo, LogoContent } from './Logo'

const links = [
  { label: 'What We Do', href: '#work' },
  { label: 'Our Way', href: '#approach' },
  { label: 'Products', href: '#products' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#contact' },
]

/** Small ">" indicator shown next to the logo when the desktop nav is collapsed. */
function ChevronRight({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

/** Mobile menu toggle icon — points down when closed, rotates to point up when open. */
function ChevronToggle({ open, className = '' }: { open: boolean; className?: string }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  // Collapsed once scrolled, unless a mouse (not touch) is hovering it open.
  const chip = scrolled && !hovered

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
        <div className="w-full max-w-6xl">
        <nav
          onMouseEnter={() => {
            if (window.matchMedia('(hover: hover)').matches) setHovered(true)
          }}
          onMouseLeave={() => setHovered(false)}
          className={`flex items-center overflow-hidden rounded-full border backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 ease-out w-full px-4 py-2.5 ${
            chip ? 'max-w-fit' : 'max-w-full'
          } ${
            scrolled || open
              ? 'border-ink/10 bg-cream/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),_0_10px_34px_-14px_rgba(32,28,22,0.3)]'
              : 'border-ink/10 bg-cream/38 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),_0_8px_26px_-16px_rgba(32,28,22,0.3)]'
          }`}
        >
          {/* Logo — always rendered, never swapped, so it stays in place during collapse/expand */}
          <div className="flex shrink-0 items-center gap-1.5">
            <Logo className="hidden md:flex" />

            {/* Mobile: whole logo area is the menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex items-center gap-1.5 md:hidden"
            >
              <LogoContent />
              <AnimatePresence>
                {chip && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ChevronToggle open={open} className="text-ink-soft" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Desktop collapsed chevron */}
            <AnimatePresence>
              {chip && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.18 }}
                  className="hidden md:inline-flex"
                >
                  <ChevronRight className="text-ink-soft" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Nav links + CTA — only visible when expanded */}
          <AnimatePresence mode="popLayout">
            {!chip && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="relative flex flex-1 items-center gap-2"
              >
                <ul className="absolute inset-0 hidden items-center justify-center gap-7 md:flex">
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

                <a
                  href="#contact"
                  className="ml-auto hidden rounded-full bg-sage px-5 py-2 text-sm font-medium text-cream transition-all duration-300 hover:bg-ink hover:shadow-lg md:inline-flex"
                >
                  Support Us
                </a>

                {/* Mobile menu toggle (expanded state) */}
                <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  className="-mr-1 flex h-10 w-10 items-center justify-center text-ink md:hidden"
                >
                  <ChevronToggle open={open} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
        </div>
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
