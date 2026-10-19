import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

function getInitialIsDark(): boolean {
  if (typeof window === 'undefined') return false
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/** Dark/light theme persisted to localStorage and mirrored as the `dark` class on <html>. */
export function useTheme() {
  const [isDark, setIsDark] = useState(getInitialIsDark)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), [])

  return { isDark, toggleTheme }
}
