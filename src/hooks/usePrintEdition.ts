import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

interface PrintEditionValue {
  /** True while the page is laid out for printing (light sheet, every list expanded, all photos loaded) */
  isPrinting: boolean
  /** Prepare the print layout, wait for photos, then open the browser's print dialog (Save as PDF) */
  printEdition: () => Promise<void>
}

export const PrintEditionContext = createContext<PrintEditionValue>({
  isPrinting: false,
  printEdition: async () => {},
})

export function usePrintEdition(): PrintEditionValue {
  return useContext(PrintEditionContext)
}

const IMAGE_WAIT_LIMIT_MS = 6000

/** Resolves once every <img> on the page has loaded (or failed), or after a time limit. */
function waitForImages(): Promise<void> {
  const pending = [...document.images].filter((img) => img.src && !img.complete)
  const loads = pending.map(
    (img) =>
      new Promise<void>((resolve) => {
        img.addEventListener('load', () => resolve(), { once: true })
        img.addEventListener('error', () => resolve(), { once: true })
      }),
  )
  const limit = new Promise<void>((resolve) => setTimeout(resolve, IMAGE_WAIT_LIMIT_MS))
  return Promise.race([Promise.all(loads).then(() => undefined), limit])
}

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

/**
 * State behind the Print Edition. The print button prepares the layout and waits for the halftone
 * photos before opening the dialog; a plain Ctrl/⌘+P switches to the print layout synchronously
 * through `beforeprint` (photos that were never scrolled near may still be loading in that case).
 */
export function usePrintEditionState(): PrintEditionValue {
  const [isPrinting, setIsPrinting] = useState(false)

  useEffect(() => {
    const enter = () => flushSync(() => setIsPrinting(true))
    const leave = () => setIsPrinting(false)
    window.addEventListener('beforeprint', enter)
    window.addEventListener('afterprint', leave)
    return () => {
      window.removeEventListener('beforeprint', enter)
      window.removeEventListener('afterprint', leave)
    }
  }, [])

  const printEdition = useCallback(async () => {
    flushSync(() => setIsPrinting(true))
    // Lazy photos start loading once printing is on; wait for them, then let the canvases draw
    await nextFrame()
    await waitForImages()
    await nextFrame()
    await new Promise((resolve) => setTimeout(resolve, 250))
    window.print()
  }, [])

  return { isPrinting, printEdition }
}
