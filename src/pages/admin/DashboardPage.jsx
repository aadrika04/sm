import { Navigate } from 'react-router-dom'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import { ROLES } from '../../config/rbac'
import { getCurrentUser } from '../../services/authService'
import AdminDashboardPage from './AdminDashboardPage'
import SuperAdminDashboardPage from './SuperAdminDashboardPage'

export default function DashboardPage() {
  const user = getCurrentUser()
  return (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
      {user?.role === ROLES.SUPER_ADMIN ? (
        <SuperAdminDashboardPage />
      ) : user?.role === ROLES.ADMIN ? (
        <AdminDashboardPage />
      ) : (
        <Navigate to="/" replace />
      )}
    </ProtectedRoute>
  )
}
