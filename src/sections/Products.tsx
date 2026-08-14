import { Reveal } from '../components/Reveal'
import { TiltCard } from '../components/TiltCard'

const products = [
  {
    name: 'Hand block-printed apparel',
    tag: 'Textile',
    desc: 'Kurtas, scarves and fabric printed by hand with natural indigo.',
    img: '/media/apparel.jpg',
  },
  {
    name: 'Cotton & jute bags',
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
    desc: 'Block-printed cards, paper and bags — humble, useful, earth-kind.',
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
              href="#contact"
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
      </div>
    </section>
  )
}
