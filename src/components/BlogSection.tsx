import { useState, useEffect } from 'react'
import type { Language } from '../data/translations'
import { uiText } from '../data/translations'
import { blogPostsData } from '../data/blogPosts'

interface BlogSectionProps {
  lang: Language
  isDark: boolean
}

export default function BlogSection({ lang, isDark }: BlogSectionProps) {
  const ui = uiText[lang]
  const posts = blogPostsData[lang]
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const selectedPost = selectedPostId
    ? posts.find((p) => p.id === selectedPostId) ?? null
    : null

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
          <span className="text-xs font-sans uppercase tracking-widest text-[#9A4C22] font-semibold block">
            {ui.blogBadge}
          </span>
          <h2 className="text-4xl md:text-5xl text-[#9A4C22] italic font-serif">
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

        {/* 4-Column Grid on Desktop (Similar to Skill Acquisition Cards) */}
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
                {/* Decorative background watermark / geometry */}
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

                {/* Subtle hover overlay hint (Matching Course Cards) */}
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
                    {post.excerpt}
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

          {/* Coming Soon Card (Maintains grid visual balance on 4-column desktop display) */}
          <div
            className={`rounded-2xl p-6 border border-dashed flex flex-col justify-between transition-colors duration-500 opacity-60 hover:opacity-80 ${
              isDark
                ? 'border-[#2D2A26] bg-[#161413]/50 text-gray-400'
                : 'border-[#d8d1c5] bg-[#F5F4F0]/50 text-gray-500'
            }`}
          >
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-[#9A4C22]">
                {lang === 'ja' ? '次回執筆中' : 'Upcoming'}
              </span>
              <h4
                className={`font-serif italic text-base sm:text-lg ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {lang === 'ja'
                  ? '物理インフラと自動化の現場'
                  : 'Physical Infrastructure & Automation'}
              </h4>
              <p className="font-sans text-xs leading-relaxed font-light">
                {lang === 'ja'
                  ? '電気工学、現場実務、そして自律AIとの境界線に関する考察を順次執筆予定です。'
                  : 'Upcoming reflections on electrical systems, hands-on field resilience, and autonomous AI.'}
              </p>
            </div>
            <div className="pt-4 mt-6 border-t border-dashed border-gray-300/30 text-[11px] font-sans">
              {lang === 'ja' ? '執筆中 (In Progress)' : 'In Progress • Soon'}
            </div>
          </div>
        </div>
      </div>

      {/* Reading Modal (Detailed Full Article Viewer, Matching Certificate Modal UX) */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPostId(null)}
        >
          <div
            className={`relative rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-10 space-y-6 transition-colors duration-300 ${
              isDark ? 'bg-[#181615] text-[#E8E4DD]' : 'bg-white text-gray-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <div
              className={`flex items-start justify-between border-b pb-5 transition-colors duration-300 ${
                isDark ? 'border-[#2E2B27]' : 'border-gray-200'
              }`}
            >
              <div className="space-y-1.5 pr-4">
                <div className="flex items-center gap-3 text-xs font-sans">
                  <span className="uppercase tracking-wider font-semibold text-[#9A4C22]">
                    {selectedPost.category}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{selectedPost.date}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-[#9A4C22] font-medium">
                    {selectedPost.readTime}
                  </span>
                </div>
                <h3
                  className={`font-serif italic text-2xl sm:text-3xl font-bold leading-snug transition-colors duration-300 ${
                    isDark ? 'text-[#F5F3EE]' : 'text-gray-900'
                  }`}
                >
                  {selectedPost.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPostId(null)}
                aria-label="Close modal"
                className={`text-3xl font-light leading-none p-1 transition-colors cursor-pointer shrink-0 ${
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-400 hover:text-gray-800'
                }`}
              >
                &times;
              </button>
            </div>

            {/* Article Content Paragraphs */}
            <div
              className={`space-y-6 text-sm sm:text-base md:text-[17px] leading-relaxed sm:leading-loose font-light font-sans transition-colors duration-300 ${
                isDark ? 'text-[#D8D3CA]' : 'text-gray-700'
              }`}
            >
              {selectedPost.paragraphs.map((p, idx) => {

                // Callout block for core identity thesis (Paragraph 7)
                if (
                  p.startsWith(
                    "The core issue isn't just whether AGI will be created"
                  ) ||
                  p.startsWith('核心的な問題は、AGIが誕生するかどうかや')
                ) {
                  return (
                    <blockquote
                      key={idx}
                      className={`border-l-3 border-[#9A4C22] pl-5 sm:pl-6 py-3.5 my-3 rounded-r-xl font-serif italic text-base sm:text-lg leading-relaxed ${
                        isDark
                          ? 'bg-white/[0.04] text-[#F5F3EE]'
                          : 'bg-[#9A4C22]/5 text-gray-900'
                      }`}
                    >
                      {p}
                    </blockquote>
                  )
                }

                return <p key={idx}>{p}</p>
              })}
            </div>

            {/* Footer metadata & actions */}
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
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
