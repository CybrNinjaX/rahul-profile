import { useEffect, useRef } from 'react'
import { projects } from '../../data/projects.js'
import SectionHeading from '../common/SectionHeading.jsx'

const visibleProjectCount = 4

function ProjectCard({ project, index, onPreview }) {
  const coverClass = project.download ? 'project-cover project-cover-model' : 'project-cover'

  return (
    <article className="project-card reveal-on-scroll">
      <div className={coverClass}>
        <img
          src={project.image}
          alt={project.imageAlt ?? `${project.category} project preview`}
          loading="lazy"
        />
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
        <button
          className="project-preview-trigger"
          type="button"
          onClick={() => onPreview(project)}
        >
          Open preview <span>↗</span>
        </button>
      </div>
      <div className="project-card-copy">
        <p className="item-overline">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.download ? (
          <div className="project-actions">
            <a
              className="project-action project-action-primary"
              href={project.links[0].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.links[0].label} ↗
            </a>
            <a
              className="project-action"
              href={project.download.href}
              download={project.download.fileName}
            >
              {project.download.label} ↓
            </a>
          </div>
        ) : (
          <div className="project-links">
            {project.links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function ProjectPreviewDialog({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined
    dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  return (
    <dialog
      className="project-preview-dialog"
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div className="preview-dialog-top">
        <p className="item-overline">{project.category}</p>
        <button
          type="button"
          className="preview-close"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close project preview"
        >
          ×
        </button>
      </div>
      <h2>{project.title}</h2>
      <p className="preview-dialog-description">{project.description}</p>
      <div className="preview-dialog-media">
        {project.previewUrl ? (
          <iframe
            src={project.previewUrl}
            title={`${project.title} live preview`}
            loading="lazy"
          />
        ) : (
          <img
            src={project.image}
            alt={project.imageAlt ?? `${project.title} preview`}
          />
        )}
      </div>
      <div className="preview-dialog-actions">
        {project.links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label} ↗
          </a>
        ))}
        {project.download && (
          <a href={project.download.href} download={project.download.fileName}>
            {project.download.label} ↓
          </a>
        )}
      </div>
    </dialog>
  )
}
export default function Projects({ selectedProject, setSelectedProject }) {
  return (
    <>
      <section className="content-section section-alt" id="projects">
            <div className="section-wrap">
              <SectionHeading number="04" label="SELECTED PROJECTS" title="A few things I've built" />
              <div className="projects-grid">
                {projects.slice(0, visibleProjectCount).map((project, index) => (
                  <ProjectCard
                    project={project}
                    index={index}
                    key={project.title}
                    onPreview={setSelectedProject}
                  />
                ))}
              </div>

              {projects.length > visibleProjectCount && (
                <details className="project-directory">
                  <summary>
                    <span className="dir-closed">View all projects</span>
                    <span className="dir-open">Show fewer</span>
                    <span aria-hidden="true">＋</span>
                  </summary>
                  <div className="projects-grid projects-grid-extra">
                    {projects.slice(visibleProjectCount).map((project, index) => (
                      <ProjectCard
                        project={project}
                        index={index + visibleProjectCount}
                        key={project.title}
                        onPreview={setSelectedProject}
                      />
                    ))}
                  </div>
                </details>
              )}
            </div>
      </section>
      {selectedProject && (
      <ProjectPreviewDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      )}
    </>
  )
}
