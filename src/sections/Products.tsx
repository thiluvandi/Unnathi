import { useEffect, useRef } from 'react'
import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'

const CATALOGUE = '/media/unnathi-catalogue-2026.pdf'

type Product = { name: string; tag: string; desc: string; img: string }

const products: Product[] = [
  {
    name: 'Hand block-printed apparel',
    tag: 'Textile',
    desc: 'Sarees, bedsheets, kidswear and T-Shirts printed by hand with natural colours.',
    img: '/media/apparel.jpg',
  },
  {
    name: 'Block-printed bed linen',
    tag: 'Home',
    desc: 'Bedsheets and pillow covers, every border and motif stamped by hand.',
    img: '/media/products/bedsheet-ready.jpg',
  },
  {
    name: 'Hand-embroidered blouses',
    tag: 'New',
    desc: 'Florals stitched one petal at a time, in thread of every colour.',
    img: '/media/products/blouse-ready.jpg',
  },
  {
    name: 'Tote bags',
    tag: 'Everyday',
    desc: 'Sturdy cloth bags, jute pouches and potlis for a plastic-free life.',
    img: '/media/bags.jpg',
  },
  {
    name: 'Hand-painted stoles',
    tag: 'Signature',
    desc: 'One-of-a-kind stoles, each brushstroke laid by a maker’s hand.',
    img: '/media/stoles.jpg',
  },
  {
    name: 'Eco paper goods',
    tag: 'Sustainable',
    desc: 'Brown paper bags, newspaper bags and hand block printed gift wrappers.',
    img: '/media/paper.jpg',
  },
  {
    name: 'Customised gifts',
    tag: 'Bespoke',
    desc: 'Potlis, hampers and gifting, made to your occasion with care.',
    img: '/media/gifts.jpg',
  },
  {
    name: 'Greeting cards',
    tag: 'Handcrafted',
    desc: 'Hand-painted and block-printed cards — the pieces that started it all.',
    img: '/media/cards.jpg',
  },
]

// From hoop to wear — the embroidery story told in three frames.
const journey = [
  { k: '01', t: 'On the hoop', video: '/media/products/embroidery-hoop.mp4', poster: '/media/products/embroidery-hoop-poster.jpg', alt: 'A maker embroidering flowers onto fabric stretched in a hoop' },
  { k: '02', t: 'Stitch by stitch', img: '/media/products/blouse-closeup.jpg', alt: 'Close-up of multicoloured embroidered flowers on cream cotton' },
  { k: '03', t: 'Ready to wear', img: '/media/products/blouse-ready.jpg', alt: 'The finished embroidered blouse on a mannequin' },
]

/** Muted loop that only downloads and plays while on screen. */
function LoopVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="h-full w-full object-cover"
    />
  )
}

export function Products() {
  return (
    <section id="products" className="relative bg-cream-deep py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-clay">Our products</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.05] font-light text-ink md:text-6xl">
                All natural.
                <br />
                All made by hand.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="https://wa.me/919448803499?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20placing%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-all hover:border-ink hover:-translate-y-0.5"
            >
              Enquire / order →
            </a>
          </Reveal>
        </div>

        {/* Spotlight: hand embroidery, from hoop to wear */}
        <Reveal delay={0.05}>
          <div className="mt-14 rounded-3xl bg-cream p-6 md:p-10">
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-clay">New · Hand embroidery</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight font-light text-ink md:text-4xl">
                  From hoop <span className="italic text-clay">to wear.</span>
                </h3>
              </div>
              <p className="max-w-xs text-sm text-ink-soft">Every flower on this blouse was stitched by hand in our workshop.</p>
            </div>
            <div className="-mx-6 mt-8 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
              {journey.map((j) => (
                <figure key={j.k} className="w-[70vw] max-w-[18rem] shrink-0 snap-start md:w-auto md:max-w-none">
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-ink/5">
                    {'video' in j && j.video ? (
                      <LoopVideo src={j.video} poster={j.poster!} label={j.alt} />
                    ) : (
                      <img src={j.img} alt={j.alt} loading="lazy" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <figcaption className="mt-3 flex items-baseline gap-3 text-sm text-ink">
                    <span className="font-serif text-gold">{j.k}</span>
                    {j.t}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>

        <div
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: '1200px' }}
        >
          {products.map((p, i) => (
            <Reveal key={p.name} delay={0.05 * i}>
              <TiltCard className="group relative h-80 overflow-hidden rounded-3xl bg-ink">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                {/* scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/5" />
                <div
                  className="relative flex h-full flex-col justify-end p-7 text-cream lg:p-6"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <span className="mb-auto w-fit rounded-full border border-cream/30 bg-ink/20 px-3 py-1 text-[0.7rem] tracking-wide uppercase backdrop-blur-sm">
                    {p.tag}
                  </span>
                  <h3 className="font-serif text-2xl leading-tight">{p.name}</h3>
                  <p className="mt-2 text-sm text-cream/80">{p.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Full catalogue — view in browser or download the PDF */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-3xl border border-ink/10 bg-cream px-7 py-8 md:flex-row md:items-center md:px-10">
            <div>
              <p className="eyebrow text-clay">Catalogue 2026</p>
              <h3 className="mt-3 font-serif text-2xl leading-tight font-light text-ink md:text-3xl">
                See every piece we make.
              </h3>
              <p className="mt-2 text-sm text-ink-soft">The full range of products, in one catalogue (PDF).</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={CATALOGUE}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-xl"
              >
                View all products
              </a>
              <a
                href={CATALOGUE}
                download="Unnathi-Catalogue-2026.pdf"
                className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-all hover:border-ink hover:-translate-y-0.5"
              >
                Download catalogue ↓
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
