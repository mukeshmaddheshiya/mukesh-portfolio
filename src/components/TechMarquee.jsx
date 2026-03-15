import { techMarquee } from '../data'

export default function TechMarquee() {
  const doubled = [...techMarquee, ...techMarquee]

  return (
    <div className="tech-marquee-section">
      <div className="tech-marquee">
        <div className="tech-marquee-track">
          {doubled.map((tech, i) => (
            <span key={`${tech}-${i}`} className="tech-marquee-item">
              {tech}
              <span className="tech-marquee-dot" />
            </span>
          ))}
        </div>
      </div>
      <div className="tech-marquee reverse">
        <div className="tech-marquee-track">
          {doubled.map((tech, i) => (
            <span key={`r-${tech}-${i}`} className="tech-marquee-item">
              {tech}
              <span className="tech-marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
