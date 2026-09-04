import React from 'react'
import { MapPin, Clock, Phone, Navigation } from 'lucide-react'

const RopeHanger = ({ className = '' }) => {
  return (
    <svg
      className={`${className} overflow-visible`}
      viewBox="0 0 32 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="map-hanger-shadow" x="-50%" y="-20%" width="200%" height="150%">
          <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#1C1815" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Pulley block at the top */}
      <g transform="translate(16, 12)" filter="url(#map-hanger-shadow)">
        {/* Hanging link strap */}
        <line x1="0" y1="-20" x2="0" y2="0" stroke="#302D29" strokeWidth="4" />
        <circle cx="0" cy="-20" r="4" fill="#1C1815" />
        {/* Pulley wheel */}
        <circle cx="0" cy="0" r="10" fill="#6F6A5F" stroke="#302D29" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="3" fill="#1C1815" />
      </g>

      {/* Two rope lines hanging down */}
      <g filter="url(#map-hanger-shadow)">
        {/* Left side rope line */}
        <path d="M 12 12 L 12 85" stroke="#261B12" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M 12 12 L 12 85" stroke="#825C38" strokeWidth="4" strokeLinecap="round" />
        <path d="M 12 12 L 12 85" stroke="#E3CBB3" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />

        {/* Right side rope line */}
        <path d="M 20 12 L 20 85" stroke="#261B12" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M 20 12 L 20 85" stroke="#825C38" strokeWidth="4" strokeLinecap="round" />
        <path d="M 20 12 L 20 85" stroke="#E3CBB3" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />
      </g>

      {/* Knotted bracket connecting rope to the Card border */}
      <g transform="translate(16, 82)" filter="url(#map-hanger-shadow)">
        {/* Knot ball */}
        <circle cx="0" cy="0" r="8" fill="#825C38" stroke="#4B3520" strokeWidth="2" />
        <circle cx="0" cy="0" r="6" fill="#9E744A" stroke="#E3CBB3" strokeWidth="1" strokeDasharray="2 2" />
        {/* Steel bracket clamp */}
        <path d="M -8 3 L 8 3 L 10 18 L -10 18 Z" fill="#443F39" stroke="#302D29" strokeWidth="1.5" />
        <circle cx="0" cy="11" r="2.5" fill="#1C1815" />
      </g>
    </svg>
  )
}

export default function LocationSection() {
  const mapUrl = "https://www.google.com/maps/place/Kurapati+srinu+Bricks/@15.8433247,79.9760586,3238m/data=!3m1!1e3!4m6!3m5!1s0x3a4af33d3fa7a997:0x95a03102c12fb52e!8m2!3d15.8399422!4d79.9817231!16s%2Fg%2F11vhft2pc2"
  const embedUrl = "https://maps.google.com/maps?q=15.8399422,79.9817231&t=&z=14&ie=UTF8&iwloc=&output=embed"

  return (
    <section id="location" className="relative pt-16 pb-24 px-6 md:px-10 lg:px-16 overflow-hidden bg-transparent border-t border-[#D9C6AC]/50 scroll-mt-20">
      {/* Background radial dot decorations */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(122, 111, 99, 0.2) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-[#C1502E]/10 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

          {/* Left Column: Location Details */}
          <div className="md:col-span-5 space-y-8 max-w-xl text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest text-[#C1502E] mb-4 uppercase">
                — FIND OUR KILNS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#221D19] leading-tight">
                Visit our factory. <br />
                <span className="text-[#C1502E] font-serif italic font-normal">Get in touch.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#5A4F44] leading-relaxed font-sans">
                We welcome contractors, dealers, and builders to inspect our premium clay brick quality directly at the kiln yard in Addanki.
              </p>
            </div>

            {/* Information Cards Stack */}
            <div className="space-y-4">
              <div className="flex gap-4 p-5 rounded-2xl border border-[#D9C6AC]/60 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:border-[#C1502E]/40 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C1502E]/10 text-[#C1502E]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#221D19] uppercase tracking-wider">Factory Address</h4>
                  <p className="mt-1 text-sm text-[#5A4F44] leading-relaxed">
                    Kurapati Bricks, Chimakurthy Road Area, Addanki, AP, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl border border-[#D9C6AC]/60 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:border-[#C1502E]/40 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C1502E]/10 text-[#C1502E]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#221D19] uppercase tracking-wider">Business Hours</h4>
                  <p className="mt-1 text-sm text-[#5A4F44]">
                    Monday - Saturday: 7:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl border border-[#D9C6AC]/60 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:border-[#C1502E]/40 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C1502E]/10 text-[#C1502E]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#221D19] uppercase tracking-wider">Call Dispatch</h4>
                  <p className="mt-1 text-sm text-[#5A4F44]">
                    +91 98765 43210
                  </p>
                </div>
              </div>
            </div>

            {/* Call to action button */}
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#C1502E] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C1502E]/25 transition-all duration-300 hover:bg-[#a84122] hover:shadow-xl hover:-translate-y-0.5"
            >
              Open in Google Maps
              <Navigation className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right Column: Embedded Map Card */}
          <div className="md:col-span-7 w-full pt-4 md:pt-8 relative">
            <div className="relative group p-2.5 rounded-3xl border border-[#D9C6AC]/80 bg-white/80 backdrop-blur-md shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              <iframe
                title="Google Maps Location for Kurapati Srinu Bricks"
                src={embedUrl}
                className="w-full h-[320px] md:h-[480px] rounded-2xl border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay link */}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Get directions on Google Maps"
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#221D19] shadow-md backdrop-blur-sm border border-[#D9C6AC]/50 hover:bg-white hover:text-[#C1502E] transition-all duration-300"
              >
                <Navigation className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
