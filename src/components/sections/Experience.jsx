import { experience } from '../../data/experience.js'
import SectionHeading from '../common/SectionHeading.jsx'

export default function Experience() {
  return (
<section className="content-section" id="experience">
            <div className="section-wrap">
              <SectionHeading number="03" label="EXPERIENCE" title="Where I've worked" />
              <div className="experience-list">
                {experience.map((job) => (
                  <details
                    className="experience-entry reveal-on-scroll"
                    key={`${job.company}-${job.title}`}
                  >
                    <summary className="experience-item">
                      <span className="exp-left">
                        <span className="item-overline">{job.company}</span>
                        <span className="experience-title">{job.title}</span>
                        <span className="item-meta">
                          {job.period} <span>·</span> {job.location}
                        </span>
                      </span>
                      <span className="exp-summary-right">
                        <span className="job-type">{job.kind}</span>
                        <span className="experience-toggle">＋</span>
                      </span>
                    </summary>
                    <p className="experience-detail">{job.detail}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
  )
}
