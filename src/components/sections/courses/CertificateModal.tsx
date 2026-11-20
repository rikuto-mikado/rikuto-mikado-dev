import { useId } from 'react'
import { certImages } from '../../../data/images'
import type { CourseItem, UiText } from '../../../data/translations'
import { useFocusTrap } from '../../../hooks/useFocusTrap'

interface CertificateModalProps {
  cert: CourseItem
  isDark: boolean
  ui: UiText
  onClose: () => void
}

export default function CertificateModal({ cert, isDark, ui, onClose }: CertificateModalProps) {
  const titleId = useId()
  const dialogRef = useFocusTrap<HTMLDivElement>(true)
  const valueClass = `font-semibold transition-colors duration-300 ${isDark ? 'text-ivory' : 'text-gray-800'}`
  const isDiploma = cert.kind === 'diploma'
  const metadata = [
    { label: isDiploma ? ui.institution : ui.instructor, value: cert.instructor },
    { label: ui.date, value: cert.date },
    { label: ui.length, value: cert.hours },
  ]

  return (
    <div
      ref={dialogRef}
      role="dialog"
      data-print="hide"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className={`paper relative rounded-sm max-w-4xl w-full max-h-[92dvh] overflow-y-auto overscroll-contain shadow-2xl p-6 sm:p-8 space-y-5 transition-colors duration-300 ${
          isDark ? 'text-linen' : 'text-ink'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-start justify-between border-b pb-4 transition-colors duration-300 ${
            isDark ? 'border-night-rule' : 'border-gray-200'
          }`}
        >
          <div>
            <span className="text-xs uppercase tracking-wider font-sans font-semibold text-accent">
              {cert.platform} {isDiploma ? ui.diplomaAward : ui.certCompletion}
            </span>
            <h3
              id={titleId}
              className={`font-serif text-2xl font-normal tracking-tight mt-1 transition-colors duration-300 ${
                isDark ? 'text-ivory' : 'text-gray-900'
              }`}
            >
              {cert.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            data-autofocus
            className={`text-3xl font-light leading-none p-1 transition-colors cursor-pointer ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-800'
            }`}
          >
            &times;
          </button>
        </div>

        <div
          className={`overflow-hidden border transition-colors duration-300 ${
            isDark ? 'border-night-rule bg-night' : 'border-cream-border bg-white'
          }`}
        >
          <img src={certImages[cert.imageKey]} alt={cert.title} className="w-full h-auto object-contain" />
        </div>

        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs font-sans transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {metadata.map(({ label, value }) => (
            <div key={label}>
              <span className="block text-gray-400 uppercase text-[11px] tracking-wider">{label}</span>
              <span className={valueClass}>{value}</span>
            </div>
          ))}
          {cert.certificateId ? (
            <div>
              <span className="block text-gray-400 uppercase text-[11px] tracking-wider">{ui.certId}</span>
              <span
                className={`font-mono truncate block transition-colors duration-300 ${isDark ? 'text-accent' : 'text-gray-800'}`}
                title={cert.certificateId}
              >
                {cert.certificateId.slice(0, 15)}...
              </span>
            </div>
          ) : (
            cert.verification && (
              <div>
                <span className="block text-gray-400 uppercase text-[11px] tracking-wider">{ui.verification}</span>
                <span className={valueClass}>{cert.verification}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
