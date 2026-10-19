import { CONTACT_EMAIL } from '../../config'
import type { SocialLink } from '../../data/socialLinks'
import type { UiText } from '../../data/translations'

interface FooterSectionProps {
  ui: UiText
  socialLinks: SocialLink[]
}

export default function FooterSection({ ui, socialLinks }: FooterSectionProps) {
  return (
    <footer id="contact" className="relative w-full text-paper py-20 px-6 scroll-mt-6">
      <div className="absolute inset-0 bg-rust z-0 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-10">
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-b border-tan/60 pb-10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#eed6be] font-sans block mb-1">{ui.footerContact}</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-serif text-2xl sm:text-3xl hover:underline underline-offset-4 transition-all"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="flex items-center space-x-3">
            {socialLinks.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all transform hover:scale-110 text-paper"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center font-sans text-xs text-[#eed6be]/80 tracking-wide">{ui.copyright}</div>
      </div>
    </footer>
  )
}
