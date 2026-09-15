import { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  ClipboardList,
  UserCog,
  BarChart3,
  Bell,
  ChevronRight,
  X,
} from 'lucide-react'

const Layout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isAdmin = user?.role === 'admin'

  const handleLogout = async () => {
    const loggedOut = await logout()
    if (loggedOut) {
      navigate('/')
    }
  }

  const adminNavGroups = [
    {
      label: 'ADMINISTRACIÓN',
      items: [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Panel de Control' },
        { to: '/faculty', icon: Search, label: 'Búsqueda de Docentes' },
        { to: '/reports', icon: BarChart3, label: 'Reportes' },
        { to: '/validaciones-pendientes', icon: ClipboardList, label: 'Validaciones Pendientes', badge: 12 },
      ],
    },
    {
      label: 'CONFIGURACIÓN',
      items: [{ to: '/user-management', icon: UserCog, label: 'Gestión de usuarios' }],
    },
  ]

  const getAdminBreadcrumb = () => {
    const allItems = adminNavGroups.flatMap((g) => g.items)
    const current = allItems.find((item) => location.pathname.startsWith(item.to))
    return current?.label || 'Panel de Control'
  }

  const isPathActive = (to) => location.pathname.startsWith(to)

  const userInitials = user?.userName
    ? user.userName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
    : 'U'

  const renderUserMenu = () => (
    <div className="relative">
      <button
        type="button"
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <div className="text-right hidden sm:flex flex-col justify-center" style={{ gap: '1px' }}>
          <p className="text-sm font-semibold" style={{ color: '#181112', lineHeight: '1.1', margin: 0 }}>
            {user?.userName || 'Usuario'}
          </p>
          <p className="text-[11px]" style={{ color: '#896169', lineHeight: '1.1', margin: 0 }}>
            {user?.profile || user?.comunidadUsuario || ''}
          </p>
        </div>
        <div
          className="h-9 w-9 overflow-hidden rounded-full flex items-center justify-center font-semibold text-sm"
          style={{ color: '#C41E3A', backgroundColor: 'rgba(196, 30, 58, 0.1)' }}
        >
          {userInitials}
        </div>
      </button>

      {userMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
          <div
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1.5 z-50"
            style={{ border: '1px solid #e5e7eb' }}
          >
            <div className="px-4 py-2 sm:hidden" style={{ borderBottom: '1px solid #e5e7eb' }}>
              <p className="text-sm font-semibold" style={{ color: '#181112' }}>
                {user?.userName || 'Usuario'}
              </p>
              <p className="text-xs" style={{ color: '#896169' }}>
                {user?.profile || ''}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                handleLogout()
                setUserMenuOpen(false)
              }}
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
  )

  /* ——— Profesor: sin sidebar; top bar + contenido a ancho completo ——— */
  if (!isAdmin) {
    return (
      <div className="flex h-dvh w-full flex-col overflow-hidden bg-background-light">
        <header
          className="relative shrink-0 flex h-16 items-center justify-between gap-4 bg-white px-4 sm:px-6 lg:px-10"
          style={{ borderBottom: '1px solid #e6dbdd' }}
        >
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ backgroundColor: '#C41E3A' }}
            aria-hidden="true"
          />

          <div className="flex items-center min-w-0">
            <div className="flex shrink-0 items-center pr-3 sm:pr-4">
              <img
                src="/ibero-logo.svg"
                alt="IBERO Ciudad de México"
                className="h-9 w-auto sm:h-10"
              />
            </div>

            <div
              className="flex min-w-0 flex-col justify-center pl-3 sm:pl-4"
              style={{ borderLeft: '1px solid #d9c9cc', gap: '2px' }}
            >
              <div className="flex items-baseline gap-2" style={{ lineHeight: 1 }}>
                <p
                  className="truncate text-sm font-semibold tracking-tight text-ink sm:text-[15px]"
                  style={{ lineHeight: 1, margin: 0 }}
                >
                  Portal de Acreditaciones
                </p>
                <span
                  className="hidden text-[9px] font-semibold tracking-[0.15em] sm:inline"
                  style={{ color: '#C41E3A', lineHeight: 1, margin: 0 }}
                >
                  PGA
                </span>
              </div>
              <p
                className="truncate text-[10px] text-ink-muted sm:text-[11px]"
                style={{ lineHeight: 1, margin: 0 }}
              >
                Gestión del currículum docente
              </p>
            </div>
          </div>

          <div className="flex items-center min-w-0">
            {renderUserMenu()}
          </div>
        </header>

        <main
          id="contenido-principal"
          className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-10 lg:py-8"
        >
          <div className="mx-auto w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    )
  }

  /* ——— Admin: sidebar existente ——— */
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background-light">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-ink/50 backdrop-blur-[1px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 flex-col text-white
          transform transition-transform duration-300 ease-spring
          flex h-full
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ backgroundColor: '#e00034' }}
      >
        <div
          className="flex h-16 items-center gap-3 px-6"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white flex-shrink-0 overflow-hidden"
            style={{ border: '1.5px solid rgba(255,255,255,0.3)' }}
          >
            <img src="/ibero-icon-white.svg" alt="IBERO" className="h-5 w-auto" />
          </div>
          <div className="flex flex-col gap-0">
            <h1 className="font-display text-sm font-semibold leading-tight text-white tracking-tight">
              IBERO - PGA
            </h1>
            <span className="text-[11px] leading-tight" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Administración
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-1 rounded"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {adminNavGroups.map((group, groupIdx) => (
            <div key={group.label}>
              <p
                className="px-2 text-xs font-semibold uppercase tracking-wider mb-2"
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: groupIdx > 0 ? '2rem' : '0',
                }}
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
        </nav>

        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors w-full"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header
          className="flex h-20 items-center justify-between bg-white px-4 lg:px-8"
          style={{ borderBottom: '1px solid #e6dbdd' }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg"
              style={{ color: '#4b5563' }}
            >
              <Menu size={24} />
            </button>
            <div className="hidden lg:flex flex-col">
              <h2 className="font-display text-xl font-semibold tracking-tight" style={{ color: '#181112' }}>
                {getAdminBreadcrumb()}
              </h2>
              <div className="flex items-center text-sm gap-1" style={{ color: '#896169' }}>
                <span>Inicio</span>
                <ChevronRight size={12} />
                <span className="font-medium" style={{ color: '#c40e2f' }}>
                  {getAdminBreadcrumb()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative rounded-full p-2 transition-colors hover:bg-gray-100"
              style={{ color: '#896169' }}
              aria-label="Notificaciones"
            >
              <Bell size={22} />
              <span
                className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: '#c40e2f', border: '2px solid white' }}
              />
            </button>
            <div className="pl-4" style={{ borderLeft: '1px solid #e6dbdd' }}>
              {renderUserMenu()}
            </div>
          </div>
        </header>

        <main id="contenido-principal" className="flex-1 overflow-y-auto p-4 lg:p-8 bg-background-light">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
