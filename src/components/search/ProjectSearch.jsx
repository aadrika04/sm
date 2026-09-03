import { ArrowRight, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useProjects from '../../hooks/useProjects'
import { projectSlug } from '../../utils/projectUtils'

export default function ProjectSearch({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const { projects } = useProjects()
  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return projects
    return projects.filter((project) =>
      [project.name, project.description, project.industry, project.technology].some((value) =>
        value.toLowerCase().includes(term),
      ),
    )
  }, [query, projects])

  useEffect(() => {
    if (!open) return undefined
    inputRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open, onClose])

  if (!open) return null
  const close = () => {
    setQuery('')
    onClose()
  }
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-navy-950/65 px-4 pt-[10vh] backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-search-title"
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 id="project-search-title" className="font-bold text-navy-950">
              Search projects
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Find solutions by name, industry, or technology
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close project search"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="relative border-b border-slate-100 p-4">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-navy-950 placeholder:text-slate-400 focus:border-electric focus:bg-white focus:ring-2 focus:ring-blue-100"
            placeholder="Search HRMS, manufacturing, React…"
            aria-label="Search project catalogue"
          />
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-3">
          {results.length ? (
            <>
              <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {results.length} {results.length === 1 ? 'project' : 'projects'} found
              </p>
              <ul className="space-y-1">
                {results.map((project) => (
                  <li key={project.name}>
                    <Link
                      to={`/#project-${projectSlug(project.name)}`}
                      onClick={close}
                      className="group flex items-center justify-between gap-4 rounded-xl p-3 hover:bg-blue-50"
                    >
                      <span>
                        <strong className="block text-sm text-navy-950 group-hover:text-electric">
                          {project.name}
                        </strong>
                        <span className="mt-1 block text-xs text-slate-500">
                          {project.description} · {project.industry}
                        </span>
                        <span className="mt-1 block text-[11px] font-medium text-blue-600">
                          {project.technology}
                        </span>
                      </span>
                      <ArrowRight
                        className="shrink-0 text-slate-300 group-hover:text-electric"
                        size={18}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="px-6 py-12 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400">
                <Search size={21} />
              </span>
              <h3 className="mt-4 font-semibold text-navy-950">No matching projects</h3>
              <p className="mt-1 text-sm text-slate-500">
                Try a project name, industry, or technology.
              </p>
              <Link
                to="/customization-request"
                onClick={close}
                className="mt-5 inline-flex text-sm font-semibold text-electric hover:text-blue-700"
              >
                Submit a custom requirement
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
