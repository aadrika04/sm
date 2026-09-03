import { ChevronRight, Search } from 'lucide-react'

export const panelClass = 'overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'
export function SectionTitle({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-medium text-electric">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-bold text-navy-950">{title}</h2>
        {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  )
}
export function Toolbar({ query, onQueryChange, placeholder = 'Search…', children }) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative block w-full max-w-sm">
        <span className="sr-only">Search</span>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm focus:border-electric focus:ring-2 focus:ring-blue-100"
        />
      </label>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
export function StatusBadge({ children, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    slate: 'bg-slate-100 text-slate-600',
    rose: 'bg-rose-50 text-rose-700',
  }
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
export function EmptyState({ text }) {
  return <div className="p-12 text-center text-sm text-slate-500">{text}</div>
}
export function RowAction() {
  return (
    <button
      aria-label="Open item"
      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-electric"
    >
      <ChevronRight size={17} />
    </button>
  )
}
