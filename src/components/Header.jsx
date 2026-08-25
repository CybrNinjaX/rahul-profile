import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { navigation } from '../data/portfolio'
import { BrandLogo } from './BrandLogo'

const navItems = navigation

function NavIcon({ d }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export function Header() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)
  const ctaRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const sections = navItems.map(({ href }) => document.querySelector(href)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target.id) setActive(`#${visible.target.id}`)
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0.05, 0.25] })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const magneticMove = (event) => {
    const button = ctaRef.current; if (!button) return
    const box = button.getBoundingClientRect()
    button.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .12}px, ${(event.clientY - box.top - box.height / 2) * .18}px)`
  }
  const resetMagnet = () => { if (ctaRef.current) ctaRef.current.style.transform = '' }
  const sectionLink = (hash) => location.pathname === '/' ? hash : `/${hash}`

  return <header className={`future-nav ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="nav-shell">
      <a href={sectionLink('#home')} className="nav-brand" aria-label="ZeroNext home"><span className="brand-orbit"><BrandLogo className="h-8 w-8" /></span><span>ZERO<b>NEXT</b></span></a>
      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map((item, index) => <a key={item.href} href={sectionLink(item.href)} onClick={() => setActive(item.href)} className={active === item.href ? 'is-active' : ''} style={{ '--delay': `${index * 55}ms` }}><NavIcon d={item.icon} /><span>{item.label}</span><i /></a>)}
      </nav>
      <div className="nav-actions"><a ref={ctaRef} onPointerMove={magneticMove} onPointerLeave={resetMagnet} href={sectionLink('#contact')} className="nav-cta"><span>Contact</span><b>↗</b></a><button type="button" className={`nav-menu ${menuOpen ? 'is-open' : ''}`} aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}><i /><i /></button></div>
      <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>{navItems.map((item) => <a key={item.href} href={sectionLink(item.href)} tabIndex={menuOpen ? 0 : -1} onClick={() => { setActive(item.href); setMenuOpen(false) }}><NavIcon d={item.icon} /><span>{item.label}</span><b>↗</b></a>)}<a className="mobile-cta" href={sectionLink('#contact')} tabIndex={menuOpen ? 0 : -1}>Contact <b>↗</b></a></div>
    </div>
  </header>
}
