import { Reveal } from '../components/Reveal'
import { CraftMark } from '../components/CraftMark'

const pillars = [
  {
    title: 'Dignified work',
    body: 'We create real livelihood opportunities for adults with autism and intellectual disabilities — meaningful work, fairly paid.',
  },
  {
    title: 'Made by hand',
    body: 'We believe in sustainability and this principle makes sure that every product is handmade with eco-friendly and natural materials. ',
  },
  {
    title: 'Made with care, owned with pride.',
    body: 'by individuals with Autism Spectrum Disorder, mental retardation, ADHD, Down Syndrome and others.',
  },
]

export function WhatWeDo() {
  return (
    <section id="work" className="relative overflow-hidden mx-auto max-w-6xl px-6 py-28 md:py-40">
      <CraftMark className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rotate-12 text-clay opacity-[0.04]" />
      <CraftMark className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 -rotate-6 text-sage opacity-[0.04]" />
      <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow text-clay">What we do</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] font-light text-ink md:text-6xl">
              Handmade with a
              <br />
              <span className="italic text-sage">purpose.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-md text-ink-soft md:text-lg">
              At Unnathi Creatives, we provide a supportive environment fostering empowerment for individuals with autism and IDDs, turning their skills into sustainable employment. All of this enabled by a structured training program that is paramount.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col divide-y divide-ink/10">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.1}>
              <div className="group flex items-start gap-6 py-7 transition-colors">
                <CraftMark className="mt-1.5 h-5 w-5 shrink-0 text-clay transition-transform duration-500 group-hover:rotate-45" />
                <div>
                  <h3 className="font-serif text-2xl text-ink transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-md text-ink-soft">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
