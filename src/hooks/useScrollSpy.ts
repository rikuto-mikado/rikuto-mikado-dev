import { useEffect, useState } from 'react'

/**
 * Tracks which section is under a reading line 35% down the viewport.
 * `sectionIds` should be a stable (module-level) array.
 */
export function useScrollSpy<T extends string>(sectionIds: readonly T[], initialId: T) {
  const [activeId, setActiveId] = useState<T>(initialId)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveId(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return activeId
}
