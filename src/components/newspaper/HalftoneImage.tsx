import { useEffect, useRef, useState } from 'react'

interface HalftoneImageProps {
  src: string
  alt: string
  isDark: boolean
  /** Sizing / aspect classes for the frame, e.g. "aspect-[16/9]" */
  className?: string
  /** Focal point used for the object-fit: cover crop, as fractions (like object-position) */
  focus?: [x: number, y: number]
  /** Halftone cell size in CSS pixels (screen ruling); smaller = finer */
  cell?: number
  loading?: 'lazy' | 'eager'
}

// Classic newspaper screen angle for a single (black) plate
const SCREEN_ANGLE = Math.PI / 4

/**
 * Photograph reproduced as a newspaper halftone. Two layers:
 *  1. the photo itself in monochrome, lightly inked into the paper, which carries the detail;
 *  2. a 45° dot screen on a transparent canvas, each dot's area following the tone underneath.
 * Together they read clearly at a glance yet show the dot texture up close. Redraws on resize / theme change.
 */
export default function HalftoneImage({
  src,
  alt,
  isDark,
  className = '',
  focus = [0.5, 0.5],
  cell = 3,
  loading = 'lazy',
}: HalftoneImageProps) {
  const frameRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  // Lazy frames wait until they come within ~one screen of the viewport before downloading anything
  const [isNear, setIsNear] = useState(loading === 'eager')
  const [focusX, focusY] = focus

  useEffect(() => {
    if (isNear) return
    const frame = frameRef.current
    if (!frame) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [isNear])

  // Load the source once it is needed (same-origin asset, so its pixels can be read)
  useEffect(() => {
    if (!isNear) return
    let isActive = true
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      if (isActive) setImage(img)
    }
    img.src = src
    return () => {
      isActive = false
    }
  }, [src, isNear])

  useEffect(() => {
    const frame = frameRef.current
    const canvas = canvasRef.current
    if (!frame || !canvas || !image) return

    const draw = () => {
      const width = frame.clientWidth
      const height = frame.clientHeight
      if (width === 0 || height === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      // 1. Cover-crop the photo into a 1x sampling buffer, slightly softened so each dot reads an average tone
      const sample = document.createElement('canvas')
      sample.width = Math.ceil(width)
      sample.height = Math.ceil(height)
      const sctx = sample.getContext('2d', { willReadFrequently: true })
      if (!sctx) return
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
      const drawW = image.naturalWidth * scale
      const drawH = image.naturalHeight * scale
      // A light blur averages each cell without washing out edges
      sctx.filter = `blur(${cell * 0.18}px)`
      sctx.drawImage(image, (width - drawW) * focusX, (height - drawH) * focusY, drawW, drawH)
      const pixels = sctx.getImageData(0, 0, sample.width, sample.height).data

      const toneAt = (x: number, y: number) => {
        const px = Math.min(sample.width - 1, Math.max(0, Math.round(x)))
        const py = Math.min(sample.height - 1, Math.max(0, Math.round(y)))
        const i = (py * sample.width + px) * 4
        // Rec. 709 luma, 0 (black) .. 1 (white)
        return (0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2]) / 255
      }

      // 2. Draw the dot screen
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      // Light mode: ink dots for shadows. Dark mode: light dots for highlights (a reversed plate).
      ctx.fillStyle = isDark ? 'rgb(232 228 221 / 0.78)' : 'rgb(29 26 23 / 0.8)'

      const cos = Math.cos(SCREEN_ANGLE)
      const sin = Math.sin(SCREEN_ANGLE)
      const reach = Math.hypot(width, height)
      const maxRadius = cell * 0.62 // dots just touch in the deepest shadows, like a real screen

      ctx.beginPath()
      for (let v = -reach; v <= reach; v += cell) {
        for (let u = -reach; u <= reach; u += cell) {
          // Rotate the grid about the frame centre
          const x = width / 2 + u * cos - v * sin
          const y = height / 2 + u * sin + v * cos
          if (x < -cell || y < -cell || x > width + cell || y > height + cell) continue

          const tone = toneAt(x, y)
          // Ink coverage: clip the paper-white highlights, then a slight gamma to open up the midtones
          // (newsprint gains dot size on press, so screens are prepared lighter than the photo)
          const ink = isDark ? tone : 1 - tone
          const coverage = Math.pow(Math.min(1, Math.max(0, (ink - 0.08) * 1.1)), 1.2)
          if (coverage < 0.015) continue
          const r = maxRadius * Math.sqrt(coverage)
          ctx.moveTo(x + r, y)
          ctx.arc(x, y, r, 0, Math.PI * 2)
        }
      }
      ctx.fill()
    }

    draw()
    const observer = new ResizeObserver(draw)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [image, isDark, cell, focusX, focusY])

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      {/* Continuous-tone base: the photo in monochrome, inked lightly into the paper */}
      <img
        src={isNear ? src : undefined}
        alt={alt}
        className="halftone-base absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: `${focusX * 100}% ${focusY * 100}%` }}
      />
      {/* Dot screen on top */}
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />
    </div>
  )
}
