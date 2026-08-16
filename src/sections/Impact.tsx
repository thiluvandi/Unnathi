import { Reveal } from '../components/Reveal'
import { Counter } from '../components/Counter'
import { CraftMark } from '../components/CraftMark'

// NOTE: placeholder figures — replace with Unnathi's real numbers.
const stats = [
  { n: 25, s: '+', label: 'Adults given dignified, paid work' },
  { n: 8, s: '', label: 'Handmade product categories' },
  { n: 5000, s: '+', label: 'Pieces crafted by hand' },
  { n: 100, s: '%', label: 'Natural, eco-friendly materials' },
]

export function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden mx-auto max-w-6xl px-6 py-28 md:py-40">
      <CraftMark className="pointer-events-none absolute top-0 -right-10 h-72 w-72 rotate-45 text-gold opacity-[0.05]" />
      <CraftMark className="pointer-events-none absolute -bottom-10 left-0 h-64 w-64 -rotate-12 text-clay opacity-[0.04]" />
      <div className="max-w-2xl">
        <Reveal>
          <p className="eyebrow text-clay">Our impact</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] font-light text-ink md:text-6xl">
            The work so far.
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
        {stats.map((st, i) => (
          <Reveal key={st.label} delay={i * 0.1}>
            <div className="border-t border-ink/15 pt-6">
              <p className="font-serif text-5xl font-light text-ink md:text-6xl">
                <Counter to={st.n} suffix={st.s} />
              </p>
              <p className="mt-3 text-sm text-ink-soft">{st.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
