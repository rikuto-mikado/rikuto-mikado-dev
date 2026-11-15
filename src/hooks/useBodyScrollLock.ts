import { useEffect } from 'react'
import { setSmoothScrollPaused } from '../lib/smoothScroll'

// Shared across every caller so overlapping locks (loader, sidebar, modals) don't release each other
let activeLocks = 0

/** Locks page scrolling while `locked` is true; scrolling resumes once every lock is released. */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    activeLocks += 1
    document.body.style.overflow = 'hidden'
    setSmoothScrollPaused(true)

    return () => {
      activeLocks -= 1
      if (activeLocks === 0) {
        document.body.style.overflow = ''
        setSmoothScrollPaused(false)
      }
    }
  }, [locked])
}
