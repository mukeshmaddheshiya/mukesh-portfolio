import { services } from '../data'

export default function Services() {
  return (
    <section id="services">
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">Hire Me For</p>
          <h2 className="section-title">
            Freelance Development <span>Services</span>
          </h2>
          <p className="section-desc">
            Hire a freelance full-stack developer in Lucknow for end-to-end web development, AI integration, and SaaS solutions.
          </p>
          <div className="section-divider" />
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`service-card reveal reveal-delay-${Math.min(i + 1, 5)}`}
            >
              <div className={`service-icon ${service.color}`}>{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
