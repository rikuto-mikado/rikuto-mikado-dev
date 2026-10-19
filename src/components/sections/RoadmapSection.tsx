import type { UiText } from '../../data/translations'

interface RoadmapSectionProps {
  ui: UiText
}

export default function RoadmapSection({ ui }: RoadmapSectionProps) {
  const phases = [
    { tag: ui.roadmapCol1Tag, title: ui.roadmapCol1Title, body: ui.roadmapCol1Body, footer: ui.roadmapCol1Footer },
    { tag: ui.roadmapCol2Tag, title: ui.roadmapCol2Title, body: ui.roadmapCol2Body, footer: ui.roadmapCol2Footer },
    { tag: ui.roadmapCol3Tag, title: ui.roadmapCol3Title, body: ui.roadmapCol3Body, footer: ui.roadmapCol3Footer },
  ]

  return (
    <section id="roadmap" className="relative w-full text-paper py-28 px-6 scroll-mt-6">
      <div className="absolute inset-0 bg-[#344432] z-0 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-sans uppercase tracking-widest text-tan font-semibold block">
            {ui.roadmapBadge}
          </span>
          <h2 className="text-4xl md:text-5xl italic font-serif">{ui.roadmapHeading}</h2>
          <p className="text-sm sm:text-base font-sans text-paper/80 max-w-2xl mx-auto leading-relaxed font-light">
            {ui.roadmapLead}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 font-sans">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="bg-white/5 p-8 sm:p-9 rounded-2xl border border-white/10 flex flex-col justify-between hover:bg-white/[0.07] transition-colors"
            >
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-tan block font-sans">
                    {phase.tag}
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-sand leading-snug">{phase.title}</h3>
                </div>
                <div className="border-t border-tan/30 w-16 my-3"></div>
                <p className="text-sm sm:text-base text-paper/90 leading-relaxed font-light">{phase.body}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-tan font-medium">{phase.footer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
