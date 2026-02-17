import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './components/Login'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import FacultyDirectory from './pages/FacultyDirectory'
import FacultyProfile from './pages/FacultyProfile'
import Reports from './pages/Reports'
import ValidacionesPendientes from './pages/ValidacionesPendientes'
import UserManagement from './pages/UserManagement'
import ProfileSection from './pages/professor/ProfileSection'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/" replace />
}

const RoleBasedRedirect = () => {
  const { user } = useAuth()
  if (user?.role === 'admin') {
    return <Navigate to="/dashboard" replace />
  }
  return <Navigate to="/profile/datos-generales" replace />
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Role-based redirect after login */}
          <Route path="/home" element={
            <ProtectedRoute><RoleBasedRedirect /></ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Layout /></ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/faculty" element={
            <ProtectedRoute><Layout /></ProtectedRoute>
          }>
            <Route index element={<FacultyDirectory />} />
          </Route>
          <Route path="/faculty/:id" element={
            <ProtectedRoute><Layout /></ProtectedRoute>
          }>
            <Route index element={<FacultyProfile />} />
          </Route>
          <Route path="/reports" element={
            <ProtectedRoute><Layout /></ProtectedRoute>
          }>
            <Route index element={<Reports />} />
          </Route>
          <Route path="/validaciones-pendientes" element={
            <ProtectedRoute><Layout /></ProtectedRoute>
          }>
            <Route index element={<ValidacionesPendientes />} />
          </Route>
          <Route path="/user-management" element={
            <ProtectedRoute><Layout /></ProtectedRoute>
          }>
            <Route index element={<UserManagement />} />
          </Route>

          {/* Professor Routes */}
          <Route path="/profile/:section" element={
            <ProtectedRoute><Layout /></ProtectedRoute>
          }>
            <Route index element={<ProfileSection />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
