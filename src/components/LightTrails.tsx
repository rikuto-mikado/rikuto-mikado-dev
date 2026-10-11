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

    const createParticle = (spawnAnywhere = false): Particle => {
      const isMobile = width < 768
      const isSmallMobile = width < 480
      const colorScheme = palette[Math.floor(Math.random() * palette.length)]

      // Classification into 3 depth tiers: ambient dust, main stream, shooting meteor
      const roll = Math.random()
      const layer: 'ambient' | 'stream' | 'meteor' =
        roll < 0.3 ? 'ambient' : roll < 0.85 ? 'stream' : 'meteor'

      let speedX: number
      let size: number
      let maxHistory: number
      let alpha: number

      if (layer === 'ambient') {
        speedX = isMobile ? 0.4 : 0.7
        size = isMobile ? 0.9 : 1.2
        maxHistory = isMobile ? 5 : 8
        alpha = 0.4
      } else if (layer === 'stream') {
        speedX = isMobile ? 0.9 : 1.4
        size = isMobile ? 1.3 : 1.8
        maxHistory = isMobile ? 10 : 16
        alpha = 0.75
      } else {
        speedX = isMobile ? 1.5 : 2.2
        size = isMobile ? 1.6 : 2.4
        maxHistory = isMobile ? 14 : 22
        alpha = 0.95
      }

      // Restrict vertical amplitude on small mobile screens to keep negative space clean
      const wobbleAmp = isSmallMobile
        ? Math.random() * 8 + 5
        : isMobile
        ? Math.random() * 14 + 7
        : Math.random() * 24 + 10

      const startX = spawnAnywhere ? Math.random() * width : -Math.random() * 70 - 15
      const baseY = Math.random() * height

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
      }
    }

    // Particle count optimization to eliminate mobile overcrowding
    // Mobile (<480px): ~7 particles
    // Tablet (<768px): ~11 particles
    // Desktop: ~19 particles
    const initParticles = () => {
      const isSmallMobile = width < 480
      const isMobile = width < 768
      const count = isSmallMobile ? 7 : isMobile ? 11 : 19

      particles = []
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(true))
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

      // 2. Proximity links between nearby particles (classic constellation effect)
      const maxConnectDistance = width < 768 ? 85 : 120
      ctx.save()
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxConnectDistance) {
            const lineAlpha = (1 - dist / maxConnectDistance) * 0.18
            ctx.strokeStyle = `rgba(212, 163, 115, ${lineAlpha})`
            ctx.lineWidth = 0.6
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

        // Undulating sine wave motion
        const wave =
          Math.sin(p.x * p.wobbleFreq + p.phase + time * p.wobbleSpeed) *
          p.wobbleAmp
        let currentY = p.baseY + wave

        // Cursor avoidance force
        const dx = p.x - mouse.x
        const dy = currentY - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (1 - dist / 150) * 12
          currentY += (dy / (dist || 1)) * force
        }

        p.y = currentY

        // Track movement history for smooth trailing
        p.history.unshift({ x: p.x, y: p.y })
        if (p.history.length > p.maxHistory) {
          p.history.pop()
        }

        // 3a. Smooth tapered trailing light tail
        if (p.history.length > 2) {
          ctx.save()
          for (let i = 0; i < p.history.length - 1; i++) {
            const p1 = p.history[i]
            const p2 = p.history[i + 1]

            const ratio = 1 - i / p.history.length
            const trailAlpha = p.alpha * Math.pow(ratio, 1.3) * 0.7
            const trailWidth = Math.max(0.3, p.size * ratio * 0.95)

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `${p.color.tail}${trailAlpha})`
            ctx.lineWidth = trailWidth
            ctx.lineCap = 'round'
            ctx.stroke()
          }
          ctx.restore()
        }

        // 3b. Classic glowing orb core (pure circular radial gradient)
        const pulse = Math.sin(time * p.pulseSpeed + p.phase) * 0.18 + 0.82
        const currentSize = p.size * pulse

        ctx.save()
        // Outer soft glow
        const glowRadius = currentSize * (p.layer === 'meteor' ? 4.0 : 3.0)
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
        ctx.fillStyle = p.color.core
        ctx.shadowColor = p.color.glow
        ctx.shadowBlur = p.layer === 'meteor' ? 10 : 6
        ctx.fill()
        ctx.restore()

        // Respawn on the left when leaving the right edge
        if (p.x - p.maxHistory * 12 > width + 30) {
          particles[idx] = createParticle(false)
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
      style={{ zIndex: 5 }}
      aria-hidden="true"
    />
  )
}
