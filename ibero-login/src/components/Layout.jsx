import { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut,
  Menu,
  User,
  GraduationCap,
  BookOpen,
  Briefcase,
  Award,
  Trophy,
  Search,
  ClipboardList,
  UserCog,
  BarChart3,
  CheckCircle2,
  Circle,
  Bell,
  ChevronRight,
  X
} from 'lucide-react'
import { formSections, sectionStatus } from '../data/users'

const Layout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = async () => {
    const loggedOut = await logout()
    if (loggedOut) {
      navigate('/')
    }
  }

  // Iconos para las secciones del formulario del profesor
  const sectionIcons = {
    User, GraduationCap, BookOpen, Briefcase, 
    FileText, Award, Users, Trophy
  }

  // Navegación para Admin - 5 paneles
  const adminNavGroups = [
    {
      label: 'ADMINISTRACIÓN',
      items: [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Panel de Control' },
        { to: '/faculty', icon: Search, label: 'Búsqueda de Docentes' },
        { to: '/reports', icon: BarChart3, label: 'Reportes' },
        { to: '/validaciones-pendientes', icon: ClipboardList, label: 'Validaciones Pendientes', badge: 12 },
      ]
    },
    {
      label: 'CONFIGURACIÓN',
      items: [
        { to: '/user-management', icon: UserCog, label: 'Gestión de usuarios' },
      ]
    }
  ]

  // Obtener estado de secciones para profesor
  const professorSections = user?.facultyId ? sectionStatus[user.facultyId] : null

  // Calcular progreso del profesor
  const calculateProgress = () => {
    if (!professorSections) return 0
    const total = Object.keys(professorSections).length
    const complete = Object.values(professorSections).filter(s => s === 'complete').length
    return Math.round((complete / total) * 100)
  }

  // Breadcrumb helper
  const getBreadcrumb = () => {
    const path = location.pathname
    if (user?.role === 'admin') {
      const allItems = adminNavGroups.flatMap(g => g.items)
      const current = allItems.find(item => path.startsWith(item.to))
      return current?.label || 'Panel de Control'
    }
    const section = formSections.find(s => path.includes(s.id))
    return section?.label || 'Datos Generales'
  }

  // Check if a path is active
  const isPathActive = (to) => location.pathname.startsWith(to)

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ backgroundColor: '#f8f6f6' }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 flex-col text-white
          transform transition-transform duration-300 ease-in-out
          flex h-full
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ backgroundColor: '#e00034' }}
      >
        {/* Logo Header */}
        <div className="flex h-16 items-center gap-3 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white flex-shrink-0 overflow-hidden"
            style={{ border: '1.5px solid rgba(255,255,255,0.3)' }}
          >
            <img src="/ibero-icon-white.svg" alt="IBERO" className="h-5 w-auto" />
          </div>
          <div className="flex flex-col gap-0">
            <h1 className="text-sm font-bold leading-tight text-white">
              {user?.role === 'admin' ? 'IBERO - GDD' : 'IBERO - GDD'}
            </h1>
            <span className="text-[11px] leading-tight" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {user?.role === 'admin' ? 'Administrador docente' : 'Currículum Docente'}
            </span>
          </div>
          {/* Close button for mobile */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-1 rounded"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {user?.role === 'admin' ? (
            <>
              {adminNavGroups.map((group, groupIdx) => (
                <div key={group.label}>
                  <p
                    className="px-2 text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: 'rgba(255,255,255,0.5)', marginTop: groupIdx > 0 ? '2rem' : '0' }}
                  >
                    {group.label}
                  </p>
                  {group.items.map((item) => {
                    const active = isPathActive(item.to)
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: active ? '#ffffff' : 'transparent',
                          color: active ? '#e00034' : 'rgba(255,255,255,0.85)',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={20} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                            style={{
                              backgroundColor: active ? '#e00034' : 'rgba(255,255,255,0.2)',
                              color: '#ffffff',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    )
                  })}
                </div>
              ))}
            </>
          ) : (
            <>
              <p
                className="px-2 text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                Mi Currículum
              </p>
              {formSections.map((section) => {
                const IconComponent = sectionIcons[section.icon]
                const status = professorSections?.[section.id]
                const active = location.pathname.includes(section.id)
                return (
                  <NavLink
                    key={section.id}
                    to={`/profile/${section.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: active ? '#ffffff' : 'transparent',
                      color: active ? '#e00034' : 'rgba(255,255,255,0.85)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {IconComponent && <IconComponent size={18} className="flex-shrink-0" />}
                      <span className="leading-tight">{section.label}</span>
                    </div>
                    {status === 'complete' ? (
                      <CheckCircle2 size={15} className="flex-shrink-0" style={{ color: active ? '#16a34a' : 'rgba(255,255,255,0.7)' }} />
                    ) : (
                      <Circle size={15} className="flex-shrink-0" style={{ color: active ? '#9ca3af' : 'rgba(255,255,255,0.4)' }} />
                    )}
                  </NavLink>
                )
              })}

              {/* Professor Progress */}
              <div className="mt-6 px-1">
                <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>Completado</span>
                    <span className="font-bold" style={{ color: '#ffffff' }}>{calculateProgress()}%</span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <div 
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${calculateProgress()}%`, backgroundColor: '#ffffff' }}
                    />
                  </div>
                  <p className="text-[11px] mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {Object.values(professorSections || {}).filter(s => s !== 'complete').length} secciones pendientes
                  </p>
                </div>
              </div>
            </>
          )}
        </nav>

        {/* Log Out */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors w-full"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-20 items-center justify-between bg-white px-4 lg:px-8" style={{ borderBottom: '1px solid #e6dbdd' }}>
          {/* Left: Mobile menu + Breadcrumb */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg"
              style={{ color: '#4b5563' }}
            >
              <Menu size={24} />
            </button>
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#c40e2f' }}>
                <GraduationCap size={18} className="text-white" />
              </div>
              <span className="font-bold" style={{ color: '#181112' }}>IBERO</span>
            </div>
            {/* Desktop breadcrumb */}
            <div className="hidden lg:flex flex-col">
              <h2 className="text-xl font-bold" style={{ color: '#181112' }}>{getBreadcrumb()}</h2>
              <div className="flex items-center text-sm gap-1" style={{ color: '#896169' }}>
                <span>Inicio</span>
                <ChevronRight size={12} />
                <span className="font-medium" style={{ color: '#c40e2f' }}>{getBreadcrumb()}</span>
              </div>
            </div>
          </div>

          {/* Right: Notifications + User */}
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 transition-colors hover:bg-gray-100" style={{ color: '#896169' }}>
              <Bell size={22} />
              <span
                className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: '#c40e2f', border: '2px solid white' }}
              ></span>
            </button>

            <div className="flex items-center gap-3 pl-4" style={{ borderLeft: '1px solid #e6dbdd' }}>
              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <div className="text-right hidden sm:flex flex-col justify-center" style={{ gap: '1px' }}>
                    <p className="text-sm font-semibold" style={{ color: '#181112', lineHeight: '1.1', margin: 0 }}>{user?.name}</p>
                    <p className="text-[11px]" style={{ color: '#896169', lineHeight: '1.1', margin: 0 }}>{user?.roleDisplay}</p>
                  </div>
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center font-bold text-sm" style={{ color: '#4b5563' }}>
                    {user?.avatar || 'U'}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserMenuOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1.5 z-50" style={{ border: '1px solid #e5e7eb' }}>
                      <div className="px-4 py-2 sm:hidden" style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <p className="text-sm font-semibold" style={{ color: '#181112' }}>{user?.name}</p>
                        <p className="text-xs" style={{ color: '#896169' }}>{user?.roleDisplay}</p>
                      </div>
                      <button
                        onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-red-50"
                        style={{ color: '#dc2626' }}
                      >
                        <LogOut size={16} />
                        Cerrar sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Professor Progress Bar - mobile */}
        {user?.role === 'professor' && (
          <div className="px-4 py-3 bg-white lg:hidden" style={{ borderBottom: '1px solid #e6dbdd' }}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span style={{ color: '#896169' }}>Completado</span>
              <span className="font-bold" style={{ color: '#c40e2f' }}>{calculateProgress()}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress()}%`, backgroundColor: '#c40e2f' }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8" style={{ backgroundColor: '#f8f6f6' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
