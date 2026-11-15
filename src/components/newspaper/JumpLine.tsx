import { scrollToTarget } from '../../lib/smoothScroll'

interface JumpLineProps {
  /** Translated line with the folio already filled in, e.g. "Continued on A2" */
  text: string
  /** Element id to jump to; omit for a non-interactive "Continued from" line */
  targetId?: string
  align?: 'left' | 'right'
}

/** Newspaper jump line ("Continued on A2 →"), linking a story to where it carries on. */
export default function JumpLine({ text, targetId, align = 'right' }: JumpLineProps) {
  const className = 'font-news italic text-sm text-accent'

  if (!targetId) {
    return <p className={`${className} ${align === 'right' ? 'text-right' : ''}`}>({text})</p>
  }

  return (
    <p className={align === 'right' ? 'text-right' : ''}>
      <button
        type="button"
        onClick={() => {
          const target = document.getElementById(targetId)
          if (target) scrollToTarget(target)
        }}
        className={`${className} cursor-pointer underline-offset-4 decoration-1 hover:underline`}
      >
        {text} <span aria-hidden="true">&rarr;</span>
      </button>
    </p>
  )
}
