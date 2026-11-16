import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar.jsx'
import Hero from '../components/sections/Hero.jsx'
import About from '../components/sections/About.jsx'
import Skills from '../components/sections/Skills.jsx'
import Experience from '../components/sections/Experience.jsx'
import Projects from '../components/sections/Projects.jsx'
import Services from '../components/sections/Services.jsx'
import Contact from '../components/sections/Contact.jsx'

const AvatarScene = lazy(() => import('../components/sections/AvatarScene.jsx'))







export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const activeSectionRef = useRef(activeSection)
  activeSectionRef.current = activeSection
  const [selectedProject, setSelectedProject] = useState(null)
  const modelLayout = useRef({ x: 0, y: 0, scale: 1, cameraZ: 6.6, rotation: 0 })

  // Global scroll progress + header state
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const progressTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        document.documentElement.style.setProperty(
          '--scroll-progress',
          `${(self.progress * 100).toFixed(2)}%`
        )
        if (activeSectionRef.current !== 'experience') {
          modelLayout.current.rotation = self.progress * Math.PI * 2
        }
        document.querySelector('.site-header')?.classList.toggle('is-scrolled', self.scroll() > 12)
      },
    })

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const portrait = document.querySelector('.contact-portrait-image')

    const portraitMotion =
      portrait && !reduceMotion
        ? gsap.to(portrait, {
            yPercent: 7,
            scale: 1.055,
            ease: 'none',
            scrollTrigger: {
              trigger: '#contact',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          })
        : null

    return () => {
      progressTrigger.kill()
      portraitMotion?.scrollTrigger?.kill()
      portraitMotion?.kill()
      document.documentElement.style.removeProperty('--scroll-progress')
    }
  }, [])

  // 3D model pose based on active section
  useEffect(() => {
    let tween
    let resizeTimer

    const updatePose = () => {
      const isMobile = window.innerWidth < 680
      const isTablet = window.innerWidth < 960
      const sideShift = isMobile ? 0.9 : isTablet ? 1.35 : 2.05

      const poses = {
        home: {
          x: 0,
          y: 0.05,
          scale: isMobile ? 1.18 : 1.62,
          cameraZ: isMobile ? 6.3 : 6.1,
        },
        about: { x: -sideShift * 0.95, y: 0, scale: 0.92, cameraZ: 7.1 },
        skills: { x: 0, y: 0.05, scale: 0.78, cameraZ: 8.0 },
        experience: { x: -sideShift * 0.9, y: 0, scale: 0.92, cameraZ: 7.2, rotation: 0.32 },
        projects: { x: -sideShift * 0.9, y: 0, scale: 0.92, cameraZ: 7.2 },
        services: { x: sideShift * 0.9, y: 0, scale: 0.92, cameraZ: 7.2 },
        contact: { x: 0, y: 0, scale: 0.82, cameraZ: 7.4 },
      }

      tween?.kill()
      tween = gsap.to(modelLayout.current, {
        ...poses[activeSection],
        duration: 1.05,
        ease: 'power3.inOut',
      })
    }

    const handleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(updatePose, 120)
    }

    updatePose()
    window.addEventListener('resize', handleResize)

    return () => {
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      tween?.kill()
    }
  }, [activeSection])

  // Reveal on scroll
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal-on-scroll')

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      targets.forEach((t) => t.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )

    targets.forEach((t) => observer.observe(t))

    const directory = document.querySelector('.project-directory')
    const observeExtra = () => {
      if (!directory?.open) return
      directory
        .querySelectorAll('.reveal-on-scroll:not(.is-visible)')
        .forEach((t) => observer.observe(t))
    }

    directory?.addEventListener('toggle', observeExtra)

    return () => {
      observer.disconnect()
      directory?.removeEventListener('toggle', observeExtra)
    }
  }, [])

  // Active section tracking
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'))
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        visible.forEach(({ target }) => {
          target.classList.add('is-visible')
          target.querySelectorAll('.section-heading').forEach((heading) => {
            heading.classList.add('is-visible')
          })
        })

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        threshold: [0.15, 0.4, 0.65],
        rootMargin: '-15% 0px -40% 0px',
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])




  return (
    <div className="portfolio-shell">
      <div className="portfolio-page">
        <Navbar activeSection={activeSection} />

        {/* Global 3D Avatar */}
        <div
          className={`global-avatar${activeSection === 'contact' ? ' is-hidden' : ''}${activeSection === 'home' ? ' is-home' : ''}${activeSection === 'about' ? ' is-about' : ''}${activeSection === 'skills' ? ' is-skills' : ''}${activeSection === 'experience' ? ' is-experience' : ''}`}
          aria-hidden="true"
        >
          <Suspense
            fallback={
              <div className="avatar-loading">
                <span>Loading 3D model</span>
              </div>
            }
          >
            <AvatarScene layout={modelLayout} activeSection={activeSection} />
          </Suspense>
          <div className="global-avatar-fade" />
        </div>

        <main>

          <Hero />


          <About />


          <Skills />


          <Experience />


          <Projects selectedProject={selectedProject} setSelectedProject={setSelectedProject} />


          <Services />


          <Contact />



        </main>
      </div>
    </div>
  )
}
