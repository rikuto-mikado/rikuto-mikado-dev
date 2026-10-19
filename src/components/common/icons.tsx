interface IconProps {
  className?: string
}

// ---- Brand icons (filled) ----

export function GithubIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

export function LinkedinIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )
}

export function InstagramIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

export function SpotifyIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.297c-.214.351-.673.463-1.024.249-2.809-1.716-6.345-2.104-10.51-1.151-.4.092-.796-.157-.887-.557-.092-.4.157-.796.557-.887 4.567-1.044 8.49-.607 11.615 1.302.351.214.463.673.249 1.024zm1.465-3.262c-.27.439-.844.577-1.282.308-3.218-1.978-8.125-2.55-11.932-1.394-.494.15-1.02-.133-1.17-.626-.15-.494.133-1.02.626-1.17 4.355-1.321 9.778-.68 13.45 1.58.439.27.577.844.308 1.282zm.126-3.41c-3.858-2.29-10.222-2.502-13.896-1.387-.592.179-1.222-.158-1.401-.75-.179-.592.158-1.222.75-1.401 4.225-1.282 11.246-1.036 15.694 1.604.533.316.707 1.01.391 1.543-.316.533-1.01.707-1.543.391z"/>
    </svg>
  )
}

// ---- UI icons (stroked, Heroicons v1 outline paths) ----

interface StrokeIconProps extends IconProps {
  strokeWidth?: number
}

function StrokeIcon({ d, className, strokeWidth = 2 }: StrokeIconProps & { d: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d={d} />
    </svg>
  )
}

export function SunIcon(props: StrokeIconProps) {
  return (
    <StrokeIcon
      {...props}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  )
}

export function MoonIcon(props: StrokeIconProps) {
  return <StrokeIcon {...props} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
}

export function GlobeIcon({ strokeWidth = 1.8, ...props }: StrokeIconProps) {
  return (
    <StrokeIcon
      {...props}
      strokeWidth={strokeWidth}
      d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5 0 4.5-4 4.5-9s-2-9-4.5-9-4.5 4-4.5 9 2 9 4.5 9zm-9-9h18"
    />
  )
}

export function InfoIcon(props: StrokeIconProps) {
  return <StrokeIcon {...props} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
}

export function CloseIcon(props: StrokeIconProps) {
  return <StrokeIcon {...props} d="M6 18L18 6M6 6l12 12" />
}

export function ChevronDownIcon(props: StrokeIconProps) {
  return <StrokeIcon {...props} d="M19 9l-7 7-7-7" />
}

export function ChevronRightIcon(props: StrokeIconProps) {
  return <StrokeIcon {...props} d="M9 5l7 7-7 7" />
}

export function BookOpenIcon({ strokeWidth = 1.3, ...props }: StrokeIconProps) {
  return (
    <StrokeIcon
      {...props}
      strokeWidth={strokeWidth}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  )
}

export function PencilSquareIcon({ strokeWidth = 1.2, ...props }: StrokeIconProps) {
  return (
    <StrokeIcon
      {...props}
      strokeWidth={strokeWidth}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  )
}

/** Sun in dark mode (click to go light), moon in light mode. */
export function ThemeIcon({ isDark, className }: IconProps & { isDark: boolean }) {
  return isDark ? (
    <SunIcon className={`${className} transition-transform duration-300`} />
  ) : (
    <MoonIcon className={`${className} -rotate-12 transition-transform duration-300`} />
  )
}
