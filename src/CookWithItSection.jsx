import React, { useRef, useState, useEffect } from 'react'
import house1 from './assets/Houses/1.jpg'
import house2 from './assets/Houses/2.jpg'
import house3 from './assets/Houses/3.avif'
import house4 from './assets/Houses/4.jpg'
import house5 from './assets/Houses/5.jpg'
import house6 from './assets/Houses/6.jpg'

const PROJECTS_DATA = [
 {
  id: '01',
  displayId: '01',
  time: '2024',
  serves: 'Residential Construction',
  title: 'Addanki Courtyard House',
  teluguTitle: 'Courtyard House',
  tags: ['Facing Brick', 'Quality Construction', 'Courtyard'],
  description: 'A home built with terracotta facing bricks, designed for natural temperature control and improved ventilation.',
  ratingDots: 5,
  stamp: 'ADDANKI · Addanki Brick',
  image: house1,
  tilt: '-1.2deg',
  clipOffset: '-2px',
},
{
  id: '02',
  displayId: '02',
  time: '2023',
  serves: 'Commercial Building',
  title: 'Modern Arch Villa',
  teluguTitle: 'Arch Design Villa',
  tags: ['Arch Construction', 'High Strength', 'Traditional Style'],
  description: 'Handcrafted bricks used to create highly durable arch structures without the need for reinforced steel bars.',
  ratingDots: 5,
  stamp: 'ADDANKI · Addanki Brick',
  image: house2,
  tilt: '1.4deg',
  clipOffset: '1px',
},

{
  id: '03',
  displayId: '03',
  time: '2024',
  serves: 'Public Pavilion',
  title: 'Luminous Facade Building',
  teluguTitle: 'Luminous Facade',
  tags: ['Fired Brick', 'Weather Resistant', 'Long Lasting'],
  description: 'Exterior walls built with high-density kiln-fired bricks designed to withstand generations of changing weather.',
  ratingDots: 5,
  stamp: 'ADDANKI · Addanki Brick',
  image: house3,
  tilt: '-0.8deg',
  clipOffset: '-1px',
},

{
  id: '04',
  displayId: '04',
  time: '2023',
  serves: 'Estate Housing',
  title: 'Terracotta Brick Manor',
  teluguTitle: 'Terracotta Residence',
  tags: ['Rustic Finish', 'High Density', 'Thermal Resistance'],
  description: 'A multi-level residential complex crafted with Addanki clay, featuring naturally rich tones and a timeless character.',
  ratingDots: 5,
  stamp: 'ADDANKI · Addanki Brick',
  image: house4,
  tilt: '1.2deg',
  clipOffset: '2px',
},

{
  id: '05',
  displayId: '05',
  time: '2024',
  serves: 'Boutique Hotel',
  title: 'Hearth & Timber Resort',
  teluguTitle: 'Brick Resort',
  tags: ['Handcrafted', 'Distinctive Design', 'Natural Beauty'],
  description: 'Luxury resort suites designed with floor-to-ceiling exposed brick walls, creating a warm and timeless atmosphere.',
  ratingDots: 5,
  stamp: 'ADDANKI · Addanki Brick',
  image: house5,
  tilt: '-1.0deg',
  clipOffset: '-2px',
},

{
  id: '06',
  displayId: '06',
  time: '2024',
  serves: 'Art Studio',
  title: 'Kiln Artisan Studio',
  teluguTitle: 'Artisan Workshop',
  tags: ['Dark Brick', 'Sound Insulation', 'Vitrified'],
  description: 'A contemporary studio built with dark vitrified clinker bricks for improved acoustic performance and thermal control.',
  ratingDots: 5,
  stamp: 'ADDANKI · Addanki Brick',
  image: house6,
  tilt: '0.9deg',
  clipOffset: '0px',
},
]

export default function CookWithItSection() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  const [progress, setProgress] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)

  // Smooth lerp state for physics interpolation
  const currentTranslateX = useRef(0)
  const targetTranslateX = useRef(0)
  const animationFrameId = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return

      const container = containerRef.current
      const track = trackRef.current

      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScrollableHeight = rect.height - windowHeight

      if (totalScrollableHeight <= 0) return

      // Calculate vertical scroll progress strictly within this section (0 to 1)
      const scrolled = -rect.top
      const rawProgress = Math.min(Math.max(scrolled / totalScrollableHeight, 0), 1)

      setProgress(rawProgress)

      // Calculate maximum horizontal scroll translation
      const trackWidth = track.scrollWidth
      const maxTranslate = Math.max(0, trackWidth - window.innerWidth + 120)

      targetTranslateX.current = -rawProgress * maxTranslate
    }

    // Animation loop for physics lerp easing
    const animate = () => {
      const diff = targetTranslateX.current - currentTranslateX.current
      currentTranslateX.current += diff * 0.08

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${currentTranslateX.current}px, 0, 0)`
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    handleScroll()
    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    // OUTER STICKY SCROLL WRAPPER (h-[360vh] gives vertical scroll range to drive horizontal progress)
    <div id="recipes" ref={containerRef} className="relative w-full h-[360vh] bg-[#8E2417]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Mandali&family=Inter:wght@400;500;600;700&display=swap');

        .font-cook-display { font-family: 'Archivo', ui-sans-serif, system-ui; }
        .font-telugu { font-family: 'Mandali', sans-serif; }

        /* Authentic Physical Paper Sheet */
        .paper-card {
          background-color: #FFFFFF;
          background-image: 
            radial-gradient(rgba(0,0,0,0.015) 1px, transparent 0),
            linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%);
          background-size: 16px 16px, 100% 100%;
          box-shadow: 
            0 20px 30px -10px rgba(0, 0, 0, 0.55),
            0 10px 15px -5px rgba(0, 0, 0, 0.35),
            0 1px 3px rgba(0,0,0,0.1);
        }

        /* Subtle Corner Curl Effect */
        .paper-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 25px;
          height: 25px;
          background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.04) 50%);
          pointer-events: none;
        }

        /* Terracotta Canvas */
        .terracotta-bg {
          background-color: #8E2417;
          background-image: 
            radial-gradient(rgba(0, 0, 0, 0.28) 1px, transparent 0),
            radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 0);
          background-size: 16px 16px, 32px 32px;
          background-position: 0 0, 8px 8px;
        }
      `}</style>

      {/* STICKY FULLSCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden terracotta-bg flex flex-col justify-between py-6 md:py-8 select-none border-t border-black/40">
        
        {/* TOP SECTION HEADER */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 flex items-end justify-between z-20 mb-4 md:mb-8">
          <div>
            {/* BADGE */}
            <div className="inline-flex items-center gap-2.5 border border-white/20 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/90 mb-2.5 bg-black/30 backdrop-blur-sm">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-white/40 text-white font-mono font-bold text-[9px]">
                07
              </span>
              <span className="font-mono text-[10px]">PROJECTS · నిర్మాణ ఉదాహరణలు</span>
              <span className="text-white/30">•</span>
              <span className="text-white/80 font-mono text-[10px]">BUILT WITH ADDANKI BRICKS</span>
            </div>

            {/* MAIN MASSIVE TYPOGRAPHY */}
            <h2 className="font-cook-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none">
              BUILT <span className="font-normal text-white">WITH IT.</span>
            </h2>
          </div>

          {/* TOP RIGHT SCROLL POSITION INDICATOR */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-mono tracking-widest text-white/80 mb-2">
            <span>01</span>
            <div className="w-28 h-[1.5px] bg-white/25 relative overflow-hidden rounded-full">
              <div
                className="h-full bg-white transition-all duration-150 rounded-full"
                style={{ width: `${Math.max(15, progress * 100)}%` }}
              />
            </div>
            <span>06</span>
          </div>
        </div>

        {/* HORIZONTAL CARDS TRACK WITH PERFECT THREAD HANGING (ZERO GAP) */}
        <div className="relative w-full overflow-visible z-20 flex-1 flex items-center">
          {/* CONTINUOUS HORIZONTAL WIRE THREAD PASSING EXACTLY THROUGH CLOTHESPIN CLIPS */}
          <div className="absolute top-[28px] left-0 w-full z-[25] pointer-events-none">
            {/* Dark Wire Shadow */}
            <div className="w-full h-[3px] bg-[#120504] shadow-[0_4px_12px_rgba(0,0,0,0.85)]" />
            {/* Wire Highlight line */}
            <div className="w-full h-[1px] bg-white/30 -mt-[3px]" />
          </div>

          <div
            ref={trackRef}
            className="flex items-start gap-8 md:gap-12 px-8 md:px-20 pt-12 transition-transform duration-75 ease-out will-change-transform z-20"
          >
            {PROJECTS_DATA.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                style={{
                  transform: `rotate(${project.tilt})`,
                }}
                className="relative group shrink-0 w-[240px] sm:w-[270px] md:w-[300px] cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2"
              >
                {/* REALISTIC WOODEN CLOTHESPIN / PEG CLIP EXACTLY CLAMPED ONTO THREAD WITH ZERO GAP */}
                <div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
                  style={{ marginLeft: project.clipOffset }}
                >
                  {/* Peg Top Head Clamping Thread */}
                  <div className="w-4 h-8 bg-gradient-to-b from-[#E0B888] via-[#C99A63] to-[#8C602E] rounded-sm shadow-[0_5px_10px_rgba(0,0,0,0.75)] border border-[#593914] flex flex-col justify-between items-center py-1">
                    <div className="w-3 h-[1px] bg-[#3B2207]" />
                    {/* Metal Spring Coil right over the wire thread */}
                    <div className="w-4 h-[4px] bg-gradient-to-r from-[#666] via-[#fff] to-[#444] rounded-full shadow-inner border border-black/30" />
                    <div className="w-3 h-[1px] bg-[#3B2207]" />
                  </div>
                  {/* Peg Clip Shadow on Paper */}
                  <div className="w-5 h-2 bg-black/40 blur-[2px] rounded-full -mt-0.5" />
                </div>

                {/* PHYSICAL HANGING PAPER POSTER CARD */}
                <div className="paper-card rounded-sm p-4 pt-6 text-[#1C1815] relative overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_28px_45px_-10px_rgba(0,0,0,0.8)]">
                  
                  {/* PROJECT PHOTO POSTER IMAGE */}
                  <div className="relative w-full aspect-[4/3] rounded-[2px] overflow-hidden bg-stone-200 mb-3 shadow-sm border border-black/5">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      draggable={false}
                    />
                  </div>

                  {/* PAPER TOP METADATA & TITLE */}
                  <div className="flex items-center justify-between text-[11px] font-mono tracking-wider mb-1">
                    <span className="font-bold text-[#8E2417] text-xs">{project.displayId}</span>
                    <span className="uppercase text-[9px] font-semibold text-[#8A7C6B]">
                      {project.time} · {project.serves}
                    </span>
                  </div>

                  {/* TITLE & TELUGU SUBTITLE */}
                  <div className="mb-2">
                    <h3 className="font-cook-display font-bold text-lg sm:text-xl tracking-tight text-[#1C1815] leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs font-telugu text-[#8E2417] font-bold mt-0.5">
                      {project.teluguTitle}
                    </p>
                  </div>

                  {/* SPEC / CATEGORY TAGS (ROUNDED PILLS) */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-block bg-[#F5F2EB] text-[#5C5043] text-[8.5px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border border-[#E2DBD0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* DESCRIPTION PARAGRAPH */}
                  <p className="text-[11px] sm:text-[11.5px] leading-relaxed text-[#4A4035] mb-4 font-sans line-clamp-3">
                    {project.description}
                  </p>

                  {/* FOOTER RATING & STAMP */}
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-[#8A7C6B] pt-2.5 border-t border-[#EAE3D5]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold uppercase text-[9px]">GRADE</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`inline-block w-1.5 h-1.5 rounded-full ${
                              i < project.ratingDots ? 'bg-[#8E2417]' : 'bg-[#DDD5C7]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <span className="font-bold text-[#8E2417] text-[9px] tracking-wider uppercase font-telugu">
                      {project.stamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM METADATA WATERMARK FOOTER */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 flex items-center justify-between text-[11px] font-mono tracking-widest text-white/50 z-20">
          <span>CURATED ARCHITECTURAL CASE STUDIES →</span>
          <span className="hidden sm:inline">CLICK ANY CARD TO VIEW PROJECT DETAILS</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ZOOMED CARD MODAL OVERLAY                                    */}
      {/* ============================================================ */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300 animate-fadeIn select-none"
          onClick={() => setSelectedProject(null)}
        >
          {/* TOP RIGHT CLOSE BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedProject(null)
            }}
            className="fixed top-8 right-8 z-50 flex items-center gap-2 bg-[#1A0503] hover:bg-black border border-white/20 text-white font-mono text-xs uppercase font-bold tracking-widest px-5 py-2.5 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>CLOSE</span>
            <span className="text-sm leading-none">✕</span>
          </button>

          {/* RIGHT SIDE STEP INDICATORS */}
          <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 text-[10px] font-mono text-white/60 pointer-events-none">
            <span>07</span>
            <div className="w-[1.5px] h-14 bg-white/20 relative">
              <div className="w-full h-1/2 bg-[#8E2417]" />
            </div>
            <span>09</span>
            <span className="text-xs font-telugu mt-0.5">క్రిందికి</span>
          </div>

          {/* ZOOMED CARD CONTAINER */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md md:max-w-lg bg-white rounded-[2px] p-5 sm:p-7 text-[#1C1815] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] border border-white/40 transform transition-all duration-300 scale-100 animate-scaleUp"
          >
            {/* Top Clothespin in Zoomed State */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
              <div className="w-4 h-8 bg-gradient-to-b from-[#E0B888] via-[#C99A63] to-[#8C602E] rounded-sm shadow-[0_6px_12px_rgba(0,0,0,0.8)] border border-[#593914] flex flex-col justify-between items-center py-1">
                <div className="w-3 h-[1px] bg-[#3B2207]" />
                <div className="w-4 h-[3px] bg-gradient-to-r from-[#666] via-[#fff] to-[#444] rounded-full" />
                <div className="w-3 h-[1px] bg-[#3B2207]" />
              </div>
            </div>

            {/* PROJECT PHOTO POSTER IMAGE */}
            <div className="relative w-full aspect-[16/10] rounded-[2px] overflow-hidden bg-stone-200 mb-4 shadow-sm border border-black/5">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* PAPER TOP METADATA & TITLE */}
            <div className="flex items-center justify-between text-xs font-mono tracking-wider mb-1.5">
              <span className="font-bold text-[#8E2417] text-sm">{selectedProject.displayId}</span>
              <span className="uppercase text-[10px] font-semibold text-[#8A7C6B]">
                {selectedProject.time} · {selectedProject.serves}
              </span>
            </div>

            {/* TITLE & TELUGU SUBTITLE */}
            <div className="mb-3">
              <h3 className="font-cook-display font-black text-2xl sm:text-3xl tracking-tight text-[#1C1815] leading-tight">
                {selectedProject.title}
              </h3>
              <p className="text-sm font-telugu text-[#8E2417] font-bold mt-0.5">
                {selectedProject.teluguTitle}
              </p>
            </div>

            {/* SPEC / CATEGORY TAGS (ROUNDED PILLS) */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="inline-block bg-[#F5F2EB] text-[#5C5043] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-[#E2DBD0]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* DESCRIPTION PARAGRAPH */}
            <p className="text-sm sm:text-[15px] leading-relaxed text-[#4A4035] mb-6 font-sans">
              {selectedProject.description}
            </p>

            {/* FOOTER RATING & STAMP */}
            <div className="flex items-center justify-between text-xs font-mono tracking-wider text-[#8A7C6B] pt-4 border-t border-[#EAE3D5]">
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase text-[10px]">GRADE</span>
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`inline-block w-2 h-2 rounded-full ${
                        i < selectedProject.ratingDots ? 'bg-[#8E2417]' : 'bg-[#DDD5C7]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <span className="font-bold text-[#8E2417] text-[11px] tracking-wider uppercase font-telugu">
                {selectedProject.stamp}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
