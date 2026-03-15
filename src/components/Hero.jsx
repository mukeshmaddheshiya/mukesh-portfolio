import { useState, useEffect, useRef } from 'react'
import { typewriterPhrases } from '../data'

function MagneticButton({ href, className, children, style }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || 'ontouchstart' in window) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`
    }

    const handleLeave = () => {
      el.style.transform = ''
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <a href={href} className={className} ref={ref} style={style}>
      {children}
    </a>
  )
}

function StaggeredText({ text, className, delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="stagger-letter"
          style={{ animationDelay: `${delay + i * 0.03}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = typewriterPhrases[phraseIndex]

    let speed = isDeleting ? 40 : 80
    if (!isDeleting && charIndex === current.length) speed = 2000
    else if (isDeleting && charIndex === 0) speed = 400

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setText(current.substring(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      } else if (isDeleting && charIndex > 0) {
        setText(current.substring(0, charIndex - 1))
        setCharIndex((c) => c - 1)
      } else if (!isDeleting && charIndex === current.length) {
        setIsDeleting(true)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setPhraseIndex((i) => (i + 1) % typewriterPhrases.length)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, phraseIndex])

  return (
    <section className="hero" id="hero">
      {/* Aurora gradient background */}
      <div className="hero-aurora" />

      <div className="hero-photo-wrapper">
        <img src="/files/me.png" alt="Mukesh Maddheshiya — Freelance Full-Stack Developer & AI Specialist in Lucknow, India" className="hero-photo" width="160" height="160" loading="eager" />
        <div className="hero-photo-ring" />
        <div className="hero-photo-dot" />
      </div>

      <div className="hero-badge">
        <span className="hero-badge-dot" />
        Available for Freelance & Hire
      </div>

      <p className="hero-greeting">Hey there, I'm</p>

      <h1 className="hero-name">
        <StaggeredText text="Mukesh" className="hero-name-gradient" delay={0.25} />
        <br />
        <StaggeredText text="Maddheshiya" className="hero-name-last" delay={0.45} />
      </h1>

      <p className="hero-subtitle">
        Freelance Full-Stack Developer & AI Specialist — Lucknow, India
      </p>

      <div className="hero-typewriter">
        <span>{text}</span>
        <span className="typewriter-cursor" />
      </div>

      <div className="hero-cta-group">
        <MagneticButton href="#contact" className="btn btn-primary magnetic-btn">
          <span className="btn-icon">💬</span> Hire Me
        </MagneticButton>
        <MagneticButton href="#projects" className="btn btn-outline magnetic-btn">
          <span className="btn-icon">🚀</span> View Work
        </MagneticButton>
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  )
}
