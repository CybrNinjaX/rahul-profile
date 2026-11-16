import { useEffect, useState } from 'react'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
]

export default function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
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
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
