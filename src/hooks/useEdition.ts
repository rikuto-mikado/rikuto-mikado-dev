import { createContext, useContext } from 'react'
import { getEditionInfo, type EditionInfo } from '../data/edition'
import type { Language } from '../data/translations'

interface EditionValue {
  lang: Language
  edition: EditionInfo
}

/** Today's edition (date, volume, issue) and language, provided once by App for every folio and masthead. */
export const EditionContext = createContext<EditionValue>({ lang: 'en', edition: getEditionInfo('en') })

export function useEdition(): EditionValue {
  return useContext(EditionContext)
}
