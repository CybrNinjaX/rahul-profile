import { useEffect, useState } from 'react'
import murugerImage from '../assets/muruger.jpeg'
import murugerModel from '../assets/muruger.stl?url'
import GlowCursor from '../components/GlowCursor.jsx'
import { LaserFlow } from '../components/LaserFlow.jsx'
import {
  siAndroidstudio, siBambulab, siBlender, siC, siCplusplus, siDart, siDjango,
  siDocker, siFastapi, siFirebase, siFlask, siFlutter, siGit, siGithub,
  siHtml5, siHuggingface, siJavascript, siLinux, siMongodb, siMysql, siN8n,
  siNextdotjs, siOpenjdk, siPostgresql, siPostman, siPython, siPytorch, siReact,
  siSpringboot, siSupabase, siTailwindcss, siTypescript, siVllm, siVscodium,
} from 'simple-icons'

const skills = [
  { title: 'Programming', items: [['Java', siOpenjdk], ['Python', siPython], ['C', siC], ['C++', siCplusplus], ['JavaScript', siJavascript], ['TypeScript', siTypescript], ['Dart', siDart], ['HTML', siHtml5]] },
  { title: 'Frontend & Mobile', items: [['React', siReact], ['React Native', siReact], ['Next.js', siNextdotjs], ['Tailwind CSS', siTailwindcss], ['Flutter', siFlutter]] },
  { title: 'Backend', items: [['Django', siDjango], ['Flask', siFlask], ['FastAPI', siFastapi], ['Spring Boot', siSpringboot]] },
  { title: 'AI & Machine Learning', items: [['PyTorch', siPytorch], ['Hugging Face', siHuggingface], ['LLMs', siVllm], ['AI Applications', siHuggingface]] },
  { title: 'Databases', items: [['MongoDB', siMongodb], ['MySQL', siMysql], ['PostgreSQL', siPostgresql]] },
  { title: 'Cloud & Services', items: [['AWS', null], ['Firebase', siFirebase], ['Supabase', siSupabase], ['Docker', siDocker]] },
  { title: 'Automation & Testing', items: [['n8n', siN8n], ['Manual Testing', null], ['Automation Testing', null]] },
  { title: '3D Modeling & Printing', items: [['Blender', siBlender], ['Bambu Lab A1', siBambulab]] },
  { title: 'Developer Tools', items: [['Git', siGit], ['GitHub', siGithub], ['VS Code', siVscodium], ['Android Studio', siAndroidstudio], ['Postman', siPostman], ['Linux', siLinux]] },
]

const experience = [
  { title: 'Software Engineer', company: 'Th isai Technologies Private Limited', kind: 'Full-time', period: 'Apr 2026 – Jun 2026', location: 'Tamil Nadu, India · On-site' },
  { title: 'API Testing', company: 'NADAL Business Services', kind: 'Internship', period: 'Jan 2026 – Mar 2026', location: 'Thisayanvilai · On-site' },
  { title: 'Software Engineer', company: 'Astraval', kind: 'Internship', period: 'May 2025 – Jun 2025', location: 'Thisayanvilai, Tamil Nadu · On-site' },
]

const projects = [
  { title: 'Construction Materials E-Commerce Platform', category: 'E-commerce', image: '/trade-cover.svg', description: 'A digital ordering platform designed to make construction material orders easier.', links: [{ label: 'GitHub', href: 'https://github.com/CybrNinjaX/Trade_mate.git' }] },
  { title: 'Automated Loan Processing System', category: 'Fintech · Automation', image: '/loan-cover.svg', description: 'A loan processing system that automates credit checks.', links: [{ label: 'GitHub', href: 'https://github.com/techthisai-ai/loan-web' }, { label: 'Live app', href: 'https://loan-web-mu.vercel.app/login' }] },
  { title: 'DigiGold Trading Application', category: 'Fintech · Savings', image: '/gold-cover.svg', description: 'A digital gold trading app built around fractional gold savings.', links: [{ label: 'GitHub', href: 'https://github.com/CybrNinjaX/digigold-app' }] },
  { title: 'Ashtabal Brooms Website', category: 'Product Showcase', image: '/brooms-cover.svg', description: 'A product showcase website for Ashtabal Brooms.', links: [{ label: 'Visit website', href: 'https://brooms.astraval.com/' }] },
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

function ProjectCard({ project, index }) {
  const coverClass = project.download ? 'project-cover project-cover-model' : 'project-cover'
  return (
    <article className="project-card reveal-on-scroll">
      <div className={coverClass}>
        <img src={project.image} alt={project.imageAlt ?? `${project.category} project preview`} loading="lazy" />
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
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

        <main>
          <section className="hero" id="home">
            <div className="hero-laser" aria-hidden="true">
              <LaserFlow color="#00d9ff" intensity={0.8} beamWidth={1.2} flare={0.8} spread={1.4} spill={0.5} fog={0.12} dust={0.8} streaks={0.8} dots={0.6} pulse={1} speed={0.8} theme="dark" />
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
              <div className="hero-visual reveal-on-scroll">
                <div className="portrait-frame">
                  <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1300&q=90" alt="Developer in a dark studio portrait" fetchPriority="high" />
                  <div className="portrait-shade" />
                  <div className="portrait-caption"><span className="dot" /> BUILDING DIGITAL EXPERIENCES <b>01 / 06</b></div>
                </div>
                <div className="hero-tech-rail" aria-label="Core technologies">
                  <span>React</span><span>Python</span><span>AI / ML</span><span>Flutter</span><span>3D</span>
                </div>
              </div>
            </div>
            <a className="scroll-cue" href="#about" aria-label="Scroll to about">
              <span className="scroll-line" aria-hidden="true" />
              Scroll
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
            <div className="section-wrap">
              <SectionHeading number="02" label="SKILLS" title="Tools I work with" />
              <div className="skills-grid">
                {skills.map((group) => (
                  <article className="skill-card reveal-on-scroll" key={group.title}>
                    <h3>{group.title}</h3>
                    <div className="skill-items">
                      {group.items.map(([name, icon]) => (
                        <span className="skill-item" key={name} style={{ '--skill-color': icon ? `#${icon.hex}` : '#6366f1' }}>
                          {icon
                            ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg>
                            : <span className="skill-monogram" aria-hidden="true">{name === 'Manual Testing' ? 'MT' : name === 'Automation Testing' ? 'AT' : 'AWS'}</span>
                          }
                          <span>{name}</span>
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section" id="experience">
            <div className="section-wrap">
              <SectionHeading number="03" label="EXPERIENCE" title="Where I've worked" />
              <div className="experience-list">
                {experience.map((job) => (
                  <article className="experience-item reveal-on-scroll" key={`${job.company}-${job.title}`}>
                    <div className="exp-left">
                      <p className="item-overline">{job.company}</p>
                      <h3>{job.title}</h3>
                      <p className="item-meta">{job.period} <span>·</span> {job.location}</p>
                    </div>
                    <span className="job-type">{job.kind}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section section-alt" id="projects">
            <div className="section-wrap">
              <SectionHeading number="04" label="SELECTED PROJECTS" title="A few things I've built" />
              <div className="projects-grid">
                {projects.slice(0, visibleProjectCount).map((project, index) => (
                  <ProjectCard project={project} index={index} key={project.title} />
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
                      <ProjectCard project={project} index={index + visibleProjectCount} key={project.title} />
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
        </main>
      </div>
    </GlowCursor>
  )
}
