import React, { useRef, useState, useEffect } from 'react'
import img1 from "./assets/1.jpg"
import img2 from "./assets/2.jpg"
import img3 from "./assets/3.jpg"
import img4 from "./assets/4.jpg"
import img5 from "./assets/5.jpg"


const CARDS_DATA = [
  {
    id: '01',
    title: 'Exposed Brick Facade',
    subtitle: 'బాహ్య ఇటుక దిమ్మల ప్రదేశం',
    specs: 'GRADE-A · LOAD-BEARING',
    tags: ['HIGH DENSITY', 'WEATHERPROOF', 'KILN FIRED'],
    description: 'Precision manufactured for exterior load-bearing facades with ultra-low water absorption and high thermal mass.',
    heatDots: 4,
    image: img1,
  },
  {
    id: '02',
    title: 'Architectural Archways',
    subtitle: 'ఆర్చ్ నిర్మాణం',
    specs: 'STRUCTURAL · CUSTOM CUT',
    tags: ['HIGH STRENGTH', 'CUSTOM FORM', 'VITRIFIED'],
    description: 'High compressive strength bricks tailored for vaulted ceilings, load arches, and structural lintels.',
    heatDots: 5,
    image: img2,
  },
  {
    id: '03',
    title: 'Paved Clay Courtyard',
    subtitle: 'నిర్మాణ అంగణం',
    specs: 'SLIP-RESISTANT · PAVER',
    tags: ['HERRINGBONE', 'SOLID CLAY', 'HEAVY DUTY'],
    description: 'Dense, slip-resistant paver bricks designed for high foot-traffic courtyards, walkways, and patios.',
    heatDots: 3,
    image: img3,
  },
  {
    id: '04',
    title: 'Refractory Fireplace',
    subtitle: 'ఉష్ణ నిరోధక పొయ్యి',
    specs: '1200°C · THERMAL SHOCK',
    tags: ['HEAT PROOF', 'FIRE CLAY', 'LOW DUST'],
    description: 'High-temperature refractory clay bricks crafted for wood-fired ovens, fireplaces, and thermal hearths.',
    heatDots: 5,
    image: img4,
  },
]

export default function HorizontalCardsSection() {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Track scroll position to update active card counter
  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const totalCards = CARDS_DATA.length
    const progress = scrollLeft / (scrollWidth - clientWidth)
    const index = Math.min(
      totalCards,
      Math.max(1, Math.round(progress * (totalCards - 1)) + 1)
    )
    setActiveIndex(index)
  }

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const scrollAmount = direction === 'left' ? -380 : 380
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  // Mouse Drag handlers
  const handleMouseDown = (e) => {
    setIsMouseDown(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = (e) => {
    if (!isMouseDown) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <section className="relative w-full bg-[#8E2417] text-white py-24 px-6 md:px-14 overflow-hidden border-t border-b border-red-950/40">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* HEADER ROW */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          {/* BADGE */}
          <div className="inline-flex items-center gap-2.5 border border-white/30 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 mb-4 bg-white/5 backdrop-blur-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#8E2417] font-extrabold text-[10px]">
              06
            </span>
            <span>APPLICATIONS · నిర్మాణ ఉదాహరణలు</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">FIVE SPECS, ONE BRICK</span>
          </div>

          {/* MAIN BIG TITLE */}
          <h2 className="font-display font-black text-5xl md:text-7xl tracking-tight text-white uppercase leading-none">
            BUILD <span className="font-light italic font-serif text-white/80 text-4xl md:text-6xl tracking-normal">WITH IT.</span>
          </h2>
        </div>

        {/* RIGHT SCROLL CONTROL & INDEX COUNTER */}
        <div className="flex items-center gap-6 self-start md:self-end">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/80">
            <span>0{activeIndex}</span>
            <div className="w-24 h-[2px] bg-white/20 relative overflow-hidden rounded-full">
              <div
                className="h-full bg-white transition-all duration-300 rounded-full"
                style={{
                  width: `${(activeIndex / CARDS_DATA.length) * 100}%`,
                }}
              />
            </div>
            <span>0{CARDS_DATA.length}</span>
          </div>

          {/* ARROW BUTTONS */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 transition-all text-white active:scale-95"
              aria-label="Scroll left"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 transition-all text-white active:scale-95"
              aria-label="Scroll right"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* HORIZONTAL TAUGHT WIRE STRING */}
      <div className="relative w-full max-w-7xl mx-auto mb-[-26px] z-20 pointer-events-none">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#4A1009] to-transparent shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
      </div>

      {/* HORIZONTAL CARDS TRACK CONTAINER */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        className={`hide-scrollbar flex items-start gap-8 overflow-x-auto pt-6 pb-12 cursor-${
          isMouseDown ? 'grabbing' : 'grab'
        } select-none active:cursor-grabbing max-w-7xl mx-auto px-2`}
      >
        {CARDS_DATA.map((card) => (
          <div
            key={card.id}
            className="group relative w-[310px] sm:w-[350px] md:w-[380px] shrink-0 bg-[#F7F4EE] text-[#221D19] rounded-sm p-4 pt-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
          >
            {/* WOODEN CLOTHESPIN / PEG GRAPHIC AT TOP */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
              <div className="w-3.5 h-7 bg-gradient-to-b from-[#C89B67] via-[#B2824C] to-[#8C6230] rounded-sm shadow-md border border-[#6E4B21] flex flex-col justify-between items-center py-1">
                <div className="w-2.5 h-[1.5px] bg-[#4A3215]" />
                <div className="w-2.5 h-[2px] bg-[#33210C] rounded-full shadow-inner" />
                <div className="w-2.5 h-[1.5px] bg-[#4A3215]" />
              </div>
            </div>

            {/* CARD IMAGE CONTAINER */}
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-stone-200 mb-4 border border-stone-300">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                draggable={false}
              />
              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                {card.id}
              </div>
            </div>

            {/* CARD HEADER INFO */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-[#8A7D6D] border-b border-stone-300/80 pb-2 mb-3">
              <span>{card.specs}</span>
              <span className="font-sans font-medium text-stone-500">{card.subtitle}</span>
            </div>

            {/* CARD TITLE & TAGS */}
            <h3 className="font-display font-bold text-xl tracking-tight text-[#221D19] mb-2">
              {card.title}
            </h3>

            {/* TAG PILLS */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {card.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="inline-block bg-stone-200/80 text-[#5A4F44] text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* DESCRIPTION */}
            <p className="text-[13px] leading-relaxed text-[#5A4F44] mb-5 font-sans">
              {card.description}
            </p>

            {/* BOTTOM SPEC BAR */}
            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-[#8A7D6D] pt-3 border-t border-stone-300/80">
              <div className="flex items-center gap-1">
                <span>HEAT RESIST</span>
                <div className="flex gap-1 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        i < card.heatDots ? 'bg-[#8E2417]' : 'bg-stone-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="font-bold text-[#8E2417]">KILN · 1200°C</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
