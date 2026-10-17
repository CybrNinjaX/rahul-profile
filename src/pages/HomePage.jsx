import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei'
import { ClipboardCheck, Mail, Workflow } from 'lucide-react'
import {
  siAndroidstudio, siBambulab, siBlender, siC, siCplusplus, siDart, siDjango,
  siDocker, siFastapi, siFirebase, siFlask, siFlutter, siGit, siGithub,
  siHtml5, siHuggingface, siInstagram, siJavascript, siLinux, siMongodb, siMysql, siN8n,
  siNextdotjs, siOpenjdk, siPostgresql, siPostman, siPython, siPytorch, siReact,
  siSpringboot, siSupabase, siTailwindcss, siTypescript,
  siVllm, siVscodium,
} from 'simple-icons'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import EchoText from '../components/EchoText'
import GlowCursor from '../components/GlowCursor'
import LaserFlow from '../components/LaserFlow'

const modelPath = '/small_cybertown-web.glb'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skill', href: '#skill' },
  { label: 'Project', href: '#project' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const skillGroups = [
  { title: 'Programming', skills: ['Java', 'Python', 'C', 'C++', 'JavaScript', 'TypeScript', 'Dart', 'HTML'] },
  { title: 'Frontend & Mobile', skills: ['React', 'Next.js', 'Tailwind CSS', 'Flutter', 'React Native'] },
  { title: 'Backend', skills: ['Django', 'Flask', 'FastAPI', 'Spring Boot'] },
  { title: 'AI & Machine Learning', skills: ['PyTorch', 'Hugging Face', 'LLMs', 'AI Applications'] },
  { title: 'Databases', skills: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { title: 'Cloud & Services', skills: ['AWS', 'Firebase', 'Supabase', 'Docker'] },
  { title: 'Automation & Testing', skills: ['n8n', 'Manual Testing', 'Automation Testing'] },
  { title: '3D Modeling & Printing', skills: ['Blender', 'Bambu Lab A1'] },
  { title: 'Developer Tools', skills: ['Git', 'GitHub', 'VS Code', 'Android Studio', 'Postman', 'Linux'] },
]

const workProjects = [
  {
    category: 'E-Commerce',
    title: 'Construction Materials E-Commerce Platform',
    description: 'A digital ordering platform for construction materials, designed to eliminate manual ordering.',
    href: 'https://github.com/CybrNinjaX/Trade_mate.git',
  },
  {
    category: 'Fintech · Automation',
    title: 'Automated Loan Processing System',
    description: 'A loan processing system that automates credit checks.',
    links: [
      { label: 'GitHub', href: 'https://github.com/techthisai-ai/loan-web' },
      { label: 'Live App', href: 'https://loan-web-mu.vercel.app/login' },
    ],
  },
  {
    category: 'Fintech · Savings',
    title: 'DigiGold Trading Application',
    description: 'A digital gold trading app built around fractional gold savings.',
    href: 'https://github.com/CybrNinjaX/digigold-app',
  },
  {
    category: 'Product Showcase',
    title: 'Ashtabal Brooms Website',
    description: 'A product showcase website for Ashtabal Brooms.',
    href: 'https://brooms.astraval.com/',
  },
]

function AwsLogo() {
  return (
    <svg className="aws-brand-icon" viewBox="0 0 38 28" aria-hidden="true" focusable="false">
      <text x="2" y="19" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="700">aws</text>
      <path d="M5 23c8 4 18 4 27-1m0 0-4-1m4 1-2 3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  )
}

const skillIcons = {
  Java: siOpenjdk,
  Python: siPython,
  C: siC,
  'C++': siCplusplus,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  Dart: siDart,
  HTML: siHtml5,
  React: siReact,
  'React Native': siReact,
  'Next.js': siNextdotjs,
  'Tailwind CSS': siTailwindcss,
  Flutter: siFlutter,
  Django: siDjango,
  Flask: siFlask,
  FastAPI: siFastapi,
  'Spring Boot': siSpringboot,
  PyTorch: siPytorch,
  'Hugging Face': siHuggingface,
  LLMs: siVllm,
  'AI Applications': siHuggingface,
  MongoDB: siMongodb,
  MySQL: siMysql,
  PostgreSQL: siPostgresql,
  AWS: AwsLogo,
  Firebase: siFirebase,
  Supabase: siSupabase,
  Docker: siDocker,
  n8n: siN8n,
  'Manual Testing': ClipboardCheck,
  'Automation Testing': Workflow,
  Blender: siBlender,
  'Bambu Lab A1': siBambulab,
  Git: siGit,
  GitHub: siGithub,
  'VS Code': siVscodium,
  'Android Studio': siAndroidstudio,
  Postman: siPostman,
  Linux: siLinux,
}

const experienceEntries = [
  {
    title: 'Software Engineer',
    company: 'Th isai Technologies Private Limited',
    type: 'Full-time',
    period: 'Apr 2026 – Jun 2026',
    duration: '3 mos',
    location: 'Tamil Nadu, India · On-site',
    skills: ['TypeScript', 'MySQL', '2+ skills'],
  },
  {
    title: 'API Testing',
    company: 'NADAL Business Services',
    type: 'Internship',
    period: 'Jan 2026 – Mar 2026',
    duration: '3 mos',
    location: 'Thisayanvilai · On-site',
    skills: ['API Testing'],
  },
  {
    title: 'Software Engineer',
    company: 'Astraval',
    type: 'Internship',
    period: 'May 2025 – Jun 2025',
    duration: '2 mos',
    location: 'Thisayanvilai, Tamil Nadu, India · On-site',
    skills: ['Amazon Web Services (AWS)', 'Front-End Development', '1+ skill'],
  },
]

function CityModel({ onReady }) {
  const { scene } = useGLTF(modelPath)
  useEffect(() => onReady(), [onReady])

  return (
    <Bounds fit clip observe margin={1.2}>
      <Center>
        <primitive object={scene} />
      </Center>
    </Bounds>
  )
}

useGLTF.preload(modelPath)

function ZoomLimitWatcher({ controlsRef, modelReady, onZoomLimit }) {
  const { camera } = useThree()
  const readyFrames = useRef(0)
  const startDistance = useRef(null)
  const previousDistance = useRef(null)
  const wasAtZoomLimit = useRef(false)

  useFrame(() => {
    const controls = controlsRef.current
    if (!modelReady || !controls) return

    const distance = camera.position.distanceTo(controls.target)
    if (startDistance.current === null) {
      readyFrames.current += 1
      if (readyFrames.current < 5) return
      startDistance.current = distance
      previousDistance.current = distance
    }

    const zoomLimit = Math.max(0.75, startDistance.current * 0.28)
    controls.minDistance = zoomLimit
  })

  useEffect(() => {
    const controls = controlsRef.current
    if (!modelReady || !controls) return undefined

    const handleControlsChange = () => {
      if (startDistance.current === null) return

      const distance = camera.position.distanceTo(controls.target)
      const zoomLimit = Math.max(0.75, startDistance.current * 0.28)
      const zoomedIn = distance < previousDistance.current - 0.02
      previousDistance.current = distance

      if (distance > zoomLimit * 1.05) wasAtZoomLimit.current = false

      if (zoomedIn && !wasAtZoomLimit.current && distance <= zoomLimit * 1.015) {
        wasAtZoomLimit.current = true
        onZoomLimit()
      }
    }

    controls.addEventListener('change', handleControlsChange)
    return () => controls.removeEventListener('change', handleControlsChange)
  }, [camera, controlsRef, modelReady, onZoomLimit])

  return null
}

function BlastEffect({ blast }) {
  if (!blast) return null
  return (
    <div className="blast-effect" style={{ '--blast-x': `${blast.x}px`, '--blast-y': `${blast.y}px` }} aria-hidden="true">
      <span className="blast-flash" />
      <span className="blast-ring" />
      <span className="blast-smoke smoke-one" />
      <span className="blast-smoke smoke-two" />
      <span className="blast-smoke smoke-three" />
      {Array.from({ length: 10 }, (_, index) => <i key={index} className={`blast-spark spark-${index}`} />)}
    </div>
  )
}

function CityScene({ redMode, onZoomLimit }) {
  const controlsRef = useRef(null)
  const [modelReady, setModelReady] = useState(false)
  const handleModelReady = useCallback(() => setModelReady(true), [])

  return (
    <Canvas
      className="city-scene"
      camera={{ position: [0, 0, 4.8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
      aria-label="Interactive 3D Cybertown model. Drag to rotate and scroll to zoom."
    >
      <color attach="background" args={[redMode ? '#100306' : '#050607']} />
      <ambientLight intensity={redMode ? 1.15 : 1.6} color={redMode ? '#ffb0b8' : '#ffffff'} />
      <directionalLight position={[4, 8, 6]} intensity={redMode ? 2.7 : 2.2} color={redMode ? '#ff4858' : '#ffffff'} />
      {redMode && <pointLight position={[-180, 120, 150]} intensity={420} distance={950} color="#ff102f" />}
      <Suspense fallback={null}>
        <CityModel onReady={handleModelReady} />
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        target={[0, 0, 0]}
        enableRotate
        enableZoom
        enablePan
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.72}
        zoomSpeed={-0.85}
        minDistance={0.5}
        maxDistance={1000}
        minPolarAngle={0.08}
        maxPolarAngle={Math.PI - 0.08}
      />
      <ZoomLimitWatcher controlsRef={controlsRef} modelReady={modelReady} onZoomLimit={onZoomLimit} />
    </Canvas>
  )
}

export default function HomePage() {
  const [redMode, setRedMode] = useState(true)
  const [blast, setBlast] = useState(null)
  const [zoomTransition, setZoomTransition] = useState(false)
  const [zoomTransitionId, setZoomTransitionId] = useState(0)
  const blastTimer = useRef(null)
  const transitionTimer = useRef(null)
  const workFlowRef = useRef(null)
  const workSectionRef = useRef(null)
  const flowStartRef = useRef(null)
  const contactPanelRef = useRef(null)
  const [laserActive, setLaserActive] = useState(false)

  useEffect(() => () => {
    window.clearTimeout(blastTimer.current)
    window.clearTimeout(transitionTimer.current)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-reveal, .about-reveal, .skill-group, .text-reveal, .work-card, .experience-card')
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = workSectionRef.current
    if (!section) return undefined
    if (!('IntersectionObserver' in window)) {
      setLaserActive(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setLaserActive(true)
      observer.disconnect()
    }, { threshold: 0.05 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const flow = workFlowRef.current
    const start = flowStartRef.current
    if (!flow || !start) return undefined
    const updateStart = () => {
      const flowBounds = flow.getBoundingClientRect()
      const startBounds = start.getBoundingClientRect()
      flow.style.setProperty('--laser-start', `${Math.max(0, startBounds.top - flowBounds.top)}px`)
    }
    updateStart()
    window.addEventListener('resize', updateStart)
    return () => window.removeEventListener('resize', updateStart)
  }, [])

  const handleZoomLimit = useCallback(() => setZoomTransitionId((id) => id + 1), [])

  useEffect(() => {
    if (zoomTransitionId === 0) return undefined
    setZoomTransition(true)
    const scrollTimer = window.setTimeout(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById('about')?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }, 450)
    transitionTimer.current = window.setTimeout(() => setZoomTransition(false), 1750)
    return () => {
      window.clearTimeout(scrollTimer)
      window.clearTimeout(transitionTimer.current)
    }
  }, [zoomTransitionId])

  const triggerBlast = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    setBlast({
      x: event.clientX || bounds.left + bounds.width / 2,
      y: event.clientY || bounds.top + bounds.height / 2,
    })
    window.clearTimeout(blastTimer.current)
    blastTimer.current = window.setTimeout(() => setBlast(null), 1050)
  }

  return (
    <div className={`portfolio-page${redMode ? ' red-mode' : ''}`}>
      <GlowCursor
        aria-hidden="true"
        className="portfolio-glow-layer"
        color="#ff4054"
        secondaryColor="#ff9a8b"
        intensity={1.05}
        trailWidth={2.2}
        linger={0.9}
        glow={0.8}
        hotspot={0.55}
        followSpeed={0.68}
        quality="medium"
        maxDevicePixelRatio={1.5}
      />
      <BlastEffect blast={blast} />
      <div className={`zoom-fade${zoomTransition ? ' visible' : ''}`} aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner">
          <a className="site-brand" href="#home" aria-label="Cyber Ninja X home">
            CYBER<span>NINJA</span>X
          </a>
          <nav className="site-nav" aria-label="Main navigation">
            {navigation.map(({ label, href }) => (
              <a key={href} href={href} onClick={triggerBlast}>{label}</a>
            ))}
          </nav>
          <button
            className="theme-toggle"
            type="button"
            role="switch"
            aria-checked={redMode}
            aria-label={redMode ? 'Red theme on. Turn off for black theme.' : 'Red theme off. Turn on for red theme.'}
            onClick={() => setRedMode((current) => !current)}
          >
            <span className="theme-label">{redMode ? 'RED ON' : 'BLACK'}</span>
            <span className="toggle-track" aria-hidden="true"><i /></span>
          </button>
          <a className="cv-download" href="/rahul-resume.pdf" download>
            Resume <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <main>
        <section className="home-hero" id="home">
          <CityScene redMode={redMode} onZoomLimit={handleZoomLimit} />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow"><span /> DIGITAL CREATOR / DEVELOPER</p>
            <h1 className="hero-heading" aria-label="Hello, I’m Rahul.">
              <EchoText className="hero-echo" text="Hello, I’m" fontSize="inherit" fontWeight="inherit" tint="#ff4054" clickBurst={false} />
              <br />
              <EchoText className="hero-echo" text="Rahul" fontSize="inherit" fontWeight="inherit" tint="#ff4054" clickBurst={false} />
              <span className="heading-accent">.</span>
            </h1>
            <p className="hero-copy">I build thoughtful digital experiences with code, design, and a curiosity for immersive worlds.</p>
            <a className="hero-link" href="#project">Explore my work <span aria-hidden="true">↗</span></a>
            <p className="hero-hint">DRAG TO EXPLORE <span>·</span> SCROLL TO ZOOM</p>
          </div>
          <span className="hero-coordinate" aria-hidden="true">CYBERTOWN / 001</span>
        </section>

        <section className="content-section about-reveal" id="about">
          <p className="eyebrow">01 / ABOUT</p>
          <h2 className="about-typing"><span className="about-title-white">Ideas into</span>{' '}<span className="about-title-red">useful software.</span></h2>
          <p>I’m <strong>cybrninjaX</strong>, a Full-Stack Developer and AI/ML enthusiast passionate about building web and mobile applications, AI-powered solutions, automation tools, and 3D models.</p>
          <p>I enjoy turning ideas into practical projects, experimenting with new technologies, and creating software that solves real problems.</p>
        </section>

        <section className="content-section" id="skill">
          <p className="eyebrow">02 / SKILLS</p>
          <h2 className="skills-title">Tools for building what’s next.</h2>
          <div className="skill-groups">
            {skillGroups.map(({ title, skills }, groupIndex) => (
              <article className="skill-group" key={title} style={{ '--group-order': groupIndex }}>
                <h3><span aria-hidden="true">/</span> {title}</h3>
                <div className="skill-flow">
                  {skills.map((name, skillIndex) => {
                    const Icon = skillIcons[name]
                    return (
                      <span className="skill-tool" key={name} style={{ '--item-order': skillIndex }}>
                        <span className="skill-icon" aria-hidden="true">
                          {Icon.path
                            ? <svg className="brand-icon" viewBox="0 0 24 24" focusable="false"><path d={Icon.path} /></svg>
                            : <Icon size={18} strokeWidth={1.8} />}
                        </span>
                        <span>{name}</span>
                      </span>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section project-section scroll-reveal" id="project">
          <p className="eyebrow">03 / FEATURED PROJECT</p>
          <h2 className="text-reveal">Cybertown</h2>
          <p>An explorable 3D city, rendered in the browser. Drag to orbit around the model and use the wheel or trackpad to zoom.</p>
          <span className="project-meta">REAL-TIME 3D <i /> WEB EXPERIENCE</span>
        </section>

        <section className="content-section scroll-reveal" id="experience">
          <p className="eyebrow">04 / EXPERIENCE</p>
          <h2 className="text-reveal">Where I’ve worked.<br />What I’ve learned.</h2>
          <div className="experience-list">
            {experienceEntries.map(({ title, company, type, period, duration, location, skills }, index) => (
              <article
                className="experience-card"
                key={`${company}-${title}`}
                style={{ '--experience-order': index }}
              >
                <div className="experience-card-heading">
                  <div>
                    <p className="experience-company">{company}</p>
                    <h3>{title}</h3>
                  </div>
                  <span className="experience-type">{type}</span>
                </div>
                <p className="experience-period">{period}<span aria-hidden="true">·</span>{duration}</p>
                <p className="experience-location">{location}</p>
                <div className="experience-skills">
                  <strong>Skills</strong>
                  {skills.map((skill) => <span className="experience-skill" key={skill}>{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="work-flow" ref={workFlowRef}>
          {laserActive && (
            <LaserFlow
              className="work-contact-laser"
              aria-hidden="true"
              surfaceRef={contactPanelRef}
              beamPosition={0.5}
              color="#ff4054"
              intensity={1.45}
              spread={2.25}
              speed={0.52}
              mouseInteraction={false}
              intro
            />
          )}
        <section className="content-section scroll-reveal" id="work" ref={workSectionRef}>
          <p className="eyebrow">05 / WORK</p>
          <h2 className="text-reveal">Selected work.<br />Built to solve real needs.</h2>
          <span className="work-flow-start" ref={flowStartRef} aria-hidden="true" />
          <div className="work-grid">
            {workProjects.map(({ category, title, description, href, links }, index) => {
              const ProjectCard = href ? 'a' : 'article'
              return (
                <ProjectCard
                  className="work-card"
                  key={title}
                  style={{ '--work-order': index }}
                  href={href}
                  target={href ? '_blank' : undefined}
                  rel={href ? 'noopener noreferrer' : undefined}
                  aria-label={href ? `${title} on GitHub (opens in a new tab)` : undefined}
                >
                  <span className="work-index">0{index + 1}</span>
                  <div className="work-card-copy">
                    <p className="work-category">{category}</p>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  {links && (
                    <div className="work-project-links">
                      {links.map(({ label, href: linkHref }) => (
                        <a
                          key={label}
                          href={linkHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${title} ${label} (opens in a new tab)`}
                        >
                          {label} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                  </div>
                  <span className="work-arrow" aria-hidden="true">↗</span>
                </ProjectCard>
              )
            })}
          </div>
        </section>

        <section className="content-section contact-section scroll-reveal" id="contact">
          <div className="contact-panel" ref={contactPanelRef}>
            <div className="contact-content">
              <p className="eyebrow">06 / CONTACT</p>
              <h2 className="text-reveal">Have an idea?<br />Let’s make it real.</h2>
              <a className="hero-link" href="mailto:rahul63794@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
              <div className="contact-socials" aria-label="Contact links">
                <a href="https://github.com/CybrNinjaX" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)"><svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={siGithub.path} /></svg></a>
                <a href="https://www.linkedin.com/in/rahul-77a46b273?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)"><svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 .001-4.124 2.062 2.062 0 0 1-.001 4.124zM7.119 20.452H3.553V9h3.566v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a>
                <a href="https://www.instagram.com/rahul_zeronex___?stkn=MTI4Zm9waXE1eThqcg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile (opens in a new tab)"><svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={siInstagram.path} /></svg></a>
                <a href="mailto:rahul63794@gmail.com" aria-label="Email Rahul"><Mail aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>

    </div>
  )
}
