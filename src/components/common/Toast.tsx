import { createPortal } from 'react-dom'
import type { ToastMessage } from '../../hooks/useToast'
import { InfoIcon } from './icons'

interface ToastProps {
  toast: ToastMessage | null
  isDark: boolean
  onDismiss: () => void
}

/** Portalled to <body> at z-[120] so it stays above every modal. */
export default function Toast({ toast, isDark, onDismiss }: ToastProps) {
  if (!toast || typeof document === 'undefined') return null

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:top-6 sm:max-w-sm z-[120] px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 animate-fade-in ${
        isDark ? 'bg-night-card/95 border-apricot/50 text-ivory' : 'bg-[#FAF8F5]/95 border-rust/50 text-gray-900'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-1.5 rounded-full mt-0.5 shrink-0 ${
            isDark ? 'bg-apricot/15 text-apricot' : 'bg-rust/15 text-rust'
          }`}
        >
          <InfoIcon className="w-4 h-4" />
        </div>
        <div className="flex-1 pr-1">
          <p className="font-sans text-xs sm:text-sm font-semibold leading-snug">{toast.main}</p>
          <p className={`font-sans text-[11px] sm:text-xs mt-0.5 leading-snug ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {toast.sub}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className={`p-1 rounded-md text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer ${
            isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
          }`}
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body,
  )
}
