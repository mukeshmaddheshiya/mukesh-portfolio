import { useEffect, useState, useRef } from 'react'
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
  const [backToTopVisible, setBackToTopVisible] = useState(false)
  const cursorDot = useRef(null)
  const cursorRing = useRef(null)

  // Custom cursor
  useEffect(() => {
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

    const interactiveEls = document.querySelectorAll('a, button, .skill-tag, .project-card, .contact-card, .service-card, .testimonial-dot, .cert-card, .stat-card, .hamburger')
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverIn)
      el.addEventListener('mouseleave', handleHoverOut)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
      })
    }
  }, [])

  // Re-attach hover listeners when new elements appear (e.g. "View All" projects)
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const observer = new MutationObserver(() => {
      const handleHoverIn = () => {
        cursorDot.current?.classList.add('hover')
        cursorRing.current?.classList.add('hover')
      }
      const handleHoverOut = () => {
        cursorDot.current?.classList.remove('hover')
        cursorRing.current?.classList.remove('hover')
      }
      document.querySelectorAll('a, button, .project-card, .service-card, .contact-card, .skill-tag').forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
        el.addEventListener('mouseenter', handleHoverIn)
        el.addEventListener('mouseleave', handleHoverOut)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Back to top
  useEffect(() => {
    const handleScroll = () => setBackToTopVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parallax floating shapes
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

  return (
    <>
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
