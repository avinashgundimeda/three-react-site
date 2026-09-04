import React, { useState, useEffect } from 'react'
import {
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Award,
  Flame,
  Download,
  X,
  Sparkles,
  Info
} from 'lucide-react'

export default function QuoteSection() {
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [requestType, setRequestType] = useState('quote') // 'quote' | 'sample'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showSpecModal, setShowSpecModal] = useState(false)
  const [timeString, setTimeString] = useState('')

  // Live IST Clock simulation
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
      setTimeString(now.toLocaleTimeString('en-US', options))
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!emailOrPhone.trim()) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setEmailOrPhone('')
      setTimeout(() => setSubmitted(false), 5000)
    }, 900)
  }

  const techSpecs = [
    { label: 'Compressive Strength', value: '35 N/mm²', note: 'Grade-A Load Bearing' },
    { label: 'Water Absorption Rate', value: '< 6.2%', note: 'Impermeable Vitrified Surface' },
    { label: 'Standard Compliance', value: 'BIS IS 1077', note: 'Bureau of Indian Standards' },
    { label: 'Firing Temperature', value: '1,080°C', note: 'Computer Tunnel Kiln' },
    { label: 'Density', value: '1,920 kg/m³', note: 'High Thermal Mass' }
  ]

  return (
    <section id="quote" className="relative w-full bg-[#0C0706] text-[#F4EFE6] pt-20 pb-16 px-6 sm:px-10 md:px-16 border-t border-[#3D1A14]/80 overflow-hidden select-none font-sans scroll-mt-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .font-quote-display { font-family: 'Archivo', ui-sans-serif, system-ui; }
        .font-mono-sub { font-family: 'JetBrains Mono', monospace; }

        .quote-cta-card {
          background: linear-gradient(135deg, #1C0C09 0%, #2A110B 45%, #150806 100%);
          border: 1px solid rgba(193, 80, 46, 0.4);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .quote-cta-card:hover {
          border-color: rgba(193, 80, 46, 0.65);
        }

        .gold-glow-line {
          background: linear-gradient(90deg, transparent, #C1502E, #E57A44, #C1502E, transparent);
        }
      `}</style>

      {/* TOP GLOW DECORATIONS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] gold-glow-line opacity-70 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C1502E]/10 rounded-full blur-[150px] pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#8E2417]/10 rounded-full blur-[130px] pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* LIVE KILN TELEMETRY STATUS BAR */}
        <div className="mb-12 p-4 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 text-xs font-mono-sub">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-md"></span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white uppercase tracking-wider">ADDANKI KILN YARD 01</span>
              <span className="text-white/40">•</span>
              <span className="text-[#E57A44]">TUNNEL VITRIFICATION ACTIVE (1,080°C)</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[#A89B8C]">
            <div className="hidden sm:flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#C1502E]" />
              <span>LIVE IST: <strong className="text-white font-mono">{timeString || '15:30 IST'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C1502E]" />
              <span>15.8399° N, 79.9817° E</span>
            </div>
            <button
              onClick={() => setShowSpecModal(true)}
              className="inline-flex items-center gap-1.5 text-xs text-[#E57A44] hover:text-white transition-colors underline underline-offset-4 cursor-pointer font-semibold"
            >
              <Info className="w-3.5 h-3.5" />
              <span>View Lab Certificate Specs</span>
            </button>
          </div>
        </div>

        {/* VIP CONSULTATION & SAMPLE BOX CTA BANNER CARD */}
        <div className="quote-cta-card rounded-3xl p-8 sm:p-10 lg:p-14 mb-16 relative overflow-hidden group">
          {/* Accent highlight line */}
          <div className="absolute top-0 left-0 w-2 h-full bg-[#C1502E]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono-sub font-semibold tracking-widest text-[#E57A44] uppercase px-3 py-1 rounded-full bg-[#C1502E]/20 border border-[#C1502E]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#E57A44]" />
                <span>DIRECT FACTORY QUOTATION & SAMPLES</span>
              </div>
              <h3 className="font-quote-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15]">
                Ready to build your next <br className="hidden sm:inline" />
                <span className="text-[#C1502E] italic font-serif font-normal">architectural landmark?</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#A89B8C] leading-relaxed max-w-xl">
                Connect directly with our Addanki kiln dispatch office. Get immediate wholesale price breakdowns, physical 48-hour sample box dispatches, or lab compression test certificates for your project.
              </p>

              {/* Action Toggle Tabs */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRequestType('quote')}
                  className={`text-xs font-mono-sub px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    requestType === 'quote'
                      ? 'bg-[#C1502E] border-[#C1502E] text-white font-bold shadow-md'
                      : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  Direct Factory Quote
                </button>
                <button
                  type="button"
                  onClick={() => setRequestType('sample')}
                  className={`text-xs font-mono-sub px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    requestType === 'sample'
                      ? 'bg-[#C1502E] border-[#C1502E] text-white font-bold shadow-md'
                      : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  Request 48h Specimen Box
                </button>
              </div>
            </div>

            {/* Right Form Input */}
            <div className="lg:col-span-5 w-full">
              <form onSubmit={handleSubmit} className="space-y-3 bg-[#080403]/80 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="text-left">
                  <label className="block text-[11px] font-mono-sub uppercase tracking-wider text-[#A89B8C] mb-1.5">
                    {requestType === 'quote' ? 'Work Email or Phone Number' : 'Delivery Address or Email'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={requestType === 'quote' ? 'e.g. architect@studio.com or +91 987...' : 'e.g. Build site address or email...'}
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="w-full bg-[#120806] border border-white/15 text-white placeholder-white/30 text-xs sm:text-sm font-mono-sub px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#C1502E] transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C1502E] hover:bg-[#A33D1F] text-white font-mono-sub text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl border border-white/20 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Processing Request...</span>
                  ) : submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{requestType === 'quote' ? 'Quotation Requested!' : 'Sample Box Registered!'}</span>
                    </>
                  ) : (
                    <>
                      <span>{requestType === 'quote' ? 'Get Factory Direct Quote' : 'Dispatch Sample Box'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {submitted && (
                  <p className="text-[11px] text-emerald-400 font-mono-sub text-center animate-fade-in">
                    ✓ Success! Our Addanki dispatch manager will contact you within 2 hours.
                  </p>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono-sub text-[#A89B8C]/80 pt-1 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#C1502E]" /> No Spam Guarantee
                  </span>
                  <span>Addanki Kiln Direct Freight</span>
                </div>
              </form>
            </div>

          </div>
        </div>

        {/* TECHNICAL CERTIFIED PERFORMANCE METRICS BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {techSpecs.map((spec, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#C1502E]/40 transition-all duration-300 text-left group"
            >
              <span className="block text-[10px] font-mono-sub uppercase tracking-wider text-[#A89B8C] group-hover:text-[#E57A44] transition-colors">
                {spec.label}
              </span>
              <span className="block font-quote-display font-black text-xl text-white mt-1">
                {spec.value}
              </span>
              <span className="block text-[10px] text-white/40 mt-0.5">
                {spec.note}
              </span>
            </div>
          ))}
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
                <h3 className="font-quote-display font-bold text-xl text-white">
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

    </section>
  )
}
