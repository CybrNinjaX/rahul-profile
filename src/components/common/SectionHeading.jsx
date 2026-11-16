export default function SectionHeading({ number, label, title, light }) {
  return (
    <div className="section-heading">
      <p className={light ? 'section-label section-label-light' : 'section-label'}>
        {number} <span>/</span> {label}
      </p>
      <h2>{title}</h2>
    </div>
  )
}
