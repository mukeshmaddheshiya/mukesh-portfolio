import { useEffect, useState, useRef, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [backToTopVisible, setBackToTopVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const cursorDot = useRef(null)
  const cursorRing = useRef(null)

  // ── Preloader ──
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  // ── 3D Tilt on cards ──
  const initTilt = useCallback(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const tiltCards = document.querySelectorAll('.project-card, .service-card, .stat-card')
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -8
        const rotateY = ((x - centerX) / centerX) * 8
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      })
      card.addEventListener('mouseleave', () => {
        card.style.transform = ''
      })
    })
  }, [])

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(initTilt, 500)
      return () => clearTimeout(timer)
    }
  }, [loading, initTilt])

  // Re-init tilt when DOM changes (View All projects)
  useEffect(() => {
    if (loading) return
    const observer = new MutationObserver(() => {
      setTimeout(initTilt, 100)
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [loading, initTilt])

  // ── Custom cursor ──
  useEffect(() => {
    if (loading) return
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    document.body.classList.add('custom-cursor-active')

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursorDot.current) {
        cursorDot.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      if (cursorRing.current) {
        cursorRing.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      requestAnimationFrame(animateRing)
    }

    const handleHoverIn = () => {
      cursorDot.current?.classList.add('hover')
      cursorRing.current?.classList.add('hover')
    }

    const handleHoverOut = () => {
      cursorDot.current?.classList.remove('hover')
      cursorRing.current?.classList.remove('hover')
    }

    const handleMouseDown = () => {
      cursorDot.current?.classList.add('click')
      cursorRing.current?.classList.add('click')
    }

    const handleMouseUp = () => {
      cursorDot.current?.classList.remove('click')
      cursorRing.current?.classList.remove('click')
    }

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    animateRing()

    const attachHovers = () => {
      document.querySelectorAll('a, button, .skill-tag, .project-card, .contact-card, .service-card, .testimonial-dot, .cert-card, .stat-card, .hamburger').forEach((el) => {
        el.addEventListener('mouseenter', handleHoverIn)
        el.addEventListener('mouseleave', handleHoverOut)
      })
    }
    attachHovers()

    const mutObs = new MutationObserver(attachHovers)
    mutObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      mutObs.disconnect()
    }
  }, [loading])

  // ── Scroll progress bar ──
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setBackToTopVisible(scrollTop > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Scroll reveal ──
  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [loading])

  // ── Parallax floating shapes ──
  useEffect(() => {
    const shapes = document.getElementById('floatingShapes')
    if (!shapes) return

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      shapes.style.transform = `translate(${x}px, ${y}px)`
    }

    const handleTouchMove = (e) => {
      const touch = e.touches[0]
      const x = (touch.clientX / window.innerWidth - 0.5) * 15
      const y = (touch.clientY / window.innerHeight - 0.5) * 15
      shapes.style.transform = `translate(${x}px, ${y}px)`
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // ── Preloader screen ──
  if (loading) {
    return (
      <div className="preloader">
        <div className="preloader-inner">
          <svg className="preloader-logo" width="60" height="60" viewBox="0 0 34 34" fill="none">
            <defs>
              <linearGradient id="plGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#2EC4B6" />
              </linearGradient>
            </defs>
            <rect width="34" height="34" rx="10" fill="url(#plGrad)" />
            <path d="M8 24V10h2.2l4.3 7.2 4.3-7.2H21V24h-2.2V14.4L14.5 21h-.4l-3.9-6.6V24H8Z" fill="white" />
            <circle cx="26" cy="24" r="2.5" fill="white" fillOpacity="0.9" />
          </svg>
          <div className="preloader-bar">
            <div className="preloader-bar-fill" />
          </div>
          <p className="preloader-text">Loading experience...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Custom cursor */}
      <div className="cursor-dot" ref={cursorDot} />
      <div className="cursor-ring" ref={cursorRing} />

      <div className="grain-overlay" />
      <div className="floating-shapes" id="floatingShapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="shape shape-4" />
        <div className="shape shape-5" />
      </div>

      <Navbar />

      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Testimonials />
        <Education />
        <Contact />
      </main>

      <Footer />

      <button
        className={`back-to-top${backToTopVisible ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  )
}
