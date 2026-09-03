import { Navigate, useLocation } from 'react-router-dom'
import { getCurrentUser } from '../../services/authService'

export default function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation()
  const user = getCurrentUser()
  if (!user)
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    )
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />
  return children
}
