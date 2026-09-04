import React, { useState, useEffect, useRef } from 'react'
import brickImg from './assets/brickk.png'

export default function BrickHeroAndMaterial({ brickColor = '#ffffff' }) {
  const stageWrapperRef = useRef(null)
  const heroBrickSpotRef = useRef(null)
  const materialLeftSpotRef = useRef(null)
  const materialRightSpotRef = useRef(null)
  const materialSectionRef = useRef(null)

  const startTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now())
  const [tilt, setTilt] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0 })
  const [brickStyle, setBrickStyle] = useState({
    top: 0,
    left: 0,
    width: 266,
    opacity: 0,
  })

  const [contentSwapStyles, setContentSwapStyles] = useState({
    phaseA: { opacity: 1, transform: 'translate3d(0, 0, 0)', filter: 'none' },
    phaseB: { opacity: 0, transform: 'translate3d(-40px, 0, 0)', filter: 'blur(10px)' },
  })

  // Progress tracking for smooth scroll interpolation
  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const animFrameIdRef = useRef(null)

  const [wordStyles, setWordStyles] = useState({
    shapedBy: { opacity: 0, transform: 'translate3d(-70px, 0, 0)', filter: 'blur(8px)' },
    hand: { opacity: 0, transform: 'translate3d(70px, 0, 0)', filter: 'blur(8px)' },
    firedBy: { opacity: 0, transform: 'translate3d(0, 70px, 0)', filter: 'blur(8px)' },
    earth: { opacity: 0, transform: 'translate3d(70px, 0, 0)', filter: 'blur(8px)' },
  })

  // Mouse tilt effect when hovering Hero stage
  const handleMouseMove = (e) => {
    if (!stageWrapperRef.current) return
    const rect = stageWrapperRef.current.getBoundingClientRect()
    // Only apply tilt when mouse is in top viewport (Hero section)
    if (e.clientY > window.innerHeight) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setTilt({
      x: -y * 16,
      y: x * 20,
      shadowX: -x * 20,
      shadowY: -y * 12,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, shadowX: 0, shadowY: 0 })
  }

  // Scroll Progress Calculation & Continuous Animation Loop
  useEffect(() => {
    const updateTargetProgress = () => {
      if (!materialSectionRef.current || !stageWrapperRef.current) return
      const scrollY = window.scrollY
      const materialTop = materialSectionRef.current.offsetTop
      const materialHeight = materialSectionRef.current.offsetHeight

      const startScroll = 0
      const endScroll = Math.max(materialTop + materialHeight - window.innerHeight, 300)

      const rawProgress = (scrollY - startScroll) / (endScroll - startScroll)
      const clamped = Math.min(1, Math.max(0, rawProgress))
      targetProgressRef.current = clamped
    }

    const animate = () => {
      // Lerp current progress smoothly to target progress with instant responsive tracking (0.09 factor)
      const diff = targetProgressRef.current - progressRef.current
      progressRef.current += diff * 0.09

      const p = progressRef.current

      // Calculate staggered entrance and scroll-driven parting for the 4 hero words
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now()
      const elapsed = now - startTimeRef.current

      const getEasedProgress = (delay) => {
        const raw = Math.min(1, Math.max(0, (elapsed - delay) / 750))
        return 1 - Math.pow(1 - raw, 3)
      }

      const e0 = getEasedProgress(0)   // SHAPED BY (from left)
      const e1 = getEasedProgress(100) // HAND. (from right)
      const e2 = getEasedProgress(200) // FIRED BY (from below)
      const e3 = getEasedProgress(300) // EARTH. (from right)

      const scrollFade = Math.max(0, 1 - p * 2.5)

      // Word 1: SHAPED BY
      const w1X = (1 - e0) * -70 - p * 130
      const w1Y = -p * 40
      const w1Opacity = e0 * scrollFade
      const w1Blur = (1 - e0) * 8

      // Word 2: HAND.
      const w2X = (1 - e1) * 70 + p * 130
      const w2Y = -p * 40
      const w2Opacity = e1 * scrollFade
      const w2Blur = (1 - e1) * 8

      // Word 3: FIRED BY
      const w3X = -p * 130
      const w3Y = (1 - e2) * 70 + p * 40
      const w3Opacity = e2 * scrollFade
      const w3Blur = (1 - e2) * 8

      // Word 4: EARTH.
      const w4X = (1 - e3) * 70 + p * 130
      const w4Y = p * 40
      const w4Opacity = e3 * scrollFade
      const w4Blur = (1 - e3) * 8

      setWordStyles({
        shapedBy: {
          transform: `translate3d(${w1X.toFixed(2)}px, ${w1Y.toFixed(2)}px, 0)`,
          opacity: w1Opacity.toFixed(3),
          filter: w1Blur > 0.1 ? `blur(${w1Blur.toFixed(2)}px)` : 'none',
          willChange: 'transform, opacity, filter',
        },
        hand: {
          transform: `translate3d(${w2X.toFixed(2)}px, ${w2Y.toFixed(2)}px, 0)`,
          opacity: w2Opacity.toFixed(3),
          filter: w2Blur > 0.1 ? `blur(${w2Blur.toFixed(2)}px)` : 'none',
          willChange: 'transform, opacity, filter',
        },
        firedBy: {
          transform: `translate3d(${w3X.toFixed(2)}px, ${w3Y.toFixed(2)}px, 0)`,
          opacity: w3Opacity.toFixed(3),
          filter: w3Blur > 0.1 ? `blur(${w3Blur.toFixed(2)}px)` : 'none',
          willChange: 'transform, opacity, filter',
        },
        earth: {
          transform: `translate3d(${w4X.toFixed(2)}px, ${w4Y.toFixed(2)}px, 0)`,
          opacity: w4Opacity.toFixed(3),
          filter: w4Blur > 0.1 ? `blur(${w4Blur.toFixed(2)}px)` : 'none',
          willChange: 'transform, opacity, filter',
        },
      })

      // Multi-stage 3D Brick Movement & Content Swap
      if (
        heroBrickSpotRef.current &&
        materialLeftSpotRef.current &&
        materialRightSpotRef.current &&
        stageWrapperRef.current
      ) {
        const wrapperRect = stageWrapperRef.current.getBoundingClientRect()
        const heroSpot = heroBrickSpotRef.current.getBoundingClientRect()
        const leftSpot = materialLeftSpotRef.current.getBoundingClientRect()
        const rightSpot = materialRightSpotRef.current.getBoundingClientRect()

        const hX = heroSpot.left - wrapperRect.left
        const hY = heroSpot.top - wrapperRect.top
        const hW = heroSpot.width

        const lX = leftSpot.left - wrapperRect.left
        const lY = leftSpot.top - wrapperRect.top
        const lW = leftSpot.width

        const rX = rightSpot.left - wrapperRect.left
        const rY = rightSpot.top - wrapperRect.top
        const rW = rightSpot.width

        // Multi-stage 3D Brick Movement & Content Swap
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

        let currentX, currentY, currentW

        if (isMobile) {
          // ON MOBILE: Brick moves from Hero center -> Section 2 Left spot only and stops on left.
          // No content swapping occurs (Phase A remains fixed & visible).
          const p1 = Math.min(1, Math.max(0, p / 0.45))
          currentX = hX + (lX - hX) * p1
          currentY = hY + (lY - hY) * p1
          currentW = hW + (lW - hW) * p1

          setBrickStyle({
            top: currentY,
            left: currentX,
            width: currentW,
            opacity: 1,
          })

          setContentSwapStyles({
            phaseA: {
              opacity: 1,
              transform: 'translate3d(0, 0, 0)',
              filter: 'none',
              willChange: 'transform, opacity',
            },
            phaseB: {
              opacity: 0,
              transform: 'translate3d(-40px, 0, 0)',
              filter: 'none',
              willChange: 'transform, opacity',
            },
          })
        } else {
          // ON DESKTOP: Full multi-stage Hero -> Left -> Right movement with content swap
          let p2 = 0
          if (p <= 0.45) {
            const p1 = Math.min(1, Math.max(0, p / 0.45))
            currentX = hX + (lX - hX) * p1
            currentY = hY + (lY - hY) * p1
            currentW = hW + (lW - hW) * p1
            p2 = 0
          } else {
            p2 = Math.min(1, Math.max(0, (p - 0.45) / 0.55))
            currentX = lX + (rX - lX) * p2
            currentY = lY + (rY - lY) * p2
            currentW = lW + (rW - lW) * p2
          }

          setBrickStyle({
            top: currentY,
            left: currentX,
            width: currentW,
            opacity: 1,
          })

          // Content Swap Styles Calculation based on p2
          const pAOpacity = Math.max(0, 1 - p2 * 1.8)
          const pATransformX = p2 * 30

          const pBOpacity = Math.min(1, Math.max(0, (p2 - 0.15) * 1.8))
          const pBTransformX = (1 - Math.min(1, p2 * 1.3)) * -30

          setContentSwapStyles({
            phaseA: {
              opacity: pAOpacity.toFixed(3),
              transform: `translate3d(${pATransformX.toFixed(2)}px, 0, 0)`,
              filter: 'none',
              willChange: 'transform, opacity',
            },
            phaseB: {
              opacity: pBOpacity.toFixed(3),
              transform: `translate3d(${pBTransformX.toFixed(2)}px, 0, 0)`,
              filter: 'none',
              willChange: 'transform, opacity',
            },
          })
        }
      }

      animFrameIdRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', updateTargetProgress, { passive: true })
    window.addEventListener('resize', updateTargetProgress, { passive: true })
    updateTargetProgress()
    animate()

    return () => {
      window.removeEventListener('scroll', updateTargetProgress)
      window.removeEventListener('resize', updateTargetProgress)
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)
    }
  }, [])

  return (
    <div
      ref={stageWrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-transparent text-[#1C1815] select-none"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;800;900&family=Playfair+Display:ital,wght@0,600;1,400&family=Inter:wght@400;500;600&display=swap');
        
        .font-display { font-family: 'Archivo', ui-sans-serif, system-ui; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui; }

        .hero-ember-glow {
          background: radial-gradient(circle, rgba(193, 80, 46, 0.38) 0%, rgba(138, 47, 23, 0.18) 45%, transparent 70%);
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .animate-float-gentle {
          animation: float-gentle 5s ease-in-out infinite;
        }
      `}</style>

      {/* SECTION 1: HERO STAGE */}
      <section className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 px-6 md:px-14">

        {/* HERO STAGE CENTER CONTAINER */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center items-center my-2 py-2">

          {/* TOP LEFT CATEGORY SPEC TAG */}
          <div className="absolute top-2 left-0 hidden md:flex flex-col text-[11px] font-mono tracking-widest text-[#7A6F63] uppercase">
            <span>HANDMADE CLAY</span>
            <span className="font-bold text-[#1C1815]">ADDANKI BRICK</span>
          </div>

          {/* COMPOSITION STAGE: FRAMING TEXT (LEFT / RIGHT) + CENTERED HERO BRICK PLACEHOLDER */}
          <div className="relative w-full grid grid-cols-12 items-center justify-between text-center my-2 max-w-6xl mx-auto">

            {/* LEFT TYPOGRAPHY COLUMN (SHAPED BY / FIRED BY) */}
            <div className="col-span-12 md:col-span-4 text-center md:text-right z-10 select-none flex flex-col items-center md:items-end">
              <div className="overflow-hidden block md:inline-block py-1 mb-1 md:mb-4">
                <h1
                  style={wordStyles.shapedBy}
                  className="font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#1C1815] uppercase leading-none block"
                >
                  SHAPED BY
                </h1>
              </div>
              <div className="overflow-hidden block md:inline-block py-1">
                <h2
                  style={wordStyles.firedBy}
                  className="font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#8E2417] uppercase leading-none block"
                >
                  FIRED BY
                </h2>
              </div>
            </div>

            {/* CENTER HERO BRICK TARGET PLACEHOLDER */}
            <div className="col-span-12 md:col-span-4 relative flex items-center justify-center my-4 md:my-0 z-20">
              {/* Ember Glow Circle behind Brick */}
              <div className="absolute w-[240px] h-[240px] sm:w-[370px] sm:h-[370px] rounded-full blur-3xl hero-ember-glow -z-10" />

              {/* Invisible Target Placeholder Box for Hero Center */}
              <div
                ref={heroBrickSpotRef}
                className="w-[160px] sm:w-[226px] md:w-[266px] lg:w-[286px] aspect-[1/2] pointer-events-none"
              />
            </div>

            {/* RIGHT TYPOGRAPHY COLUMN (HAND. / EARTH.) */}
            <div className="col-span-12 md:col-span-4 text-center md:text-left z-10 select-none flex flex-col items-center md:items-start">
              <div className="overflow-hidden block md:inline-block py-1 mb-1 md:mb-4">
                <h1
                  style={wordStyles.hand}
                  className="font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#1C1815] uppercase leading-none block"
                >
                  HAND.
                </h1>
              </div>
              <div className="overflow-hidden block md:inline-block py-1">
                <h2
                  style={wordStyles.earth}
                  className="font-display font-black text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#8E2417] uppercase leading-none block"
                >
                  EARTH.
                </h2>
              </div>
            </div>
          </div>

          {/* MIDDLE DESCRIPTION TEXT & CTA */}
          <div className="relative z-30 max-w-xl mx-auto mt-6 text-center">
            <p className="text-sm md:text-base text-[#5C5247] leading-relaxed font-sans">
              Every block is pressed from Addanki clay and marked before it ever sees the kiln — a small maker’s heart, left in by hand, so no two bricks are quite the same.
            </p>

            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('material')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-[#8E2417] text-white hover:bg-[#a34725] font-semibold text-xs uppercase tracking-wider rounded-full px-7 py-3 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                See the range →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MULTI-PHASE ARCHITECTURAL INTEGRITY (BRICK MOVES LEFT -> RIGHT, CONTENT SWAPS RIGHT -> LEFT) */}
      <section
        id="material"
        ref={materialSectionRef}
        className="relative w-full min-h-[70vh] md:min-h-[140vh] py-20 md:py-28 px-6 md:px-14 border-t border-b border-[#D9C6AC]/50 scroll-mt-20 flex flex-col justify-start"
      >
        {/* Sticky Pinned Container for Section 2 Multi-Phase Animation */}
        <div className="sticky top-28 z-10 w-full max-w-7xl mx-auto py-4">
          <div className="relative w-full grid grid-cols-12 items-center gap-6 md:gap-10 min-h-[380px]">

            {/* LEFT AREA: Brick Left Spot (3 cols) */}
            <div className="col-span-12 md:col-span-3 relative flex items-center justify-center md:justify-start min-h-[340px]">
              {/* Target Placeholder Box for Section 2 LEFT Spot */}
              <div
                ref={materialLeftSpotRef}
                className="w-[164px] sm:w-[214px] md:w-[240px] lg:w-[260px] aspect-[1/2] pointer-events-none"
              />
            </div>

            {/* RIGHT AREA: Phase A Content (9 cols) OR Brick Right Spot (3 cols) */}
            <div className="col-span-12 md:col-span-9 relative flex items-center justify-end min-h-[340px]">
              
              {/* Phase A Content (Clean Typography on Right 9 cols when Brick is on Left) */}
              <div
                style={{
                  opacity: contentSwapStyles.phaseA.opacity,
                  transform: contentSwapStyles.phaseA.transform,
                  filter: contentSwapStyles.phaseA.filter,
                  pointerEvents: contentSwapStyles.phaseA.opacity > 0.4 ? 'auto' : 'none',
                }}
                className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-left pl-0 md:pl-6"
              >
                {/* 01 / MATERIAL */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8E2417] block">
                    01 / Material
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-[#221D19] leading-tight">
                    Architectural Density
                  </h2>
                  <p className="text-[14.5px] leading-relaxed text-[#5A4F44] font-sans">
                    Our local clay deposit mixtures in Addanki are refined for high dry density, providing load-bearing capacity that stands the test of generations.
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-[#7A6F63] font-sans">
                    Locally sourced Addanki silt clay is carefully refined and fired to create dense, durable facing bricks built for lasting structural strength.
                  </p>
                  <div className="pt-2 text-xs font-mono text-[#8E2417] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8E2417]" />
                    <span>Compressive Strength: 35.4 N/mm²</span>
                  </div>
                </div>

                {/* 02 / FIRING */}
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8E2417] block">
                    02 / Firing
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-[#221D19] leading-tight">
                    Kiln Hardened
                  </h2>
                  <p className="text-[14.5px] leading-relaxed text-[#5A4F44] font-sans">
                    Baked in automated computer-controlled tunnel kilns at 1,080°C for perfect structural vitrification, giving each brick an impermeable, rugged face finish.
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-[#7A6F63] font-sans">
                    Crafted from carefully selected local clay and fired at controlled temperatures, each brick delivers weather resistance and zero efflorescence.
                  </p>
                  <div className="pt-2 text-xs font-mono text-[#8E2417] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8E2417]" />
                    <span>Water Absorption: 5.8% (Immersion)</span>
                  </div>
                </div>
              </div>

              {/* Target Placeholder Box for Section 2 RIGHT Spot */}
              <div
                ref={materialRightSpotRef}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[164px] sm:w-[214px] md:w-[240px] lg:w-[260px] aspect-[1/2] pointer-events-none"
              />
            </div>

            {/* ABSOLUTE OVERLAY FOR PHASE B CONTENT (Clean Typography on Left 9 Cols when Brick is on Right) */}
            <div
              style={{
                opacity: contentSwapStyles.phaseB.opacity,
                transform: contentSwapStyles.phaseB.transform,
                filter: contentSwapStyles.phaseB.filter,
                pointerEvents: contentSwapStyles.phaseB.opacity > 0.4 ? 'auto' : 'none',
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full md:w-[73%] grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-left z-20 pointer-events-none"
            >
              {/* 03 / CRAFT & FINISH */}
              <div className="space-y-3 pointer-events-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8E2417] block">
                  03 / Craft & Finish
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#221D19] leading-tight">
                  Hand-Embossed Character
                </h2>
                <p className="text-[14.5px] leading-relaxed text-[#5A4F44] font-sans">
                  Every brick is individually marked by hand before kiln vitrification, leaving our authentic fish motif emblem into rich Addanki riverbed clay.
                </p>
                <p className="text-[13.5px] leading-relaxed text-[#7A6F63] font-sans">
                  Hand-pressed mold texturing ensures no two bricks carry identical surface grain or color variation, giving every facade authentic warmth.
                </p>
                <div className="pt-2 text-xs font-mono text-[#8E2417] font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E2417]" />
                  <span>Efflorescence: NIL / Zero Salts</span>
                </div>
              </div>

              {/* 04 / STRUCTURAL LEGACY */}
              <div className="space-y-3 pointer-events-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8E2417] block">
                  04 / Structural Legacy
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[#221D19] leading-tight">
                  Built for Generations
                </h2>
                <p className="text-[14.5px] leading-relaxed text-[#5A4F44] font-sans">
                  High dry density and zero salt efflorescence provide massive load-bearing strength that protects architectural structures for centuries.
                </p>
                <p className="text-[13.5px] leading-relaxed text-[#7A6F63] font-sans">
                  Precision vitrification creates a dense, non-porous ceramic body that shields exterior building facades against rain, heat, and frost erosion.
                </p>
                <div className="pt-2 text-xs font-mono text-[#8E2417] font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8E2417]" />
                  <span>Thermal Mass (k): 0.72 W/m·K</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SINGLE CONTINUOUS PHYSICAL MOVING BRICK ELEMENT */}
      <div
        style={{
          position: 'absolute',
          top: `${brickStyle.top}px`,
          left: `${brickStyle.left}px`,
          width: `${brickStyle.width}px`,
          opacity: brickStyle.opacity,
          pointerEvents: 'none',
          zIndex: 40,
          willChange: 'top, left, width',
        }}
        className="flex flex-col items-center justify-center transition-opacity duration-300"
      >
        <div
          className="relative w-full flex flex-col items-center justify-center animate-float-gentle"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(20px)`,
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Standing Vertical Rectangular Brick Asset */}
          <img
            src={brickImg}
            alt="Addanki Hand-Pressed Clay Brick"
            className="w-full h-auto object-contain block select-none drop-shadow-md"
          />

          {/* Contact Shadow Directly Underneath the Bottom Base of the Brick Image */}
          <div
            className="w-[84%] h-3.5 bg-black/70 blur-md rounded-full -mt-4 sm:-mt-5 pointer-events-none transition-transform duration-200"
            style={{
              transform: `translateX(${tilt.shadowX * 0.4}px)`,
            }}
          />
        </div>
      </div>

    </div>
  )
}

