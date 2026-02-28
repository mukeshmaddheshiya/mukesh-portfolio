import { skills } from '../data'

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">My Arsenal</p>
          <h2 className="section-title">
            Skills & <span>Technologies</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="skills-grid">
          {skills.map((cat, i) => (
            <div
              key={cat.name}
              className={`skill-category reveal reveal-delay-${Math.min(i + 1, 5)}`}
            >
              <div className="skill-cat-header">
                <div className={`skill-cat-icon ${cat.color}`}>{cat.icon}</div>
                <div className="skill-cat-name">{cat.name}</div>
              </div>
              <div className="skill-tags">
                {cat.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
