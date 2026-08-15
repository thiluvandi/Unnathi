import { MotionConfig, motion } from 'framer-motion'
import { useLenis } from '../lib/useLenis'
import { Nav } from '../components/Nav'
import { Footer } from '../sections/Contact'

const pillars = [
  {
    title: 'Empowerment Over Charity',
    body: 'Sustainable income and skill development that build long-term independence.',
  },
  {
    title: 'Inclusive Innovation',
    body: 'Talent-focused opportunities tailored for individuals with disabilities and caregivers.',
  },
  {
    title: 'Shared Ownership',
    body: 'A future-focused model ensuring our team members are true partners in our success.',
  },
]

export default function About() {
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-screen bg-cream">
        <Nav />

        <main>
          {/* Hero */}
          <section
            aria-label="About Unnathi Creatives"
            className="mx-auto max-w-4xl px-6 pb-24 pt-40 md:pt-52"
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow text-clay"
            >
              About Us
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="mt-6 font-serif text-5xl leading-[1.05] font-light md:text-7xl"
            >
              Built on empowerment,{' '}
              <span className="italic text-clay">not charity.</span>
            </motion.h1>
          </section>

          {/* Origin story + video */}
          <section
            aria-label="Our story"
            className="mx-auto max-w-6xl px-6 pb-28 md:pb-40"
          >
            <div className="grid gap-16 md:grid-cols-2 md:gap-24 md:items-start">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                className="space-y-6 text-ink-soft md:text-lg leading-relaxed"
              >
                <p>
                  Founded in 2022 by{' '}
                  <span className="font-medium text-ink">Usha Reddy</span>, Unnathi Creatives
                  is a social enterprise built on a powerful principle: sustainable
                  empowerment through employment, not charity.
                </p>
                <p>
                  What began during the third wave of the pandemic in a modest
                  garage — generously offered by the family of our very first trainee,
                  Shanthanu — has grown into a vibrant, 10-member team operating out of
                  a dedicated workshop.
                </p>
                <p>
                  We create meaningful livelihood opportunities for persons with
                  disabilities, mothers of neurodivergent children, and local artisans.
                  Every item crafted at Unnathi represents financial independence,
                  dignity, and specialized skill.
                </p>
                <p>
                  Looking ahead, we are building toward a worker-owned cooperative
                  model. Our vision is an inclusive enterprise where every team member
                  holds ownership, shares in the profits, and actively shapes the
                  direction of the organization.
                </p>
              </motion.div>

              {/* Video */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                className="overflow-hidden rounded-2xl"
              >
                <video
                  src="/media/printing-wide.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Unnathi makers at work block-printing"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </section>

          {/* Divider */}
          <div className="mx-auto max-w-4xl px-6">
            <hr className="border-ink/10" />
          </div>

          {/* What We Stand For */}
          <section
            aria-label="What we stand for"
            className="mx-auto max-w-4xl px-6 py-28 md:py-40"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow text-clay"
            >
              What we stand for
            </motion.p>

            <div className="mt-16 space-y-14">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                  className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-16"
                >
                  <h3 className="font-serif text-2xl font-light leading-snug text-ink md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="text-ink-soft md:text-lg leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section
            aria-label="Get in touch"
            className="bg-ink py-24 text-cream md:py-36"
          >
            <div className="mx-auto max-w-4xl px-6 text-center">
              <p className="eyebrow text-clay-soft">Work with us</p>
              <h2 className="mx-auto mt-6 max-w-2xl font-serif text-4xl leading-[1.05] font-light md:text-6xl">
                Every order{' '}
                <span className="italic text-gold">pays a maker.</span>
              </h2>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:creativesunnathi@gmail.com"
                  className="rounded-full bg-clay px-8 py-4 text-sm font-medium text-cream transition-all hover:-translate-y-0.5 hover:bg-clay-soft hover:shadow-xl"
                >
                  creativesunnathi@gmail.com
                </a>
                <a
                  href="tel:+919448803499"
                  className="rounded-full border border-cream/25 px-8 py-4 text-sm font-medium text-cream transition-all hover:-translate-y-0.5 hover:border-cream"
                >
                  +91 94488 03499
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}
