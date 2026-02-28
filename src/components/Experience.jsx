import { experience } from '../data'

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-inner">
        <div className="reveal">
          <p className="section-label">Career Path</p>
          <h2 className="section-title">
            Work <span>Experience</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="timeline">
          {experience.map((job, i) => (
            <div key={job.company} className={`timeline-item reveal reveal-delay-${i + 1}`}>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <span className="timeline-date">{job.date}</span>
                <h3 className="timeline-role">{job.role}</h3>
                <p className="timeline-company">{job.company}</p>
                <ul className="timeline-desc">
                  {job.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
