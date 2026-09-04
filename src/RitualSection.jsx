import React, { useRef, useState, useEffect } from 'react'
import brickImg from './assets/brickk.png'

export default function RitualSection() {
  const containerRef = useRef(null)
  const brickRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0 })

  // Intersection Observer for scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.25 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Subtle Mouse Parallax Tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setTilt({
      x: -y * 8,
      y: x * 10,
      shadowX: -x * 12,
      shadowY: -y * 8,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, shadowX: 0, shadowY: 0 })
  }

  return (
    <section
      id="ritual"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-[#8E2417] text-white overflow-hidden flex flex-col justify-between py-16 md:py-24 px-6 md:px-16 select-none border-t border-red-950/40 z-10"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        .font-anatomy-display { font-family: 'Archivo', ui-sans-serif, system-ui; }
        .font-mono-sub { font-family: 'JetBrains Mono', monospace; }

        /* Animated Line Stroke Drawing */
        .callout-line {
          stroke-dasharray: 350;
          stroke-dashoffset: 350;
          transition: stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .line-active .callout-line-1 {
          stroke-dashoffset: 0;
          transition-delay: 0.3s;
        }
        .line-active .callout-line-2 {
          stroke-dashoffset: 0;
          transition-delay: 0.6s;
        }
        .line-active .callout-line-3 {
          stroke-dashoffset: 0;
          transition-delay: 0.9s;
        }

        /* Anchor Dot Scale Fade */
        .anchor-dot {
          transform: scale(0);
          transition: transform 0.4s ease-out;
        }

        .line-active .anchor-dot-1 {
          transform: scale(1);
          transition-delay: 0.2s;
        }
        .line-active .anchor-dot-2 {
          transform: scale(1);
          transition-delay: 0.5s;
        }
        .line-active .anchor-dot-3 {
          transform: scale(1);
          transition-delay: 0.8s;
        }

        /* Text Block Fade In */
        .callout-text {
          opacity: 0;
          transform: translateX(16px);
          transition: opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .line-active .callout-text-1 {
          opacity: 1;
          transform: translateX(0);
          transition-delay: 0.45s;
        }
        .line-active .callout-text-2 {
          opacity: 1;
          transform: translateX(0);
          transition-delay: 0.75s;
        }
        .line-active .callout-text-3 {
          opacity: 1;
          transform: translateX(0);
          transition-delay: 1.05s;
        }
      `}</style>

      {/* TOP HEADER ROW: EYEBROW & RIGHT STEP INDICATOR */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* SMALL EYEBROW */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white/80" />
          <span className="text-xs font-mono-sub font-medium tracking-[0.2em] text-white/90 uppercase">
            01 / MATERIAL STUDY
          </span>
        </div>

        {/* RIGHT STEP INDICATOR */}
        <div className="hidden lg:flex flex-col items-center gap-2 text-[10px] font-mono-sub text-white/60">
          <span>05</span>
          <div className="w-[1.5px] h-10 bg-white/20 relative">
            <div className="w-full h-1/2 bg-white/80" />
          </div>
          <span>09</span>
        </div>
      </div>

      {/* MAIN CONTENT STAGE: LEFT HEADING + CENTER BRICK + RIGHT CALLOUTS */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8 my-8">

        {/* LEFT COLUMN: EDITORIAL HEADING */}
        <div className="lg:col-span-4 text-left self-center z-20">
          <h2 className="font-anatomy-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-white uppercase mb-4">
            THE DETAILS
            <br />
            <span className="font-light text-white/80 italic font-serif">MATTER.</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed max-w-xs">
            Every block is shaped by hand, fired with natural draft, and inspected for lasting architectural integrity.
          </p>
        </div>

        {/* RIGHT 8 COLUMNS: CENTER BRICK SPECIMEN & RIGHT CALLOUT ANATOMY STAGE */}
        <div
          ref={brickRef}
          className={`lg:col-span-8 relative w-full min-h-[480px] sm:min-h-[540px] flex items-center justify-between gap-6 ${isVisible ? 'line-active' : ''
            }`}
        >
          {/* CENTER BRICK SPECIMEN STAGE */}
          <div className="relative flex-1 flex items-center justify-center max-w-xs md:max-w-sm">
            {/* Front-Facing Vertical Specimen Brick */}
            <div
              className="relative w-[180px] sm:w-[220px] md:w-[240px] aspect-[1/2] flex items-center justify-center transition-transform duration-300 ease-out z-20"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              <img
                src={brickImg}
                alt="Addanki Hand-Pressed Clay Brick Anatomy"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)]"
                draggable={false}
              />

              {/* Subtle Realistic Shadow */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/60 blur-xl rounded-full -z-10 transition-transform duration-200"
                style={{
                  transform: `translateX(calc(-50% + ${tilt.shadowX}px)) translateY(${tilt.shadowY * 0.3}px)`,
                }}
              />
            </div>
          </div>

          {/* SVG ANNOTATION LINES (DRAWN FROM BRICK DOTS TO RIGHT CALLOUTS) */}
          <div className="absolute inset-0 pointer-events-none z-30 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 700 540" fill="none">
              {/* 01 TOP ANCHOR & LINE */}
              <circle
                cx="290"
                cy="110"
                r="3.5"
                className="fill-white anchor-dot anchor-dot-1 transition-transform"
              />
              <path
                d="M 290 110 L 440 110"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1"
                className="callout-line callout-line-1"
              />

              {/* 02 MIDDLE ANCHOR & LINE */}
              <circle
                cx="290"
                cy="270"
                r="3.5"
                className="fill-white anchor-dot anchor-dot-2 transition-transform"
              />
              <path
                d="M 290 270 L 440 270"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1"
                className="callout-line callout-line-2"
              />

              {/* 03 BOTTOM ANCHOR & LINE */}
              <circle
                cx="290"
                cy="430"
                r="3.5"
                className="fill-white anchor-dot anchor-dot-3 transition-transform"
              />
              <path
                d="M 290 430 L 440 430"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1"
                className="callout-line callout-line-3"
              />
            </svg>
          </div>

          {/* RIGHT SIDE THREE PRODUCT ANATOMY CALLOUTS (POSITIONED CLEARLY TO THE RIGHT) */}
          <div className="w-full md:w-[280px] lg:w-[320px] flex flex-col justify-between h-full gap-8 sm:gap-12 z-40 text-left shrink-0">

            {/* TOP CALLOUT: 01 / SURFACE */}
            <div className="callout-text callout-text-1">
              <span className="text-[10px] font-mono-sub font-semibold tracking-widest text-white/70 uppercase block mb-1">
                01 / SURFACE
              </span>
              <h3 className="font-anatomy-display font-bold text-base sm:text-lg text-white leading-tight">
                Hand-finished texture
              </h3>
              <p className="text-xs text-white/70 font-sans leading-relaxed mt-1">
                Natural clay grain and subtle imperfections give every brick its individual character.
              </p>
            </div>

            {/* MIDDLE CALLOUT: 02 / MATERIAL */}
            <div className="callout-text callout-text-2">
              <span className="text-[10px] font-mono-sub font-semibold tracking-widest text-white/70 uppercase block mb-1">
                02 / MATERIAL
              </span>
              <h3 className="font-anatomy-display font-bold text-base sm:text-lg text-white leading-tight">
                Fired clay body
              </h3>
              <p className="text-xs text-white/70 font-sans leading-relaxed mt-1">
                Carefully shaped clay, fired for a dense and enduring architectural material.
              </p>
            </div>

            {/* BOTTOM CALLOUT: 03 / FORM */}
            <div className="callout-text callout-text-3">
              <span className="text-[10px] font-mono-sub font-semibold tracking-widest text-white/70 uppercase block mb-1">
                03 / FORM
              </span>
              <h3 className="font-anatomy-display font-bold text-base sm:text-lg text-white leading-tight">
                Built to last
              </h3>
              <p className="text-xs text-white/70 font-sans leading-relaxed mt-1">
                A strong, timeless form designed for walls, facades and lasting spaces.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM MICRO TEXT */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between text-[10px] font-mono-sub tracking-[0.2em] text-white/50 pt-4 border-t border-white/10">
        <span>CRAFTED FROM EARTH · FIRED WITH INTENT</span>
        <span className="hidden sm:inline">ADDANKI CLAY SPECIMEN NO. 01</span>
      </div>
    </section>
  )
}
