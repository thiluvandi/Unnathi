/** A small carved block-print floret — the site's motif vocabulary, used as a
 *  marker where content is parallel (not a numbered sequence). */
export function CraftMark({ className = '' }: { className?: string }) {
  const marks = [
    ...Array.from({ length: 8 }).map((_, i) => (
      <ellipse
        key={`petal-${i}`}
        cx="12"
        cy="6.4"
        rx="1.5"
        ry="3.3"
        transform={`rotate(${i * 45} 12 12)`}
      />
    )),
    <circle key="core" cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />,
  ]
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.15"
      aria-hidden
    >
      {marks}
    </svg>
  )
}
