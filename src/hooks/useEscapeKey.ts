import { useEffect, useRef } from 'react'

/** Calls the latest `onEscape` whenever the Escape key is pressed anywhere on the page. */
export function useEscapeKey(onEscape: () => void) {
  const onEscapeRef = useRef(onEscape)

  useEffect(() => {
    onEscapeRef.current = onEscape
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscapeRef.current()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
