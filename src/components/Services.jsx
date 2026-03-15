import { services } from '../data'

export default function Services() {
  return (
    <section id="services">
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">What I Do</p>
          <h2 className="section-title">
            Services I <span>Offer</span>
          </h2>
          <p className="section-desc">
            From idea to deployment — I build complete digital solutions that drive results.
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
