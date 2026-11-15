import { useEffect, useRef } from 'react'

export default function ParticleText({
  text = 'Ideas into reality',
  particleSize = 2,
  density = 4,
  color = 'currentColor',
  highlightColor = '#ff5a36',
  highlightMode = 'motion',
  shape = 'circle',
  intro = 'gather',
  scatter = 180,
  gatherDuration = 1600,
  stagger = 420,
  clickBurst = true,
  burstStrength = 1,
  pointerRepel = 40,
  repelRadius = 120,
  idleDrift = 0.7,
  trigger = 'hover',
  fontSize = 'clamp(2rem, 5vw, 4.5rem)',
  fontWeight = 800,
  fontFamily = 'inherit',
  glow = true,
  className = '',
}) {
  const canvasRef = useRef(null)
  const stateRef = useRef({ active: trigger !== 'hover', pointer: null, burst: null })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d', { alpha: true })
    const state = stateRef.current
    let particles = []
    let width = 0
    let height = 0
    let frame = 0
    let startTime = performance.now()
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const style = getComputedStyle(canvas)
      const fontPx = Math.max(25, parseFloat(style.fontSize) || 56)
      const offscreen = document.createElement('canvas')
      offscreen.width = Math.round(width)
      offscreen.height = Math.round(height)
      const off = offscreen.getContext('2d', { willReadFrequently: true })
      off.font = `${fontWeight} ${fontPx}px ${fontFamily === 'inherit' ? style.fontFamily : fontFamily}`
      off.textAlign = 'center'
      off.textBaseline = 'middle'
      off.fillStyle = '#fff'
      off.fillText(text, width / 2, height / 2, width * 0.94)
      const pixels = off.getImageData(0, 0, offscreen.width, offscreen.height).data
      const step = Math.max(3, Math.round(density * 2))
      const targets = []
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          if (pixels[(y * offscreen.width + x) * 4 + 3] > 96) targets.push({ x, y })
        }
      }
      particles = targets.map((target, index) => {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * scatter + 18
        return {
          ...target,
          targetX: target.x,
          targetY: target.y,
          x: target.x + Math.cos(angle) * distance,
          y: target.y + Math.sin(angle) * distance,
          phase: Math.random() * Math.PI * 2,
          order: (index * 71) % Math.max(targets.length, 1),
        }
      })
    }

    const pointFromEvent = (event) => {
      const rect = canvas.getBoundingClientRect()
      state.pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
      if (trigger === 'hover') {
        state.active = true
        startTime = performance.now()
      }
    }
    const leave = () => { state.pointer = null }
    const burst = (event) => {
      pointFromEvent(event)
      if (clickBurst) state.burst = { x: state.pointer.x, y: state.pointer.y, at: performance.now() }
    }

    const draw = (now) => {
      frame = requestAnimationFrame(draw)
      context.clearRect(0, 0, width, height)
      const elapsed = now - startTime
      const gatherMs = Math.max(1, gatherDuration + stagger)
      const radius = Math.max(1, repelRadius)
      const fillStyle = color === 'currentColor' ? getComputedStyle(canvas).color : color
      context.fillStyle = fillStyle
      context.shadowColor = glow ? highlightColor : 'transparent'
      context.shadowBlur = glow ? 12 : 0

      particles.forEach((particle) => {
        const localProgress = reducedMotion || state.active ? Math.min(1, Math.max(0, (elapsed - particle.order / particles.length * stagger) / gatherMs)) : 0
        const eased = localProgress * localProgress * (3 - 2 * localProgress)
        const drift = state.active && localProgress >= 1 && !reducedMotion ? Math.sin(now * 0.001 + particle.phase) * idleDrift : 0
        const targetX = particle.x + (particle.targetX - particle.x) * eased + drift
        const targetY = particle.y + (particle.targetY - particle.y) * eased + drift
        let dx = 0
        let dy = 0
        if (state.pointer && localProgress >= 0.8) {
          const px = targetX - state.pointer.x
          const py = targetY - state.pointer.y
          const distance = Math.hypot(px, py)
          if (distance > 0 && distance < radius) {
            const force = (1 - distance / radius) * pointerRepel
            dx += px / distance * force
            dy += py / distance * force
          }
        }
        if (state.burst) {
          const age = now - state.burst.at
          if (age < 700) {
            const px = targetX - state.burst.x
            const py = targetY - state.burst.y
            const distance = Math.max(1, Math.hypot(px, py))
            const force = Math.max(0, 1 - age / 700) * burstStrength * 44
            dx += px / distance * force
            dy += py / distance * force
          } else state.burst = null
        }
        const x = targetX + dx
        const y = targetY + dy
        const onHighlight = highlightMode === 'motion' && state.pointer && Math.hypot(x - state.pointer.x, y - state.pointer.y) < 70
        context.fillStyle = onHighlight ? highlightColor : fillStyle
        if (shape === 'square') context.fillRect(x, y, particleSize, particleSize)
        else {
          context.beginPath()
          context.arc(x, y, particleSize / 2, 0, Math.PI * 2)
          context.fill()
        }
      })
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()
    frame = requestAnimationFrame(draw)
    canvas.addEventListener('pointermove', pointFromEvent)
    canvas.addEventListener('pointerleave', leave)
    canvas.addEventListener('click', burst)
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => { reducedMotion = motionPreference.matches }
    motionPreference.addEventListener?.('change', updateMotion)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      canvas.removeEventListener('pointermove', pointFromEvent)
      canvas.removeEventListener('pointerleave', leave)
      canvas.removeEventListener('click', burst)
      motionPreference.removeEventListener?.('change', updateMotion)
    }
  }, [burstStrength, clickBurst, color, density, fontFamily, fontWeight, gatherDuration, glow, highlightColor, highlightMode, idleDrift, intro, particleSize, pointerRepel, repelRadius, scatter, shape, stagger, text, trigger])

  return (
    <canvas
      ref={canvasRef}
      className={`particle-text ${className}`.trim()}
      style={{ '--particle-font-size': fontSize, '--particle-font-weight': fontWeight, '--particle-font-family': fontFamily }}
      aria-label={text}
      role="img"
      title={trigger === 'hover' ? 'Hover to gather the particles; click to create a burst.' : undefined}
    />
  )
}
