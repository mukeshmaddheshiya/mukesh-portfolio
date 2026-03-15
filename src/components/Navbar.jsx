import { useState, useEffect } from 'react'

const navLinks = ['About', 'Services', 'Skills', 'Experience', 'Projects', 'Testimonials', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = document.querySelectorAll('section[id]')
      let current = ''
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 100) {
          current = section.getAttribute('id')
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <svg className="logo-icon" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="100%" stopColor="#2EC4B6" />
                </linearGradient>
              </defs>
              <rect width="34" height="34" rx="10" fill="url(#logoGrad)" />
              <path
                d="M8 24V10h2.2l4.3 7.2 4.3-7.2H21V24h-2.2V14.4L14.5 21h-.4l-3.9-6.6V24H8Z"
                fill="white"
              />
              <circle cx="26" cy="24" r="2.5" fill="white" fillOpacity="0.9" />
            </svg>
            <div className="logo-text">
              <span className="logo-first">Mukesh</span>
              <span className="logo-last">Maddheshiya</span>
            </div>
          </a>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  style={activeSection === link.toLowerCase() ? { color: 'var(--coral)' } : {}}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' active' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="mobile-link"
            onClick={closeMenu}
          >
            {link}
          </a>
        ))}
      </div>
    </>
  )
}
