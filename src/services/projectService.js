export async function getProjects({ signal } = {}) {
  const response = await fetch('/data/projects.json', { signal })
  if (!response.ok) throw new Error('Project data could not be loaded.')
  return response.json()
}

export async function getProject(slug, { signal } = {}) {
  const projects = await getProjects({ signal })
  return projects.find((project) => project.slug === slug) || null
}
