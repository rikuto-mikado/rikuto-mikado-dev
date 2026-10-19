import { useCallback, useEffect, useRef, useState } from 'react'

export interface ToastMessage {
  main: string
  sub: string
}

/** A single auto-dismissing toast; showing a new one restarts the timer. */
export function useToast(durationMs = 2800) {
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const timeoutRef = useRef<number | undefined>(undefined)

  const showToast = useCallback(
    (main: string, sub: string) => {
      window.clearTimeout(timeoutRef.current)
      setToast({ main, sub })
      timeoutRef.current = window.setTimeout(() => setToast(null), durationMs)
    },
    [durationMs],
  )

  const dismissToast = useCallback(() => setToast(null), [])

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  return { toast, showToast, dismissToast }
}
