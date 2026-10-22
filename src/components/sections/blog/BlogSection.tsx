import { useEffect, useState } from 'react'
import { blogPostsData, upcomingPostData } from '../../../data/blogPosts'
import type { Language } from '../../../data/translations'
import { uiText } from '../../../data/translations'
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock'
import { useEscapeKey } from '../../../hooks/useEscapeKey'
import ReadMoreButton from '../../common/ReadMoreButton'
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
  // Posts are stored oldest first; show newest first, with the upcoming card leading the grid
  const newestFirstPosts = [...posts].reverse()
  const initialPostCount = INITIAL_VISIBLE_COUNT - (upcomingPost ? 1 : 0)
  const visiblePosts = isExpanded ? newestFirstPosts : newestFirstPosts.slice(0, initialPostCount)
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
          {upcomingPost && <UpcomingPostCard post={upcomingPost} isDark={isDark} ui={ui} />}
          {visiblePosts.map((post) => (
            <BlogCard key={post.id} post={post} isDark={isDark} ui={ui} onSelect={setSelectedPostId} />
          ))}
        </div>

        {totalItemCount > INITIAL_VISIBLE_COUNT && (
          <ReadMoreButton
            isDark={isDark}
            ui={ui}
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded((prev) => !prev)}
          />
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
