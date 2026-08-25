import { useEffect, useRef } from 'react'

const TECHS = [
  { label: 'React',      color: '#61dafb', icon: '⚛',  orbit: 0   },
  { label: 'JS',         color: '#f7df1e', icon: 'JS',  orbit: 1   },
  { label: 'TypeScript', color: '#3178c6', icon: 'TS',  orbit: 2   },
  { label: 'Node',       color: '#68a063', icon: '⬡',   orbit: 3   },
  { label: 'CSS',        color: '#264de4', icon: '✦',   orbit: 4   },
  { label: 'Python',     color: '#ffd43b', icon: 'Py',  orbit: 5   },
  { label: 'Git',        color: '#f05032', icon: '⎇',   orbit: 6   },
  { label: 'Figma',      color: '#a259ff', icon: '◈',   orbit: 7   },
]

/* positions around a circle */
const positions = TECHS.map((_, i) => {
  const angle = (i / TECHS.length) * 2 * Math.PI
  const r = 42 // % radius
  return {
    x: 50 + r * Math.cos(angle),
    y: 50 + r * Math.sin(angle),
  }
})

export function TechOrb() {
  const containerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    const inner = innerRef.current
    if (!el || !inner) return

    let raf
    let tx = 0, ty = 0, cx = 0, cy = 0

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      tx = ((e.clientX - rect.left) / rect.width  - 0.5) * 28
      ty = ((e.clientY - rect.top)  / rect.height - 0.5) * 28
    }

    const onLeave = () => { tx = 0; ty = 0 }

    const tick = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      inner.style.transform = `rotateY(${cx}deg) rotateX(${-cy}deg)`
      raf = requestAnimationFrame(tick)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} className="tech-orb-wrap" aria-hidden="true">
      <div ref={innerRef} className="tech-orb-inner">
        {/* centre glow core */}
        <div className="tech-orb-core" />

        {/* orbit ring */}
        <div className="tech-orb-ring" />

        {/* tech icons */}
        {TECHS.map((t, i) => (
          <div
            key={t.label}
            className="tech-icon"
            style={{
              left: `${positions[i].x}%`,
              top:  `${positions[i].y}%`,
              '--color': t.color,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <span className="tech-icon-inner">{t.icon}</span>
            <span className="tech-icon-label">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
