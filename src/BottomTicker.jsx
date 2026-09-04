import React from 'react'

export default function BottomTicker() {
  const items = [
    'HIGH DENSITY CLAY',
    '•',
    'KILN-FIRED AT 1200°C',
    '•',
    'SMALL BATCH MANUFACTURING',
    '•',
    'GRADE-A STRUCTURAL',
    '•',
    'HIGH LOAD BEARING',
    '•',
    'ZERO EFFLORESCENCE',
    '•',
    'DIRECT TO SITE SUPPLY',
    '•',
    'ARCHITECTURAL PRECISION',
    '•',
    '100% NATURAL CLAY',
    '•',
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 w-full bg-[#8E2417] text-white py-2.5 overflow-hidden shadow-lg border-t border-black/10 select-none">
      <style>{`
        @keyframes ticker-slide {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: ticker-slide 28s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-ticker flex items-center whitespace-nowrap">
        {/* FIRST COPY */}
        <div className="flex items-center gap-6 pr-6 font-display font-bold text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-white/95">
          {items.map((item, index) => (
            <span
              key={`ticker-1-${index}`}
              className={item === '•' ? 'text-white/50 text-[10px]' : ''}
            >
              {item}
            </span>
          ))}
        </div>

        {/* SECOND DUPLICATE COPY FOR SEAMLESS 100% INFINITE LOOP */}
        <div className="flex items-center gap-6 pr-6 font-display font-bold text-[12px] sm:text-[13px] tracking-[0.18em] uppercase text-white/95" aria-hidden="true">
          {items.map((item, index) => (
            <span
              key={`ticker-2-${index}`}
              className={item === '•' ? 'text-white/50 text-[10px]' : ''}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
