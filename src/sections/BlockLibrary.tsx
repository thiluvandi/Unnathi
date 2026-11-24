import { useRef } from 'react'
import { Reveal } from '../components/Reveal'
import { CraftMark } from '../components/CraftMark'

const photos = [
  { src: '/media/blocks/shelf-wide.jpg', alt: 'A shelf lined with hand-carved wooden printing blocks — paisley, chevron, tree and floral', w: 'w-[34rem]' },
  { src: '/media/blocks/shelves.jpg', alt: 'Two shelves stacked with printing blocks of every shape and pattern', w: 'w-[20rem]' },
  { src: '/media/blocks/bw-row.jpg', alt: 'Peacock, triangle, elephant and paisley blocks lined up in the studio', w: 'w-[28rem]' },
  { src: '/media/blocks/tray.jpg', alt: 'A tray of small numbered blocks seen from above', w: 'w-[18rem]' },
  { src: '/media/blocks/wall.jpg', alt: 'A flower block, chevron border blocks and a green geometric block up close', w: 'w-[22rem]' },
  { src: '/media/blocks/basket.jpg', alt: 'A wire basket of well-used blocks resting on newspaper', w: 'w-[22rem]' },
  { src: '/media/blocks/workshop.jpg', alt: 'The workshop corner — racks of hand-carved blocks', w: 'w-[40rem]' },
]

export function BlockLibrary() {
  const strip = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const el = strip.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <section id="blocks" className="relative overflow-hidden bg-cream-deep py-28 md:py-40">
      <CraftMark className="pointer-events-none absolute -top-12 -left-12 h-64 w-64 rotate-12 text-clay opacity-[0.04]" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-clay">The block library</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.05] font-light text-ink md:text-6xl">
                The building <span className="italic text-clay">‘blocks’</span> in its truest form.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="border-t border-ink/15 pt-4">
              <p className="font-serif text-5xl font-light text-ink md:text-6xl">150+</p>
              <p className="mt-2 text-sm text-ink-soft">Hand-carved wooden blocks</p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <div
          ref={strip}
          className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-4 [scrollbar-width:none] md:gap-6 md:scroll-px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className={`h-[22rem] max-w-[85vw] shrink-0 snap-start rounded-3xl object-cover md:h-[28rem] ${p.w}`}
            />
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-6 hidden max-w-6xl justify-end gap-3 px-6 md:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous photos"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-all hover:border-ink hover:-translate-y-0.5"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next photos"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-all hover:border-ink hover:-translate-y-0.5"
        >
          →
        </button>
      </div>
    </section>
  )
}
