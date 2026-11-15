import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImage from '../assets/image.png'
import murugerImage from '../assets/muruger.jpeg'
import murugerModel from '../assets/muruger.stl?url'
import { Box, Brain, Cloud, Code2, Database, Layers, Workflow, Wrench } from 'lucide-react'
import PlasmaWave from '../components/PlasmaWave.jsx'

const AvatarScene = lazy(() => import('../components/AvatarScene.jsx'))

const experience = [
  {
    title: 'Software Engineer',
    company: 'Th isai Technologies Private Limited',
    kind: 'Full-time',
    period: 'Apr 2026 – Jun 2026',
    location: 'Tamil Nadu, India · On-site',
    detail: 'Built and maintained customer-facing software, collaborating across product requirements, implementation, and release.',
  },
  {
    title: 'API Testing',
    company: 'NADAL Business Services',
    kind: 'Internship',
    period: 'Jan 2026 – Mar 2026',
    location: 'Thisayanvilai · On-site',
    detail: 'Validated API behavior and reliability through structured manual testing and clear defect reporting.',
  },
  {
    title: 'Software Engineer',
    company: 'Astraval',
    kind: 'Internship',
    period: 'May 2025 – Jun 2025',
    location: 'Thisayanvilai, Tamil Nadu · On-site',
    detail: 'Contributed to full-stack product work and learned to ship practical features in a collaborative team.',
  },
]

const projects = [
  {
    title: 'Construction Materials E-Commerce Platform',
    category: 'E-commerce',
    image: '/trade-cover.svg',
    description: 'A digital ordering platform designed to make construction material orders easier.',
    links: [{ label: 'GitHub', href: 'https://github.com/CybrNinjaX/Trade_mate.git' }],
  },
  {
    title: 'Automated Loan Processing System',
    category: 'Fintech · Automation',
    image: '/loan-cover.svg',
    description: 'A loan processing system that automates credit checks.',
    previewUrl: 'https://loan-web-mu.vercel.app/login',
    links: [
      { label: 'GitHub', href: 'https://github.com/techthisai-ai/loan-web' },
      { label: 'Live app', href: 'https://loan-web-mu.vercel.app/login' },
    ],
  },
  {
    title: 'DigiGold Trading Application',
    category: 'Fintech · Savings',
    image: '/gold-cover.svg',
    description: 'A digital gold trading app built around fractional gold savings.',
    links: [{ label: 'GitHub', href: 'https://github.com/CybrNinjaX/digigold-app' }],
  },
  {
    title: 'Ashtabal Brooms Website',
    category: 'Product Showcase',
    image: '/brooms-cover.svg',
    description: 'A product showcase website for Ashtabal Brooms.',
    previewUrl: 'https://brooms.astraval.com/',
    links: [{ label: 'Visit website', href: 'https://brooms.astraval.com/' }],
  },
  {
    title: 'Murugan 3D Model',
    category: '3D Modeling · STL',
    image: murugerImage,
    imageAlt: 'Colorful 3D artwork of Lord Murugan with a peacock',
    description: 'A detailed 3D artwork of Lord Murugan with his vel and peacock.',
    links: [{ label: 'Purchase model', href: 'https://villpo.astraval.com/' }],
    download: { label: 'Download STL', href: murugerModel, fileName: 'muruger.stl' },
  },
]

const services = [
  {
    icon: '🌐',
    title: 'Full-Stack Web Development',
    desc: 'End-to-end web apps with React, Next.js, Django, FastAPI and more — from landing pages to complex platforms.',
    tags: ['React', 'Next.js', 'Django', 'FastAPI'],
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    desc: 'Cross-platform mobile apps using Flutter and React Native that feel native on both iOS and Android.',
    tags: ['Flutter', 'React Native', 'Firebase'],
  },
  {
    icon: '🤖',
    title: 'AI & Automation Solutions',
    desc: 'Custom AI integrations, LLM-powered tools, and workflow automation using n8n, PyTorch and Hugging Face.',
    tags: ['LLMs', 'PyTorch', 'n8n'],
  },
  {
    icon: '🗄️',
    title: 'Backend & API Development',
    desc: 'Scalable REST APIs, database design, and cloud deployments on AWS, Supabase and Docker.',
    tags: ['REST API', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    icon: '🎨',
    title: '3D Modeling & Printing',
    desc: 'Custom 3D models for printing using Blender — from product prototypes to artistic sculptures.',
    tags: ['Blender', 'STL', 'Bambu Lab'],
  },
  {
    icon: '🧪',
    title: 'QA & API Testing',
    desc: 'Manual and automated testing, API validation with Postman, and quality assurance for web applications.',
    tags: ['Postman', 'Manual Testing', 'Automation'],
  },
]

const visibleProjectCount = 4

const modelingTools = [
  ['Bambu Lab A1', 'FDM printing for final prototypes and physical models.'],
  ['Blender', 'Sculpting, retopology, UV work, and mesh cleanup before slicing.'],
  ['Large Gaussian Model (LGM)', 'Image-to-3D generation with Gaussian splats converted to editable meshes.'],
  ['PyMeshLab', 'Scripted mesh repair, decimation, and format conversion.'],
  ['CSM', 'AI-assisted 3D asset generation from text and image prompts.'],
  ['Tripo3D', 'Rapid text-to-3D and image-to-3D concept generation.'],
  ['Meshy.ai', 'Texturing and refinement before print preparation.'],
]

const skillGroups = [
  {
    title: 'Programming languages',
    icon: Code2,
    description: 'Languages for web, backend, and scripting.',
    skills: ['Java', 'Python', 'C', 'C++', 'TypeScript', 'JavaScript', 'Dart', 'HTML5'],
  },
  {
    title: 'Frameworks & libraries',
    icon: Layers,
    description: 'Frameworks for interfaces, mobile, and APIs.',
    skills: ['Spring Boot', 'Next.js', 'Tailwind CSS', 'Flutter', 'React Native', 'Django', 'Flask', 'FastAPI'],
  },
  {
    title: 'AI & machine learning',
    icon: Brain,
    description: 'Libraries and platforms for model work.',
    skills: ['Hugging Face Transformers', 'Scikit-learn', 'TorchAudio', 'Google Colab', 'Kaggle'],
  },
  {
    title: 'Databases',
    icon: Database,
    description: 'Relational and document data stores.',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Cloud & backend services',
    icon: Cloud,
    description: 'Cloud platforms and managed services.',
    skills: ['Amazon Web Services', 'Firebase', 'Supabase', 'Docker'],
  },
  {
    title: 'Automation & testing',
    icon: Workflow,
    description: 'Workflow automation and quality checks.',
    skills: ['n8n', 'Selenium', 'Jira'],
  },
  {
    title: '3D modeling & printing',
    icon: Box,
    description: 'From generated meshes to print-ready models.',
    skills: ['Blender', 'Bambu Lab A1', 'Large Gaussian Model (LGM)', 'PyMeshLab', 'CSM', 'Tripo3D', 'Meshy.ai'],
    workflow: modelingTools,
  },
  {
    title: 'Tools & development environment',
    icon: Wrench,
    description: 'Everyday tools for building and shipping.',
    skills: ['Git', 'GitHub', 'Visual Studio Code', 'Android Studio', 'Postman', 'Linux'],
  },
]

const skillLogoPaths = {
  Java: 'java/java-original.svg',
  Python: 'python/python-original.svg',
  C: 'c/c-original.svg',
  'C++': 'cplusplus/cplusplus-original.svg',
  TypeScript: 'typescript/typescript-original.svg',
  JavaScript: 'javascript/javascript-original.svg',
  Dart: 'dart/dart-original.svg',
  HTML5: 'html5/html5-original.svg',
  'Spring Boot': 'spring/spring-original.svg',
  'Next.js': 'nextjs/nextjs-original.svg',
  'Tailwind CSS': 'tailwindcss/tailwindcss-original.svg',
  Flutter: 'flutter/flutter-original.svg',
  'React Native': 'react/react-original.svg',
  Django: 'django/django-plain.svg',
  Flask: 'flask/flask-original.svg',
  FastAPI: 'fastapi/fastapi-original.svg',
  'Scikit-learn': 'scikitlearn/scikitlearn-original.svg',
  TorchAudio: 'pytorch/pytorch-original.svg',
  'Google Colab': 'googlecolab/googlecolab-original.svg',
  Kaggle: 'kaggle/kaggle-original.svg',
  MongoDB: 'mongodb/mongodb-original.svg',
  MySQL: 'mysql/mysql-original.svg',
  PostgreSQL: 'postgresql/postgresql-original.svg',
  'Amazon Web Services': 'amazonwebservices/amazonwebservices-original.svg',
  Firebase: 'firebase/firebase-original.svg',
  Supabase: 'supabase/supabase-original.svg',
  Docker: 'docker/docker-original.svg',
  Selenium: 'selenium/selenium-original.svg',
  Jira: 'jira/jira-original.svg',
  Blender: 'blender/blender-original.svg',
  Git: 'git/git-original.svg',
  GitHub: 'github/github-original.svg',
  'Visual Studio Code': 'vscode/vscode-original.svg',
  'Android Studio': 'androidstudio/androidstudio-original.svg',
  Postman: 'postman/postman-original.svg',
  Linux: 'linux/linux-original.svg',
}

function SkillGlyph({ name }) {
  const [failed, setFailed] = useState(false)
  const path = skillLogoPaths[name]
  const initials = name
    .split(/[\s.+()-]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <li className="skill-icon-item" title={name}>
      {path && !failed ? (
        <img
          className="skill-brand-mark"
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="skill-brand-fallback" aria-hidden="true">
          {initials}
        </span>
      )}
      <span>{name}</span>
    </li>
  )
}

function ProjectCard({ project, index, onPreview }) {
  const coverClass = project.download ? 'project-cover project-cover-model' : 'project-cover'

  return (
    <article className="project-card reveal-on-scroll">
      <div className={coverClass}>
        <img
          src={project.image}
          alt={project.imageAlt ?? `${project.category} project preview`}
          loading="lazy"
        />
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
        <button
          className="project-preview-trigger"
          type="button"
          onClick={() => onPreview(project)}
        >
          Open preview <span>↗</span>
        </button>
      </div>
      <div className="project-card-copy">
        <p className="item-overline">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.download ? (
          <div className="project-actions">
            <a
              className="project-action project-action-primary"
              href={project.links[0].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.links[0].label} ↗
            </a>
            <a
              className="project-action"
              href={project.download.href}
              download={project.download.fileName}
            >
              {project.download.label} ↓
            </a>
          </div>
        ) : (
          <div className="project-links">
            {project.links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
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
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  return (
    <dialog
      className="project-preview-dialog"
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div className="preview-dialog-top">
        <p className="item-overline">{project.category}</p>
        <button
          type="button"
          className="preview-close"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close project preview"
        >
          ×
        </button>
      </div>
      <h2>{project.title}</h2>
      <p className="preview-dialog-description">{project.description}</p>
      <div className="preview-dialog-media">
        {project.previewUrl ? (
          <iframe
            src={project.previewUrl}
            title={`${project.title} live preview`}
            loading="lazy"
          />
        ) : (
          <img
            src={project.image}
            alt={project.imageAlt ?? `${project.title} preview`}
          />
        )}
      </div>
      <div className="preview-dialog-actions">
        {project.links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label} ↗
          </a>
        ))}
        {project.download && (
          <a href={project.download.href} download={project.download.fileName}>
            {project.download.label} ↓
          </a>
        )}
      </div>
    </dialog>
  )
}

function SectionHeading({ number, label, title, light }) {
  return (
    <div className="section-heading">
      <p className={light ? 'section-label section-label-light' : 'section-label'}>
        {number} <span>/</span> {label}
      </p>
      <h2>{title}</h2>
    </div>
  )
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
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
        modelLayout.current.rotation = self.progress * Math.PI * 2
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
        experience: { x: -sideShift * 0.9, y: 0, scale: 0.92, cameraZ: 7.2 },
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

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
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
    <div className="portfolio-shell">
      <div className="portfolio-page">
        {/* Header */}
        <header className="site-header">
          <div className="header-inner">
            <a className="site-brand" href="#home" aria-label="Rahul home">
              rahul<span>.</span>
            </a>

            <nav
              id="primary-navigation"
              className={menuOpen ? 'site-nav is-open' : 'site-nav'}
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={activeSection === item.href.slice(1) ? 'is-active' : ''}
                  aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              ))}
              <a className="nav-cta" href="#contact" onClick={handleNavClick}>
                Contact ↗
              </a>
            </nav>

            <button
              type="button"
              className={menuOpen ? 'nav-toggle is-open' : 'nav-toggle'}
              aria-controls="primary-navigation"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        {/* Global 3D Avatar */}
        <div
          className={`global-avatar${activeSection === 'contact' ? ' is-hidden' : ''}${activeSection === 'home' ? ' is-home' : ''}`}
          aria-hidden="true"
        >
          {activeSection === 'home' && (
            <PlasmaWave
              className="home-plasma-wave"
              colors={['#6B3CFF', '#4900ff']}
              speed={0.55}
              brightness={0.55}
              glow={0.8}
              quality={0.6}
              mouseInteraction={false}
              opacity={0.72}
              aria-hidden="true"
            />
          )}
          <Suspense
            fallback={
              <div className="avatar-loading">
                <span>Loading 3D model</span>
              </div>
            }
          >
            <AvatarScene layout={modelLayout} />
          </Suspense>
          <div className="global-avatar-fade" />
        </div>

        <main>
          {/* ========== HERO ========== */}
          <section className="hero" id="home" aria-labelledby="hero-title">
            <div className="hero-inner">
              <div className="hero-intro">
                <div className="hero-copy reveal-on-scroll">
                  <p className="availability">
                    <span className="dot" /> Available for freelance work
                  </p>

                  <h1 id="hero-title">
                    <span className="h1-hi">
                      Rahul<span className="hero-period">.</span>
                    </span>
                  </h1>

                  <p className="hero-role"><span>Full-Stack Developer</span><i aria-hidden="true" /></p>
                  <p className="hero-summary">
                    AI / ML enthusiast
                    <br />
                    3D modeling &amp; printing nerd
                  </p>

                  <div className="hero-actions">
                    <a className="btn btn-primary" href="#projects">
                      View my work ↗
                    </a>
                    <a className="btn btn-ghost" href="#contact">
                      Let's talk →
                    </a>
                  </div>
                </div>

                <div className="hero-value-grid reveal-on-scroll" aria-label="What I bring">
                  <article className="hero-value-card">
                    <span>01 / ENGINEERING</span>
                    <h2>Full-stack</h2>
                    <p>From product interface to production API.</p>
                  </article>
                  <article className="hero-value-card">
                    <span>02 / INTELLIGENCE</span>
                    <h2>Applied AI</h2>
                    <p>Useful machine learning and automation.</p>
                  </article>
                  <article className="hero-value-card">
                    <span>03 / IMAGINATION</span>
                    <h2>Creative tech</h2>
                    <p>3D, mobile, and thoughtful digital work.</p>
                  </article>
                </div>
              </div>
            </div>

            <a className="scroll-cue" href="#about" aria-label="Scroll to about">
              <span className="scroll-line" aria-hidden="true" />
              Scroll to explore
            </a>
          </section>

          {/* ========== ABOUT ========== */}
          <section className="content-section" id="about">
            <div className="section-wrap">
              <SectionHeading number="01" label="ABOUT" title="A little about me" />
              <div className="about-grid">
                <div className="about-text reveal-on-scroll">
                  <p>
                    I'm <strong>cybrninjaX</strong>, a full-stack developer and AI/ML enthusiast. I
                    enjoy building web and mobile applications, AI-powered solutions, automation
                    tools, and 3D models.
                  </p>
                  <p>
                    I like turning ideas into practical projects, learning new technologies, and
                    making software that solves real problems.
                  </p>
                </div>
                <div className="about-cards reveal-on-scroll">
                  <div className="about-card">
                    <span>🚀</span>
                    <h4>Fast Delivery</h4>
                    <p>Clean, production-ready code shipped on time.</p>
                  </div>
                  <div className="about-card">
                    <span>🧠</span>
                    <h4>AI-Powered</h4>
                    <p>Integrating modern AI into practical solutions.</p>
                  </div>
                  <div className="about-card">
                    <span>📐</span>
                    <h4>Clean Design</h4>
                    <p>Pixel-perfect UIs that work on every device.</p>
                  </div>
                  <div className="about-card">
                    <span>🔧</span>
                    <h4>Full-Stack</h4>
                    <p>From database to deployment, end to end.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========== SKILLS ========== */}
          <section className="content-section section-alt" id="skills">
            <div className="skills-overview">
              <div className="skills-overview-heading">
                <SectionHeading number="02" label="SKILLS" title="A stack built for making" />
                <div className="skills-overview-meta">
                  <p>Tools I use to design, build, test, and ship software and creative projects.</p>
                  <span>
                    <b>08</b> skill areas
                  </span>
                </div>
              </div>

              <div className="skills-category-grid">
                {skillGroups.map((group, index) => {
                  const CategoryIcon = group.icon
                  return (
                    <article
                      className={`skill-domain skill-domain-${index + 1} reveal-on-scroll`}
                      key={group.title}
                      style={{ '--card-delay': `${index * 65}ms` }}
                    >
                      <div className="skill-domain-heading">
                        <span className="skill-domain-symbol" aria-hidden="true">
                          <CategoryIcon size={19} strokeWidth={1.8} />
                        </span>
                        <div>
                          <p className="item-overline">
                            DOMAIN {String(index + 1).padStart(2, '0')}
                          </p>
                          <h3>{group.title}</h3>
                          <p className="skill-category-description">{group.description}</p>
                        </div>
                      </div>

                      <ul className="skill-icon-cloud">
                        {group.skills.map((skill) => (
                          <SkillGlyph key={skill} name={skill} />
                        ))}
                      </ul>

                      {group.workflow && (
                        <details className="workflow-details">
                          <summary>View modeling workflow</summary>
                          <ul className="workflow-list">
                            {group.workflow.map(([tool, role]) => (
                              <li key={tool}>
                                <strong>{tool}</strong>
                                <span>{role}</span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ========== EXPERIENCE ========== */}
          <section className="content-section" id="experience">
            <div className="section-wrap">
              <SectionHeading number="03" label="EXPERIENCE" title="Where I've worked" />
              <div className="experience-list">
                {experience.map((job) => (
                  <details
                    className="experience-entry reveal-on-scroll"
                    key={`${job.company}-${job.title}`}
                  >
                    <summary className="experience-item">
                      <span className="exp-left">
                        <span className="item-overline">{job.company}</span>
                        <span className="experience-title">{job.title}</span>
                        <span className="item-meta">
                          {job.period} <span>·</span> {job.location}
                        </span>
                      </span>
                      <span className="exp-summary-right">
                        <span className="job-type">{job.kind}</span>
                        <span className="experience-toggle">＋</span>
                      </span>
                    </summary>
                    <p className="experience-detail">{job.detail}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ========== PROJECTS ========== */}
          <section className="content-section section-alt" id="projects">
            <div className="section-wrap">
              <SectionHeading number="04" label="SELECTED PROJECTS" title="A few things I've built" />
              <div className="projects-grid">
                {projects.slice(0, visibleProjectCount).map((project, index) => (
                  <ProjectCard
                    project={project}
                    index={index}
                    key={project.title}
                    onPreview={setSelectedProject}
                  />
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
                      <ProjectCard
                        project={project}
                        index={index + visibleProjectCount}
                        key={project.title}
                        onPreview={setSelectedProject}
                      />
                    ))}
                  </div>
                </details>
              )}
            </div>
          </section>

          {/* ========== SERVICES ========== */}
          <section className="services-section" id="services">
            <div className="section-wrap">
              <SectionHeading
                number="05"
                label="FREELANCE SERVICES"
                title="What I can build for you"
                light
              />
              <p className="services-intro reveal-on-scroll">
                Available for freelance projects, collaborations, and consulting. Let's build
                something great together.
              </p>

              <div className="services-grid">
                {services.map((s) => (
                  <article className="service-card reveal-on-scroll" key={s.title}>
                    <span className="service-icon">{s.icon}</span>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="service-tags">
                      {s.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="services-cta reveal-on-scroll">
                <p>Ready to start a project?</p>
                <a className="btn btn-white" href="#contact">
                  Let's talk ↗
                </a>
              </div>
            </div>
          </section>

          {/* ========== CONTACT ========== */}
          <section className="contact-section" id="contact">
            <div className="contact-portrait" aria-hidden="true">
              <img
                className="contact-portrait-image"
                src={profileImage}
                alt=""
                loading="lazy"
              />
              <div className="contact-portrait-shade" />
            </div>

            <div className="section-wrap">
              <div className="contact-inner reveal-on-scroll">
                <div className="contact-left">
                  <p className="section-label">
                    06 <span>/</span> CONTACT
                  </p>
                  <h2>
                    Have a project
                    <br />
                    in mind?
                  </h2>
                  <p className="contact-intro">
                    I'm always happy to talk about good ideas and interesting work. Drop me a
                    message and I'll get back to you.
                  </p>
                  <a className="btn btn-primary" href="mailto:rahul63794@gmail.com">
                    Say hello ↗
                  </a>
                </div>

                <div className="contact-right">
                  <a className="contact-email" href="mailto:rahul63794@gmail.com">
                    rahul63794@gmail.com
                  </a>
                  <div className="social-links">
                    <a
                      href="https://github.com/CybrNinjaX"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/rahul-77a46b273"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/rahul_zeronex___"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                    <a href="mailto:rahul63794@gmail.com">Email</a>
                  </div>
                </div>
              </div>
            </div>

            <footer className="site-footer">
              <div className="section-wrap footer-inner">
                <a className="site-brand" href="#home">
                  rahul<span>.</span>
                </a>
                <p>Designed and built by Rahul</p>
                <a href="#home">Back to top ↑</a>
              </div>
            </footer>
          </section>

          {selectedProject && (
            <ProjectPreviewDialog
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </main>
      </div>
    </div>
  )
}
