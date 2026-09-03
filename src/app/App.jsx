import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'
import LoginPage from '../pages/auth/LoginPage'
import CustomizationRequestPage from '../pages/customization/CustomizationRequestPage'
import RegisterPage from '../pages/auth/RegisterPage'
import SiteLayout from '../components/layout/SiteLayout'
import ProjectsPage from '../pages/projects/ProjectsPage'
import ProjectDetailsPage from '../pages/projects/ProjectDetailsPage'
import IndustriesPage from '../pages/industries/IndustriesPage'
import DeveloperMarketplacePage from '../pages/developers/DeveloperMarketplacePage'
import AboutPage from '../pages/company/AboutPage'
import ContactPage from '../pages/company/ContactPage'
import LiveDemosPage from '../pages/projects/LiveDemosPage'
import DashboardPage from '../pages/admin/DashboardPage'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import { ROLES } from '../config/rbac'

const projectAccessRoles = [ROLES.USER, ROLES.ADMIN, ROLES.SUPER_ADMIN]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/create-account" element={<RegisterPage />} />
      <Route
        path="/customization-request"
        element={
          <ProtectedRoute allowedRoles={projectAccessRoles}>
            <CustomizationRequestPage />
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route element={<SiteLayout />}>
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/featured-projects" element={<ProjectsPage featuredOnly />} />
        <Route
          path="/projects/:slug"
          element={
            <ProtectedRoute allowedRoles={projectAccessRoles}>
              <ProjectDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/live-demos"
          element={
            <ProtectedRoute allowedRoles={projectAccessRoles}>
              <LiveDemosPage />
            </ProtectedRoute>
          }
        />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/developer-marketplace" element={<DeveloperMarketplacePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
