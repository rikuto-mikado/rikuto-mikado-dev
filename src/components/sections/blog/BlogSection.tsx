import { useEffect, useState } from 'react'
import { blogPostsData, upcomingPostData } from '../../../data/blogPosts'
import type { Language } from '../../../data/translations'
import { uiText } from '../../../data/translations'
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock'
import { useEscapeKey } from '../../../hooks/useEscapeKey'
import { ChevronDownIcon } from '../../common/icons'
import SectionHeader from '../../common/SectionHeader'
import BlogCard from './BlogCard'
import BlogReaderModal from './BlogReaderModal'
import UpcomingPostCard from './UpcomingPostCard'

const INITIAL_VISIBLE_COUNT = 4

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
  const [isExpanded, setIsExpanded] = useState(false)

  const totalItemCount = posts.length + (upcomingPost ? 1 : 0)
  const visiblePosts = isExpanded ? posts : posts.slice(0, INITIAL_VISIBLE_COUNT)
  // The upcoming card trails the list, so it only appears once every post is visible
  const showUpcoming = isExpanded || posts.length < INITIAL_VISIBLE_COUNT
  // Looked up by id so the open essay follows language switches
  const selectedPost = posts.find((p) => p.id === selectedPostId) ?? null
  const closePost = () => setSelectedPostId(null)

  useEffect(() => {
    onModalStateChange?.(Boolean(selectedPostId))
  }, [selectedPostId, onModalStateChange])

  useEscapeKey(closePost)
  useBodyScrollLock(Boolean(selectedPostId))

  return (
    <section
      id="blog"
      className={`relative z-10 w-full py-24 md:py-32 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          isDark={isDark}
          badge={ui.blogBadge}
          heading={ui.blogHeading}
          lead={ui.blogLead}
          badgeTrackingClass="tracking-[0.22em]"
          headingClassName="tracking-tight"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {visiblePosts.map((post) => (
            <BlogCard key={post.id} post={post} isDark={isDark} ui={ui} onSelect={setSelectedPostId} />
          ))}
          {showUpcoming && upcomingPost && <UpcomingPostCard post={upcomingPost} isDark={isDark} ui={ui} />}
        </div>

        {totalItemCount > INITIAL_VISIBLE_COUNT && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              className={`inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer shadow-sm hover:shadow-md ${
                isDark
                  ? 'bg-night-card hover:bg-[#25221E] text-apricot border border-night-border hover:border-sand/60'
                  : 'bg-white hover:bg-[#F9F8F5] text-rust border border-[#d8d1c5] hover:border-rust/60'
              }`}
            >
              <span>{isExpanded ? ui.showLess : ui.readMore}</span>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}
      </div>

      {selectedPost && (
        <BlogReaderModal
          post={selectedPost}
          isDark={isDark}
          ui={ui}
          onClose={closePost}
          onToggleLang={onToggleLang}
          isJapaneseAvailable={isJapaneseAvailable}
        />
      )}
    </section>
  )
}
