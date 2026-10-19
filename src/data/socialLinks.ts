import type { ComponentType } from 'react'
import { GithubIcon, InstagramIcon, LinkedinIcon, SpotifyIcon } from '../components/common/icons'

export interface SocialLink {
  name: string
  url: string
  icon: ComponentType<{ className?: string }>
}

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/rikuto-mikado', icon: GithubIcon },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rikuto-mikado', icon: LinkedinIcon },
  { name: 'Instagram', url: 'https://www.instagram.com/rikuto_jpn/', icon: InstagramIcon },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/user/31ziidnuokqdfrdhwhyug37jxbli?si=4996df09eae84262',
    icon: SpotifyIcon,
  },
]
