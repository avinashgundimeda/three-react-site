import React, { useState, useEffect } from 'react'
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, Phone, User } from 'lucide-react'

export default function Navbar({ page, setPage }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Get Quote Modal State
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    brickType: 'classic-terracotta',
    quantity: '10000',
    location: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.contact) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setShowQuoteModal(false)
        setFormData({
          name: '',
          contact: '',
          brickType: 'classic-terracotta',
          quantity: '10000',
          location: '',
          notes: '',
        })
      }, 3000)
    }, 1000)
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'material', label: 'Products' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'recipes', label: 'Recipes & Uses' },
    { id: 'owner', label: 'Craftsman' },
    { id: 'location', label: 'Factory & Map' },
  ]

  return (
    <>
      {/* ORIGINAL RESPONSIVE FREE NAVBAR (TOP-0 UNCLUSTERED WHEN NOT SCROLLED, CLEAN FLOATING PILL WHEN SCROLLED) */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) text-[#221D19] ${
          mobileMenuOpen
            ? 'top-3 w-[94%] max-w-lg rounded-3xl bg-[#F3EEE6] border border-[#D9C6AC] shadow-2xl px-6 py-4'
            : isScrolled
            ? 'top-4 w-[92%] max-w-5xl rounded-full bg-[#F3EEE6]/95 backdrop-blur-md border border-[#D9C6AC]/80 shadow-xl px-6 py-2.5'
            : 'top-0 w-full max-w-7xl px-8 md:px-14 py-6 rounded-none bg-transparent border-transparent shadow-none'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          
          {/* BRAND LOGO */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <span className="font-display font-extrabold text-xl tracking-tight text-[#221D19]">
              Kurapati Bricks
            </span>
          </div>

          {/* DESKTOP NAV LINKS (SPACIOUS & UNCLUSTERED) */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium tracking-wide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-300 relative py-1 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-[#8E2417] font-bold'
                    : 'text-[#5A4F44] hover:text-[#221D19]'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8E2417] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* RIGHT ACTION: CLEAN SINGLE CTA BUTTON */}
          <div className="flex items-center gap-3.5">
            {/* MAIN GET A QUOTE BUTTON */}
            <button
              onClick={() => setShowQuoteModal(true)}
              className="bg-[#221D19] text-white hover:bg-black px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
            >
              Get a Quote
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-[#221D19] hover:bg-black/5 cursor-pointer transition-colors"
              aria-label="Toggle Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* MOBILE DROPDOWN MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-[#D9C6AC]/70 flex flex-col gap-1.5 text-sm font-medium text-[#221D19] animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left py-2.5 px-3.5 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-[#8E2417]/10 text-[#8E2417] font-bold border border-[#8E2417]/20'
                    : 'hover:bg-black/5 text-[#5A4F44]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* INTERACTIVE GET A QUOTE POPUP MODAL */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in font-sans">
          <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl border border-[#D9C6AC] rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden">
            
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#8E2417] via-[#C1502E] to-[#8E2417]" />

            {/* Close Button */}
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/5 hover:bg-[#8E2417] text-[#5A4F44] hover:text-white flex items-center justify-center transition-all cursor-pointer border border-black/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#8E2417]/10 text-[#8E2417] flex items-center justify-center border border-[#8E2417]/20 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-2xl text-[#1C1815] leading-tight">
                  Request Factory Direct Quote
                </h3>
                <p className="text-xs text-[#7A6F63] font-mono">
                  Kurapati Bricks • Addanki Firing Yard Dispatch
                </p>
              </div>
            </div>

            {/* QUOTE FORM */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Name & Phone/Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider font-bold text-[#5A4F44] mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8E2417]" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F4EFE6]/60 border border-[#D9C6AC] text-[#1C1815] placeholder-black/40 text-xs font-mono pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#8E2417] focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider font-bold text-[#5A4F44] mb-1.5">
                    Phone or Email *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8E2417]" />
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full bg-[#F4EFE6]/60 border border-[#D9C6AC] text-[#1C1815] placeholder-black/40 text-xs font-mono pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#8E2417] focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Brick Selection & Quantity Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider font-bold text-[#5A4F44] mb-1.5">
                    Select Brick Variety
                  </label>
                  <select
                    value={formData.brickType}
                    onChange={(e) => setFormData({ ...formData, brickType: e.target.value })}
                    className="w-full bg-[#F4EFE6]/60 border border-[#D9C6AC] text-[#1C1815] text-xs font-mono px-3.5 py-3 rounded-xl focus:outline-none focus:border-[#8E2417] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="classic-terracotta">Classic Terracotta Facing</option>
                    <option value="golden-ochre">Golden Ochre Architectural</option>
                    <option value="charcoal-clinker">Kiln Charcoal Clinker</option>
                    <option value="hand-pressed">Exposed Hand-Pressed</option>
                    <option value="refractory-fire">High-Temp Refractory Fire Clay</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider font-bold text-[#5A4F44] mb-1.5">
                    Estimated Quantity
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-[#F4EFE6]/60 border border-[#D9C6AC] text-[#1C1815] text-xs font-mono px-3.5 py-3 rounded-xl focus:outline-none focus:border-[#8E2417] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="5000">5,000 Bricks (Small Build)</option>
                    <option value="10000">10,000 Bricks (Standard House)</option>
                    <option value="25000">25,000 Bricks (Commercial)</option>
                    <option value="50000">50,000+ Bricks (Bulk Logistics)</option>
                    <option value="sample">Request 48h Specimen Box Only</option>
                  </select>
                </div>
              </div>

              {/* Build Site Location */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider font-bold text-[#5A4F44] mb-1.5">
                  Build Site Location / City
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8E2417]" />
                  <input
                    type="text"
                    placeholder="e.g. Addanki, Vijayawada, Guntur, Hyderabad..."
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#F4EFE6]/60 border border-[#D9C6AC] text-[#1C1815] placeholder-black/40 text-xs font-mono pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#8E2417] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#8E2417] hover:bg-[#731B10] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg border border-white/20 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Submitting to Kiln Yard...</span>
                  ) : submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Quote Requested Successfully!</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {submitted && (
                <p className="text-[11px] text-emerald-600 font-mono text-center animate-fade-in font-bold pt-1">
                  ✓ Registered! Our Addanki dispatch manager will call you shortly.
                </p>
              )}

              <div className="flex items-center justify-between text-[10px] font-mono text-[#7A6F63] pt-2 border-t border-[#D9C6AC]/50">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8E2417]" /> BIS IS 1077 Certified Quality
                </span>
                <span>Direct Factory Pricing</span>
              </div>

            </form>

          </div>
        </div>
      )}
    </>
  )
}
