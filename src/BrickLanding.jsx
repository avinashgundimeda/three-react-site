import React from "react"
import ContinuousBackgroundCanvas from "./ContinuousBackgroundCanvas"
import BrickHeroAndMaterial from "./BrickHeroAndMaterial"
import InteractiveBrick from "./InteractiveBrick"
import RitualSection from "./RitualSection"
import ProductsSection from "./ProductsSection"
import CookWithItSection from "./CookWithItSection"
import OwnerSection from "./OwnerSection"
import LocationSection from "./LocationSection"
import QuoteSection from "./QuoteSection"
import Footer from "./Footer"

export default function BrickLanding({ setPage, brickColor = "#ffffff" }) {
  return (
    <div className="relative min-h-screen w-full text-[#221D19] font-sans bg-transparent">
      {/* PERSISTENT CONTINUOUS BACKGROUND CANVAS ACROSS ALL SECTIONS */}
      <ContinuousBackgroundCanvas />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Archivo', ui-sans-serif, system-ui; }
        .font-sans { font-family: 'Inter', ui-sans-serif, system-ui; }
        @keyframes marquee-ltr {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
        .marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .marquee-container {
          display: flex;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          flex-shrink: 0;
          min-width: 100%;
          justify-content: space-around;
          align-items: center;
          gap: 2.5rem;
          animation: marquee-ltr 22s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-content { animation: none; }
        }
      `}</style>

      {/* MAIN HERO & MATERIAL STAGE WITH CONTINUOUS SCROLL-DRIVEN BRICK ANIMATION */}
      <BrickHeroAndMaterial brickColor={brickColor} />

      {/* SECTION 3: DIRECT TO SITE (LOGISTICS SECTION WITH 3D MODEL ASSET ON RIGHT) */}
      <section id="logistics" className="relative w-full min-h-[60vh] flex items-center py-16 md:py-24 px-8 md:px-14 border-t border-[#D9C6AC]/40 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">

          {/* Left Column: Logistics Info */}
          <div className="lg:col-span-7 max-w-2xl text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E2417]">03 / Logistics</span>
            <h2 className="font-display font-black text-[42px] sm:text-[54px] md:text-[64px] leading-tight tracking-tight text-[#221D19] mt-2">
              Direct Supply.
              <br />
              <span className="text-[#8E2417]">No Middlemen.</span>
            </h2>

            <p className="mt-6 text-[16px] leading-relaxed text-[#5A4F44]">
              We ship straight from our firing yard in Addanki directly to your commercial or residential build site, lowering costs and ensuring exact lead times.
            </p>

            <div className="mt-10 flex flex-wrap gap-12">
              <div>
                <span className="font-display font-black text-4xl text-[#8E2417] block">20M+</span>
                <span className="text-xs text-[#8E2417] uppercase tracking-wider mt-1 block">Bricks Delivered</span>
              </div>
              <div>
                <span className="font-display font-black text-4xl text-[#8E2417] block">100%</span>
                <span className="text-xs text-[#8E2417] uppercase tracking-wider mt-1 block">Grade-A Quality</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Model Asset Container with Perfect Position & Sizing */}
          <div className="lg:col-span-5 relative w-full h-[450px] sm:h-[500px] md:h-[550px] flex items-center justify-center overflow-visible">
            {/* Ember Glow Circle behind 3D Model */}
            <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full blur-3xl bg-[#C1502E]/25 -z-10 pointer-events-none" />

            {/* 3D Interactive Model Component */}
            <div className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing">
              <InteractiveBrick
                page="logistics"
                brickColor={brickColor}
                isInteractive={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE RITUAL (IMAGE 3 MATCH WITH BRICK HERO ASSET) */}
      <RitualSection />

      {/* SECTION 5: PREMIUM BRICK PRODUCTS SHOWCASE */}
      <ProductsSection />

      {/* SECTION 6: SCROLL-DRIVEN PHYSICAL PAPER HANGING GALLERY */}
      <CookWithItSection />

      {/* SECTION 7: HERITAGE & MASTER CRAFTSMAN OWNER SECTION */}
      <OwnerSection />

      {/* SECTION 8: LOCATION & FACTORY MAP SECTION */}
      <LocationSection />

      {/* SECTION 9: STANDALONE DIRECT FACTORY QUOTATION & TELEMETRY SECTION */}
      <QuoteSection />

      {/* SECTION 10: ULTRA-PREMIUM ARCHITECTURAL FOOTER */}
      <Footer />
    </div>
  )
}
