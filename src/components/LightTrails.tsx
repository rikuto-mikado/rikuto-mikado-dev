import { useEffect, useRef } from 'react'

interface Satellite {
  radiusX: number
  radiusY: number
  rotation: number
  speed: number
  angle: number
  size: number
  color: string
  glowColor: string
  history: { x: number; y: number }[]
  maxHistory: number
}

interface Particle {
  x: number
  y: number
  baseY: number
  speedX: number
  size: number
  wobbleAmp: number
  wobbleFreq: number
  wobbleSpeed: number
  phase: number
  color: {
    core: string
    glow: string
    tail: string
  }
  history: { x: number; y: number }[]
  maxHistory: number
  alpha: number
  pulseSpeed: number
  layer: 'ambient' | 'stream' | 'meteor'
  satellites: Satellite[]
}

interface WaveBeam {
  baseYRatio: number
  amplitude: number
  frequency: number
  speed: number
  phase: number
  width: number
  alpha: number
  colorRgb: string
}

interface LightTrailsProps {
  className?: string
}

export default function LightTrails({ className = '' }: LightTrailsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    let time = 0

    // Coordinates for smooth cursor interaction
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 }

    // Color palette calibrated for both cream (#F5F4F0) and dark green (#344432) backgrounds
    const palette = [
      {
        core: '#FFFFFF',
        glow: 'rgba(235, 185, 120, 0.85)',
        tail: 'rgba(212, 163, 115, ',
      },
      {
        core: '#FFF9E6',
        glow: 'rgba(240, 195, 130, 0.75)',
        tail: 'rgba(224, 155, 78, ',
      },
      {
        core: '#FFF2D6',
        glow: 'rgba(195, 140, 85, 0.7)',
        tail: 'rgba(180, 115, 65, ',
      },
    ]

    // Background sine wave beams (classic fluid wave aesthetic)
    const getWaveBeams = (isMobile: boolean): WaveBeam[] => [
      {
        baseYRatio: 0.35,
        amplitude: isMobile ? 16 : 30,
        frequency: isMobile ? 0.0024 : 0.0015,
        speed: 0.006,
        phase: 0,
        width: isMobile ? 0.8 : 1.2,
        alpha: 0.2,
        colorRgb: '212, 163, 115',
      },
      {
        baseYRatio: 0.65,
        amplitude: isMobile ? 20 : 38,
        frequency: isMobile ? 0.002 : 0.0012,
        speed: 0.004,
        phase: Math.PI * 0.7,
        width: isMobile ? 0.9 : 1.4,
        alpha: 0.16,
        colorRgb: '224, 155, 78',
      },
    ]

    let waveBeams: WaveBeam[] = []
    let particles: Particle[] = []

    // Calculate a spaced baseY to mathematically prevent particles from overlapping on the Y-axis
    const getAvailableBaseY = (slotIndex?: number): number => {
      const topPadding = height * 0.06
      const usableHeight = height * 0.88
      const count = particles.length || (width < 480 ? 10 : width < 768 ? 13 : 16)

      // When initializing, divide screen into stratified lanes with gentle organic jitter
      if (slotIndex !== undefined) {
        const laneHeight = usableHeight / count
        const jitter = (Math.random() - 0.5) * (laneHeight * 0.45)
        return topPadding + (slotIndex + 0.5) * laneHeight + jitter
      }

      // When respawning, pick a Y location that maximizes vertical distance from existing particles
      const minDistance = width < 768 ? 44 : 58
      let bestY = Math.random() * usableHeight + topPadding
      let bestScore = -1

      for (let attempt = 0; attempt < 16; attempt++) {
        const candidateY = Math.random() * usableHeight + topPadding
        let nearestDist = Infinity

        for (const p of particles) {
          // Weight nearby particles more heavily if they are in the left 60% of the screen
          const isLeft = p.x < width * 0.6
          const distWeight = isLeft ? 1.0 : 0.65
          const dist = Math.abs(p.baseY - candidateY) * distWeight
          if (dist < nearestDist) {
            nearestDist = dist
          }
        }

        if (nearestDist >= minDistance) {
          return candidateY
        }
        if (nearestDist > bestScore) {
          bestScore = nearestDist
          bestY = candidateY
        }
      }

      return bestY
    }

    const createParticle = (
      spawnAnywhere = false,
      forcedBaseY?: number,
      forcedLayer?: 'ambient' | 'stream' | 'meteor'
    ): Particle => {
      const isMobile = width < 768
      const isSmallMobile = width < 480
      const colorScheme = palette[Math.floor(Math.random() * palette.length)]

      // Balanced depth distribution: prominent comets & streams with ambient depth
      let layer: 'ambient' | 'stream' | 'meteor'
      if (forcedLayer) {
        layer = forcedLayer
      } else {
        const roll = Math.random()
        layer = roll < 0.15 ? 'ambient' : roll < 0.70 ? 'stream' : 'meteor'
      }

      let speedX: number
      let size: number
      let maxHistory: number
      let alpha: number

      if (layer === 'ambient') {
        speedX = isMobile ? 0.6 : 0.8
        size = isMobile ? 0.9 : 1.2
        maxHistory = isMobile ? 6 : 9
        alpha = 0.45
      } else if (layer === 'stream') {
        speedX = isMobile ? 1.0 : 1.3
        size = isMobile ? 1.4 : 1.9
        maxHistory = isMobile ? 14 : 22
        alpha = 0.8
      } else {
        speedX = isMobile ? 1.45 : 1.8
        size = isMobile ? 1.8 : 2.6
        maxHistory = isMobile ? 18 : 28
        alpha = 0.95
      }

      // Controlled wave amplitude to prevent cross-lane collision and visual clutter
      const wobbleAmp = isSmallMobile
        ? Math.random() * 5 + 4
        : isMobile
        ? Math.random() * 8 + 5
        : Math.random() * 11 + 7

      // Spawn distribution: spread across width on init, smoothly staggered behind left edge on respawn
      const startX = spawnAnywhere
        ? Math.random() * width
        : -Math.random() * (isMobile ? 130 : 200) - 25

      const baseY = forcedBaseY !== undefined ? forcedBaseY : getAvailableBaseY()

      // 1 to 3 satellites revolving around the particle
      const satCount =
        layer === 'ambient'
          ? Math.random() < 0.6 ? 1 : 2
          : layer === 'stream'
          ? Math.floor(Math.random() * 3) + 1
          : Math.floor(Math.random() * 2) + 2

      const satellites: Satellite[] = []
      for (let s = 0; s < satCount; s++) {
        // Orbit radius scaled cleanly to screen size to avoid crowding on narrow mobile displays
        const baseRadius = (isMobile ? 7 : 10) + s * (isMobile ? 3.5 : 5.5) + Math.random() * 2.5
        const radiusX = baseRadius
        const radiusY = radiusX * (Math.random() * 0.28 + 0.42)
        const rotation = Math.random() * Math.PI
        const dir = Math.random() < 0.5 ? 1 : -1
        const speed = dir * (Math.random() * 0.018 + 0.024)
        const initialAngle = (Math.PI * 2 * s) / satCount + (Math.random() - 0.5) * 0.6
        const satSize = Math.max(0.5, size * (Math.random() * 0.2 + 0.32))

        satellites.push({
          radiusX,
          radiusY,
          rotation,
          speed,
          angle: initialAngle,
          size: satSize,
          color: colorScheme.core,
          glowColor: colorScheme.glow,
          history: [],
          maxHistory: isMobile ? 3 : 5,
        })
      }

      return {
        x: startX,
        y: baseY,
        baseY,
        speedX,
        size,
        wobbleAmp,
        wobbleFreq: Math.random() * 0.0025 + 0.0015,
        wobbleSpeed: Math.random() * 0.015 + 0.008,
        phase: Math.random() * Math.PI * 2,
        color: colorScheme,
        history: [],
        maxHistory,
        alpha,
        pulseSpeed: Math.random() * 0.025 + 0.015,
        layer,
        satellites,
      }
    }

    // Particle count optimization: optimal balance (PC: 16, Tablet: 13, Mobile: 10)
    // Seamless pipeline initialization: eliminates any initial cooldown or empty periods
    const initParticles = () => {
      const isSmallMobile = width < 480
      const isMobile = width < 768
      const count = isSmallMobile ? 10 : isMobile ? 13 : 16

      particles = []
      // Pipeline covers the left inbound buffer (-leftBuffer) through the visible screen width
      const leftBuffer = isMobile ? 220 : 340
      const totalSpan = width + leftBuffer

      for (let i = 0; i < count; i++) {
        const baseY = getAvailableBaseY(i)
        // Ensure balanced proportion of meteors, streams, and ambient dust
        let layer: 'ambient' | 'stream' | 'meteor'
        if (i % 3 === 0) layer = 'meteor'
        else if (i % 3 === 1) layer = 'stream'
        else layer = Math.random() < 0.6 ? 'stream' : 'ambient'

        // Evenly distribute X across the pipeline so there is NEVER a vacuum or cooldown period
        const slice = totalSpan / count
        const startX = -leftBuffer + (i + 0.5) * slice + (Math.random() - 0.5) * (slice * 0.45)

        const p = createParticle(false, baseY, layer)
        p.x = startX

        // Pre-warm movement history so tails are already gloriously formed from the very first frame
        p.history = []
        for (let h = 0; h < p.maxHistory; h++) {
          const pastX = p.x - p.speedX * h
          const pastWave =
            Math.sin(pastX * p.wobbleFreq + p.phase) * p.wobbleAmp
          p.history.push({ x: pastX, y: p.baseY + pastWave })
        }

        // Pre-warm satellite histories
        p.satellites.forEach((sat) => {
          sat.history = []
          for (let h = 0; h < sat.maxHistory; h++) {
            const pastAngle = sat.angle - sat.speed * h
            const cosA = Math.cos(pastAngle)
            const sinA = Math.sin(pastAngle)
            const unrotX = cosA * sat.radiusX
            const unrotY = sinA * sat.radiusY
            const cosR = Math.cos(sat.rotation)
            const sinR = Math.sin(sat.rotation)
            const relX = unrotX * cosR - unrotY * sinR
            const relY = unrotX * sinR + unrotY * cosR

            const pastParent = p.history[Math.min(h, p.history.length - 1)] || { x: p.x, y: p.y }
            sat.history.push({ x: pastParent.x + relX, y: pastParent.y + relY })
          }
        })

        particles.push(p)
      }
    }

    // High-DPI screen scaling
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const isMobile = width < 768
      waveBeams = getWaveBeams(isMobile)
      initParticles()
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.targetX = -1000
      mouse.targetY = -1000
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Pause when tab is inactive to preserve CPU / battery
    let isVisible = true
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Main animation loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      time += 1

      // Smooth cursor interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06
      mouse.y += (mouse.targetY - mouse.y) * 0.06

      ctx.clearRect(0, 0, width, height)

      // 1. Ambient undulating sine beams
      waveBeams.forEach((beam) => {
        const baseY = height * beam.baseYRatio
        ctx.save()

        // Gradient fading at both viewport edges
        const grad = ctx.createLinearGradient(0, 0, width, 0)
        grad.addColorStop(0, `rgba(${beam.colorRgb}, 0)`)
        grad.addColorStop(0.18, `rgba(${beam.colorRgb}, ${beam.alpha})`)
        grad.addColorStop(0.82, `rgba(${beam.colorRgb}, ${beam.alpha})`)
        grad.addColorStop(1, `rgba(${beam.colorRgb}, 0)`)

        ctx.strokeStyle = grad
        ctx.lineWidth = beam.width
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.shadowColor = `rgba(${beam.colorRgb}, 0.4)`
        ctx.shadowBlur = 10

        ctx.beginPath()
        const step = width < 768 ? 20 : 16
        let first = true

        for (let x = -20; x <= width + 20; x += step) {
          const wave1 =
            Math.sin(x * beam.frequency + beam.phase + time * beam.speed) *
            beam.amplitude
          const wave2 =
            Math.cos(x * beam.frequency * 0.7 - time * beam.speed * 0.6) *
            (beam.amplitude * 0.35)

          // Subtle displacement near mouse
          const dx = x - mouse.x
          const dy = baseY + wave1 + wave2 - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const displace =
            dist < 180 ? Math.sin((1 - dist / 180) * Math.PI) * 20 : 0

          const y = baseY + wave1 + wave2 + displace

          if (first) {
            ctx.moveTo(x, y)
            first = false
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
        ctx.restore()
      })

      // 2. Proximity links between nearby particles (subtle constellation effect)
      const maxConnectDistance = width < 768 ? 50 : 72
      ctx.save()
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxConnectDistance) {
            const lineAlpha = (1 - dist / maxConnectDistance) * 0.12
            ctx.strokeStyle = `rgba(212, 163, 115, ${lineAlpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }
      ctx.restore()

      // 3. Flowing particles and smooth tapered light trails
      particles.forEach((p, idx) => {
        p.x += p.speedX

        // Smooth continuous sine wave trajectory (no jerky mouse avoidance jumps)
        const wave =
          Math.sin(p.x * p.wobbleFreq + p.phase + time * p.wobbleSpeed) *
          p.wobbleAmp
        p.y = p.baseY + wave

        // Track movement history for smooth trailing
        p.history.unshift({ x: p.x, y: p.y })
        if (p.history.length > p.maxHistory) {
          p.history.pop()
        }

        // 3a. Update & compute satellite orbital positions around parent particle
        interface ComputedSatellite {
          sat: Satellite
          x: number
          y: number
          depth: number
        }

        const computedSatellites: ComputedSatellite[] = p.satellites.map((sat) => {
          sat.angle += sat.speed

          const cosA = Math.cos(sat.angle)
          const sinA = Math.sin(sat.angle)

          // 2D tilted orbital plane
          const unrotX = cosA * sat.radiusX
          const unrotY = sinA * sat.radiusY

          const cosR = Math.cos(sat.rotation)
          const sinR = Math.sin(sat.rotation)

          const relX = unrotX * cosR - unrotY * sinR
          const relY = unrotX * sinR + unrotY * cosR

          const satX = p.x + relX
          const satY = p.y + relY

          sat.history.unshift({ x: satX, y: satY })
          if (sat.history.length > sat.maxHistory) {
            sat.history.pop()
          }

          return {
            sat,
            x: satX,
            y: satY,
            depth: sinA, // > 0: in front of parent, <= 0: behind parent
          }
        })

        // Satellite renderer helper
        const drawSatellite = (comp: ComputedSatellite) => {
          const { sat, x: satX, y: satY, depth } = comp
          const depthFactor = (depth + 1) * 0.5 // 0 (far behind) to 1 (near front)
          const currentAlpha = p.alpha * (0.35 + depthFactor * 0.55)
          const currentSatSize = sat.size * (0.75 + depthFactor * 0.45)

          // Satellite mini helical tail
          if (sat.history.length > 1) {
            ctx.save()
            for (let h = 0; h < sat.history.length - 1; h++) {
              const h1 = sat.history[h]
              const h2 = sat.history[h + 1]
              const ratio = 1 - h / sat.history.length
              const tailAlpha = currentAlpha * Math.pow(ratio, 1.2) * 0.6
              ctx.beginPath()
              ctx.moveTo(h1.x, h1.y)
              ctx.lineTo(h2.x, h2.y)
              ctx.strokeStyle = `${p.color.tail}${tailAlpha})`
              ctx.lineWidth = Math.max(0.25, currentSatSize * ratio * 0.85)
              ctx.lineCap = 'round'
              ctx.stroke()
            }
            ctx.restore()
          }

          // Satellite glow & orb
          ctx.save()
          const satGlowRadius = currentSatSize * (depth > 0 ? 3.2 : 2.0)
          const satGrad = ctx.createRadialGradient(
            satX,
            satY,
            0,
            satX,
            satY,
            satGlowRadius
          )
          satGrad.addColorStop(0, sat.color)
          satGrad.addColorStop(0.35, sat.glowColor)
          satGrad.addColorStop(1, 'rgba(212, 163, 115, 0)')

          ctx.beginPath()
          ctx.arc(satX, satY, satGlowRadius, 0, Math.PI * 2)
          ctx.fillStyle = satGrad
          ctx.fill()

          // Satellite core dot
          ctx.beginPath()
          ctx.arc(satX, satY, currentSatSize * 0.75, 0, Math.PI * 2)
          ctx.fillStyle = sat.color
          if (depth > 0) {
            ctx.shadowColor = sat.glowColor
            ctx.shadowBlur = 5
          }
          ctx.fill()
          ctx.restore()
        }

        // Draw satellites behind parent (depth <= 0)
        computedSatellites
          .filter((s) => s.depth <= 0)
          .forEach(drawSatellite)

        // 3b. Majestic Dual-Layer Comet Tail (Soft Amber Sheath + Incandescent Inner Filament)
        if (p.history.length > 2) {
          ctx.save()

          // Layer 1: Outer soft glowing sheath (amber/terracotta plume)
          for (let i = 0; i < p.history.length - 1; i++) {
            const p1 = p.history[i]
            const p2 = p.history[i + 1]
            const ratio = 1 - i / p.history.length

            // Non-linear plume curve: thicker near head, softly tapering backward
            const plumeWidth = Math.max(0.4, p.size * Math.pow(ratio, 0.7) * 1.5)
            const outerAlpha = p.alpha * Math.pow(ratio, 1.25) * 0.65

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `${p.color.tail}${outerAlpha})`
            ctx.lineWidth = plumeWidth
            ctx.lineCap = 'round'
            ctx.stroke()
          }

          // Layer 2: Inner hot white-gold filament (runs through head and mid-tail)
          const coreFilamentLength = Math.max(2, Math.floor(p.history.length * 0.7))
          for (let i = 0; i < coreFilamentLength - 1; i++) {
            const p1 = p.history[i]
            const p2 = p.history[i + 1]
            const ratio = 1 - i / coreFilamentLength

            const innerWidth = Math.max(0.25, p.size * ratio * 0.6)
            const innerAlpha = p.alpha * Math.pow(ratio, 1.1) * 0.95

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            // Starts incandescent diamond-white, blending with subtle ivory
            ctx.strokeStyle = `rgba(255, 252, 245, ${innerAlpha})`
            ctx.lineWidth = innerWidth
            ctx.lineCap = 'round'
            ctx.stroke()
          }

          ctx.restore()
        }

        // 3c. Luminous Comet Nucleus with Astronomical Anamorphic Flare
        const pulse = Math.sin(time * p.pulseSpeed + p.phase) * 0.18 + 0.82
        const currentSize = p.size * pulse

        ctx.save()

        // 1. Soft radial celestial aura (bloom corona)
        const glowMultiplier = p.layer === 'meteor' ? 4.6 : p.layer === 'stream' ? 3.6 : 2.8
        const glowRadius = currentSize * glowMultiplier
        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          glowRadius
        )
        grad.addColorStop(0, p.color.core)
        grad.addColorStop(0.32, p.color.glow)
        grad.addColorStop(1, 'rgba(212, 163, 115, 0)')

        ctx.beginPath()
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // 2. Optical Anamorphic Cross-Flare on prominent streams & meteors
        if (p.layer !== 'ambient') {
          const isMeteor = p.layer === 'meteor'
          const flareLength = currentSize * (isMeteor ? 3.6 : 2.6)
          const flareAlpha = p.alpha * (isMeteor ? 0.85 : 0.6) * pulse

          // Horizontal anamorphic streak (aligned with rightward orbital travel)
          ctx.beginPath()
          ctx.moveTo(p.x - flareLength * 0.5, p.y)
          ctx.lineTo(p.x + flareLength, p.y)
          ctx.strokeStyle = `rgba(255, 252, 242, ${flareAlpha})`
          ctx.lineWidth = Math.max(0.4, currentSize * 0.28)
          ctx.lineCap = 'round'
          ctx.stroke()

          // Subtle vertical cross streak (starlight twinkle)
          const vertLength = flareLength * 0.42
          ctx.beginPath()
          ctx.moveTo(p.x, p.y - vertLength)
          ctx.lineTo(p.x, p.y + vertLength)
          ctx.strokeStyle = `rgba(255, 248, 230, ${flareAlpha * 0.7})`
          ctx.lineWidth = Math.max(0.3, currentSize * 0.22)
          ctx.lineCap = 'round'
          ctx.stroke()
        }

        // 3. Incandescent focal core (pure white high-intensity nucleus)
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentSize * 0.75, 0, Math.PI * 2)
        ctx.fillStyle = '#FFFFFF'
        ctx.shadowColor = p.color.glow
        ctx.shadowBlur = p.layer === 'meteor' ? 14 : 8
        ctx.fill()

        ctx.restore()

        // 3d. Draw satellites in front of parent (depth > 0)
        computedSatellites
          .filter((s) => s.depth > 0)
          .forEach(drawSatellite)

        // Respawn cleanly on the left once the entire tail exits the screen right
        const tailLength = p.speedX * p.maxHistory
        if (p.x - tailLength > width + 25) {
          particles[idx] = createParticle(false, getAvailableBaseY())
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 15 }}
      aria-hidden="true"
    />
  )
}
