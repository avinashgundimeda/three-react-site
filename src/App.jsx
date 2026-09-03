import React, { useState } from 'react'
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
