import { Reveal } from '../components/Reveal'
import { CraftMark } from '../components/CraftMark'

const steps = [
  {
    k: 'Train',
    t: 'We teach the craft',
    d: 'Every maker learns block-printing, painting, stitching and finishing — at their own pace, with patient hands beside them.',
  },
  {
    k: 'Create',
    t: 'They make, they earn',
    d: 'Trained individuals create beautiful handmade products and are paid fairly for their work and contribution.',
  },
  {
    k: 'Own',
    t: 'Everyone shares',
    d: 'As a workers’ co-operative, each person is a part-owner — with a real share in profits and in how we grow.',
  },
]

export function Approach() {
  return (
    <section id="approach" className="relative overflow-hidden bg-sage py-28 text-cream md:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
      <CraftMark className="pointer-events-none absolute -top-12 -right-12 h-72 w-72 rotate-12 text-cream opacity-[0.06]" />
      <CraftMark className="pointer-events-none absolute -bottom-16 left-10 h-64 w-64 -rotate-6 text-cream opacity-[0.05]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow text-clay-soft">How we do it</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.05] font-light md:text-6xl">
            A co-operative,
            <span className="italic text-gold"> owned by its makers.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-cream/15 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.k} delay={0.1 + i * 0.12}>
              <div className="group h-full bg-sage p-8 transition-colors duration-500 hover:bg-sage-mid md:p-10">
                <span className="font-serif text-6xl font-light text-cream/25 transition-colors group-hover:text-gold">
                  0{i + 1}
                </span>
                <p className="mt-6 eyebrow text-clay-soft">{s.k}</p>
                <h3 className="mt-3 font-serif text-2xl md:text-3xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/75">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
