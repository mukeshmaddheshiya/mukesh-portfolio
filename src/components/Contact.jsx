import { contacts } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            Let's Build <span>Something Great</span>
          </h2>
          <p className="section-desc">
            Got a project in mind? Want to collaborate? Or just say hello? I'd love to hear from
            you.
          </p>
          <div className="section-divider" />
        </div>

        <div className="contact-methods">
          {contacts.map((contact, i) => (
            <a
              key={contact.label}
              href={contact.href}
              className={`contact-card reveal reveal-delay-${i + 1}`}
              target={contact.target}
              rel={contact.target === '_blank' ? 'noopener noreferrer' : undefined}
            >
              <div className={`contact-icon ${contact.color}`}>{contact.icon}</div>
              <div>
                <div className="contact-label">{contact.label}</div>
                <div className="contact-value">{contact.value}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="contact-cta-group reveal reveal-delay-3">
          <a
            href="/files/MukeshMaddheshiya.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <span className="btn-icon">📄</span> Download Resume
          </a>
          <a
            href="https://wa.me/918115915835?text=Hi%20Mukesh%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ borderColor: 'rgba(37, 211, 102, 0.4)' }}
          >
            <span className="btn-icon">💬</span> WhatsApp Me
          </a>
          <a href="#" className="btn btn-outline">
            <span className="btn-icon">📅</span> Book a Meeting
          </a>
        </div>
      </div>
    </section>
  )
}
