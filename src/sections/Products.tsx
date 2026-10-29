import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'

const CATALOGUE = '/media/unnathi-catalogue-2026.pdf'

const products = [
  {
    name: 'Hand block-printed apparel',
    tag: 'Textile',
    desc: 'Sarees, bedsheets, kidswear and T-Shirts printed by hand with natural colours.',
    img: '/media/apparel.jpg',
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

        <div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
                  className="relative flex h-full flex-col justify-end p-7 text-cream"
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
