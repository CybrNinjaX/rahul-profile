export function SectionLabel({ children }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
      <span className="h-px w-5 bg-sky-500/60" />
      {children}
    </p>
  )
}
