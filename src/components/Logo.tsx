import { useState } from 'react'
import { Link } from 'react-router-dom'

/** Unnathi Creatives mark — two figures forming an "S". Recreated as SVG so it
 *  renders crisp in any colour (uses currentColor). Used as a fallback until a
 *  real logo file is provided at /public/logo.png (transparent background). */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <path
        d="M70 32
           C70 20 44 20 44 36
           C44 52 72 50 72 66
           C72 82 46 82 46 70"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <circle cx="72" cy="26" r="11" fill="currentColor" />
      <circle cx="44" cy="62" r="9" fill="currentColor" />
    </svg>
  )
}

/** Just the visual mark + wordmark, with no wrapping link — for contexts (like
 *  a collapsed nav button) that need their own click behaviour instead of
 *  navigating home. */
export function LogoContent({ className = '' }: { className?: string }) {
  const [useImg, setUseImg] = useState(true)

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {useImg ? (
        // Drop a transparent-background logo at public/logo.png to use the real one.
        <img
          src="/logo.png"
          alt="Unnathi Creatives"
          className="h-[4.5rem] w-auto"
          onError={() => setUseImg(false)}
        />
      ) : (
        <>
          <LogoMark className="h-8 w-8 text-ink" />
          <span className="flex flex-col leading-none">
            <span className="text-[0.95rem] font-semibold tracking-[0.14em] text-ink">
              UNNATHI
            </span>
            <span className="text-[0.62rem] font-medium tracking-[0.34em] text-clay">
              CREATIVES
            </span>
          </span>
        </>
      )}
    </span>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={className} aria-label="Unnathi Creatives — home">
      <LogoContent />
    </Link>
  )
}
