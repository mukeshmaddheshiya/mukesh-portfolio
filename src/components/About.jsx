import { useEffect, useRef, useState } from 'react'
import { stats } from '../data'

function StatCard({ count, label, delay }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 1500
          const step = count / (duration / 16)
          let current = 0

          const counter = setInterval(() => {
            current += step
            if (current >= count) {
              setDisplay(count)
              clearInterval(counter)
            } else {
              setDisplay(Math.floor(current))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [count])

  return (
    <div className={`stat-card reveal reveal-delay-${delay}`} ref={ref}>
      <div className="stat-number">{display}+</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about">
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">About Me</p>
          <h2 className="section-title">
            Freelance Full-Stack Developer <span>in Lucknow</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="about-content">
          <div>
            <p className="about-text reveal reveal-delay-1">
              I'm <strong>Mukesh Maddheshiya</strong>, a <strong>freelance full-stack developer</strong> based in
              Lucknow, India, with <strong>4+ years</strong> of hands-on experience building web
              applications that people love to use. Looking to{' '}
              <strong>hire a React developer in India</strong>? You're in the right place.
            </p>
            <p className="about-text reveal reveal-delay-2">
              As a <strong>Laravel developer in Lucknow</strong>, my expertise spans across{' '}
              <strong>PHP, Laravel, React, Vue.js, Next.js</strong>, and
              modern JavaScript ecosystems. I thrive at the intersection of{' '}
              <strong>clean backend architecture</strong> and{' '}
              <strong>pixel-perfect frontends</strong>, with deep expertise in{' '}
              <strong>AI integration</strong> and <strong>automation</strong>.
            </p>
            <p className="about-text reveal reveal-delay-3">
              Whether it's crafting a robust REST API, integrating payment gateways, or building
              AI-powered features as an <strong>AI integration developer in India</strong>, I bring creativity and
              precision to every line of code. Currently at <strong>Jamtech Technologies, Lucknow</strong>,
              and available for <strong>freelance projects worldwide</strong>.
            </p>
          </div>

          <div className="about-stats">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} count={stat.count} label={stat.label} delay={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
