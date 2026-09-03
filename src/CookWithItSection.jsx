import React, { useRef, useState, useEffect } from 'react'

const RECIPES_DATA = [
  {
    id: '01',
    time: '3 MIN',
    serves: 'SERVES 1',
    title: 'Tamago kake gohan',
    japaneseTitle: '卵かけご飯',
    tags: ['HOT RICE', '1 RAW EGG', 'SOY · KAIRO'],
    description: 'Crack the egg over steaming rice, add a splash of soy, then one spoon of KAIRO. Stir hard until glossy. Breakfast, upgraded.',
    heatDots: 3,
    stamp: 'KAIRO · 香味辣油',
    image: '/facade.jpg',
    tilt: '-1.4deg',
    clipOffset: '-2px',
  },
  {
    id: '02',
    time: '8 MIN',
    serves: 'SERVES 2',
    title: 'Chili garlic udon',
    japaneseTitle: '辣油うどん',
    tags: ['FRESH UDON', 'BUTTER · SOY', 'SPRING ONION'],
    description: 'Boil, drain, toss with cold butter and soy while hot. Finish with two spoons of KAIRO and a shower of green onion.',
    heatDots: 4,
    stamp: 'KAIRO · 香味辣油',
    image: '/archway.jpg',
    tilt: '1.2deg',
    clipOffset: '1px',
  },
  {
    id: '03',
    time: '2 MIN',
    serves: 'SERVES 4',
    title: 'Gyoza dip',
    japaneseTitle: '餃子のたれ',
    tags: ['RICE VINEGAR', 'SOY · KAIRO', 'GRATED GINGER'],
    description: 'Two parts soy, one part vinegar, one spoon of KAIRO, a pinch of ginger. The dip your dumplings have been waiting for.',
    heatDots: 2,
    stamp: 'KAIRO · 香味辣油',
    image: '/courtyard.jpg',
    tilt: '-0.9deg',
    clipOffset: '-1px',
  },
  {
    id: '04',
    time: '12 MIN',
    serves: 'SERVES 2',
    title: 'Crispy rice & chili',
    japaneseTitle: '焼きおにぎり',
    tags: ['DAY-OLD RICE', 'FRIED EGG', 'KAIRO DRIZZLE'],
    description: 'Press cold rice into a hot skillet until golden and crisp on top. Drizzle KAIRO generously and top with a crispy fried egg.',
    heatDots: 4,
    stamp: 'KAIRO · 香味辣油',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    tilt: '1.6deg',
    clipOffset: '3px',
  },
  {
    id: '05',
    time: '15 MIN',
    serves: 'SERVES 4',
    title: 'Slow-roasted garlic bowl',
    japaneseTitle: '大蒜窯焼き',
    tags: ['ROASTED GARLIC', 'SESAME', 'CRUSTY BREAD'],
    description: 'Infuse whole garlic cloves into warm terracotta stone dishes, crushed with toasted sesame seeds and chili oil.',
    heatDots: 5,
    stamp: 'KAIRO · 香味辣油',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    tilt: '-1.1deg',
    clipOffset: '-2px',
  },
  {
    id: '06',
    time: '5 MIN',
    serves: 'SERVES 1',
    title: 'Smoked brick hearth noodles',
    japaneseTitle: '窯焼きラーメン',
    tags: ['RAMEN NOODLES', 'BAMBOO', 'KAIRO BATCH'],
    description: 'Rich broth poured over springy wheat noodles, finished with smoked sesame oil and a spoonful of small-batch chili infusion.',
    heatDots: 3,
    stamp: 'KAIRO · 香味辣油',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    tilt: '0.8deg',
    clipOffset: '0px',
  },
]

export default function CookWithItSection() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(1)

  // Smooth lerp state for physics interpolation
  const currentTranslateX = useRef(0)
  const targetTranslateX = useRef(0)
  const animationFrameId = useRef(null)

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

      // Update active card index indicator based on progress
      const cardCount = RECIPES_DATA.length
      const currentCard = Math.min(
        cardCount,
        Math.max(1, Math.floor(rawProgress * cardCount) + 1)
      )
      setActiveIndex(currentCard)
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
    <div ref={containerRef} className="relative w-full h-[360vh] bg-[#8E2417]">
      <style>{`
        /* Realistic Paper Texture & Imperfection Shadow */
        .paper-sheet {
          background-color: #F6F2E9;
          background-image: 
            radial-gradient(#e5dfd3 1px, transparent 0),
            linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(246,242,233,0.9) 50%, rgba(230,222,208,0.4) 100%);
          background-size: 24px 24px, 100% 100%;
          box-shadow: 
            0 25px 35px -10px rgba(0, 0, 0, 0.65),
            0 10px 15px -5px rgba(0, 0, 0, 0.4),
            inset 0 0 15px rgba(0, 0, 0, 0.03);
        }

        /* Subtle Paper Bent Edge Overlay */
        .paper-fold-shadow {
          background: linear-gradient(to bottom right, rgba(0,0,0,0.04) 0%, transparent 40%, rgba(0,0,0,0.06) 100%);
        }

        /* Terracotta Red Textured Background Canvas */
        .terracotta-canvas {
          background-color: #8E2417;
          background-image: 
            radial-gradient(rgba(0, 0, 0, 0.25) 1px, transparent 0),
            radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0);
          background-size: 16px 16px, 32px 32px;
          background-position: 0 0, 8px 8px;
        }
      `}</style>

      {/* STICKY FULLSCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden terracotta-canvas flex flex-col justify-between py-8 md:py-10 select-none border-t border-red-950/40">
        
        {/* TOP SECTION HEADER */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 flex items-end justify-between z-20 mb-8 md:mb-14">
          <div>
            {/* BADGE */}
            <div className="inline-flex items-center gap-2.5 border border-white/25 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/90 mb-3 bg-black/15 backdrop-blur-sm">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#8E2417] font-extrabold text-[9px]">
                06
              </span>
              <span>RECIPES · レシピ</span>
              <span className="text-white/30">•</span>
              <span className="text-white/80">FIVE MINUTES, ONE SPOON</span>
            </div>

            {/* MAIN MASSIVE TYPOGRAPHY */}
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none">
              COOK <span className="font-light italic font-serif text-white/85 tracking-normal text-3xl sm:text-5xl md:text-6xl">WITH IT.</span>
            </h2>
          </div>

          {/* TOP RIGHT SCROLL POSITION INDICATOR */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-mono tracking-widest text-white/80 mb-2">
            <span>02</span>
            <div className="w-28 h-[1.5px] bg-white/25 relative overflow-hidden rounded-full">
              <div
                className="h-full bg-white transition-all duration-150 rounded-full"
                style={{ width: `${Math.max(10, progress * 100)}%` }}
              />
            </div>
            <span>0{RECIPES_DATA.length}</span>
          </div>
        </div>

        {/* HORIZONTAL CARDS TRACK (MOVED BY VERTICAL PAGE SCROLL) */}
        <div className="relative w-full overflow-visible z-20 flex-1 flex items-center">
          {/* CONTINUOUS HORIZONTAL WIRE STRING LOCKED DIRECTLY TO CLIPS */}
          <div className="absolute top-[18px] left-0 w-full z-10 pointer-events-none">
            {/* Wire String Line */}
            <div className="w-full h-[2.5px] bg-gradient-to-r from-[#200503] via-[#4A0D07] to-[#200503] shadow-[0_4px_8px_rgba(0,0,0,0.6)]" />
            {/* Wire Highlight line */}
            <div className="w-full h-[0.5px] bg-white/20 -mt-[2.5px]" />
          </div>

          <div
            ref={trackRef}
            className="flex items-start gap-10 md:gap-14 px-8 md:px-20 pt-8 transition-transform duration-75 ease-out will-change-transform z-20"
          >
            {RECIPES_DATA.map((recipe) => (
              <div
                key={recipe.id}
                style={{
                  transform: `rotate(${recipe.tilt})`,
                }}
                className="relative group shrink-0 w-[220px] sm:w-[250px] md:w-[280px] transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1"
              >
                {/* REALISTIC WOODEN CLOTHESPIN / PEG CLIP ATTACHED TO WIRE */}
                <div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
                  style={{ marginLeft: recipe.clipOffset }}
                >
                  {/* Peg Top Head */}
                  <div className="w-4 h-7 bg-gradient-to-b from-[#D4A574] via-[#B88752] to-[#8F6131] rounded-sm shadow-[0_6px_10px_rgba(0,0,0,0.5)] border border-[#5C3D1C] flex flex-col justify-between items-center py-1">
                    <div className="w-3 h-[1px] bg-[#3B250D]" />
                    {/* Metal Spring Coil */}
                    <div className="w-3.5 h-[3px] bg-gradient-to-r from-[#888] via-[#eee] to-[#666] rounded-full shadow-sm" />
                    <div className="w-3 h-[1px] bg-[#3B250D]" />
                  </div>
                  {/* Peg Clip Shadow on Paper */}
                  <div className="w-5 h-2 bg-black/30 blur-[2px] rounded-full -mt-1" />
                </div>

                {/* PHYSICAL HANGING PAPER POSTER CARD */}
                <div className="paper-sheet rounded-[2px] p-3.5 sm:p-4 pt-5 text-[#221D19] relative overflow-hidden">
                  <div className="absolute inset-0 paper-fold-shadow pointer-events-none" />

                  {/* PAPER TOP METADATA */}
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-[#7A6D5E] border-b border-[#E0D8C8] pb-2 mb-2.5">
                    <span className="font-bold text-[#8E2417]">{recipe.id}</span>
                    <span className="uppercase text-[9px] font-semibold text-[#8A7C6B]">
                      {recipe.time} • {recipe.serves}
                    </span>
                  </div>

                  {/* RECIPE PHOTO POSTER IMAGE */}
                  <div className="relative w-full aspect-[16/9] rounded-[1px] overflow-hidden bg-stone-100 mb-3 shadow-inner border border-black/10">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover grayscale-[15%] contrast-[105%] group-hover:scale-105 transition-transform duration-700"
                      draggable={false}
                    />
                    <div className="absolute bottom-1.5 right-1.5 bg-black/65 backdrop-blur-md text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-[1px]">
                      {recipe.japaneseTitle}
                    </div>
                  </div>

                  {/* TITLE & JAPANESE SUBTITLE */}
                  <div className="mb-2">
                    <h3 className="font-display font-black text-base sm:text-lg tracking-tight text-[#1C1815] leading-snug">
                      {recipe.title}
                    </h3>
                    <p className="text-[11px] font-serif italic text-[#8A7A68] mt-0.5">
                      {recipe.japaneseTitle}
                    </p>
                  </div>

                  {/* INGREDIENT / SPEC TAGS */}
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {recipe.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-block bg-[#EBE4D6] text-[#5C5043] text-[8.5px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-[1px] border border-[#DDD4C3]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* DESCRIPTION PARAGRAPH */}
                  <p className="text-[11px] sm:text-[11.5px] leading-relaxed text-[#4A4035] mb-3 font-sans">
                    {recipe.description}
                  </p>

                  {/* FOOTER RATING & STAMP */}
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-[#8A7C6B] pt-3 border-t border-[#E0D8C8]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold uppercase text-[9px]">HEAT</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`inline-block w-1.5 h-1.5 rounded-full ${
                              i < recipe.heatDots ? 'bg-[#8E2417]' : 'bg-[#D6CDBF]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <span className="font-bold text-[#8E2417] text-[9px] tracking-widest uppercase">
                      {recipe.stamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM METADATA WATERMARK FOOTER */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-14 flex items-center justify-between text-[11px] font-mono tracking-widest text-white/50 z-20">
          <span>TWENTY-NINE WAYS TO USE THE LAST DROP →</span>
          <span className="hidden sm:inline">SCROLL DOWN TO EXPLORE GALLERY</span>
        </div>
      </div>
    </div>
  )
}
