import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Language } from '../data/translations'
import { uiText } from '../data/translations'
import { blogPostsData, upcomingPostData } from '../data/blogPosts'
import whyOurGenerationImg from '../assets/whyourgeneration.png'
import whyMassesImg from '../assets/whyIbelievethemasses.png'
import onExistentialCrisisImg from '../assets/onexistentialcrisis.png'
import theComplexityOfEducationImg from '../assets/thecomplexityofeducation.png'

const blogCoverImages: Record<string, string> = {
  'why-our-generation-cannot-ignore-agi': whyOurGenerationImg,
  'why-masses-happier-without-ai': whyMassesImg,
  'on-existential-crisis': onExistentialCrisisImg,
  'education-complexity-and-information-gap': theComplexityOfEducationImg,
}

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
  const upcomingPost = upcomingPostData[lang]
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
          {posts.map((post) => {
            const coverImg = blogCoverImages[post.id]
            return (
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
                  {/* Background cover image if present */}
                  {coverImg ? (
                    <>
                      <img
                        src={coverImg}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05] group-hover:scale-105 group-hover:brightness-[0.88] transition-all duration-700 ease-out"
                      />
                      {/* Atmospheric gradient overlay for contrast & editorial mood */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20 pointer-events-none" />
                    </>
                  ) : (
                    <>
                      {/* Decorative background watermark */}
                      <div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full border border-[#9A4C22]/15 pointer-events-none" />
                      <div className="absolute right-6 bottom-6 w-16 h-16 rounded-full border border-dashed border-[#9A4C22]/20 pointer-events-none" />
                      <div className="relative z-10 flex flex-col justify-between h-full w-full pointer-events-none">
                        <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#9A4C22]/80">
                          {post.category}
                        </span>
                        <div className="flex items-center justify-center my-auto py-2">
                          <svg
                            className="w-8 h-8 text-[#9A4C22]/40 transform group-hover:scale-110 transition-transform duration-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.3}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <span className={`text-[10px] font-serif italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {post.date}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Subtle hover overlay hint */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-[2px]">
                    <span className="px-4 py-2 rounded-full bg-white/95 text-gray-900 text-xs font-sans font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      {ui.readEssay}
                    </span>
                  </div>
                </div>

                {/* Card details */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Meta row: Date */}
                    <div
                      className={`text-[11px] font-sans ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      <span className="font-medium">{post.date}</span>
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
                        {post.tags[0] ? `#${post.tags[0]}` : ''}
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
            )
          })}

          {/* Upcoming Card (Structured identically to article cards for consistent height and seamless row expansion) */}
          {upcomingPost && (
            <div
              className={`rounded-2xl overflow-hidden border border-dashed flex flex-col justify-between transition-all duration-300 opacity-75 hover:opacity-100 ${
                isDark
                  ? 'border-[#3A352F] bg-[#161413]/40 text-gray-400 hover:border-[#D4A373]/50'
                  : 'border-[#d8d1c5] bg-[#F5F4F0]/40 text-gray-500 hover:border-[#d4a373]'
              }`}
            >
              {/* Draft Placeholder Cover with identical aspect-[16/10] */}
              <div
                className={`relative aspect-[16/10] overflow-hidden border-b border-dashed transition-colors duration-500 flex flex-col justify-between p-5 ${
                  isDark
                    ? 'bg-gradient-to-br from-[#1F1D1A]/80 via-[#191715]/60 to-[#141211]/80 border-[#2E2B27]'
                    : 'bg-gradient-to-br from-[#ECE8E1]/80 via-[#E8E3DA]/60 to-[#DFD9CD]/80 border-[#e3dbcd]'
                }`}
              >
                {/* Decorative geometry rings */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full border border-dashed border-[#9A4C22]/20 pointer-events-none" />
                <div className="absolute right-6 bottom-6 w-14 h-14 rounded-full border border-dotted border-[#9A4C22]/25 pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-full w-full pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#9A4C22]/80">
                      {lang === 'ja' ? '次回執筆予定' : 'UPCOMING'}
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#E0A96D]/60 animate-pulse" />
                  </div>
                  <div className="flex items-center justify-center my-auto py-2 opacity-35">
                    <svg
                      className="w-8 h-8 text-[#9A4C22]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <span className={`text-[10px] font-mono tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    DRAFT • ESSAY V
                  </span>
                </div>
              </div>

              {/* Card Details (Matches article card padding and flex structure) */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Meta row */}
                  <div className={`text-[11px] font-sans ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    <span className="font-medium">
                      {lang === 'ja' ? '近日公開予定' : 'Coming Soon'}
                    </span>
                  </div>

                  {/* Category Badge matching published cards */}
                  <div>
                    <span
                      className={`inline-block uppercase tracking-wider px-2.5 py-0.5 rounded-md text-[10px] font-semibold font-sans border border-dashed ${
                        isDark
                          ? 'text-[#C4BEB4] bg-[#221F1C]/70 border-[#3A352F]'
                          : 'text-gray-600 bg-white/70 border-gray-300'
                      }`}
                    >
                      {lang === 'ja' ? '執筆中' : 'In Progress'}
                    </span>
                  </div>

                  <h3
                    className={`font-serif italic text-lg md:text-xl font-bold leading-snug line-clamp-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {upcomingPost.title}
                  </h3>

                  <p
                    className={`font-sans text-xs sm:text-sm leading-relaxed font-light italic line-clamp-3 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  >
                    {lang === 'ja'
                      ? '若者であることの現実と、次世代が直面する独自の構造的課題についての洞察。'
                      : 'Insights on the reality of youth and the unique structural challenges faced by the next generation.'}
                  </p>
                </div>

                {/* Metadata footer matching article cards */}
                <div
                  className={`pt-3 border-t border-dashed flex items-center justify-between text-xs font-sans ${
                    isDark ? 'border-[#2D2A26] text-gray-500' : 'border-[#e6e0d5] text-gray-400'
                  }`}
                >
                  <span className="font-mono text-[11px]">
                    #NextEssay
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-[11px] text-[#9A4C22]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A4C22]/60 animate-ping" />
                    {upcomingPost.status || (lang === 'ja' ? '執筆中' : 'In Progress')}
                  </span>
                </div>
              </div>
            </div>
          )}
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
