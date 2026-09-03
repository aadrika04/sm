import { ArrowUpRight, CheckCircle2, Cpu, Factory, Sparkles, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projectSlug } from '../../utils/projectUtils'
const views = {
  hr: [Users, 'People operations', 'from-blue-600 to-cyan-400'],
  erp: [Factory, 'Production overview', 'from-cyan-500 to-blue-600'],
  jobs: [Cpu, 'Candidate pipeline', 'from-indigo-600 to-blue-400'],
  ai: [Sparkles, 'AI resume score', 'from-blue-500 to-violet-500'],
}
export default function ProjectCard({ project }) {
  const [Icon, label, color] = views[project.visual] || views.ai
  return (
    <article
      id={`project-${projectSlug(project.name)}`}
      className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:border-blue-200"
    >
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${color} p-5`}>
        <div className="relative h-full rounded-xl border border-white/20 bg-navy-950/80 p-4">
          <div className="mb-5 flex justify-between text-white">
            <span className="flex items-center gap-2 text-xs font-semibold">
              <Icon size={16} />
              {label}
            </span>
            <span className="text-xs text-cyan">LIVE</span>
          </div>
          {['82%', '62%', '91%'].map((width, index) => (
            <div key={width} className="mb-3 flex items-center gap-3">
              <span className="w-7 text-[10px] text-blue-200">0{index + 1}</span>
              <div className="h-2 flex-1 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-cyan" style={{ width }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-electric">
            SM Global Featured
          </span>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <CheckCircle2 size={13} />
            Live Demo Available
          </span>
        </div>
        <h3 className="text-xl font-bold text-navy-950">{project.name}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{project.description}</p>
        <dl className="mt-5 space-y-3 border-y border-slate-100 py-4 text-sm">
          <div className="flex gap-2">
            <dt className="font-semibold">Industry:</dt>
            <dd>{project.industry}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 font-semibold">Technology:</dt>
            <dd>{project.technology}</dd>
          </div>
        </dl>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Link to={`/live-demos#${project.slug}`} className="primary-button col-span-2 py-2.5">
            Live Demo
            <ArrowUpRight size={15} />
          </Link>
          <Link to={`/projects/${project.slug}`} className="secondary-button px-2 py-2.5">
            View Details
          </Link>
          <Link
            to={`/customization-request?project=${encodeURIComponent(project.name)}`}
            className="secondary-button px-2 py-2.5"
          >
            Customize
          </Link>
        </div>
      </div>
    </article>
  )
}
