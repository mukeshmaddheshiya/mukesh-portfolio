import { education, certifications } from '../data'

export default function Education() {
  return (
    <section id="education">
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">Background</p>
          <h2 className="section-title">
            Education & <span>Certifications</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="edu-grid">
          <div className="edu-column">
            <h3 className="edu-column-title reveal reveal-delay-1">
              <span className="edu-column-icon">🎓</span> Education
            </h3>
            {education.map((edu, i) => (
              <div key={edu.degree} className={`edu-card reveal reveal-delay-${i + 2}`}>
                <span className={`edu-year ${edu.color}`}>{edu.year}</span>
                <h4 className="edu-degree">{edu.degree}</h4>
                <p className="edu-institution">{edu.institution}</p>
                <p className="edu-desc">{edu.desc}</p>
              </div>
            ))}
          </div>

          <div className="edu-column">
            <h3 className="edu-column-title reveal reveal-delay-1">
              <span className="edu-column-icon">🏆</span> Certifications
            </h3>
            {certifications.map((cert, i) => (
              <div key={cert.name} className={`cert-card reveal reveal-delay-${i + 2}`}>
                <div className={`cert-badge ${cert.color}`}>✓</div>
                <div>
                  <h4 className="cert-name">{cert.name}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
