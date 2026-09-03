import { useMemo, useState } from 'react'
import PageHero from '../../components/common/PageHero'
import ProjectCard from '../../components/projects/ProjectCard'
import useProjects from '../../hooks/useProjects'

export default function ProjectsPage({ featuredOnly = false }) {
  const { projects, loading, error } = useProjects()
  const [query, setQuery] = useState('')
  const visible = useMemo(
    () =>
      projects.filter(
        (project) =>
          (!featuredOnly || project.featured) &&
          [project.name, project.industry, project.technology].some((value) =>
            value.toLowerCase().includes(query.toLowerCase()),
          ),
      ),
    [projects, featuredOnly, query],
  )
  return (
    <main>
      <PageHero
        eyebrow={featuredOnly ? 'Curated by SM Global' : 'Solution catalogue'}
        title={featuredOnly ? 'Featured Projects' : 'All Projects'}
        description="Explore production-ready digital solutions and choose the right foundation for your business."
      />
      <section className="container-page py-16">
        <label htmlFor="catalog-search" className="sr-only">
          Filter projects
        </label>
        <input
          id="catalog-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter by project, industry or technology…"
          className="mb-10 w-full max-w-xl rounded-xl border border-slate-200 px-4 py-3 focus:border-electric focus:ring-2 focus:ring-blue-100"
        />
        {error && (
          <p role="alert" className="rounded-lg bg-rose-50 p-4 text-rose-700">
            {error}
          </p>
        )}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" aria-busy={loading}>
          {loading
            ? Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="h-[34rem] animate-pulse rounded-2xl bg-slate-100" />
              ))
            : visible.map((project) => (
                <ProjectCard key={project.slug} project={project} notify={() => {}} />
              ))}
        </div>
        {!loading && !visible.length && (
          <p className="py-16 text-center text-slate-500">No projects match your search.</p>
        )}
      </section>
    </main>
  )
}
