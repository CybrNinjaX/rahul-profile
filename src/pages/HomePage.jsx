import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'

const modelPath = '/small_cybertown-web.glb'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Project', href: '#project' },
  { label: 'Skill', href: '#skill' },
  { label: 'Contact', href: '#contact' },
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
  const transitionStarted = useRef(false)

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
      if (startDistance.current === null || transitionStarted.current) return

      const distance = camera.position.distanceTo(controls.target)
      const zoomLimit = Math.max(0.75, startDistance.current * 0.28)
      const zoomedIn = distance < previousDistance.current - 0.02
      previousDistance.current = distance

      if (zoomedIn && distance <= zoomLimit * 1.015) {
        transitionStarted.current = true
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
        zoomSpeed={0.85}
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
  const blastTimer = useRef(null)
  const transitionTimer = useRef(null)

  useEffect(() => () => {
    window.clearTimeout(blastTimer.current)
    window.clearTimeout(transitionTimer.current)
  }, [])

  const handleZoomLimit = useCallback(() => setZoomTransition(true), [])

  useEffect(() => {
    if (!zoomTransition) return undefined
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
  }, [zoomTransition])

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
        </div>
      </header>

      <main>
        <section className="home-hero" id="home">
          <CityScene redMode={redMode} onZoomLimit={handleZoomLimit} />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow"><span /> DIGITAL CREATOR / DEVELOPER</p>
            <h1>Hello, I am<br />Raghul<span>.</span></h1>
            <p className="hero-copy">I build thoughtful digital experiences with code, design, and a curiosity for immersive worlds.</p>
            <a className="hero-link" href="#project">Explore my work <span aria-hidden="true">↗</span></a>
            <p className="hero-hint">DRAG TO EXPLORE <span>·</span> SCROLL TO ZOOM</p>
          </div>
          <span className="hero-coordinate" aria-hidden="true">CYBERTOWN / 001</span>
        </section>

        <section className="content-section" id="about">
          <p className="eyebrow">01 / ABOUT</p>
          <h2>Curious by nature.<br />Always building.</h2>
          <p>I’m Raghul, a digital creator interested in the space where technology, visual design, and useful experiences meet.</p>
          <p>This portfolio is a home for experiments, projects, and ideas in progress.</p>
        </section>

        <section className="content-section" id="work">
          <p className="eyebrow">02 / WORK</p>
          <h2>Made with intent.</h2>
          <div className="work-grid">
            <article className="work-card">
              <span>01</span><h3>Interactive experiences</h3>
              <p>Interfaces that invite people to explore and engage.</p>
            </article>
            <article className="work-card">
              <span>02</span><h3>Creative technology</h3>
              <p>Experiments that bring visual ideas to life in the browser.</p>
            </article>
            <article className="work-card">
              <span>03</span><h3>Immersive worlds</h3>
              <p>Three-dimensional scenes shaped for the web.</p>
            </article>
          </div>
        </section>

        <section className="content-section project-section" id="project">
          <p className="eyebrow">03 / FEATURED PROJECT</p>
          <h2>Cybertown</h2>
          <p>An explorable 3D city, rendered in the browser. Drag to orbit around the model and use the wheel or trackpad to zoom.</p>
          <span className="project-meta">REAL-TIME 3D <i /> WEB EXPERIENCE</span>
        </section>

        <section className="content-section" id="skill">
          <p className="eyebrow">04 / SKILLS</p>
          <h2>Design meets technology.</h2>
          <ul className="skill-list">
            <li>Creative development</li><li>Interface design</li><li>3D for the web</li><li>Motion and interaction</li>
          </ul>
        </section>

        <section className="content-section contact-section" id="contact">
          <p className="eyebrow">05 / CONTACT</p>
          <h2>Have an idea?<br />Let’s make it real.</h2>
          <a className="hero-link" href="mailto:hello@example.com">Get in touch <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer className="site-footer"><span>CYBERNINJAX</span><span>BUILT TO EXPLORE</span></footer>
    </div>
  )
}
