import { MotionConfig } from 'framer-motion'
import { useLenis } from './lib/useLenis'
import { Nav } from './components/Nav'
import { Marquee } from './components/Marquee'
import { Hero } from './sections/Hero'
import { WhatWeDo } from './sections/WhatWeDo'
import { Makers } from './sections/Makers'
import { Approach } from './sections/Approach'
import { Training } from './sections/Training'
import { Products } from './sections/Products'
import { Impact } from './sections/Impact'
import { Contact, Footer } from './sections/Contact'

export default function App() {
  useLenis()

  return (
    // reducedMotion="user" makes every Framer animation honour the OS setting.
    <MotionConfig reducedMotion="user">
      <div className="grain relative">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Training />
          <Makers />
          <Approach />
          <WhatWeDo />
          <Products />
          <Impact />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
