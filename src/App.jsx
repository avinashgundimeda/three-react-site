import React, { useState, useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './Navbar'
import BrickLanding from './BrickLanding'
import BottomTicker from './BottomTicker'

const BRICK_COLORS = {
  'classic-red': '#ffffff',
  'golden-buff': '#ffe5cc',
  'charcoal-grey': '#666666',
  'glazed-forest': '#809988'
}

export default function App() {
  const [page, setPage] = useState('home')
  const [activeBrickId] = useState('classic-red')

  const brickColor = BRICK_COLORS[activeBrickId] || '#ffffff'

  // Initialize Lenis luxury smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 0.95,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full pb-10">
      {/* DYNAMIC TRANSFORMING NAVBAR */}
      <Navbar page={page} setPage={setPage} />

      {/* RENDER MAIN LANDING PAGE */}
      <BrickLanding setPage={setPage} brickColor={brickColor} />

      {/* INFINITE MOVING BOTTOM TICKER BAR */}
      <BottomTicker />
    </div>
  )
}

