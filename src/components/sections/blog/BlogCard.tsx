import type { BlogPost } from '../../../data/blogPosts'
import { blogCoverImages } from '../../../data/images'
import type { UiText } from '../../../data/translations'
import { Card, CardBody, CardCategoryBadge, CardExcerpt, CardFooter, CardHoverHint, CardTitle } from '../../common/Card'
import { BookOpenIcon } from '../../common/icons'

interface BlogCardProps {
  post: BlogPost
  isDark: boolean
  ui: UiText
  onSelect: (postId: string) => void
}

/** Typographic cover shown when a post has no cover image. */
function PlaceholderCover({ post, isDark }: { post: BlogPost; isDark: boolean }) {
  return (
    <>
      <div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full border border-rust/15 pointer-events-none" />
      <div className="absolute right-6 bottom-6 w-16 h-16 rounded-full border border-dashed border-rust/20 pointer-events-none" />
      <div className="relative z-10 flex flex-col justify-between h-full w-full pointer-events-none">
        <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-rust/80">
          {post.category}
        </span>
        <div className="flex items-center justify-center my-auto py-2">
          <BookOpenIcon className="w-8 h-8 text-rust/40 transform group-hover:scale-110 transition-transform duration-500" />
        </div>
        <span className={`text-[10px] font-serif italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{post.date}</span>
      </div>
    </>
  )
}

export default function BlogCard({ post, isDark, ui, onSelect }: BlogCardProps) {
  const coverImg = blogCoverImages[post.id]
  const primaryTag = post.tags[0]

  return (
    <Card as="article" isDark={isDark} label={`${ui.readEssay}: ${post.title}`} onClick={() => onSelect(post.id)}>
      <div
        className={`relative aspect-[16/10] overflow-hidden border-b transition-colors duration-500 flex flex-col justify-between p-5 ${
          isDark
            ? 'bg-gradient-to-br from-[#25221E] via-[#1E1C19] to-night-panel border-night-edge'
            : 'bg-gradient-to-br from-paper via-[#EFECE6] to-[#E5E0D5] border-[#ece6dd]'
        }`}
      >
        {coverImg ? (
          <>
            <img
              src={coverImg}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05] group-hover:scale-105 group-hover:brightness-[0.88] transition-all duration-700 ease-out"
            />
            {/* Gradient overlay for contrast and editorial mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20 pointer-events-none" />
          </>
        ) : (
          <PlaceholderCover post={post} isDark={isDark} />
        )}

        <CardHoverHint label={ui.readEssay} />
      </div>

      <CardBody
        footer={
          <CardFooter isDark={isDark}>
            <span className="truncate pr-2">
              <strong className={`font-medium transition-colors duration-500 ${isDark ? 'text-ivory' : 'text-gray-800'}`}>
                {primaryTag ? `#${primaryTag}` : ''}
              </strong>
            </span>
            <span
              className={`inline-flex items-center gap-1 font-semibold transition-colors duration-300 group-hover:translate-x-0.5 ${
                isDark ? 'text-apricot' : 'text-rust'
              }`}
            >
              {ui.readShort} &rarr;
            </span>
          </CardFooter>
        }
      >
        <div className={`text-[11px] font-sans ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <span className="font-medium">{post.date}</span>
        </div>
        <CardCategoryBadge isDark={isDark}>{post.category}</CardCategoryBadge>
        <CardTitle isDark={isDark}>{post.title}</CardTitle>
        <CardExcerpt isDark={isDark}>{post.paragraphs[0] || post.excerpt}</CardExcerpt>
      </CardBody>
    </Card>
  )
}
