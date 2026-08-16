import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { CraftMark } from '../components/CraftMark'

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink py-28 text-cream md:py-40"
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(185,138,68,0.28),_transparent_65%)]" />
      <CraftMark className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 -rotate-12 text-cream opacity-[0.05]" />
      <CraftMark className="pointer-events-none absolute -bottom-10 -right-10 h-80 w-80 rotate-12 text-gold opacity-[0.04]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="eyebrow text-clay-soft">Contact / Support Us</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-5xl leading-[1.02] font-light md:text-7xl">
            Every order
            <span className="italic text-gold"> pays a maker.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl text-cream/70 md:text-lg">
            Buy a piece, order a custom gift, or partner with us on corporate
            gifting. Tell us what you need — we’ll make it with you.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:unnathicreatives@gmail.com"
              className="rounded-full bg-clay px-8 py-4 text-sm font-medium text-cream transition-all hover:-translate-y-0.5 hover:bg-clay-soft hover:shadow-xl"
            >
              unnathicreatives@gmail.com
            </a>
            <a
              href="tel:+919448803499"
              className="rounded-full border border-cream/25 px-8 py-4 text-sm font-medium text-cream transition-all hover:-translate-y-0.5 hover:border-cream"
            >
              +91 94488 03499
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="https://maps.app.goo.gl/NUvSvJtN4cj2Y9hL8"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-start gap-3 rounded-full border border-cream/25 px-8 py-4 text-sm leading-relaxed text-cream transition-all hover:-translate-y-0.5 hover:border-cream"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mt-0.5 h-4 w-4 shrink-0 text-cream/70"
              aria-hidden
            >
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className="text-left">
              No 316 A, Shree Rama Nilaya, 3rd A Cross, 5th Main Rd,<br />
              Block 2, 3rd Stage, Basaveshwar Nagar,<br />
              Bengaluru, Karnataka 560079
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-ink px-6 pb-10 text-cream/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-cream/10 pt-10 md:flex-row">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-lg text-cream">Unnathi</span>
          <span className="text-[0.65rem] tracking-[0.2em] text-clay-soft uppercase">
            Creatives
          </span>
        </div>
        <p className="text-xs">
          © {new Date().getFullYear()} Unnathi Creatives · Made by hand, fairly paid
        </p>
        <div className="flex gap-6 text-xs">
          <Link to="/about" className="transition-colors hover:text-cream">
            About
          </Link>
          <a href="#products" className="transition-colors hover:text-cream">
            Products
          </a>
          <a href="#contact" className="transition-colors hover:text-cream">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
