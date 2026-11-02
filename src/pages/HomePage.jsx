import { useEffect, useState } from 'react'
import murugerImage from '../assets/muruger.jpeg'
import murugerModel from '../assets/muruger.stl?url'
import {
  siAndroidstudio, siBambulab, siBlender, siC, siCplusplus, siDart, siDjango,
  siDocker, siFastapi, siFirebase, siFlask, siFlutter, siGit, siGithub,
  siHtml5, siHuggingface, siJavascript, siLinux, siMongodb, siMysql, siN8n,
  siNextdotjs, siOpenjdk, siPostgresql, siPostman, siPython, siPytorch, siReact,
  siSpringboot, siSupabase, siTailwindcss, siTypescript, siVllm, siVscodium,
} from 'simple-icons'

const skills = [
  { title: 'Programming', items: [['Java', siOpenjdk], ['Python', siPython], ['C', siC], ['C++', siCplusplus], ['JavaScript', siJavascript], ['TypeScript', siTypescript], ['Dart', siDart], ['HTML', siHtml5]] },
  { title: 'Frontend & mobile', items: [['React', siReact], ['React Native', siReact], ['Next.js', siNextdotjs], ['Tailwind CSS', siTailwindcss], ['Flutter', siFlutter]] },
  { title: 'Backend', items: [['Django', siDjango], ['Flask', siFlask], ['FastAPI', siFastapi], ['Spring Boot', siSpringboot]] },
  { title: 'AI & machine learning', items: [['PyTorch', siPytorch], ['Hugging Face', siHuggingface], ['LLMs', siVllm], ['AI applications', siHuggingface]] },
  { title: 'Databases', items: [['MongoDB', siMongodb], ['MySQL', siMysql], ['PostgreSQL', siPostgresql]] },
  { title: 'Cloud & services', items: [['AWS', null], ['Firebase', siFirebase], ['Supabase', siSupabase], ['Docker', siDocker]] },
  { title: 'Automation & testing', items: [['n8n', siN8n], ['Manual testing', null], ['Automation testing', null]] },
  { title: '3D modeling & printing', items: [['Blender', siBlender], ['Bambu Lab A1', siBambulab]] },
  { title: 'Developer tools', items: [['Git', siGit], ['GitHub', siGithub], ['VS Code', siVscodium], ['Android Studio', siAndroidstudio], ['Postman', siPostman], ['Linux', siLinux]] },
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
  { title: 'Ashtabal Brooms Website', category: 'Product showcase', image: '/brooms-cover.svg', description: 'A product showcase website for Ashtabal Brooms.', links: [{ label: 'Visit website', href: 'https://brooms.astraval.com/' }] },
  { title: 'Murugan 3D Model', category: '3D modeling · STL', image: murugerImage, imageAlt: 'Colorful 3D artwork of Lord Murugan with a peacock', description: 'A detailed 3D artwork of Lord Murugan with his vel and peacock.', links: [{ label: 'Purchase model', href: 'https://villpo.astraval.com/' }], download: { label: 'Download STL', href: murugerModel, fileName: 'muruger.stl' } },
]
const visibleProjectCount = 4

function ProjectCard({ project, index }) {
  return (
    <article className="project-card reveal-on-scroll" key={project.title}>
      <div className={`project-cover${project.download ? ' project-cover-model' : ''}`}>
        <img src={project.image} alt={project.imageAlt ?? `${project.category} project preview`} loading="lazy" />
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="project-card-copy">
        <p className="item-overline">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.download ? <div className="project-actions">
          <a className="project-action project-action-primary" href={project.links[0].href} target="_blank" rel="noopener noreferrer">{project.links[0].label}<span aria-hidden="true">↗</span></a>
          <a className="project-action" href={project.download.href} download={project.download.fileName}>{project.download.label}<span aria-hidden="true">↓</span></a>
        </div> : <div className="project-links">{project.links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>)}</div>}
      </div>
    </article>
  )
}

function SectionHeading({ number, label, title }) {
  return <div className="section-heading"><p className="section-label">{number} <span>/</span> {label}</p><h2>{title}</h2></div>
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const targets = document.querySelectorAll('.reveal-on-scroll')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' })
    targets.forEach((target) => observer.observe(target))
    const directory = document.querySelector('.project-directory')
    const observeAdditionalCards = () => {
      if (!directory?.open) return
      directory.querySelectorAll('.reveal-on-scroll:not(.is-visible)').forEach((target) => observer.observe(target))
    }
    directory?.addEventListener('toggle', observeAdditionalCards)
    return () => {
      observer.disconnect()
      directory?.removeEventListener('toggle', observeAdditionalCards)
    }
  }, [])

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  return (
    <div className="portfolio-page">
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="header-inner">
          <a className="site-brand" href="#home" aria-label="Rahul, home">rahul<span>.</span></a>
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#about">About</a><a href="#skills">Skills</a><a href="#experience">Experience</a><a href="#projects">Projects</a>
          </nav>
          <a className="header-contact" href="#contact">Contact <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main>
        <section className="hero section-wrap reveal-on-scroll" id="home">
          <div className="hero-copy">
            <p className="availability"><span /> Developer based in Tamil Nadu, India</p>
            <h1>Hi, I’m Rahul.<br /><span>I build useful</span><br />digital things.</h1>
            <p className="hero-summary">Full-stack developer and AI/ML enthusiast creating web and mobile apps, practical automation, and thoughtful digital experiences.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View my work <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="mailto:rahul63794@gmail.com">Get in touch <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
            <div className="visual-card"><div className="visual-card-top"><span /><span /><span /><b>RAHUL / DIGITAL STUDIO</b></div><div className="visual-card-body"><p>IDEA <i>→</i> CODE <i>→</i> IMPACT</p><div className="visual-bars"><span /><span /><span /><span /><span /><span /><span /></div><strong>BUILDING WHAT’S NEXT<span>_</span></strong><small>FULL-STACK · AI · CREATIVE TECH</small></div></div>
            <span className="visual-star star-one">✳</span><span className="visual-star star-two">✳</span>
          </div>
          <a className="scroll-cue" href="#about"><span aria-hidden="true">↓</span> Scroll to explore</a>
        </section>

        <section className="content-section section-wrap reveal-on-scroll" id="about">
          <SectionHeading number="01" label="ABOUT" title="A little about me" />
          <div className="about-copy"><p>I’m <strong>cybrninjaX</strong>, a full-stack developer and AI/ML enthusiast. I enjoy building web and mobile applications, AI-powered solutions, automation tools, and 3D models.</p><p>I like turning ideas into practical projects, learning new technologies, and making software that solves real problems.</p></div>
        </section>

        <section className="content-section section-wrap reveal-on-scroll" id="skills">
          <SectionHeading number="02" label="SKILLS" title="Tools I work with" />
          <div className="skills-grid">{skills.map((group) => <article className="skill-card reveal-on-scroll" key={group.title}><h3>{group.title}</h3><div className="skill-items">{group.items.map(([name, icon]) => <span className="skill-item" key={name} style={{ '--skill-color': icon ? `#${icon.hex}` : '#65736c' }}>{icon ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg> : <span className="skill-monogram" aria-hidden="true">{name === 'Manual testing' ? 'MT' : name === 'Automation testing' ? 'AT' : 'AWS'}</span>}<span>{name}</span></span>)}</div></article>)}</div>
        </section>

        <section className="content-section section-wrap reveal-on-scroll" id="experience">
          <SectionHeading number="03" label="EXPERIENCE" title="Where I’ve worked" />
          <div className="experience-list">{experience.map((job) => <article className="experience-item reveal-on-scroll" key={`${job.company}-${job.title}`}><div><p className="item-overline">{job.company}</p><h3>{job.title}</h3><p className="item-meta">{job.period} <span>·</span> {job.location}</p></div><span className="job-type">{job.kind}</span></article>)}</div>
        </section>

        <section className="content-section section-wrap reveal-on-scroll" id="projects">
          <SectionHeading number="04" label="SELECTED PROJECTS" title="A few things I’ve built" />
          <div className="projects-grid">{projects.slice(0, visibleProjectCount).map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}</div>
          {projects.length > visibleProjectCount && <details className="project-directory">
            <summary><span className="project-directory-closed">View all projects</span><span className="project-directory-open">Show fewer projects</span><span aria-hidden="true">＋</span></summary>
            <div className="projects-grid projects-grid-extra">{projects.slice(visibleProjectCount).map((project, index) => <ProjectCard project={project} index={index + visibleProjectCount} key={project.title} />)}</div>
          </details>}
        </section>

        <section className="contact-section section-wrap reveal-on-scroll" id="contact">
          <div className="contact-panel"><div><p className="section-label">05 <span>/</span> CONTACT</p><h2>Have a project<br />in mind?</h2><p className="contact-intro">I’m always happy to talk about good ideas and interesting work.</p><a className="button button-light" href="mailto:rahul63794@gmail.com">Say hello <span aria-hidden="true">↗</span></a></div><div className="contact-details"><a href="mailto:rahul63794@gmail.com">rahul63794@gmail.com</a><div className="social-links"><a href="https://github.com/CybrNinjaX" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/rahul-77a46b273" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.instagram.com/rahul_zeronex___" target="_blank" rel="noopener noreferrer">Instagram</a><a href="mailto:rahul63794@gmail.com">Email</a></div></div></div>
          <footer className="site-footer"><a className="site-brand" href="#home">rahul<span>.</span></a><p>Designed and built by Rahul</p><a href="#home">Back to top ↑</a></footer>
        </section>
      </main>
    </div>
  )
}
