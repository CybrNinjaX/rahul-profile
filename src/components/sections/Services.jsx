import { services } from '../../data/services.js'
import SectionHeading from '../common/SectionHeading.jsx'

export default function Services() {
  return (
<section className="services-section" id="services">
            <div className="section-wrap">
              <SectionHeading
                number="05"
                label="FREELANCE SERVICES"
                title="What I can build for you"
                light
              />
              <p className="services-intro reveal-on-scroll">
                Available for freelance projects, collaborations, and consulting. Let's build
                something great together.
              </p>

              <div className="services-grid">
                {services.map((s) => (
                  <article className="service-card reveal-on-scroll" key={s.title}>
                    <span className="service-icon">{s.icon}</span>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <div className="service-tags">
                      {s.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="services-cta reveal-on-scroll">
                <p>Ready to start a project?</p>
                <a className="btn btn-white" href="#contact">
                  Let's talk ↗
                </a>
              </div>
            </div>
          </section>
  )
}
