import { Reveal } from '../components/Reveal'

export function Makers() {
  return (
    <section id="makers" className="mx-auto max-w-6xl px-6 py-28 md:py-40">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(38,40,46,0.45)]">
            <img
              src="/media/maker.jpg"
              alt="A maker being guided as she block-prints a row of cotton bags"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow text-clay">The makers</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-serif text-3xl leading-[1.08] font-light text-ink md:text-5xl">
              Behind every piece, a person.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-ink-soft md:text-lg">
              Each product is made by an adult on the autism spectrum, learning
              the craft at their own pace — and paid for the work they do.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex items-center gap-4">
              <img
                src="/media/team.jpg"
                alt="The Unnathi Creatives team in the studio"
                className="h-16 w-24 rounded-xl object-cover"
              />
              <span className="text-sm text-ink-soft">
                The team behind it all, in the Unnathi studio.
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
