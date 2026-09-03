import { useEffect, useState } from 'react'
import { getProjects } from '../services/projectService'

export default function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    getProjects({ signal: controller.signal })
      .then(setProjects)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError')
          setError(requestError.message || 'Project data could not be loaded.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [])

  return { projects, loading, error }
}
