import React, { useState, useRef } from 'react'
import brickImg from './assets/brickk.png'

export default function BrickHero({ brickColor = '#ffffff' }) {
  const heroStageRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0 })

  // Smooth 3D Parallax Tilt Effect on Mouse Move
  const handleMouseMove = (e) => {
    if (!heroStageRef.current) return
    const rect = heroStageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setTilt({
      x: -y * 18,
      y: x * 22,
      shadowX: -x * 24,
      shadowY: -y * 16,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, shadowX: 0, shadowY: 0 })
  }

  return (
    <section
      ref={heroStageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-[#F4EFE6] text-[#1C1815] overflow-hidden flex flex-col justify-between pt-24 pb-8 px-6 md:px-14 select-none"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;800;900&family=Playfair+Display:ital,wght@0,600;1,400&family=Inter:wght@400;500;600&display=swap');
        
        .font-display { font-family: 'Archivo', ui-sans-serif, system-ui; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui; }

        /* Kairo-style Ember Glow behind central element */
        .hero-ember-glow {
          background: radial-gradient(circle, rgba(193, 80, 46, 0.38) 0%, rgba(138, 47, 23, 0.18) 45%, transparent 70%);
        }

        /* Gentle Float Animation */
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .animate-float-gentle {
          animation: float-gentle 5s ease-in-out infinite;
        }
      `}</style>

      {/* HERO STAGE CENTER CONTAINER */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center items-center my-2 py-2">

        {/* TOP LEFT CATEGORY SPEC TAG */}
        <div className="absolute top-2 left-0 hidden md:flex flex-col text-[11px] font-mono tracking-widest text-[#7A6F63] uppercase">
          <span>HANDMADE CLAY</span>
          <span className="font-bold text-[#1C1815]">ADDANKI BRICK</span>
        </div>

        {/* COMPOSITION STAGE: FRAMING TEXT (LEFT / RIGHT) + CENTERED HERO BRICK */}
        <div className="relative w-full grid grid-cols-12 items-center justify-between text-center my-2 max-w-6xl mx-auto">

          {/* LEFT TYPOGRAPHY COLUMN */}
          <div className="col-span-12 md:col-span-4 text-center md:text-right z-10 select-none">
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#1C1815] uppercase leading-none mb-1 md:mb-4">
              SHAPED BY
            </h1>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#8E2417] uppercase leading-none">
              FIRED BY
            </h2>
          </div>

          {/* CENTER HERO BRICK STAGE WITH BREATHING ROOM */}
          <div className="col-span-12 md:col-span-4 relative flex items-center justify-center my-6 md:my-0 z-20">
            {/* Ember Glow Circle behind Brick */}
            <div className="absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] rounded-full blur-3xl hero-ember-glow -z-10" />

            {/* STANDING HAND-PRESSED BRICK (SCALED WITH BREATHING ROOM) */}
            <div
              className="relative w-[150px] sm:w-[190px] md:w-[220px] aspect-[1/2] flex items-center justify-center animate-float-gentle"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(20px)`,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Crisp Original Brick Asset */}
              <img
                src={brickImg}
                alt="Addanki Hand-Pressed Clay Brick"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]"
              />

              {/* Soft Ground Contact Shadow Underneath */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-5 bg-black/50 blur-lg rounded-full -z-10 transition-transform duration-200"
                style={{
                  transform: `translateX(calc(-50% + ${tilt.shadowX}px)) translateY(${tilt.shadowY * 0.3}px)`,
                }}
              />
            </div>
          </div>

          {/* RIGHT TYPOGRAPHY COLUMN */}
          <div className="col-span-12 md:col-span-4 text-center md:text-left z-10 select-none">
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#1C1815] uppercase leading-none mb-1 md:mb-4">
              HAND.
            </h1>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#8E2417] uppercase leading-none">
              EARTH.
            </h2>
          </div>
        </div>

        {/* MIDDLE DESCRIPTION TEXT & CTA */}
        <div className="relative z-30 max-w-xl mx-auto mt-6 text-center">
          <p className="text-sm md:text-base text-[#5C5247] leading-relaxed font-sans">
            Every block is pressed from Addanki clay and marked before it ever sees the kiln — a small maker’s heart, left in by hand, so no two bricks are quite the same.
          </p>

          <div className="mt-5 flex items-center justify-center gap-4">
            <button className="bg-[#8E2417] text-white hover:bg-[#a34725] font-semibold text-xs uppercase tracking-wider rounded-full px-7 py-3 shadow-md hover:shadow-lg transition-all duration-300">
              See the range →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
