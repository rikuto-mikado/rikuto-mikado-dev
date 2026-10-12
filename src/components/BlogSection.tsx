import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Language } from '../data/translations'
import { uiText } from '../data/translations'
import { blogPostsData } from '../data/blogPosts'

interface BlogSectionProps {
  lang: Language
  isDark: boolean
  onToggleLang?: () => void
  isJapaneseAvailable?: boolean
  onModalStateChange?: (isOpen: boolean) => void
}

export default function BlogSection({
  lang,
  isDark,
  onToggleLang,
  isJapaneseAvailable = false,
  onModalStateChange,
}: BlogSectionProps) {
  const ui = uiText[lang]
  const posts = blogPostsData[lang]
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const selectedPost = selectedPostId
    ? posts.find((p) => p.id === selectedPostId) ?? null
    : null

  // Notify parent of modal open/close state
  useEffect(() => {
    onModalStateChange?.(Boolean(selectedPostId))
  }, [selectedPostId, onModalStateChange])

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPostId(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPostId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedPostId])

  return (
    <section
      id="blog"
      className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-[#262320]' : 'border-[#e6e2d8]'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#9A4C22] font-semibold block">
            {ui.blogBadge}
          </span>
          <h2 className="text-4xl md:text-5xl text-[#9A4C22] italic font-serif tracking-tight">
            {ui.blogHeading}
          </h2>
          <p
            className={`text-base font-sans max-w-2xl mx-auto leading-relaxed transition-colors duration-500 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {ui.blogLead}
          </p>
        </div>

        {/* 4-Column Grid on Desktop (Matching Skill Acquisition Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
              className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#1C1A18] border border-[#2D2A26] shadow-md hover:shadow-2xl hover:border-[#D4A373]/50'
                  : 'bg-white border border-[#e5ded4] shadow-sm hover:shadow-xl hover:border-[#d4a373]'
              }`}
            >
              {/* Cover visual with aspect ratio */}
              <div
                className={`relative aspect-[16/10] overflow-hidden border-b transition-colors duration-500 flex flex-col justify-between p-5 ${
                  isDark
                    ? 'bg-gradient-to-br from-[#25221E] via-[#1E1C19] to-[#161413] border-[#2D2A26]'
                    : 'bg-gradient-to-br from-[#F5F4F0] via-[#EFECE6] to-[#E5E0D5] border-[#ece6dd]'
                }`}
              >
                {/* Decorative background watermark */}
                <div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full border border-[#9A4C22]/15 pointer-events-none" />
                <div className="absolute right-6 bottom-6 w-16 h-16 rounded-full border border-dashed border-[#9A4C22]/20 pointer-events-none" />

                <div className="relative z-10 text-[11px] font-sans">
                  <span
                    className={`font-mono uppercase tracking-widest px-2 py-0.5 rounded text-[10px] inline-block ${
                      isDark
                        ? 'bg-black/30 text-[#E0A96D]'
                        : 'bg-white/80 text-[#9A4C22] shadow-xs'
                    }`}
                  >
                    Essay
                  </span>
                </div>

                {/* Subtle hover overlay hint */}
                <div className="absolute inset-0 bg-[#2b2623]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-[1px]">
                  <span className="px-4 py-2 rounded-full bg-white/95 text-gray-900 text-xs font-sans font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    {ui.readEssay}
                  </span>
                </div>
              </div>

              {/* Card details */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Meta row: Date & Read Time */}
                  <div
                    className={`flex items-center justify-between text-[11px] font-sans ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <span className="font-medium">{post.date}</span>
                    <span
                      className={`font-medium ${
                        isDark ? 'text-[#E0A96D]' : 'text-[#9A4C22]'
                      }`}
                    >
                      {post.readTime}
                    </span>
                  </div>

                  {/* Category Badge (Standalone line with whitespace-nowrap to guarantee it never wraps) */}
                  <div>
                    <span
                      className={`inline-block uppercase tracking-wider px-2.5 py-0.5 rounded-md transition-colors duration-500 text-[10px] font-semibold font-sans whitespace-nowrap truncate max-w-full ${
                        isDark
                          ? 'text-[#E0A96D] bg-[#24211D] border border-[#3A352F]'
                          : 'text-[#9A4C22] bg-[#F5F4F0] border border-[#e3dbcd]'
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>

                  <h3
                    className={`font-serif text-lg md:text-xl font-bold leading-snug transition-colors duration-300 line-clamp-2 ${
                      isDark
                        ? 'text-[#F5F3EE] group-hover:text-[#E0A96D]'
                        : 'text-gray-900 group-hover:text-[#9A4C22]'
                    }`}
                  >
                    {post.title}
                  </h3>

                  <p
                    className={`font-sans text-xs sm:text-sm leading-relaxed font-light transition-colors duration-500 line-clamp-3 ${
                      isDark ? 'text-[#C4BEB4]' : 'text-gray-600'
                    }`}
                  >
                    {post.paragraphs[0] || post.excerpt}
                  </p>
                </div>

                {/* Metadata footer */}
                <div
                  className={`pt-3 border-t flex items-center justify-between text-xs font-sans transition-colors duration-500 ${
                    isDark
                      ? 'border-[#262320] text-gray-400'
                      : 'border-[#f0ebe3] text-gray-600'
                  }`}
                >
                  <span className="truncate pr-2">
                    <strong
                      className={`font-medium transition-colors duration-500 ${
                        isDark ? 'text-[#F5F3EE]' : 'text-gray-800'
                      }`}
                    >
                      {post.tags[0] ? `#${post.tags[0]}` : '#Essay'}
                    </strong>
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 font-semibold transition-colors duration-300 ${
                      isDark
                        ? 'text-[#E0A96D] group-hover:translate-x-0.5'
                        : 'text-[#9A4C22] group-hover:translate-x-0.5'
                    }`}
                  >
                    {lang === 'ja' ? '読む' : 'Read'} &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* Upcoming Card (Maintains grid visual balance on 4-column desktop display) */}
          <div
            className={`rounded-2xl p-6 border border-dashed flex flex-col justify-between transition-colors duration-500 opacity-60 hover:opacity-80 ${
              isDark
                ? 'border-[#2D2A26] bg-[#161413]/50 text-gray-400'
                : 'border-[#d8d1c5] bg-[#F5F4F0]/50 text-gray-500'
            }`}
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-[#9A4C22]">
                {lang === 'ja' ? '次回執筆予定' : 'Upcoming'}
              </span>
              <h4
                className={`font-serif italic text-base sm:text-lg ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {lang === 'ja'
                  ? '私は残念ながら若者だ'
                  : 'Unfortunately, I Am Young'}
              </h4>
            </div>
            <div className="pt-4 mt-6 border-t border-dashed border-gray-300/30 text-[11px] font-sans">
              {lang === 'ja' ? '執筆予定 (In Progress)' : 'In Progress • Soon'}
            </div>
          </div>
        </div>
      </div>

      {/* Reading Modal rendered through React Portal to document.body (Immune to parent section stacking contexts) */}
      {typeof document !== 'undefined' &&
        selectedPost &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedPostId(null)}
          >
            <div
              className={`relative rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[90dvh] sm:max-h-[92vh] overflow-y-auto overscroll-contain shadow-2xl transition-colors duration-300 flex flex-col ${
                isDark ? 'bg-[#181615] text-[#E8E4DD]' : 'bg-white text-gray-800'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Modal Header (Always visible when scrolling on phones & desktops) */}
              <div
                className={`sticky top-0 z-20 px-4 sm:px-8 py-3.5 sm:py-4 border-b backdrop-blur-xl flex items-center justify-between gap-3 transition-colors duration-300 ${
                  isDark
                    ? 'bg-[#181615]/95 border-[#2E2B27]'
                    : 'bg-white/95 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 pr-1">
                  <span className="uppercase tracking-wider font-semibold text-xs text-[#9A4C22] truncate">
                    {selectedPost.category}
                  </span>
                  <span className="text-gray-400 hidden sm:inline">•</span>
                  <span className="text-gray-400 text-xs hidden sm:inline whitespace-nowrap">
                    {selectedPost.date}
                  </span>
                </div>

                {/* Right controls: Language Switcher & Generous 44px Touch-Target Close Button */}
                <div className="flex items-center gap-2 shrink-0">
                  {onToggleLang && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleLang()
                      }}
                      aria-label={
                        !isJapaneseAvailable
                          ? '日本語版は準備中です (Under Review)'
                          : lang === 'en'
                          ? '日本語に切り替える'
                          : 'Switch to English'
                      }
                      title={
                        !isJapaneseAvailable
                          ? '日本語版は現在更新中です (Japanese translation is currently under review)'
                          : lang === 'en'
                          ? '日本語に切り替える'
                          : 'Switch to English'
                      }
                      className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-full font-sans text-xs font-semibold tracking-wider transition-all duration-200 transform active:scale-95 cursor-pointer touch-manipulation ${
                        isDark
                          ? 'bg-[#25221F] hover:bg-[#302B27] text-[#E0A96D] border border-[#3A352F]'
                          : 'bg-[#F5F4F0] hover:bg-white text-[#9A4C22] border border-[#e3dbcd]'
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5 0 4.5-4 4.5-9s-2-9-4.5-9-4.5 4-4.5 9 2 9 4.5 9zm-9-9h18"
                        />
                      </svg>
                      <span>{lang === 'en' ? 'JA' : 'EN'}</span>
                      {!isJapaneseAvailable && (
                        <span className="text-[10px] opacity-75 font-normal ml-0.5 whitespace-nowrap">
                          (Soon)
                        </span>
                      )}
                    </button>
                  )}

                  {/* 44px Touch Target Close Button (Guaranteed thumb-friendly on all phones) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPostId(null)
                    }}
                    aria-label={lang === 'ja' ? '閉じる' : 'Close modal'}
                    className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer touch-manipulation active:scale-90 ${
                      isDark
                        ? 'bg-white/10 hover:bg-white/20 text-[#F5F3EE]'
                        : 'bg-black/5 hover:bg-black/10 text-gray-800'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-10 space-y-6">
                {/* Title & Metadata */}
                <div className="space-y-2 border-b pb-6 border-dashed border-gray-300/30">
                  <div className="flex items-center gap-2 text-xs font-sans sm:hidden">
                    <span className="text-gray-400">{selectedPost.date}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-[#9A4C22] font-medium">
                      {selectedPost.readTime}
                    </span>
                  </div>
                  <h3
                    className={`font-serif italic text-2xl sm:text-3xl md:text-4xl font-bold leading-snug transition-colors duration-300 ${
                      isDark ? 'text-[#F5F3EE]' : 'text-gray-900'
                    }`}
                  >
                    {selectedPost.title}
                  </h3>
                </div>

                {/* Article Content Paragraphs */}
                <div
                  className={`space-y-6 text-sm sm:text-base md:text-[17px] leading-relaxed sm:leading-loose font-light font-sans transition-colors duration-300 ${
                    isDark ? 'text-[#D8D3CA]' : 'text-gray-700'
                  }`}
                >
                  {selectedPost.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Footer metadata & Bottom Close Button */}
                <div
                  className={`pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans transition-colors duration-300 ${
                    isDark ? 'border-[#2E2B27]' : 'border-gray-200'
                  }`}
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wider ${
                          isDark
                            ? 'bg-white/[0.06] text-[#E0A96D]'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Close Button for effortless dismissal after finishing read */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedPostId(null)
                      }}
                      className={`px-6 py-2.5 rounded-full text-xs font-sans font-semibold transition-all duration-200 cursor-pointer touch-manipulation active:scale-95 ${
                        isDark
                          ? 'bg-white/10 hover:bg-white/20 text-[#F5F3EE]'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {lang === 'ja' ? '閉じる' : 'Close Article'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}
