import { useEffect, useState } from 'react'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'

interface LoadingScreenProps {
  onFinished?: () => void
}

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  // Lock scroll while the intro loader is active; released as soon as the exit fade begins
  useBodyScrollLock(!isExiting)

  useEffect(() => {
    const startTime = performance.now()
    // Kept short: a long forced intro reads as padding, especially on phones
    const minDuration = 1000
    const maxDuration = 1800

    let exitTimer: number | undefined
    let unmountTimer: number | undefined
    let hasTriggered = false

    const triggerExit = () => {
      if (hasTriggered) return
      hasTriggered = true
      setIsExiting(true)

      unmountTimer = window.setTimeout(() => {
        setShouldRender(false)
        onFinished?.()
      }, 700)
    }

    const scheduleExit = () => {
      const elapsed = performance.now() - startTime
      const remaining = Math.max(0, minDuration - elapsed)
      exitTimer = window.setTimeout(triggerExit, remaining)
    }

    if (document.readyState === 'complete') {
      scheduleExit()
    } else {
      window.addEventListener('load', scheduleExit, { once: true })
      // Failsafe cap so the loader never hangs on slow third-party assets
      exitTimer = window.setTimeout(triggerExit, maxDuration)
    }

    return () => {
      window.removeEventListener('load', scheduleExit)
      if (exitTimer) clearTimeout(exitTimer)
      if (unmountTimer) clearTimeout(unmountTimer)
    }
  }, [onFinished])

  if (!shouldRender) return null

  return (
    <div
      role="status"
      data-print="hide"
      aria-live="polite"
      aria-label="Loading The R.M. Journal"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-night-panel text-paper select-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isExiting
          ? 'opacity-0 -translate-y-2 pointer-events-none'
          : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Subtle warm ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle 320px at 50% 46%, rgba(155, 28, 28, 0.16), transparent 75%)',
        }}
      />

      <div
        className={`relative z-10 flex flex-col items-center gap-8 transition-transform duration-700 ease-out ${
          isExiting ? 'scale-95' : 'scale-100'
        }`}
      >
        {/* Isolated stacking context so .loader:before / :after (z-index: -2) render behind .loader and above the overlay */}
        <div className="relative isolate -translate-x-2.5">
          <div className="loader" />
        </div>

        {/* Subtle editorial caption */}
        <div className="flex flex-col items-center gap-2.5">
          <p className="font-serif italic font-light text-lg sm:text-xl tracking-wide text-paper/90">
            The R.M. Journal
          </p>
          <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-accent/80 font-medium">
            Rikuto Mikado
          </span>
        </div>
      </div>
    </div>
  )
}
