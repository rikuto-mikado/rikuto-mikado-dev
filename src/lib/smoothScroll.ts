import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Inertial wheel scrolling (Lenis) for mouse / trackpad users.
 *
 * - Touch devices keep the browser's native momentum scrolling, which already feels right on phones.
 * - Skipped entirely when the visitor asks for reduced motion.
 * - Scrollable overlays (modals, sidebar) opt out with `data-lenis-prevent`.
 * - Scroll locks pause it, so the page cannot drift behind an open dialog.
 */

let lenis: Lenis | null = null
let isPaused = false

/** Starts smooth scrolling if the device suits it; returns a cleanup function. */
export function startSmoothScroll(): () => void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches
  if (prefersReducedMotion || isTouchPrimary) return () => {}

  lenis = new Lenis({
    // Long, soft ease-out: the page glides and settles rather than stopping dead
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    wheelMultiplier: 0.95,
    autoRaf: true,
  })
  if (isPaused) lenis.stop()

  return () => {
    lenis?.destroy()
    lenis = null
  }
}

/** Pauses / resumes smooth scrolling (used by the body scroll lock). */
export function setSmoothScrollPaused(paused: boolean) {
  isPaused = paused
  if (!lenis) return
  if (paused) lenis.stop()
  else lenis.start()
}

/** Scrolls to a section (honouring its CSS scroll-margin-top) or to the top of the page. */
export function scrollToTarget(target: HTMLElement | 'top') {
  const top =
    target === 'top'
      ? 0
      : target.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(target).scrollMarginTop) || 0)

  if (lenis) lenis.scrollTo(top, { duration: 1.4 })
  else window.scrollTo({ top, behavior: 'smooth' })
}
