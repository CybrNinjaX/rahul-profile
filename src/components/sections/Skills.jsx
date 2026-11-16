import { useState } from 'react'
import SectionHeading from '../common/SectionHeading.jsx'
import { skillGroups, skillLogoPaths } from '../../data/skills.js'

function SkillGlyph({ name }) {
  const [failed, setFailed] = useState(false)
  const path = skillLogoPaths[name]
  const initials = name
    .split(/[\s.+()-]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <li className="skill-icon-item" title={name}>
      {path && !failed ? (
        <img
          className="skill-brand-mark"
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="skill-brand-fallback" aria-hidden="true">
          {initials}
        </span>
      )}
      <span>{name}</span>
    </li>
  )
}

export default function Skills() {
  return (
<section className="content-section section-alt" id="skills">
            <div className="skills-overview">
              <div className="skills-overview-heading">
                <SectionHeading number="02" label="SKILLS" title="A stack built for making" />
                <div className="skills-overview-meta">
                  <p>Languages, frameworks, platforms, and creative tools I use across software and 3D work.</p>
                  <span>
                    <b>08</b> skill areas
                  </span>
                </div>
              </div>

              <div className="skills-category-grid">
                {skillGroups.map((group, index) => {
                  const CategoryIcon = group.icon
                  return (
                    <article
                      className={`skill-domain skill-domain-${index + 1} reveal-on-scroll`}
                      key={group.title}
                      style={{ '--card-delay': `${index * 65}ms` }}
                    >
                      <div className="skill-domain-heading">
                        <span className="skill-domain-symbol" aria-hidden="true">
                          <CategoryIcon size={19} strokeWidth={1.8} />
                        </span>
                        <div>
                          <p className="item-overline">
                            DOMAIN {String(index + 1).padStart(2, '0')}
                          </p>
                          <h3>{group.title}</h3>
                          <p className="skill-category-description">{group.description}</p>
                        </div>
                      </div>

                      <ul className="skill-icon-cloud">
                        {group.skills.map((skill) => (
                          <SkillGlyph key={skill} name={skill} />
                        ))}
                      </ul>

                      {group.workflow && (
                        <details className="workflow-details">
                          <summary>Explore my 3D workflow</summary>
                          <ul className="workflow-list">
                            {group.workflow.map(([tool, role]) => (
                              <li key={tool}>
                                <strong>{tool}</strong>
                                <span>{role}</span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
  )
}
