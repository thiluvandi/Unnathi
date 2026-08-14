import { Reveal } from '../components/Reveal'
import { Counter } from '../components/Counter'

// NOTE: placeholder figures — replace with Unnathi's real numbers.
const stats = [
  { n: 25, s: '+', label: 'Adults given dignified, paid work' },
  { n: 8, s: '', label: 'Handmade product categories' },
  { n: 5000, s: '+', label: 'Pieces crafted by hand' },
  { n: 100, s: '%', label: 'Natural, eco-friendly materials' },
]

export function Impact() {
  return (
    <section id="impact" className="mx-auto max-w-6xl px-6 py-28 md:py-40">
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
