import { useEffect, useId, useMemo, useRef, useState } from 'react'

const easings = {
  'power2.out': (value) => 1 - (1 - value) ** 3,
  linear: (value) => value,
}

export default function StrokeText({
  text,
  strokeColor = '#A78BFA',
  strokeStyle = 'solid',
  strokeWidth = 1.4,
  dashLength = 10,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = 'power2.out',
  trigger = 'mount',
  fillMode = 'wipe',
  wipeFrom = 'left',
  fontSize = 72,
  fontWeight = 800,
  letterSpacing = -2,
  hoverRedraw = true,
  shadow = false,
  fillColor,
  shadowColor = '#00d9ff',
  className = '',
}) {
  const id = useId().replace(/:/g, '')
  const textRef = useRef(null)
  const [playing, setPlaying] = useState(trigger === 'mount')
  const [reducedMotion, setReducedMotion] = useState(false)
  const safeText = text || 'Draw Attention'
  const words = useMemo(() => safeText.split(' '), [safeText])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (trigger !== 'mount' || reducedMotion) return undefined
    const timer = window.setTimeout(() => setPlaying(false), (drawDuration + fillDelay + words.length * stagger) * 1000 + 80)
    return () => window.clearTimeout(timer)
  }, [drawDuration, fillDelay, reducedMotion, stagger, trigger, words.length])

  const play = () => {
    if (reducedMotion) return
    setPlaying(true)
    window.setTimeout(() => setPlaying(false), (drawDuration + fillDelay + words.length * stagger) * 1000 + 80)
  }

  const dash = strokeStyle === 'dashed' ? `${dashLength} ${dashLength * 0.65}` : undefined
  const fill = fillColor || 'var(--ink, #f1f5f9)'

  return (
    <span
      className={`stroke-text ${playing ? 'is-drawing' : ''} ${className}`.trim()}
      style={{ '--stroke-color': strokeColor, '--stroke-width': `${strokeWidth}px`, '--stroke-dash': dash || 'none', '--draw-duration': `${drawDuration}s`, '--fill-delay': `${fillDelay}s`, '--word-stagger': `${stagger}s`, '--stroke-ease': easings[ease] ? 'cubic-bezier(.16, 1, .3, 1)' : 'ease-out', '--fill-color': fill, '--shadow-color': shadowColor, '--font-size': typeof fontSize === 'number' ? `${fontSize}px` : fontSize, '--font-weight': fontWeight, '--letter-spacing': `${letterSpacing}px` }}
      onMouseEnter={hoverRedraw ? play : undefined}
      onFocus={hoverRedraw ? play : undefined}
      role="img"
      aria-label={safeText}
    >
      <svg className={`stroke-text-svg${shadow ? ' has-shadow' : ''}`} viewBox={`0 0 ${Math.max(safeText.length * 48, 400)} 120`} preserveAspectRatio="xMinYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-wipe`} x1={wipeFrom === 'left' ? '0%' : '100%'} x2={wipeFrom === 'left' ? '100%' : '0%'} y1="0%" y2="0%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <mask id={`${id}-mask`}><rect className="stroke-text-wipe" width="100%" height="100%" fill={`url(#${id}-wipe)`} /></mask>
        </defs>
        <text ref={textRef} x="3" y="88" className="stroke-text-outline">{safeText}</text>
        <text x="3" y="88" className={`stroke-text-fill ${fillMode === 'wipe' ? 'uses-wipe' : ''}`} mask={fillMode === 'wipe' ? `url(#${id}-mask)` : undefined}>{words.map((word, index) => <tspan key={`${word}-${index}`} className="stroke-text-word" style={{ '--word-index': index }}>{index ? ` ${word}` : word}</tspan>)}</text>
      </svg>
    </span>
  )
}
