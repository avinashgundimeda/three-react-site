import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2, Instagram, Linkedin, MessageCircle, FileText } from 'lucide-react'

export default function Footer() {
  const [emailInput, setEmailInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setEmailInput('')
    }
  }

  return (
    <footer className="relative w-full bg-[#0C0706] text-[#F4EFE6] pt-20 pb-10 px-6 md:px-14 border-t border-[#3D1A14] overflow-hidden select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Mandali&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-footer-display { font-family: 'Archivo', ui-sans-serif, system-ui; }
        .font-telugu { font-family: 'Mandali', sans-serif; }
        .font-mono-sub { font-family: 'JetBrains Mono', monospace; }

        .footer-cta-card {
          background: linear-gradient(135deg, #1C0F0D 0%, #2A120E 50%, #170A08 100%);
          border: 1px solid rgba(142, 36, 23, 0.4);
        }
      `}</style>

      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#8E2417]/15 rounded-full blur-[150px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#8E2417]/10 rounded-full blur-[120px] pointer-events-none -z-0" />

      {/* GIANT WATERMARK TEXT ACROSS BACKGROUND */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[14vw] font-footer-display font-black text-white/[0.02] tracking-tighter uppercase whitespace-nowrap pointer-events-none select-none -z-0">
        KURAPATI SRINU BRICKS
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* TOP CONSULTATION / NEWSLETTER CTA BANNER */}
        <div className="footer-cta-card rounded-2xl p-8 md:p-12 mb-20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono-sub font-semibold tracking-widest text-[#8E2417] uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8E2417]" />
              <span>DIRECT FACTORY QUOTATION</span>
            </div>
            <h3 className="font-footer-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Ready to build your next <br />
              <span className="text-[#8E2417]">architectural landmark?</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#A89B8C] font-sans mt-3 leading-relaxed">
              Connect directly with our Addanki kiln dispatch team for factory-direct price estimates, laboratory test certificates, and custom brick size consultations.
            </p>
          </div>

          {/* QUOTE FORM */}
          <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter email or phone number"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full sm:w-80 bg-[#0C0706] border border-white/15 text-white placeholder-white/40 text-xs font-mono-sub px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#8E2417] transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#8E2417] hover:bg-black text-white font-mono-sub text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border border-white/10 shrink-0 cursor-pointer"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Request Sent!</span>
                </>
              ) : (
                <>
                  <span>Get Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* MAIN FOOTER GRID (4 COLUMNS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-16 border-b border-white/10">
          
          {/* COL 1: BRAND IDENTITY (LG: 4 COLS) */}
          <div className="lg:col-span-4 text-left space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#8E2417] text-white font-footer-display font-black text-base shadow-md">
                K
              </span>
              <div>
                <span className="font-footer-display font-extrabold text-2xl tracking-tight text-white block leading-none">
                  Kiln
                </span>
                <span className="text-[10px] font-telugu text-[#8E2417] font-bold tracking-wider block mt-0.5">
                  అద్దంకి ఇటుకల తయారీ కేంద్రం
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A89B8C] font-sans leading-relaxed max-w-sm">
              Hand-pressed facing bricks shaped from Addanki riverbed clay deposits and vitrified in computer-controlled tunnel kilns for structural permanence.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#location"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8E2417] text-white/70 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300"
                title="WhatsApp Dispatch"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#products"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8E2417] text-white/70 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300"
                title="Instagram Showcase"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#logistics"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8E2417] text-white/70 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300"
                title="LinkedIn Enterprise"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#material"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#8E2417] text-white/70 hover:text-white flex items-center justify-center border border-white/10 transition-all duration-300"
                title="Technical Specifications"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COL 2: PRODUCTS (LG: 2 COLS) */}
          <div className="lg:col-span-2 text-left space-y-4">
            <h4 className="font-mono-sub text-xs font-bold uppercase tracking-widest text-[#8E2417]">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89B8C] font-sans">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Classic Terracotta
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Golden Ochre
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Kiln Charcoal Clinker
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Exposed Facing Bricks
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Refractory Fire Clay
                </a>
              </li>
            </ul>
          </div>

          {/* COL 3: ARCHITECT SERVICES (LG: 3 COLS) */}
          <div className="lg:col-span-3 text-left space-y-4">
            <h4 className="font-mono-sub text-xs font-bold uppercase tracking-widest text-[#8E2417]">
              Architect Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89B8C] font-sans">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Request Sample Box (48h)
                </a>
              </li>
              <li>
                <a href="#material" className="hover:text-white transition-colors">
                  Compressive Strength Test Data
                </a>
              </li>
              <li>
                <a href="#logistics" className="hover:text-white transition-colors">
                  Direct Build Site Logistics
                </a>
              </li>
              <li>
                <a href="#recipes" className="hover:text-white transition-colors">
                  Architectural Case Studies
                </a>
              </li>
              <li>
                <a href="#material" className="hover:text-white transition-colors">
                  Custom Brick Mould Formulations
                </a>
              </li>
            </ul>
          </div>

          {/* COL 4: FACTORY YARD CONTACT (LG: 3 COLS) */}
          <div className="lg:col-span-3 text-left space-y-4">
            <h4 className="font-mono-sub text-xs font-bold uppercase tracking-widest text-[#8E2417]">
              Kiln Yard Dispatch
            </h4>
            <div className="space-y-3 text-xs text-[#A89B8C] font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8E2417] shrink-0 mt-0.5" />
                <span>Kurapati Srinu Bricks, Chimakurthy Road, Addanki, AP, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8E2417] shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8E2417] shrink-0" />
                <span>dispatch@srinubricks.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#8E2417] shrink-0" />
                <span>Mon - Sat: 7:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL & COPYRIGHT ROW */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-sub text-[#7A6C60]">
          <div>
            <span>© 2026 Kurapati Srinu Bricks. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms of Supply
            </span>
            <span className="text-[#8E2417] font-bold font-telugu">
              తెలుగు వర్షన్
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}
