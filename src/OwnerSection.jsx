import React from 'react'
import founderImg from './assets/founder.jpg'
import { Award, ShieldCheck, Flame, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'

export default function OwnerSection() {
  const scrollToQuote = () => {
    const el = document.getElementById('quote')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="owner" className="relative w-full min-h-[70vh] flex items-center py-20 md:py-28 px-6 sm:px-10 md:px-16 overflow-hidden bg-transparent border-t border-[#D9C6AC]/50 scroll-mt-20 font-sans select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Playfair+Display:ital,wght@0,600;1,400&family=Mandali&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-owner-display { font-family: 'Archivo', ui-sans-serif, system-ui; }
        .font-owner-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-telugu { font-family: 'Mandali', sans-serif; }
        .font-mono-sub { font-family: 'JetBrains Mono', monospace; }

        .owner-glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(244, 239, 230, 0.85) 100%);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(217, 198, 172, 0.8);
          box-shadow: 0 20px 50px -10px rgba(34, 29, 25, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .ember-badge-glow {
          box-shadow: 0 10px 30px -5px rgba(142, 36, 23, 0.35);
        }
      `}</style>

      {/* Ambient Glow background highlights */}
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-[#8E2417]/10 blur-3xl -z-10" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#C1502E]/10 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl w-full">
        
        {/* SECTION HEADER TAG */}
        <div className="mb-10 text-left">
          <span className="inline-flex items-center gap-2 text-xs font-mono-sub font-bold uppercase tracking-widest text-[#8E2417] mb-2 px-3 py-1 rounded-full bg-[#8E2417]/10 border border-[#8E2417]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#8E2417]" />
            <span>HERITAGE & CRAFTSMANSHIP</span>
          </span>
          <h2 className="font-owner-display font-black text-3xl sm:text-4xl md:text-5xl text-[#1C1815] tracking-tight mt-1 leading-tight">
            Meet the Master Kiln Craftsman.
          </h2>
          <span className="text-xs sm:text-sm font-telugu text-[#8E2417] font-bold tracking-wider block mt-1">
            కురపాటి శ్రీను - అద్దంకి ఇటుకల వ్యవస్థాపకుడు & నిర్వహణాధికారి
          </span>
        </div>

        {/* MAIN OWNER CARD GRID */}
        <div className="owner-glass-card rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: FOUNDER PORTRAIT IMAGE WITH EMBEDDED SEAL & BADGE */}
            <div className="lg:col-span-5 relative">
              {/* Outer decorative glowing border */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/60 group">
                <img
                  src={founderImg}
                  alt="Kurapati Srinu - Founder of Kurapati Bricks"
                  className="w-full h-[400px] sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                {/* BOTTOM FOUNDER NAME BADGE OVERLAY */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#1C1815]/80 backdrop-blur-md border border-white/15 text-left text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-owner-display font-black text-lg text-white leading-tight">
                        Kurapati Srinu
                      </h4>
                      <p className="text-[11px] font-mono-sub text-[#E57A44] font-semibold">
                        Founder & Master Kiln Director
                      </p>
                    </div>
                    <span className="h-8 w-8 rounded-full bg-[#8E2417] text-white flex items-center justify-center font-owner-display font-bold text-xs shadow-md">
                      KS
                    </span>
                  </div>
                </div>
              </div>

              {/* FLOATING MASTER CRAFTSMAN STAMP BADGE */}
              <div className="hidden sm:flex absolute -top-5 -right-5 p-4 rounded-2xl bg-[#8E2417] text-white shadow-xl flex-col items-center justify-center border border-white/20 ember-badge-glow z-20">
                <Award className="w-6 h-6 text-white mb-1" />
                <span className="font-owner-display font-black text-lg leading-none">15+</span>
                <span className="text-[9px] font-mono-sub uppercase tracking-wider text-white/80 font-bold mt-0.5">Years Firing</span>
              </div>
            </div>

            {/* RIGHT COLUMN: FOUNDER'S STORY, PERSONAL QUOTE & QUALITY STATS */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* FOUNDER'S PERSONAL QUOTE IN ELEGANT SERIF */}
              <div className="relative pl-6 border-l-4 border-[#8E2417]">
                <p className="font-owner-serif italic text-lg sm:text-xl md:text-2xl text-[#2C241E] leading-relaxed">
                  “Every brick that leaves our Addanki kiln carries our family name. We don't just supply building blocks — we fire the foundation of architectural legacies built to outlast generations.”
                </p>
                <span className="block mt-3 text-xs font-mono-sub font-bold uppercase tracking-widest text-[#8E2417]">
                  — Kurapati Srinu, Founder
                </span>
              </div>

              {/* BIOGRAPHY & KILN PHILOSOPHY */}
              <p className="text-xs sm:text-sm text-[#5A4F44] font-sans leading-relaxed">
                For more than two decades, Kurapati Srinu has personally supervised the hand-selection of Addanki riverbed silt clay deposits and refined our automated computer-controlled tunnel kilns. Under his leadership, Kurapati Bricks has grown into one of Andhra Pradesh’s most trusted manufacturers of load-bearing facing bricks.
              </p>

              {/* 3 HIGHLIGHT CHECKMARKS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#2C241E]">
                  <CheckCircle2 className="w-4 h-4 text-[#8E2417] shrink-0" />
                  <span>Hand-Selected Addanki Clay Deposits</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#2C241E]">
                  <CheckCircle2 className="w-4 h-4 text-[#8E2417] shrink-0" />
                  <span>1,080°C Computer-Controlled Firing</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#2C241E]">
                  <CheckCircle2 className="w-4 h-4 text-[#8E2417] shrink-0" />
                  <span>Bureau of Indian Standards IS 1077 Certified</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#2C241E]">
                  <CheckCircle2 className="w-4 h-4 text-[#8E2417] shrink-0" />
                  <span>Direct Site Supply • Zero Middlemen</span>
                </div>
              </div>

              {/* STATS TILES ROW */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#D9C6AC]/60">
                <div className="p-3.5 rounded-xl bg-white/60 border border-[#D9C6AC]/50">
                  <span className="font-owner-display font-black text-2xl text-[#8E2417] block">20M+</span>
                  <span className="text-[10px] font-mono-sub uppercase tracking-wider text-[#7A6F63] block mt-0.5">Bricks Fired</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/60 border border-[#D9C6AC]/50">
                  <span className="font-owner-display font-black text-2xl text-[#8E2417] block">35 N/mm²</span>
                  <span className="text-[10px] font-mono-sub uppercase tracking-wider text-[#7A6F63] block mt-0.5">Load Strength</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/60 border border-[#D9C6AC]/50">
                  <span className="font-owner-display font-black text-2xl text-[#8E2417] block">100%</span>
                  <span className="text-[10px] font-mono-sub uppercase tracking-wider text-[#7A6F63] block mt-0.5">Grade-A Quality</span>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-2">
                <button
                  onClick={scrollToQuote}
                  className="inline-flex items-center gap-2.5 bg-[#8E2417] hover:bg-[#731B10] text-white font-mono-sub text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Request Founder's Direct Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
