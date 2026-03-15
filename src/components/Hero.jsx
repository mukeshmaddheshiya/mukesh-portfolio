import { useState, useEffect } from 'react'
import { typewriterPhrases } from '../data'

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
        <span className="hero-name-gradient">Mukesh</span>
        <br />
        Maddheshiya
      </h1>

      <p className="hero-subtitle">
        Freelance Full-Stack Developer & AI Specialist — Lucknow, India
      </p>

      <div className="hero-typewriter">
        <span>{text}</span>
        <span className="typewriter-cursor" />
      </div>

      <div className="hero-cta-group">
        <a href="#contact" className="btn btn-primary">
          <span className="btn-icon">💬</span> Hire Me
        </a>
        <a href="#projects" className="btn btn-outline">
          <span className="btn-icon">🚀</span> View Work
        </a>
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  )
}
