import { useEffect, useRef } from 'react'

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
      const count = particles.length || (width < 480 ? 10 : width < 768 ? 12 : 15)

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

    // Helper to pre-calculate movement history for seamless rendering without pop-in on initial load
    const prewarmHistory = (p: Particle) => {
      p.history = []
      for (let h = 0; h < p.maxHistory; h++) {
        const pastX = p.x - p.speedX * h
        const pastWave =
          Math.sin(pastX * p.wobbleFreq + p.phase) * p.wobbleAmp
        p.history.push({ x: pastX, y: p.baseY + pastWave })
      }
    }

    const createParticle = (
      spawnAnywhere = false,
      forcedBaseY?: number,
      forcedLayer?: 'ambient' | 'stream' | 'meteor'
    ): Particle => {
      const isMobile = width < 768
      const isSmallMobile = width < 480
      const colorScheme = palette[Math.floor(Math.random() * palette.length)]

      // Balanced depth distribution: high proportion of prominent flowing meteors and streams
      let layer: 'ambient' | 'stream' | 'meteor'
      if (forcedLayer) {
        layer = forcedLayer
      } else {
        const roll = Math.random()
        layer = roll < 0.15 ? 'ambient' : roll < 0.65 ? 'stream' : 'meteor'
      }

      let speedX: number
      let size: number
      let maxHistory: number
      let alpha: number

      // Speed calibrated: Mobile speeds gently softened (~35%) for comfortable observation across narrow displays
      if (layer === 'ambient') {
        speedX = isSmallMobile ? 0.38 : isMobile ? 0.44 : 0.75
        size = isMobile ? 0.9 : 1.2
        maxHistory = isMobile ? 8 : 10
        alpha = 0.45
      } else if (layer === 'stream') {
        speedX = isSmallMobile ? 0.68 : isMobile ? 0.74 : 1.25
        size = isMobile ? 1.4 : 1.8
        maxHistory = isSmallMobile ? 20 : isMobile ? 22 : 25
        alpha = 0.8
      } else {
        speedX = isSmallMobile ? 0.92 : isMobile ? 1.02 : 1.65
        size = isMobile ? 1.9 : 2.6
        maxHistory = isSmallMobile ? 24 : isMobile ? 28 : 32
        alpha = 0.95
      }

      // Controlled organic sine wave amplitude (gentle, continuous, no abrupt twitching)
      const wobbleAmp = isSmallMobile
        ? Math.random() * 5 + 4
        : isMobile
        ? Math.random() * 7 + 5
        : Math.random() * 10 + 7

      // Respawn buffer: enters smoothly from just behind left boundary
      const buffer = isSmallMobile
        ? Math.random() * 25 + 12
        : isMobile
        ? Math.random() * 35 + 15
        : Math.random() * 55 + 20
      const startX = spawnAnywhere ? Math.random() * width : -buffer

      const baseY = forcedBaseY !== undefined ? forcedBaseY : getAvailableBaseY()

      const p: Particle = {
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
      }

      prewarmHistory(p)
      return p
    }

    // Particle count optimization (Mobile: 10, Tablet: 12, PC: 15)
    // Instantaneous screen coverage: eliminates any initial cooldown or empty periods on load
    const initParticles = () => {
      const isSmallMobile = width < 480
      const isMobile = width < 768
      const count = isSmallMobile ? 10 : isMobile ? 12 : 15

      particles = []

      for (let i = 0; i < count; i++) {
        const baseY = getAvailableBaseY(i)
        // Ensure healthy proportion of meteors and streams across the sky
        let layer: 'ambient' | 'stream' | 'meteor'
        if (i % 3 === 0) layer = 'meteor'
        else if (i % 3 === 1) layer = 'stream'
        else layer = Math.random() < 0.7 ? 'stream' : 'ambient'

        // Evenly stagger across the viewport so multiple comets are visible immediately on frame 0
        const segment = (width + 30) / count
        const startX = -15 + (i + 0.5) * segment + (Math.random() - 0.5) * (segment * 0.35)

        const p = createParticle(false, baseY, layer)
        p.x = startX
        prewarmHistory(p)
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

      // 3. Flowing particles and smooth tapered light trails (Classic, elegant comet & streams)
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

        // 3a. Smooth tapered trailing light tail
        if (p.history.length > 2) {
          ctx.save()

          // Main smooth tapered comet plume
          for (let i = 0; i < p.history.length - 1; i++) {
            const p1 = p.history[i]
            const p2 = p.history[i + 1]

            const ratio = 1 - i / p.history.length
            const trailAlpha = p.alpha * Math.pow(ratio, 1.25) * 0.72
            const trailWidth = Math.max(0.35, p.size * ratio * 1.1)

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `${p.color.tail}${trailAlpha})`
            ctx.lineWidth = trailWidth
            ctx.lineCap = 'round'
            ctx.stroke()
          }

          // Subtle hot incandescent filament in the front portion of prominent meteor trails
          if (p.layer === 'meteor' && p.history.length > 4) {
            const innerLen = Math.floor(p.history.length * 0.6)
            for (let i = 0; i < innerLen - 1; i++) {
              const p1 = p.history[i]
              const p2 = p.history[i + 1]

              const ratio = 1 - i / innerLen
              const innerAlpha = p.alpha * Math.pow(ratio, 1.2) * 0.65
              const innerWidth = Math.max(0.28, p.size * ratio * 0.55)

              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(255, 252, 245, ${innerAlpha})`
              ctx.lineWidth = innerWidth
              ctx.lineCap = 'round'
              ctx.stroke()
            }
          }

          ctx.restore()
        }

        // 3b. Classic glowing celestial orb core (pure radial glow + starlight nucleus)
        const pulse = Math.sin(time * p.pulseSpeed + p.phase) * 0.18 + 0.82
        const currentSize = p.size * pulse

        ctx.save()
        // Outer soft glow aura
        const glowMultiplier = p.layer === 'meteor' ? 4.2 : p.layer === 'stream' ? 3.4 : 2.6
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
        grad.addColorStop(0.35, p.color.glow)
        grad.addColorStop(1, 'rgba(212, 163, 115, 0)')

        ctx.beginPath()
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Inner bright focal core
        ctx.beginPath()
        ctx.arc(p.x, p.y, currentSize * 0.75, 0, Math.PI * 2)
        ctx.fillStyle = p.layer === 'meteor' ? '#FFFFFF' : p.color.core
        ctx.shadowColor = p.color.glow
        ctx.shadowBlur = p.layer === 'meteor' ? 12 : 7
        ctx.fill()
        ctx.restore()

        // Respawn cleanly on the left once the entire tail exits the screen right
        const tailLength = p.speedX * p.maxHistory
        if (p.x - tailLength > width + 20) {
          particles[idx] = createParticle(false, getAvailableBaseY())
        }
      })

      // Continuous Celestial Flow Guarantee:
      // Mathematically guarantees at least 1 prominent comet on mobile, and at least 2 on desktop at all times
      const isMobileDevice = width < 768
      const minVisibleComets = isMobileDevice ? 1 : 2

      let visibleCometCount = 0
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (p.layer !== 'ambient' && p.x >= -20 && p.x <= width + 20) {
          visibleCometCount++
        }
      }

      if (visibleCometCount < minVisibleComets) {
        // Find an off-screen particle to immediately glide in from the left
        let candidateIdx = -1
        let maxDist = -1

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          if (p.x < -20) {
            const dist = -p.x
            if (dist > maxDist) {
              maxDist = dist
              candidateIdx = i
            }
          } else if (p.x > width + 20) {
            const dist = p.x - width
            if (dist > maxDist) {
              maxDist = dist
              candidateIdx = i
            }
          }
        }

        if (candidateIdx !== -1) {
          const p = particles[candidateIdx]
          p.layer = Math.random() < 0.45 ? 'meteor' : 'stream'
          p.baseY = getAvailableBaseY()
          p.x = -(Math.random() * 12 + 6)
          prewarmHistory(p)
        }
      }

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
