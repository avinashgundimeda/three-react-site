import React, { useState, useEffect, useRef } from 'react'
import brickImg from './assets/brickk.png'

export default function BrickHeroAndMaterial({ brickColor = '#ffffff' }) {
  const stageWrapperRef = useRef(null)
  const heroBrickSpotRef = useRef(null)
  const materialBrickSpotRef = useRef(null)
  const materialSectionRef = useRef(null)

  const startTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : Date.now())
  const [tilt, setTilt] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0 })
  const [brickStyle, setBrickStyle] = useState({
    top: 0,
    left: 0,
    width: 266,
    opacity: 0,
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
      // Start animating as soon as scroll begins, complete when Section 2 is centered
      const startScroll = 0
      const endScroll = Math.max(materialTop - window.innerHeight * 0.3, 250)

      const rawProgress = (scrollY - startScroll) / (endScroll - startScroll)
      const clamped = Math.min(1, Math.max(0, rawProgress))
      targetProgressRef.current = clamped
    }

    const animate = () => {
      // Lerp current progress smoothly to target progress
      const diff = targetProgressRef.current - progressRef.current
      progressRef.current += diff * 0.095

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

      const scrollFade = Math.max(0, 1 - p * 2.2)

      // Word 1: SHAPED BY (enters from left -70px, scroll parts left & up)
      const w1X = (1 - e0) * -70 - p * 130
      const w1Y = -p * 40
      const w1Opacity = e0 * scrollFade
      const w1Blur = (1 - e0) * 8

      // Word 2: HAND. (enters from right +70px, scroll parts right & up)
      const w2X = (1 - e1) * 70 + p * 130
      const w2Y = -p * 40
      const w2Opacity = e1 * scrollFade
      const w2Blur = (1 - e1) * 8

      // Word 3: FIRED BY (enters from below +70px Y, scroll parts left & down)
      const w3X = -p * 130
      const w3Y = (1 - e2) * 70 + p * 40
      const w3Opacity = e2 * scrollFade
      const w3Blur = (1 - e2) * 8

      // Word 4: EARTH. (enters from right +70px X, scroll parts right & down)
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

      if (
        heroBrickSpotRef.current &&
        materialBrickSpotRef.current &&
        stageWrapperRef.current
      ) {
        const wrapperRect = stageWrapperRef.current.getBoundingClientRect()
        const heroSpot = heroBrickSpotRef.current.getBoundingClientRect()
        const materialSpot = materialBrickSpotRef.current.getBoundingClientRect()

        const heroX = heroSpot.left - wrapperRect.left
        const heroY = heroSpot.top - wrapperRect.top
        const heroW = heroSpot.width

        const materialX = materialSpot.left - wrapperRect.left
        const materialY = materialSpot.top - wrapperRect.top
        const materialW = materialSpot.width

        // Smooth cubic ease-in-out progress curve for natural physics feeling
        const easedP = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2

        const currentX = heroX + (materialX - heroX) * easedP
        const currentY = heroY + (materialY - heroY) * easedP
        const currentW = heroW + (materialW - heroW) * easedP

        setBrickStyle({
          top: currentY,
          left: currentX,
          width: currentW,
          opacity: 1,
        })
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
      className="relative w-full bg-transparent text-[#1C1815] overflow-hidden select-none"
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

      {/* SECTION 2: ARCHITECTURAL INTEGRITY (BRICK MOVES TO LEFT SIDE, TEXT ON RIGHT SIDE ORDER BY ORDER) */}
      <section
        id="material"
        ref={materialSectionRef}
        className="relative w-full min-h-[50vh] flex items-center py-20 md:py-28 px-8 md:px-14 border-t border-b border-[#D9C6AC]/50 scroll-mt-20"
      >
        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center max-w-7xl mx-auto">

          {/* COLUMN 1 (LEFT SIDE): TARGET PLACEHOLDER FOR SETTLED BRICK */}
          <div className="col-span-12 md:col-span-3 lg:col-span-3 flex items-center justify-center md:justify-start">
            <div className="relative flex items-center justify-center">
              {/* Ambient Ember Glow Circle behind Settled Brick on Left */}
              <div className="absolute w-[220px] h-[220px] rounded-full blur-3xl bg-[#8E2417]/20 -z-10 pointer-events-none" />

              {/* Target Placeholder Box for Section 2 Left Side */}
              <div
                ref={materialBrickSpotRef}
                className="w-[164px] sm:w-[214px] md:w-[254px] lg:w-[274px] aspect-[1/2] pointer-events-none"
              />
            </div>
          </div>

          {/* COLUMN 2 (MIDDLE): 01 / MATERIAL */}
          <div className="col-span-12 md:col-span-4 lg:col-span-4 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E2417]">01 / Material</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#221D19] mt-2">
              Architectural Density
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5A4F44]">
              Our local clay deposit mixtures in Addanki are refined for high dry density, providing load-bearing capacity that stands the test of generations.
              <br />
              Locally sourced Addanki clay is carefully refined and fired to create dense, durable bricks built for lasting structural strength.
            </p>
          </div>

          {/* COLUMN 3 (RIGHT SIDE): 02 / FIRING */}
          <div className="col-span-12 md:col-span-5 lg:col-span-5 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E2417]">02 / Firing</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#221D19] mt-2">
              Kiln Hardened
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5A4F44]">
              Baked in automated computer-controlled tunnel kilns for perfect structural vitrification, giving each brick an impermeable, rugged face finish.
              <br />
              Crafted from carefully selected local clay and fired at controlled temperatures, each brick delivers lasting strength, weather resistance, and a naturally rugged finish.
            </p>
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
          zIndex: 30,
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
