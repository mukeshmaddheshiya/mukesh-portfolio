import { useState, useEffect } from 'react'
import { testimonials } from '../data'

export default function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials">
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">Client Love</p>
          <h2 className="section-title">
            What People <span>Say</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="testimonials-wrapper reveal reveal-delay-1">
          <div className="testimonial-quote-mark">"</div>
          <div className="testimonials-slider">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`testimonial-card${i === active ? ' active' : ''}`}
              >
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className={`testimonial-avatar ${t.color}`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot${i === active ? ' active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
