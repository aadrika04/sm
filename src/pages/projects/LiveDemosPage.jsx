import { ArrowUpRight, CheckCircle2, ExternalLink, MonitorPlay } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../../components/common/PageHero'
import useProjects from '../../hooks/useProjects'

export default function LiveDemosPage() {
  const { projects, loading, error } = useProjects()
  return (
    <main>
      <PageHero
        eyebrow="Experience before you decide"
        title="Live Product Demos"
        description="Explore available solution demos, understand key workflows and choose the right starting point for your business."
      />
      <section className="container-page py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-navy-950">Available demo links</h2>
            <p className="mt-2 text-sm text-slate-500">
              Access each solution preview from one convenient place.
            </p>
          </div>
          <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
            <CheckCircle2 size={18} />
            {projects.length} demo-ready solutions
          </span>
        </div>
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700"
          >
            {error}
          </p>
        )}
        <div className="grid gap-6 md:grid-cols-2" aria-busy={loading}>
          {loading
            ? Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="h-64 animate-pulse rounded-2xl bg-slate-100" />
              ))
            : projects.map((project) => (
                <article
                  id={project.slug}
                  key={project.slug}
                  className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-electric">
                      <MonitorPlay size={24} />
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                      Live Demo Available
                    </span>
                  </div>
                  <h2 className="mt-5 text-xl font-bold text-navy-950">{project.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
                  <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-xs text-slate-500">
                    {project.demoUrl || 'Demo link available on request'}
                  </div>
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="primary-button"
                      >
                        Open Live Demo
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <Link
                        to={`/customization-request?project=${encodeURIComponent(project.name)}`}
                        className="primary-button"
                      >
                        Request Demo
                        <ArrowUpRight size={16} />
                      </Link>
                    )}
                    <Link to={`/projects/${project.slug}`} className="secondary-button">
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
        </div>
      </section>
    </main>
  )
}
