import { useId, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import type { BlogPost } from '../../../data/blogPosts'
import type { UiText } from '../../../data/translations'
import { useFocusTrap } from '../../../hooks/useFocusTrap'
import { CloseIcon, GlobeIcon } from '../../common/icons'

interface BlogReaderModalProps {
  post: BlogPost
  isDark: boolean
  ui: UiText
  onClose: () => void
  onToggleLang?: () => void
  isJapaneseAvailable: boolean
}

/** Full-screen reader, portalled to <body> so parent stacking contexts can't clip it. */
export default function BlogReaderModal({
  post,
  isDark,
  ui,
  onClose,
  onToggleLang,
  isJapaneseAvailable,
}: BlogReaderModalProps) {
  const titleId = useId()
  const dialogRef = useFocusTrap<HTMLDivElement>(true)

  if (typeof document === 'undefined') return null

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className={`paper relative rounded-sm max-w-3xl w-full max-h-[90dvh] sm:max-h-[92vh] overflow-y-auto overscroll-contain shadow-2xl transition-colors duration-300 flex flex-col ${
          isDark ? 'text-linen' : 'text-ink'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header stays visible while scrolling long essays */}
        <div
          className={`sticky top-0 z-20 px-4 sm:px-8 py-3.5 sm:py-4 border-b backdrop-blur-xl flex items-center justify-between gap-3 transition-colors duration-300 ${
            isDark ? 'bg-night-paper/95 border-night-rule' : 'bg-paper/95 border-cream-border'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0 pr-1">
            <span className="uppercase tracking-wider font-semibold text-xs text-accent truncate">{post.category}</span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-gray-400 text-xs hidden sm:inline whitespace-nowrap">{post.date}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onToggleLang && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleLang()
                }}
                aria-label={isJapaneseAvailable ? ui.langSwitchLabel : '日本語版は準備中です (Under Review)'}
                title={
                  isJapaneseAvailable
                    ? ui.langSwitchLabel
                    : '日本語版は現在更新中です (Japanese translation is currently under review)'
                }
                className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-full font-sans text-xs font-semibold tracking-wider transition-all duration-200 transform active:scale-95 cursor-pointer touch-manipulation ${
                  isDark
                    ? 'bg-[#25221F] hover:bg-[#302B27] text-accent border border-night-border'
                    : 'bg-paper hover:bg-white text-accent border border-cream-line'
                }`}
              >
                <GlobeIcon className="w-3.5 h-3.5" />
                <span>{ui.langSwitchCode}</span>
                {!isJapaneseAvailable && (
                  <span className="text-[11px] opacity-75 font-normal ml-0.5 whitespace-nowrap">(Soon)</span>
                )}
              </button>
            )}

            {/* 44px touch target */}
            <button
              type="button"
              onClick={handleClose}
              aria-label={ui.closeModal}
              data-autofocus
              className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer touch-manipulation active:scale-90 ${
                isDark ? 'bg-white/10 hover:bg-white/20 text-ivory' : 'bg-black/5 hover:bg-black/10 text-gray-800'
              }`}
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-6">
          <div className={`space-y-2 border-b-[3px] border-double pb-6 ${isDark ? 'border-night-border' : 'border-cream-border'}`}>
            <div className="flex items-center gap-2 text-xs font-sans sm:hidden">
              <span className="text-gray-400">{post.date}</span>
            </div>
            <h3
              id={titleId}
              className={`font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight leading-snug text-balance transition-colors duration-300 ${
                isDark ? 'text-ivory' : 'text-gray-900'
              }`}
            >
              {post.title}
            </h3>
          </div>

          <div
            className={`news-body space-y-5 text-base sm:text-[17px] md:text-lg leading-[1.75] font-news transition-colors duration-300 ${
              isDark ? 'text-[#D8D3CA]' : 'text-gray-700'
            }`}
          >
            {post.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div
            className={`pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans transition-colors duration-300 ${
              isDark ? 'border-night-rule' : 'border-gray-200'
            }`}
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wider ${
                    isDark ? 'bg-white/[0.06] text-accent' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0">
              <button
                type="button"
                onClick={handleClose}
                className={`px-6 py-2.5 rounded-full text-xs font-sans font-semibold transition-all duration-200 cursor-pointer touch-manipulation active:scale-95 ${
                  isDark ? 'bg-white/10 hover:bg-white/20 text-ivory' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {ui.closeArticle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
