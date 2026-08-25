import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from '../components/ArrowUpRight'
import { Header } from '../components/Header'
import { projects } from '../data/portfolio'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); io.disconnect() } },
      { threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function Reveal({ children, variant = 'up', delay = 0 }) {
  const ref = useReveal()
  const cls = { up: 'reveal', left: 'reveal-left', right: 'reveal-right', scale: 'reveal-scale' }
  return (
    <div ref={ref} className={cls[variant]} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function useTilt() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const shine = el.querySelector('.tilt-shine')
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      el.style.transform = `perspective(800px) rotateX(${(y - 0.5) * -12}deg) rotateY(${(x - 0.5) * 12}deg) scale(1.02)`
      if (shine) { shine.style.setProperty('--mx', `${x * 100}%`); shine.style.setProperty('--my', `${y * 100}%`); shine.style.opacity = 1 }
    }
    const onLeave = () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
      if (shine) shine.style.opacity = 0
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])
  return ref
}

function ProjectCard({ project, index }) {
  const tilt = useTilt()
  return (
    <Reveal variant="up" delay={index * 80}>
      <div
        ref={tilt}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-white/[.06] bg-white/[.02] transition-all duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="tilt-shine pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
          style={{ opacity: 0, background: 'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.07) 0%, transparent 60%)' }}
        />
        <div className={`project-visual project-${project.visual}`} aria-label={`${project.title} preview`}><img src={project.image} alt="" loading="lazy" /><span className="visual-window"><i /><i /><i /></span><b>{project.number}</b></div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-sky-400">{project.category}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">{project.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{project.description}</p>
          <div className="project-tech">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="mt-5 flex items-center gap-4">
            {project.github ? <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 transition-all duration-300 hover:text-sky-400">GitHub <ArrowUpRight /></a> : <a href="/#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 transition-all duration-300 hover:text-sky-400">Request details <ArrowUpRight /></a>}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function AllProjectsPage() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const goBack = () => {
    navigate('/')
    // after navigation, scroll to #projects
    setTimeout(() => {
      const el = document.getElementById('projects')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  return (
    <main className="min-h-screen bg-[#090b10] font-sans text-slate-100">
      <Header />

      <div className="mx-auto max-w-[1380px] px-5 pb-32 pt-28 sm:px-8 lg:px-12">

        {/* back button */}
        <Reveal variant="left">
          <button
            onClick={goBack}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/[.08] bg-white/[.04] px-4 py-2 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-sky-500/40 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12L6 8l4-4" />
            </svg>
            Back to Projects
          </button>
        </Reveal>

        <Reveal variant="up" delay={60}>
          <div className="mb-2 inline-flex items-center gap-2">
            <span className="h-px w-5 bg-sky-500/60" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">04 / Projects</span>
          </div>
        </Reveal>
        <Reveal variant="up" delay={120}>
          <h1 className="text-5xl font-semibold leading-[.93] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            All <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Projects.</span>
          </h1>
        </Reveal>
        <Reveal variant="up" delay={180}>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
            A complete collection of projects built across design, development, and engineering.
          </p>
        </Reveal>
        <Reveal variant="up" delay={220}>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[.07] bg-white/[.03] px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            <span className="text-[12px] font-semibold text-slate-400">{projects.length} projects total</span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.number} project={project} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
