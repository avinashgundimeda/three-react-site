import React, { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  FileText,
  ArrowUp,
  Award,
  Flame,
  Download,
  X,
  ExternalLink
} from 'lucide-react'

// Custom SVGs for Social Icons
const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const LinkedinIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

export default function Footer() {
  const [showSpecModal, setShowSpecModal] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative w-full bg-[#080403] text-[#F4EFE6] pt-16 pb-12 px-6 sm:px-10 md:px-16 border-t border-[#3D1A14]/70 overflow-hidden select-none font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Mandali&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .font-footer-display { font-family: 'Archivo', ui-sans-serif, system-ui; }
        .font-telugu { font-family: 'Mandali', sans-serif; }
        .font-mono-sub { font-family: 'JetBrains Mono', monospace; }

        .gold-glow-line {
          background: linear-gradient(90deg, transparent, #C1502E, #E57A44, #C1502E, transparent);
        }
      `}</style>

      {/* TOP GLOW DECORATIONS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] gold-glow-line opacity-70 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-[#C1502E]/10 rounded-full blur-[160px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#8E2417]/12 rounded-full blur-[140px] pointer-events-none -z-0" />

      {/* HUGE BACKGROUND ARCHITECTURAL WATERMARK */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[13vw] font-footer-display font-black text-white/[0.018] tracking-tighter uppercase whitespace-nowrap pointer-events-none select-none -z-0 leading-none">
        KURAPATI BRICKS
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* MAIN FOOTER GRID (4 COLUMNS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-16 border-b border-white/10">
          
          {/* COL 1: BRAND IDENTITY & TELUGU HERITAGE (LG: 4 COLS) */}
          <div className="lg:col-span-4 text-left space-y-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#C1502E] text-white font-footer-display font-black text-xl shadow-lg shadow-[#C1502E]/30">
                K
              </span>
              <div>
                <span className="font-footer-display font-black text-2xl sm:text-3xl tracking-tight text-white block leading-none">
                  Kurapati Bricks
                </span>
                <span className="text-xs font-telugu text-[#E57A44] font-bold tracking-wider block mt-1">
                  అద్దంకి ఇటుకల తయారీ కేంద్రం
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A89B8C] font-sans leading-relaxed max-w-sm">
              Hand-pressed architectural clay bricks crafted from rich Addanki riverbed silt and vitrified in high-temperature computer kilns for lasting structural permanence.
            </p>

            {/* BADGES & SOCIAL LINKS */}
            <div className="space-y-3 pt-1">
              <span className="text-[11px] font-mono-sub uppercase tracking-widest text-[#C1502E] font-semibold block">
                Connect With Kiln Yard
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#C1502E] text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 hover:scale-105 shadow-sm"
                  title="WhatsApp Direct Dispatch"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="#products"
                  onClick={() => scrollToSection('material')}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#C1502E] text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 hover:scale-105 shadow-sm"
                  title="Instagram Showcase"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="#logistics"
                  onClick={() => scrollToSection('logistics')}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#C1502E] text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 hover:scale-105 shadow-sm"
                  title="LinkedIn Freight Logistics"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setShowSpecModal(true)}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#C1502E] text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300 hover:scale-105 shadow-sm cursor-pointer"
                  title="Download Tech Data Sheet"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ACCREDITATIONS & CERTIFICATIONS */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] font-mono-sub text-[#A89B8C]/70">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1">
                <Award className="w-3 h-3 text-[#E57A44]" /> BIS IS 1077 Certified
              </span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#E57A44]" /> 1,080°C Eco Kiln
              </span>
            </div>

          </div>

          {/* COL 2: BRICK PRODUCTS CATALOG (LG: 2 COLS) */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h4 className="font-mono-sub text-xs font-bold uppercase tracking-widest text-[#E57A44] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C1502E]" />
              Products
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#A89B8C]">
              <li>
                <button onClick={() => scrollToSection('material')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Classic Terracotta Facing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('material')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Golden Ochre Architectural
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('material')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Kiln Charcoal Clinker
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('material')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Hand-Pressed Facing Bricks
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('material')} className="hover:text-white transition-colors cursor-pointer text-left">
                  High-Temp Refractory Clay
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('material')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Wire-Cut Structural Units
                </button>
              </li>
            </ul>
          </div>

          {/* COL 3: ARCHITECT & CONTRACTOR SERVICES (LG: 3 COLS) */}
          <div className="lg:col-span-3 text-left space-y-4">
            <h4 className="font-mono-sub text-xs font-bold uppercase tracking-widest text-[#E57A44] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C1502E]" />
              Architect Services
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#A89B8C]">
              <li>
                <button onClick={() => scrollToSection('quote')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-left">
                  <span>Request 48h Specimen Box</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#C1502E]/30 text-[#E57A44] font-mono-sub">FAST</span>
                </button>
              </li>
              <li>
                <button onClick={() => setShowSpecModal(true)} className="hover:text-white transition-colors cursor-pointer text-left">
                  Compressive Strength Test Data
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('logistics')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Direct Build Site Logistics
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('recipes')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Exposed Masonry Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => setShowSpecModal(true)} className="hover:text-white transition-colors cursor-pointer text-left">
                  BIM & 3D Texture Maps (.OBJ)
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('quote')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Custom Size Mould Formulation
                </button>
              </li>
            </ul>
          </div>

          {/* COL 4: FACTORY DISPATCH & LOCATION (LG: 3 COLS) */}
          <div className="lg:col-span-3 text-left space-y-4">
            <h4 className="font-mono-sub text-xs font-bold uppercase tracking-widest text-[#E57A44] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C1502E]" />
              Kiln Yard Dispatch
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-[#A89B8C]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C1502E] shrink-0 mt-0.5" />
                <span>Kurapati Bricks, Chimakurthy Road Area, Addanki, Andhra Pradesh, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C1502E] shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+919876543210" className="hover:text-white transition-colors font-mono">+91 98765 43210</a>
                  <a href="tel:+919440212345" className="hover:text-white transition-colors font-mono text-[11px] text-white/50">+91 94402 12345 (Dispatch)</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C1502E] shrink-0" />
                <a href="mailto:dispatch@kurapatibricks.com" className="hover:text-white transition-colors font-mono">dispatch@kurapatibricks.com</a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C1502E] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Mon - Sat: 7:00 AM - 6:00 PM</span>
                  <span className="block text-[11px] text-white/50">Sunday: Closed for maintenance</span>
                </div>
              </div>
            </div>

            {/* GOOGLE MAP DIRECT LINK BUTTON */}
            <div className="pt-2">
              <a
                href="https://www.google.com/maps/place/Kurapati+srinu+Bricks/@15.8433247,79.9760586,3238m/data=!3m1!1e3!4m6!3m5!1s0x3a4af33d3fa7a997:0x95a03102c12fb52e!8m2!3d15.8399422!4d79.9817231!16s%2Fg%2F11vhft2pc2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono-sub font-semibold text-[#E57A44] hover:text-white px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#C1502E] border border-white/10 transition-all duration-300 cursor-pointer"
              >
                <span>Navigate to Kiln Yard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT, LEGAL & BACK-TO-TOP ROW */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono-sub text-[#A89B8C]/70">
          
          {/* Left copyright */}
          <div className="flex items-center gap-3">
            <span>© 2026 Kurapati Bricks. All rights reserved.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="hidden sm:inline text-[#E57A44] font-telugu font-bold">
              అద్దంకి నాణ్యమైన ఇటుకలు
            </span>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <button onClick={() => setShowSpecModal(true)} className="hover:text-white transition-colors cursor-pointer">
              BIS Standard IS 1077
            </button>
            <button onClick={() => scrollToSection('location')} className="hover:text-white transition-colors cursor-pointer">
              Factory Location
            </button>
            <button onClick={() => scrollToSection('material')} className="hover:text-white transition-colors cursor-pointer">
              Facing Specifications
            </button>
          </div>

          {/* Right Scroll to Top Button */}
          <div>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 hover:bg-[#C1502E] text-white border border-white/15 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
              title="Back to Top"
            >
              <span className="text-[11px] font-mono-sub font-bold uppercase tracking-wider">Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>

      {/* TECHNICAL SPECIFICATIONS & LAB TEST CERTIFICATE MODAL */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#140A08] border border-[#C1502E]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
            <button
              onClick={() => setShowSpecModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-white hover:bg-[#C1502E] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#C1502E]/20 text-[#E57A44] flex items-center justify-center border border-[#C1502E]/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-footer-display font-bold text-xl text-white">
                  Addanki Kiln Technical Test Data
                </h3>
                <p className="text-xs text-[#A89B8C] font-mono-sub">
                  Bureau of Indian Standards IS 1077 Compliance Certificate
                </p>
              </div>
            </div>

            <div className="space-y-3 my-6">
              <div className="grid grid-cols-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                <span className="text-[#A89B8C]">Compressive Load Strength:</span>
                <span className="font-bold text-white font-mono">35.4 N/mm² (Grade Class 35)</span>
              </div>
              <div className="grid grid-cols-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                <span className="text-[#A89B8C]">Water Absorption Rate:</span>
                <span className="font-bold text-white font-mono">5.8% (24-Hour Cold Immersion)</span>
              </div>
              <div className="grid grid-cols-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                <span className="text-[#A89B8C]">Efflorescence Classification:</span>
                <span className="font-bold text-emerald-400 font-mono">NIL / Zero Soluble Salts</span>
              </div>
              <div className="grid grid-cols-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                <span className="text-[#A89B8C]">Thermal Conductivity (k):</span>
                <span className="font-bold text-white font-mono">0.72 W/m·K</span>
              </div>
              <div className="grid grid-cols-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                <span className="text-[#A89B8C]">Clay Origin & Deposit:</span>
                <span className="font-bold text-white font-mono">Addanki River Basin Clay</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  alert("Downloading Kurapati_Bricks_Lab_Report_2026.pdf...")
                  setShowSpecModal(false)
                }}
                className="flex-1 bg-[#C1502E] hover:bg-[#A33D1F] text-white font-mono-sub text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Certified PDF</span>
              </button>
              <button
                onClick={() => setShowSpecModal(false)}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono-sub text-xs font-bold uppercase transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </footer>
  )
}
