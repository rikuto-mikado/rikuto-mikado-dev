import { useEffect, useState } from 'react'
import { blogPostsData, upcomingPostData } from '../../../data/blogPosts'
import { sectionPage } from '../../../data/navigation'
import type { Language } from '../../../data/translations'
import { uiText } from '../../../data/translations'
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock'
import { useEscapeKey } from '../../../hooks/useEscapeKey'
import ReadMoreButton from '../../common/ReadMoreButton'
import PageHead from '../../newspaper/PageHead'
import { usePrintEdition } from '../../../hooks/usePrintEdition'
import BlogCard, { LeadStory } from './BlogCard'
import BlogReaderModal from './BlogReaderModal'
import UpcomingPostCard from './UpcomingPostCard'

// Front page: one lead story plus a row of secondary columns
const INITIAL_SECONDARY_COUNT = 2

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
  const upcomingPosts = upcomingPostData[lang]
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  // The print edition carries every essay
  const { isPrinting } = usePrintEdition()

  // Posts are stored oldest first; the newest leads the page
  const [leadPost, ...olderPosts] = [...posts].reverse()
  const secondaryPosts = isExpanded || isPrinting ? olderPosts : olderPosts.slice(0, INITIAL_SECONDARY_COUNT)
  // The "next issue" notices share one column, always in the first row after the first two stories
  const columns = [
    ...secondaryPosts.slice(0, INITIAL_SECONDARY_COUNT).map((post) => ({ kind: 'post' as const, post })),
    ...(upcomingPosts.length > 0 ? [{ kind: 'upcoming' as const, posts: upcomingPosts }] : []),
    ...secondaryPosts.slice(INITIAL_SECONDARY_COUNT).map((post) => ({ kind: 'post' as const, post })),
  ]
  const rule = isDark ? 'border-night-border' : 'border-cream-border'
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
      className={`relative w-full py-20 md:py-28 px-6 border-t transition-colors duration-500 scroll-mt-6 ${
        isDark ? 'border-night-divider' : 'border-cream-divider'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <PageHead
          isDark={isDark}
          page={sectionPage('blog')}
          section={ui.navBlog}
          kicker={ui.blogBadge}
          heading={ui.blogHeading}
          deck={ui.blogLead}
        />

        {leadPost && (
          <div className={`pt-8 border-t-[3px] border-double transition-colors duration-500 ${rule}`}>
            <LeadStory post={leadPost} isDark={isDark} ui={ui} onSelect={setSelectedPostId} />
          </div>
        )}

        {columns.length > 0 && (
          <div
            className={`column-rules mt-12 pt-10 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 transition-colors duration-500 ${rule}`}
          >
            {columns.map((item, index) => (
              <div
                key={item.kind === 'post' ? item.post.id : 'upcoming'}
                className={`flex flex-col ${index > 0 ? `max-sm:border-t max-sm:pt-10 ${rule}` : ''}`}
              >
                {item.kind === 'post' ? (
                  <BlogCard post={item.post} isDark={isDark} ui={ui} onSelect={setSelectedPostId} />
                ) : (
                  <div className="flex flex-col gap-5">
                    {item.posts.map((post) => (
                      <UpcomingPostCard key={post.title} post={post} isDark={isDark} ui={ui} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {olderPosts.length > INITIAL_SECONDARY_COUNT && (
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
