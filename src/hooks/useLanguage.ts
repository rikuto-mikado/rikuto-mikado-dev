import { useCallback, useEffect, useState } from 'react'
import { IS_JAPANESE_AVAILABLE } from '../config'
import type { Language } from '../data/translations'

const STORAGE_KEY = 'preferred_lang'

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (IS_JAPANESE_AVAILABLE && (saved === 'ja' || saved === 'en')) return saved
  }
  return 'en'
}

/** UI language persisted to localStorage and mirrored as <html lang>. */
export function useLanguage() {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = useCallback(() => setLang((prev) => (prev === 'en' ? 'ja' : 'en')), [])

  return { lang, toggleLang }
}
