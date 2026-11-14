import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import murugerImage from '../assets/muruger.jpeg'
import murugerModel from '../assets/muruger.stl?url'
import GlowCursor from '../components/GlowCursor.jsx'
const AvatarScene = lazy(() => import('../components/AvatarScene.jsx'))
const experience = [
  { title: 'Software Engineer', company: 'Th isai Technologies Private Limited', kind: 'Full-time', period: 'Apr 2026 – Jun 2026', location: 'Tamil Nadu, India · On-site', detail: 'Built and maintained customer-facing software, collaborating across product requirements, implementation, and release.' },
  { title: 'API Testing', company: 'NADAL Business Services', kind: 'Internship', period: 'Jan 2026 – Mar 2026', location: 'Thisayanvilai · On-site', detail: 'Validated API behavior and reliability through structured manual testing and clear defect reporting.' },
  { title: 'Software Engineer', company: 'Astraval', kind: 'Internship', period: 'May 2025 – Jun 2025', location: 'Thisayanvilai, Tamil Nadu · On-site', detail: 'Contributed to full-stack product work and learned to ship practical features in a collaborative team.' },
]

const projects = [
  { title: 'Construction Materials E-Commerce Platform', category: 'E-commerce', image: '/trade-cover.svg', description: 'A digital ordering platform designed to make construction material orders easier.', links: [{ label: 'GitHub', href: 'https://github.com/CybrNinjaX/Trade_mate.git' }] },
  { title: 'Automated Loan Processing System', category: 'Fintech · Automation', image: '/loan-cover.svg', description: 'A loan processing system that automates credit checks.', previewUrl: 'https://loan-web-mu.vercel.app/login', links: [{ label: 'GitHub', href: 'https://github.com/techthisai-ai/loan-web' }, { label: 'Live app', href: 'https://loan-web-mu.vercel.app/login' }] },
  { title: 'DigiGold Trading Application', category: 'Fintech · Savings', image: '/gold-cover.svg', description: 'A digital gold trading app built around fractional gold savings.', links: [{ label: 'GitHub', href: 'https://github.com/CybrNinjaX/digigold-app' }] },
  { title: 'Ashtabal Brooms Website', category: 'Product Showcase', image: '/brooms-cover.svg', description: 'A product showcase website for Ashtabal Brooms.', previewUrl: 'https://brooms.astraval.com/', links: [{ label: 'Visit website', href: 'https://brooms.astraval.com/' }] },
  { title: 'Murugan 3D Model', category: '3D Modeling · STL', image: murugerImage, imageAlt: 'Colorful 3D artwork of Lord Murugan with a peacock', description: 'A detailed 3D artwork of Lord Murugan with his vel and peacock.', links: [{ label: 'Purchase model', href: 'https://villpo.astraval.com/' }], download: { label: 'Download STL', href: murugerModel, fileName: 'muruger.stl' } },
]

const services = [
  { icon: '🌐', title: 'Full-Stack Web Development', desc: 'End-to-end web apps with React, Next.js, Django, FastAPI and more — from landing pages to complex platforms.', tags: ['React', 'Next.js', 'Django', 'FastAPI'] },
  { icon: '📱', title: 'Mobile App Development', desc: 'Cross-platform mobile apps using Flutter and React Native that feel native on both iOS and Android.', tags: ['Flutter', 'React Native', 'Firebase'] },
  { icon: '🤖', title: 'AI & Automation Solutions', desc: 'Custom AI integrations, LLM-powered tools, and workflow automation using n8n, PyTorch and Hugging Face.', tags: ['LLMs', 'PyTorch', 'n8n'] },
  { icon: '🗄️', title: 'Backend & API Development', desc: 'Scalable REST APIs, database design, and cloud deployments on AWS, Supabase and Docker.', tags: ['REST API', 'PostgreSQL', 'Docker', 'AWS'] },
  { icon: '🎨', title: '3D Modeling & Printing', desc: 'Custom 3D models for printing using Blender — from product prototypes to artistic sculptures.', tags: ['Blender', 'STL', 'Bambu Lab'] },
  { icon: '🧪', title: 'QA & API Testing', desc: 'Manual and automated testing, API validation with Postman, and quality assurance for web applications.', tags: ['Postman', 'Manual Testing', 'Automation'] },
]

const visibleProjectCount = 4

function ProjectCard({ project, index, onPreview }) {
  const coverClass = project.download ? 'project-cover project-cover-model' : 'project-cover'
  return (
    <article className="project-card reveal-on-scroll">
      <div className={coverClass}>
        <img src={project.image} alt={project.imageAlt ?? `${project.category} project preview`} loading="lazy" />
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
        <button className="project-preview-trigger" type="button" onClick={() => onPreview(project)}>Open preview <span>↗</span></button>
      </div>
      <div className="project-card-copy">
        <p className="item-overline">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.download
          ? <div className="project-actions">
              <a className="project-action project-action-primary" href={project.links[0].href} target="_blank" rel="noopener noreferrer">{project.links[0].label} ↗</a>
              <a className="project-action" href={project.download.href} download={project.download.fileName}>{project.download.label} ↓</a>
            </div>
          : <div className="project-links">{project.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}</div>
        }
      </div>
    </article>
  )
}

function ProjectPreviewDialog({ project, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined
    dialog.showModal()
    return () => { if (dialog.open) dialog.close() }
  }, [])
  return (
    <dialog className="project-preview-dialog" ref={dialogRef} onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close() }}>
      <div className="preview-dialog-top"><p className="item-overline">{project.category}</p><button type="button" className="preview-close" onClick={() => dialogRef.current?.close()} aria-label="Close project preview">×</button></div>
      <h2>{project.title}</h2>
      <p className="preview-dialog-description">{project.description}</p>
      <div className="preview-dialog-media">
        {project.previewUrl
          ? <iframe src={project.previewUrl} title={`${project.title} live preview`} loading="lazy" />
          : <img src={project.image} alt={project.imageAlt ?? `${project.title} preview`} />}
      </div>
      <div className="preview-dialog-actions">
        {project.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
        {project.download && <a href={project.download.href} download={project.download.fileName}>{project.download.label} ↓</a>}
      </div>
    </dialog>
  )
}

function SectionHeading({ number, label, title, light }) {
  return (
    <div className="section-heading">
      <p className={light ? 'section-label section-label-light' : 'section-label'}>{number} <span>/</span> {label}</p>
      <h2>{title}</h2>
    </div>
  )
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [selectedProject, setSelectedProject] = useState(null)
  const heroRef = useRef(null)
  const sceneProgress = useRef(0)
  const aboutProgress = useRef(0)
  const aboutIconPresence = useRef(0)
  const skillsProgress = useRef(0)
  const cursorPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const hero = heroRef.current
    if (!hero) return undefined
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        endTrigger: document.querySelector('#projects'),
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
    timeline
      .to(sceneProgress, { current: 0.2, duration: 1, ease: 'none' })
      .to(sceneProgress, { current: 0.4, duration: 1, ease: 'none' })
      .to(sceneProgress, { current: 0.64, duration: 1.3, ease: 'none' })
      .to(sceneProgress, { current: 0.64, duration: 0.4, ease: 'none' })
      .to(sceneProgress, { current: 1, duration: 1.5, ease: 'none' })
    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, [])

  useEffect(() => {
    const cardStops = Array.from({ length: 9 }, (_, index) => ((0.16 + index * 0.08) / 0.92) * 0.82)
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#skills .skills-lock-stage',
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 2.8)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        snap: {
          snapTo: [0, ...cardStops, 0.82, 0.9, 0.94, 1],
          duration: { min: 0.15, max: 0.45 },
          delay: 0.12,
          ease: 'power1.inOut',
        },
      },
    })
    timeline
      .to(skillsProgress, { current: 0.92, duration: 0.82, ease: 'none' })
      .to(skillsProgress, { current: 0.92, duration: 0.12, ease: 'none' })
      .to(skillsProgress, { current: 1, duration: 0.06, ease: 'none' })
    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, [])

  useEffect(() => {
    const transition = gsap.to(aboutProgress, {
      current: 1,
      ease: 'none',
      onUpdate: () => document.documentElement.style.setProperty('--about-energy', aboutProgress.current.toFixed(3)),
      scrollTrigger: { trigger: '#about', start: 'top 82%', end: 'top 30%', scrub: 1 },
    })
    return () => { transition.scrollTrigger?.kill(); transition.kill(); document.documentElement.style.removeProperty('--about-energy') }
  }, [])

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 0.4 },
    })
    timeline
      .to(aboutIconPresence, { current: 1, duration: 0.16, ease: 'none' })
      .to(aboutIconPresence, { current: 1, duration: 0.68, ease: 'none' })
      .to(aboutIconPresence, { current: 0, duration: 0.16, ease: 'none' })
    return () => { timeline.scrollTrigger?.kill(); timeline.kill() }
  }, [])

  useEffect(() => {
    const handlePointerMove = (event) => {
      cursorPosition.current.x = (event.clientX / window.innerWidth) * 2 - 1
      cursorPosition.current.y = (event.clientY / window.innerHeight) * 2 - 1
      const bounds = heroRef.current?.getBoundingClientRect()
      if (bounds) {
        heroRef.current.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
        heroRef.current.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
      }
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useEffect(() => {
    const targets = document.querySelectorAll('.reveal-on-scroll')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    targets.forEach((t) => observer.observe(t))
    const directory = document.querySelector('.project-directory')
    const observeExtra = () => {
      if (!directory?.open) return
      directory.querySelectorAll('.reveal-on-scroll:not(.is-visible)').forEach((t) => observer.observe(t))
    }
    directory?.addEventListener('toggle', observeExtra)
    return () => { observer.disconnect(); directory?.removeEventListener('toggle', observeExtra) }
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'))
    if (!sections.length) return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible.length > 0) setActiveSection(visible[0].target.id)
    }, { threshold: [0.15, 0.4, 0.65], rootMargin: '-15% 0px -40% 0px' })
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#services', label: 'Services' },
  ]

  const handleNavClick = () => setMenuOpen(false)

  return (
    <GlowCursor color="#00d9ff" secondaryColor="#168cff" intensity={0.65} trailWidth={2} linger={0.8} glow={0.7} theme="dark" style={{ minHeight: '100vh', background: '#060b12' }}>
      <div className="portfolio-page">

        <header className="site-header">
          <div className="header-inner">
            <a className="site-brand" href="#home" aria-label="Rahul home">rahul<span>.</span></a>
            <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}
                  className={activeSection === item.href.slice(1) ? 'is-active' : ''}
                  onClick={handleNavClick}>
                  {item.label}
                </a>
              ))}
              <a className="nav-cta" href="#contact" onClick={handleNavClick}>Contact ↗</a>
            </nav>
            <button type="button" className={menuOpen ? 'nav-toggle is-open' : 'nav-toggle'}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}>
              <span /><span /><span />
            </button>
          </div>
        </header>

        <div className={`global-avatar${activeSection === 'skills' ? ' is-skills' : ''}`} aria-hidden="true">
          <Suspense fallback={<div className="avatar-loading"><span>RAHUL / 3D EXPERIENCE</span></div>}><AvatarScene progress={sceneProgress} aboutProgress={aboutProgress} iconsProgress={aboutIconPresence} skillsProgress={skillsProgress} cursor={cursorPosition} /></Suspense>
          <div className="global-avatar-fade" />
        </div>

        <main>
          <section className="hero" id="home" ref={heroRef}>
            <div className="hero-code-layer" aria-hidden="true">
              <span className="code-snippet code-snippet-one">const future = await build();</span>
              <span className="code-snippet code-snippet-two">&lt;Canvas camera=&#123;scene&#125; /&gt;</span>
              <span className="code-snippet code-snippet-three">from torch import nn</span>
              <span className="code-snippet code-snippet-four">if (idea) ship(idea)</span>
              <span className="code-coordinate">37° 00′ N &nbsp; / &nbsp; 8F3A</span>
            </div>
            <div className="hero-inner">
              <div className="hero-copy reveal-on-scroll">
                <p className="availability"><span className="dot" /> Available for freelance work</p>
                <h1>
                  <span className="h1-hi">Rahul<span className="hero-period">.</span></span>
                </h1>
                <p className="hero-role">Full-Stack Developer</p>
                <p className="hero-summary">AI / ML enthusiast<br />3D modeling &amp; printing nerd</p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#projects">View my work ↗</a>
                  <a className="btn btn-ghost" href="#contact">Let's talk →</a>
                </div>
              </div>
              <div className="hero-value-grid reveal-on-scroll" aria-label="What I bring">
                <article className="hero-value-card"><span>01 / ENGINEERING</span><h2>Full-stack</h2><p>From product interface to production API.</p></article>
                <article className="hero-value-card"><span>02 / INTELLIGENCE</span><h2>Applied AI</h2><p>Useful machine learning and automation.</p></article>
                <article className="hero-value-card"><span>03 / IMAGINATION</span><h2>Creative tech</h2><p>3D, mobile, and thoughtful digital work.</p></article>
              </div>
            </div>
            <a className="scroll-cue" href="#about" aria-label="Scroll to about">
              <span className="scroll-line" aria-hidden="true" />
              Scroll to explore
            </a>
          </section>

          <section className="content-section" id="about">
            <div className="section-wrap">
              <SectionHeading number="01" label="ABOUT" title="A little about me" />
              <div className="about-grid">
                <div className="about-text reveal-on-scroll">
                  <p>I'm <strong>cybrninjaX</strong>, a full-stack developer and AI/ML enthusiast. I enjoy building web and mobile applications, AI-powered solutions, automation tools, and 3D models.</p>
                  <p>I like turning ideas into practical projects, learning new technologies, and making software that solves real problems.</p>
                </div>
                <div className="about-cards reveal-on-scroll">
                  <div className="about-card"><span>🚀</span><h4>Fast Delivery</h4><p>Clean, production-ready code shipped on time.</p></div>
                  <div className="about-card"><span>🧠</span><h4>AI-Powered</h4><p>Integrating modern AI into practical solutions.</p></div>
                  <div className="about-card"><span>📐</span><h4>Clean Design</h4><p>Pixel-perfect UIs that work on every device.</p></div>
                  <div className="about-card"><span>🔧</span><h4>Full-Stack</h4><p>From database to deployment, end to end.</p></div>
                </div>
              </div>
            </div>
          </section>

          <section className="content-section section-alt" id="skills">
            <div className="skills-lock-stage">
              <div className="section-wrap skills-lock-copy">
                <SectionHeading number="02" label="SKILLS" title="Tools I work with" />
              </div>
            </div>
          </section>

          <section className="content-section" id="experience">
            <div className="section-wrap">
              <SectionHeading number="03" label="EXPERIENCE" title="Where I've worked" />
              <div className="experience-list">
                {experience.map((job) => (
                  <details className="experience-entry reveal-on-scroll" key={`${job.company}-${job.title}`}>
                    <summary className="experience-item">
                      <span className="exp-left">
                        <span className="item-overline">{job.company}</span>
                        <span className="experience-title">{job.title}</span>
                        <span className="item-meta">{job.period} <span>·</span> {job.location}</span>
                      </span>
                      <span className="exp-summary-right"><span className="job-type">{job.kind}</span><span className="experience-toggle">＋</span></span>
                    </summary>
                    <p className="experience-detail">{job.detail}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section section-alt" id="projects">
            <div className="section-wrap">
              <SectionHeading number="04" label="SELECTED PROJECTS" title="A few things I've built" />
              <div className="projects-grid">
                {projects.slice(0, visibleProjectCount).map((project, index) => (
                    <ProjectCard project={project} index={index} key={project.title} onPreview={setSelectedProject} />
                ))}
              </div>
              {projects.length > visibleProjectCount && (
                <details className="project-directory">
                  <summary>
                    <span className="dir-closed">View all projects</span>
                    <span className="dir-open">Show fewer</span>
                    <span aria-hidden="true">＋</span>
                  </summary>
                  <div className="projects-grid projects-grid-extra">
                    {projects.slice(visibleProjectCount).map((project, index) => (
                      <ProjectCard project={project} index={index + visibleProjectCount} key={project.title} onPreview={setSelectedProject} />
                    ))}
                  </div>
                </details>
              )}
            </div>
          </section>

          <section className="services-section" id="services">
            <div className="section-wrap">
              <SectionHeading number="05" label="FREELANCE SERVICES" title="What I can build for you" light />
              <p className="services-intro reveal-on-scroll">Available for freelance projects, collaborations, and consulting. Let's build something great together.</p>
              <div className="services-grid">
                {services.map((s) => (
                  <article className="service-card reveal-on-scroll" key={s.title}>
                    <span className="service-icon">{s.icon}</span>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="service-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  </article>
                ))}
              </div>
              <div className="services-cta reveal-on-scroll">
                <p>Ready to start a project?</p>
                <a className="btn btn-white" href="#contact">Let's talk ↗</a>
              </div>
            </div>
          </section>

          <section className="contact-section" id="contact">
            <div className="section-wrap">
              <div className="contact-inner reveal-on-scroll">
                <div className="contact-left">
                  <p className="section-label">06 <span>/</span> CONTACT</p>
                  <h2>Have a project<br />in mind?</h2>
                  <p className="contact-intro">I'm always happy to talk about good ideas and interesting work. Drop me a message and I'll get back to you.</p>
                  <a className="btn btn-primary" href="mailto:rahul63794@gmail.com">Say hello ↗</a>
                </div>
                <div className="contact-right">
                  <a className="contact-email" href="mailto:rahul63794@gmail.com">rahul63794@gmail.com</a>
                  <div className="social-links">
                    <a href="https://github.com/CybrNinjaX" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/rahul-77a46b273" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://www.instagram.com/rahul_zeronex___" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="mailto:rahul63794@gmail.com">Email</a>
                  </div>
                </div>
              </div>
            </div>
            <footer className="site-footer">
              <div className="section-wrap footer-inner">
                <a className="site-brand" href="#home">rahul<span>.</span></a>
                <p>Designed and built by Rahul</p>
                <a href="#home">Back to top ↑</a>
              </div>
            </footer>
          </section>
          {selectedProject && <ProjectPreviewDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </main>
      </div>
    </GlowCursor>
  )
}
