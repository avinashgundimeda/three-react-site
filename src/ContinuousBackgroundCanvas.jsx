import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ContinuousBackgroundCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.z = 15

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)

    // Check prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isReducedMotion = reducedMotionQuery.matches

    const handleMotionChange = (e) => {
      isReducedMotion = e.matches
    }
    reducedMotionQuery.addEventListener('change', handleMotionChange)

    // 2. Create Soft Circular Particle Texture
    const createParticleTexture = () => {
      const size = 64
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, size, size)

      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      return texture
    }

    const particleTexture = createParticleTexture()

    // 3. Layer 1: Background Sand & Clay Particles (80 points)
    const countL1 = 90
    const geoL1 = new THREE.BufferGeometry()
    const posL1 = new Float32Array(countL1 * 3)
    const velL1 = new Float32Array(countL1 * 3)

    for (let i = 0; i < countL1 * 3; i += 3) {
      posL1[i] = (Math.random() - 0.5) * 26
      posL1[i + 1] = (Math.random() - 0.5) * 26
      posL1[i + 2] = (Math.random() - 0.5) * 6 - 8 // Deep layer

      velL1[i] = (Math.random() - 0.5) * 0.003
      velL1[i + 1] = Math.random() * 0.004 + 0.002
      velL1[i + 2] = (Math.random() - 0.5) * 0.002
    }

    geoL1.setAttribute('position', new THREE.BufferAttribute(posL1, 3))

    const matL1 = new THREE.PointsMaterial({
      color: 0x8e2417,
      size: 0.28,
      map: particleTexture,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })

    const pointsL1 = new THREE.Points(geoL1, matL1)
    scene.add(pointsL1)

    // 4. Layer 2: Foreground Organic Dust Particles (45 points)
    const countL2 = 45
    const geoL2 = new THREE.BufferGeometry()
    const posL2 = new Float32Array(countL2 * 3)
    const velL2 = new Float32Array(countL2 * 3)

    for (let i = 0; i < countL2 * 3; i += 3) {
      posL2[i] = (Math.random() - 0.5) * 20
      posL2[i + 1] = (Math.random() - 0.5) * 20
      posL2[i + 2] = (Math.random() - 0.5) * 4 - 2 // Closer layer

      velL2[i] = (Math.random() - 0.5) * 0.005
      velL2[i + 1] = Math.random() * 0.006 + 0.003
      velL2[i + 2] = (Math.random() - 0.5) * 0.003
    }

    geoL2.setAttribute('position', new THREE.BufferAttribute(posL2, 3))

    const matL2 = new THREE.PointsMaterial({
      color: 0xc1502e,
      size: 0.38,
      map: particleTexture,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })

    const pointsL2 = new THREE.Points(geoL2, matL2)
    scene.add(pointsL2)

    // 5. Layer 3: Faint Architectural Grid Wireframe (for Section 05)
    const gridHelper = new THREE.GridHelper(30, 30, 0x8e2417, 0x7a6f63)
    gridHelper.rotation.x = Math.PI / 2.2
    gridHelper.position.z = -10
    gridHelper.position.y = -2
    if (gridHelper.material) {
      gridHelper.material.transparent = true
      gridHelper.material.opacity = 0.0
    }
    scene.add(gridHelper)

    // 6. Color Management & Section State Interpolation
    const colorHero = new THREE.Color('#F4EFE6')
    const colorMaterial = new THREE.Color('#F0E8DC')
    const colorCraft = new THREE.Color('#EBE0D2')
    const colorStrength = new THREE.Color('#E6DACB')
    const colorProjects = new THREE.Color('#ECE5D8')
    const colorQuoteFooter = new THREE.Color('#0A0605')

    const currentBgColor = colorHero.clone()

    // Mouse Tracking for Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Scroll Tracking & Velocity
    let scrollY = window.scrollY
    let lastScrollY = window.scrollY
    let scrollVelocity = 0

    const handleScroll = () => {
      const curY = window.scrollY
      scrollVelocity = curY - lastScrollY
      lastScrollY = curY
      scrollY = curY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Lerp Smooth State Tracking
    const lerpState = {
      progress: 0,
      particleSpeedMult: 1.0,
      opacityMult: 1.0,
      gridOpacity: 0.0,
    }

    let animFrameId

    // 7. Render Loop
    const animate = () => {
      // Mouse lerp for camera parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      camera.position.x = mouse.x * 0.6
      camera.position.y = mouse.y * 0.4

      // Scroll velocity decay
      scrollVelocity *= 0.9

      // Scroll Ratio (0.0 to 1.0)
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      )
      const targetProgress = Math.min(1, Math.max(0, scrollY / maxScroll))

      lerpState.progress += (targetProgress - lerpState.progress) * 0.07
      const p = lerpState.progress

      // Section Color & Property Interpolation
      let targetColor = colorHero
      let targetSpeed = 1.0
      let targetOpacity = 1.0
      let targetGridOpacity = 0.0

      if (p < 0.15) {
        // SECTION 01 — HERO
        targetColor = colorHero
        targetSpeed = 1.0
        targetOpacity = 1.0
      } else if (p < 0.32) {
        // SECTION 02 — MATERIAL (Calms when settled)
        const t = (p - 0.15) / 0.17
        targetColor = colorHero.clone().lerp(colorMaterial, t)
        targetSpeed = 0.6 // Calms down as brick lands
        targetOpacity = 1.2
      } else if (p < 0.52) {
        // SECTION 03 — CRAFT / PROCESS (Heat flow & transformation)
        const t = (p - 0.32) / 0.2
        targetColor = colorMaterial.clone().lerp(colorCraft, t)
        targetSpeed = 1.6 + Math.abs(scrollVelocity) * 0.08
        targetOpacity = 1.1
      } else if (p < 0.70) {
        // SECTION 04 — STRENGTH / QUALITY (Slowed, solid, stable)
        const t = (p - 0.52) / 0.18
        targetColor = colorCraft.clone().lerp(colorStrength, t)
        targetSpeed = 0.25 // Stable, solid, heavy
        targetOpacity = 0.75
      } else if (p < 0.88) {
        // SECTION 05 — PROJECTS / APPLICATIONS (Blueprint Grid)
        const t = (p - 0.70) / 0.18
        targetColor = colorStrength.clone().lerp(colorProjects, t)
        targetSpeed = 0.6
        targetGridOpacity = Math.sin(t * Math.PI) * 0.06 // Faint architectural grid
      } else {
        // SECTION 06 — FINAL / QUOTE & FOOTER (Dark obsidian transition)
        const t = (p - 0.88) / 0.12
        targetColor = colorProjects.clone().lerp(colorQuoteFooter, t)
        targetSpeed = 0.4
        targetOpacity = 0.5
      }

      currentBgColor.lerp(targetColor, 0.07)
      lerpState.particleSpeedMult += (targetSpeed - lerpState.particleSpeedMult) * 0.07
      lerpState.opacityMult += (targetOpacity - lerpState.opacityMult) * 0.07
      lerpState.gridOpacity += (targetGridOpacity - lerpState.gridOpacity) * 0.07

      // Apply background color to canvas mount background
      if (mount) {
        mount.style.backgroundColor = `#${currentBgColor.getHexString()}`
      }

      // Update Grid Material Opacity
      if (gridHelper.material) {
        gridHelper.material.opacity = lerpState.gridOpacity
        gridHelper.position.y = -2 - (p * 5)
      }

      // Animate 3D Particles
      if (!isReducedMotion) {
        // Layer 1 Motion
        const pL1 = geoL1.attributes.position.array
        for (let i = 0; i < countL1 * 3; i += 3) {
          pL1[i] += velL1[i] * lerpState.particleSpeedMult
          pL1[i + 1] += velL1[i + 1] * lerpState.particleSpeedMult + scrollVelocity * 0.0015
          pL1[i + 2] += velL1[i + 2] * lerpState.particleSpeedMult

          // Wrap bounds
          if (pL1[i] > 13) pL1[i] = -13
          if (pL1[i] < -13) pL1[i] = 13
          if (pL1[i + 1] > 13) pL1[i + 1] = -13
          if (pL1[i + 1] < -13) pL1[i + 1] = 13
        }
        geoL1.attributes.position.needsUpdate = true

        // Layer 2 Motion
        const pL2 = geoL2.attributes.position.array
        for (let i = 0; i < countL2 * 3; i += 3) {
          pL2[i] += velL2[i] * lerpState.particleSpeedMult
          pL2[i + 1] += velL2[i + 1] * lerpState.particleSpeedMult + scrollVelocity * 0.002
          pL2[i + 2] += velL2[i + 2] * lerpState.particleSpeedMult

          // Wrap bounds
          if (pL2[i] > 10) pL2[i] = -10
          if (pL2[i] < -10) pL2[i] = 10
          if (pL2[i + 1] > 10) pL2[i + 1] = -10
          if (pL2[i + 1] < -10) pL2[i + 1] = 10
        }
        geoL2.attributes.position.needsUpdate = true
      }

      // Update Opacities
      matL1.opacity = 0.22 * lerpState.opacityMult
      matL2.opacity = 0.28 * lerpState.opacityMult

      // Parallax rotation of particle fields
      pointsL1.rotation.y = mouse.x * 0.05
      pointsL1.rotation.x = -mouse.y * 0.05
      pointsL2.rotation.y = mouse.x * 0.09
      pointsL2.rotation.x = -mouse.y * 0.09

      renderer.render(scene, camera)
      animFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      reducedMotionQuery.removeEventListener('change', handleMotionChange)
      if (animFrameId) cancelAnimationFrame(animFrameId)

      geoL1.dispose()
      matL1.dispose()
      geoL2.dispose()
      matL2.dispose()
      particleTexture.dispose()
      renderer.dispose()
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full transition-colors duration-500"
    />
  )
}
