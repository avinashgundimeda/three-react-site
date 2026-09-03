import React, { useState, useEffect } from 'react'

export default function Navbar({ page, setPage }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) text-[#221D19] ${
        isScrolled
          ? 'top-4 w-[90%] max-w-4xl rounded-full bg-[#F3EEE6]/95 backdrop-blur-md border border-[#D9C6AC]/80 shadow-xl px-6 py-2.5'
          : 'top-0 w-full max-w-7xl px-8 md:px-14 py-6 rounded-none bg-transparent border-transparent shadow-none'
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* LOGO */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => {
            setPage('home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#B5502E] text-white font-display font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
            K
          </span>
          <span className="font-display font-extrabold text-xl tracking-tight text-[#221D19]">
            Kiln
          </span>
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium">
          <button
            onClick={() => {
              setPage('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className={`transition-colors duration-300 ${
              page === 'home'
                ? 'text-[#221D19] font-bold'
                : 'text-[#5A4F44] hover:text-[#221D19]'
            }`}
          >
            Home
          </button>
        </nav>

        {/* RIGHT ACTIONS & UTILITIES */}
        <div className="flex items-center gap-4">
          {/* UTILITY ICONS */}
          <div className="hidden sm:flex items-center gap-3 pr-2 border-r border-black/15 text-[#6A5E53]">
            <button
              aria-label="Language selector"
              className="hover:text-[#B5502E] transition-colors p-1"
              title="English (US)"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </button>
            <button
              aria-label="Toggle notification"
              className="hover:text-[#B5502E] transition-colors p-1 relative"
              title="Notifications"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#B5502E]" />
            </button>
          </div>

          {/* MAIN ACTION BUTTON */}
          <button className="bg-[#221D19] text-white hover:bg-[#3a3129] px-5 py-2.5 text-xs sm:text-sm font-medium rounded-full shadow-sm hover:shadow transition-all duration-300">
            Get a Quote
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-[#221D19]"
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
        <div className="md:hidden mt-3 pt-3 border-t border-black/10 flex flex-col gap-3 pb-2 text-sm font-medium text-[#221D19]">
          <button
            onClick={() => {
              setPage('home')
              setMobileMenuOpen(false)
            }}
            className="text-left py-1 hover:opacity-80"
          >
            Home
          </button>
        </div>
      )}
    </header>
  )
}
