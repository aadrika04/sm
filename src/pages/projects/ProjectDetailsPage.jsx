import { ArrowLeft, CheckCircle2, Cpu, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject } from '../../services/projectService'

export default function ProjectDetailsPage() {
  const { slug } = useParams()
  const [state, setState] = useState({ project: null, loading: true, error: '' })
  useEffect(() => {
    const controller = new AbortController()
    getProject(slug, { signal: controller.signal })
      .then((project) => setState({ project, loading: false, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({ project: null, loading: false, error: error.message })
      })
    return () => controller.abort()
  }, [slug])
  if (state.loading)
    return (
      <main className="grid min-h-[65vh] place-items-center">
        <p className="flex items-center gap-2 text-slate-500">
          <LoaderCircle className="animate-spin" />
          Loading project…
        </p>
      </main>
    )
  if (state.error || !state.project)
    return (
      <main className="container-page py-24 text-center">
        <h1 className="text-3xl font-bold text-navy-950">Project not found</h1>
        <p className="mt-3 text-slate-500">
          {state.error || 'The requested project is unavailable.'}
        </p>
        <Link to="/projects" className="primary-button mt-7">
          Browse Projects
        </Link>
      </main>
    )
  const project = state.project
  return (
    <main>
      <section className="bg-gradient-to-br from-navy-950 to-blue-900 py-16 text-white">
        <div className="container-page">
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 rounded text-sm text-blue-100 hover:text-white"
          >
            <ArrowLeft size={17} />
            All Projects
          </Link>
          <span className="block text-xs font-bold uppercase tracking-[.2em] text-cyan">
            {project.industry}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{project.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            {project.longDescription}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to={`/customization-request?project=${encodeURIComponent(project.name)}`}
              className="primary-button"
            >
              Customize this solution
            </Link>
            <button className="secondary-button" type="button">
              Open Live Demo
            </button>
          </div>
        </div>
      </section>
      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="text-2xl font-bold text-navy-950">Core capabilities</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="shrink-0 text-electric" size={20} />
                <span className="font-medium text-navy-900">{feature}</span>
              </div>
            ))}
          </div>
          <h2 className="mt-12 text-2xl font-bold text-navy-950">Business benefits</h2>
          <ul className="mt-5 space-y-3">
            {project.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3 text-slate-600">
                <CheckCircle2 className="shrink-0 text-emerald-500" size={19} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <Cpu className="text-electric" />
          <h2 className="mt-4 font-bold text-navy-950">Technology stack</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{project.technology}</p>
          <hr className="my-5 border-slate-200" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Live demo</p>
          <p className="mt-2 text-sm text-emerald-600">Available on request</p>
        </aside>
      </section>
    </main>
  )
}
