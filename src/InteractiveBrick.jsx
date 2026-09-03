import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Center, Html } from '@react-three/drei'
import * as THREE from 'three'

// Clean 3D Brick Model component with smooth 360° hover/drag logic
function Model({ url, page, scrollProgress, brickColor, isInteractive }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef()
  
  const [hovered, setHovered] = useState(false)
  const isDraggingRef = useRef(false)
  const lastPointerRef = useRef({ x: 0, y: 0 })
  const hoverOffsetRef = useRef({ x: 0, y: 0 })
  const dragAccumRef = useRef({ x: 0, y: 0 })
  const currentRotRef = useRef({ x: 0, y: 0 })

  // Window mouse move listener for 360° rotation across full screen
  useEffect(() => {
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1

      hoverOffsetRef.current.y = nx * Math.PI
      hoverOffsetRef.current.x = -ny * (Math.PI * 0.65)

      if (isDraggingRef.current) {
        const dx = e.clientX - lastPointerRef.current.x
        const dy = e.clientY - lastPointerRef.current.y

        dragAccumRef.current.y += dx * 0.012
        dragAccumRef.current.x += dy * 0.012

        lastPointerRef.current = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    window.addEventListener('touchend', handleMouseUp, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [])

  // Apply material colors & realistic roughness/metalness
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(brickColor)
          child.material.roughness = 0.82
          child.material.metalness = 0.04
        }
      })
    }
  }, [scene, brickColor])

  // Realistic 3D perspective orientation showing top, front, and side faces
  const baseRotationX = 0.28
  const baseRotationY = -0.65
  const baseRotationZ = 1.5708

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    if (groupRef.current) {
      let targetX = 0.0
      let targetY = Math.sin(t * 1.2) * 0.04 // Subtle natural float
      let targetZ = 0.0
      let baseScale = 0.125 // Calibrated prominent size

      targetX = 0.0
      targetY = Math.sin(t * 1.2) * 0.04
      targetZ = 0.0
      baseScale = page === 'logistics' ? 0.095 : 0.122

      // Calculate total target 360° rotation
      let targetRotX = baseRotationX + dragAccumRef.current.x
      let targetRotY = baseRotationY + dragAccumRef.current.y
      let targetRotZ = baseRotationZ

      if (hovered || isInteractive) {
        targetRotX += hoverOffsetRef.current.x
        targetRotY += hoverOffsetRef.current.y
      }

      const hoverScaleMultiplier = hovered ? 1.06 : 1.0
      const targetScale = baseScale * hoverScaleMultiplier

      // Smooth lerp dampening for fluid responsive physical movement
      const lerpSpeed = Math.min(delta * 8.5, 0.18)

      currentRotRef.current.x += (targetRotX - currentRotRef.current.x) * lerpSpeed
      currentRotRef.current.y += (targetRotY - currentRotRef.current.y) * lerpSpeed

      groupRef.current.position.x += (targetX - groupRef.current.position.x) * lerpSpeed
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * lerpSpeed
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * lerpSpeed

      groupRef.current.rotation.x = currentRotRef.current.x
      groupRef.current.rotation.y = currentRotRef.current.y
      groupRef.current.rotation.z = targetRotZ

      groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * lerpSpeed
      groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * lerpSpeed
      groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * lerpSpeed
    }
  })

  // Pointer event handlers for touch and drag rotation
  const handlePointerDown = (e) => {
    e.stopPropagation()
    isDraggingRef.current = true
    lastPointerRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      isDraggingRef.current = true
      lastPointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }

  const handleTouchMove = (e) => {
    if (isDraggingRef.current && e.touches && e.touches[0]) {
      const dx = e.touches[0].clientX - lastPointerRef.current.x
      const dy = e.touches[0].clientY - lastPointerRef.current.y

      dragAccumRef.current.y += dx * 0.015
      dragAccumRef.current.x += dy * 0.015

      lastPointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="flex items-center gap-2 bg-[#221D19]/90 text-[#F3EEE6] px-4 py-2 rounded-full text-xs font-semibold shadow-lg whitespace-nowrap">
        <svg className="animate-spin h-4 w-4 text-[#C15C34]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>Assembling Clay...</span>
      </div>
    </Html>
  )
}

export default function InteractiveBrick({ page, scrollProgress, brickColor, isInteractive }) {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 9.2], fov: 33 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Realistic directional lighting to highlight textures & physical contours */}
        <ambientLight intensity={1.3} />
        <directionalLight position={[8, 10, 6]} intensity={1.9} />
        <directionalLight position={[-8, -4, -4]} intensity={0.4} />
        <directionalLight position={[0, 6, -6]} intensity={0.7} />

        <Suspense fallback={<Loader />}>
          <Model
            url="/brick_megascan/scene.gltf"
            page={page}
            scrollProgress={scrollProgress}
            brickColor={brickColor}
            isInteractive={isInteractive}
          />
        </Suspense>

      </Canvas>
    </div>
  )
}

useGLTF.preload('/brick_megascan/scene.gltf')

