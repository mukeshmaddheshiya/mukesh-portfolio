import { useState, useEffect } from 'react'
import { projects } from '../data'

export default function Projects() {
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? projects : projects.slice(0, 3)

  useEffect(() => {
    if (!showAll) return
    // New cards just rendered — observe them immediately
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    document.querySelectorAll('.project-card.reveal:not(.visible)').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [showAll])

  return (
    <section id="projects">
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">Featured Work</p>
          <h2 className="section-title">
            Recent <span>Projects</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="projects-grid">
          {visible.map((project, i) => (
            <div key={project.name} className={`project-card reveal reveal-delay-${Math.min(i + 1, 5)}`}>
              <div className="project-preview">
                <div className={`project-preview-bg ${project.color}`}>{project.emoji}</div>
                <span className="project-badge">{project.badge}</span>
              </div>
              <div className="project-info">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="projects-show-more reveal reveal-delay-3">
            <button className="btn btn-outline projects-show-btn" onClick={() => setShowAll(true)}>
              <span>View All {projects.length} Projects</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
