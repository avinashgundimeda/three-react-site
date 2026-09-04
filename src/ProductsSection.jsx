import React, { useState } from 'react'
import brickImg from './assets/brickk.png'

const BRICK_PRODUCTS = [
  {
    id: 'classic-red',
    name: 'Addanki Classic Terracotta',
    teluguName: 'ఎర్ర మట్టి చేతి చెక్కబడిన ఇటుక',
    tagline: 'Hand-Pressed Rustic Facing Brick',
    description: 'Pressed from virgin riverbed clay and baked in tunnel kilns. Features our signature hand-embossed fish motif for authentic architectural character.',
    badge: 'SIGNATURE FACING',
    colorHex: '#8E2417',
    glowColor: 'rgba(142, 36, 23, 0.4)',
    specs: {
      dimensions: '230 × 110 × 75 mm',
      weight: '3.2 kg',
      strength: '28 N/mm²',
      absorption: '< 8%',
      firingTemp: '1120°C',
    },
    filterClass: 'hue-rotate-0 saturate-100',
    pricePerThousand: '₹14,500',
    leadTime: '3-5 Days',
  },
  {
    id: 'golden-ochre',
    name: 'Addanki Golden Ochre',
    teluguName: 'బంగారు వర్ణపు కాల్చిన ఇటుక',
    tagline: 'Silica-Rich Architectural Facade',
    description: 'Formulated with high-silica clay deposits to create a warm, honey-toned matte finish that brightens modern structural facades.',
    badge: 'ARCHITECTURAL LIGHT',
    colorHex: '#8E2417',
    glowColor: 'rgba(142, 36, 23, 0.4)',
    specs: {
      dimensions: '230 × 110 × 75 mm',
      weight: '3.1 kg',
      strength: '32 N/mm²',
      absorption: '< 6%',
      firingTemp: '1180°C',
    },
    filterClass: 'sepia-[0.4] hue-rotate-[15deg] saturate-150 brightness-110',
    pricePerThousand: '₹16,200',
    leadTime: '4-7 Days',
  },
  {
    id: 'kiln-charcoal',
    name: 'Addanki Kiln Charcoal',
    teluguName: 'నల్ల బొగ్గు కాలిన క్లింకర్ ఇటుక',
    tagline: 'Reduced Oxygen Dark Clinker',
    description: 'Fired in oxygen-deprived kiln atmospheres to produce a deep metallic charcoal face with extraordinary density and minimal porosity.',
    badge: 'HIGH STRENGTH CLINKER',
    colorHex: '#3A3330',
    glowColor: 'rgba(90, 80, 70, 0.45)',
    specs: {
      dimensions: '230 × 110 × 75 mm',
      weight: '3.4 kg',
      strength: '38 N/mm²',
      absorption: '< 4%',
      firingTemp: '1240°C',
    },
    filterClass: 'contrast-[1.2] brightness-[0.65] grayscale-[0.5]',
    pricePerThousand: '₹18,000',
    leadTime: '5-8 Days',
  },
]

export default function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <section
      id="products"
      className="relative w-full bg-[#120B09] text-[#F4EFE6] py-24 md:py-32 px-6 md:px-14 border-t border-[#3D1A14] overflow-hidden select-none"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Mandali&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-product-display { font-family: 'Archivo', ui-sans-serif, system-ui; }
        .font-telugu { font-family: 'Mandali', sans-serif; }

        .product-card-bg {
          background: linear-gradient(180deg, rgba(38, 20, 16, 0.8) 0%, rgba(18, 11, 9, 0.98) 100%);
          border: 1px solid rgba(142, 36, 23, 0.25);
        }

        .product-card-bg:hover {
          border-color: rgba(142, 36, 23, 0.8);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85);
        }

        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .animate-card-float {
          animation: card-float 4s ease-in-out infinite;
        }
      `}</style>

      {/* BACKGROUND TEXTURE & AMBIENT GLOW */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#8E2417]/20 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#8E2417]/15 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 pb-8 border-b border-[#3D1A14]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#8E2417] uppercase mb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#8E2417] text-[10px] text-white bg-[#8E2417]">
                06
              </span>
              <span>BRICK PRODUCTS · నిర్మాణ ఉత్పత్తులు</span>
            </div>
            <h2 className="font-product-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#F4EFE6] uppercase leading-tight">
              CURATED BRICK <br />
              <span className="text-[#8E2417]">FORMULATIONS.</span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#B3A090] max-w-md font-sans leading-relaxed">
            Three distinct architectural brick grades crafted from Addanki clay deposits and vitrified in precision computer-controlled kilns.
          </p>
        </div>

        {/* PRODUCTS GRID (3 PRODUCTS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {BRICK_PRODUCTS.map((product) => {
            const isHovered = hoveredId === product.id

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="product-card-bg rounded-xl p-6 sm:p-8 flex flex-col justify-between relative group transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {/* TOP BADGE & CATEGORY */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#B3A090] uppercase mb-4">
                    <span className="bg-[#2D1410] px-2.5 py-1 rounded-md border border-[#8E2417]/40 text-white font-bold">
                      {product.badge}
                    </span>
                    <span className="font-telugu text-[#D6C4B5] font-semibold">{product.teluguName}</span>
                  </div>

                  {/* PRODUCT BRICK ASSET SHOWCASE STAGE */}
                  <div className="relative w-full h-[260px] sm:h-[290px] flex items-center justify-center my-4 overflow-hidden rounded-lg bg-black/40 border border-white/5">
                    {/* Radial Glow */}
                    <div
                      className="absolute w-[200px] h-[200px] rounded-full blur-2xl transition-opacity duration-500"
                      style={{
                        backgroundColor: product.glowColor,
                        opacity: isHovered ? 0.9 : 0.4,
                      }}
                    />

                    {/* Standing Brick Image */}
                    <div className="relative w-[110px] sm:w-[130px] aspect-[1/2] animate-card-float flex items-center justify-center">
                      <img
                        src={brickImg}
                        alt={product.name}
                        className={`w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] transition-all duration-500 ${product.filterClass} ${
                          isHovered ? 'scale-105 rotate-1' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* PRODUCT TITLE & TAGLINE */}
                  <div className="mt-4 mb-3">
                    <h3 className="font-product-display font-bold text-xl sm:text-2xl text-[#F4EFE6] tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs font-mono text-[#8E2417] mt-1 font-semibold">
                      {product.tagline}
                    </p>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-xs text-[#A89B8C] leading-relaxed font-sans mb-6 line-clamp-3">
                    {product.description}
                  </p>

                  {/* KEY SPECS MINI GRID */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#0A0605] p-3 rounded-lg border border-white/5 mb-6 text-[#9E9082]">
                    <div>
                      <span className="block text-[9px] uppercase text-[#7E6A5C]">Strength</span>
                      <span className="font-bold text-[#F4EFE6]">{product.specs.strength}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-[#7E6A5C]">Firing Temp</span>
                      <span className="font-bold text-[#F4EFE6]">{product.specs.firingTemp}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-[#7E6A5C]">Dimensions</span>
                      <span className="font-bold text-[#F4EFE6]">{product.specs.dimensions}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-[#7E6A5C]">Est. Lead Time</span>
                      <span className="font-bold text-[#F4EFE6]">{product.leadTime}</span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM PRICE & ACTION CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[#3D1A14]">
                  <div>
                    <span className="block text-[9px] font-mono text-[#7E7062] uppercase tracking-wider">Starting At</span>
                    <span className="font-product-display font-extrabold text-lg text-[#F4EFE6]">
                      {product.pricePerThousand} <span className="text-[10px] text-[#8C7D6F] font-normal">/1000 units</span>
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedProduct(product)
                    }}
                    className="bg-[#8E2417] hover:bg-[#6D1B11] text-white text-xs font-mono font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-1.5"
                  >
                    <span>View Specs</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* BOTTOM ORDER SAMPLE BANNER */}
        <div className="mt-16 bg-gradient-to-r from-[#241310] via-[#3D1A14] to-[#241310] rounded-2xl p-8 md:p-10 border border-[#8E2417]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8E2417] font-bold">
              ARCHITECT & BUILDER SAMPLE KIT
            </span>
            <h3 className="font-product-display font-black text-2xl sm:text-3xl text-white mt-1">
              Need physical brick samples on your project site?
            </h3>
            <p className="text-xs sm:text-sm text-[#A89B8C] mt-2 max-w-xl">
              We ship a direct hand-curated brick sample box with structural laboratory test reports to your firm within 48 hours.
            </p>
          </div>

          <button className="bg-[#8E2417] text-white hover:bg-black text-xs font-mono font-bold uppercase tracking-widest px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 shrink-0 border border-white/20">
            Request Sample Box →
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DETAILED SPECIFICATIONS MODAL                                */}
      {/* ============================================================ */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-all duration-300 select-none animate-fadeIn"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#1A0F0D] text-[#F4EFE6] rounded-2xl p-6 sm:p-8 border border-[#8E2417]/50 shadow-2xl overflow-hidden animate-scaleUp"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-white/60 hover:text-white font-mono text-sm bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#8E2417] text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">
                {selectedProduct.badge}
              </span>
              <span className="text-xs font-telugu text-white/70 font-semibold">{selectedProduct.teluguName}</span>
            </div>

            <h3 className="font-product-display font-black text-2xl sm:text-3xl text-white">
              {selectedProduct.name}
            </h3>
            <p className="text-xs font-mono text-[#8E2417] mt-1 font-semibold">
              {selectedProduct.tagline}
            </p>

            <p className="text-xs sm:text-sm text-[#A89B8C] mt-4 leading-relaxed font-sans">
              {selectedProduct.description}
            </p>

            {/* DETAILED SPECIFICATIONS TABLE */}
            <div className="mt-6 border border-white/10 rounded-xl overflow-hidden bg-[#0F0807]">
              <div className="bg-[#2D1410] px-4 py-2.5 border-b border-white/10 text-xs font-mono font-bold text-white uppercase tracking-wider">
                Full Technical Specifications
              </div>

              <div className="divide-y divide-white/5 text-xs font-mono">
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-[#8C7D6F]">Dimensions (L × W × H)</span>
                  <span className="font-bold text-white">{selectedProduct.specs.dimensions}</span>
                </div>
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-[#8C7D6F]">Average Weight / Unit</span>
                  <span className="font-bold text-white">{selectedProduct.specs.weight}</span>
                </div>
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-[#8C7D6F]">Compressive Strength</span>
                  <span className="font-bold text-[#8E2417]">{selectedProduct.specs.strength}</span>
                </div>
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-[#8C7D6F]">Water Absorption Ratio</span>
                  <span className="font-bold text-white">{selectedProduct.specs.absorption}</span>
                </div>
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-[#8C7D6F]">Vitrification Firing Temp</span>
                  <span className="font-bold text-white">{selectedProduct.specs.firingTemp}</span>
                </div>
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-[#8C7D6F]">Factory Yard Price</span>
                  <span className="font-bold text-[#8E2417]">{selectedProduct.pricePerThousand} / 1000 bricks</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-2.5 rounded-lg border border-white/20 text-xs font-mono font-bold uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                Close
              </button>
              <button className="bg-[#8E2417] hover:bg-[#6D1B11] text-white text-xs font-mono font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-lg transition-all">
                Request Quote For This Brick →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
