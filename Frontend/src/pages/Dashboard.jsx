import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Users, FileText, Award, TrendingUp, UserCheck, Clock, CheckCircle,
  UserPlus, BarChart3, ClipboardCheck, ArrowRight
} from 'lucide-react'
import { facultyMembers, getFullName } from '../data/users'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const totalFaculty = facultyMembers.length
  const activeProfiles = facultyMembers.filter(f => f.activo).length
  const inactiveProfiles = facultyMembers.filter(f => !f.activo).length

  const stats = [
    { 
      label: 'Total profesores', 
      value: totalFaculty, 
      icon: Users, 
      iconBg: '#dcfce7', 
      iconColor: '#16a34a',
      change: '+12%',
      changeColor: '#16a34a',
      changeText: 'desde el mes pasado'
    },
    { 
      label: 'Perfiles activos', 
      value: activeProfiles, 
      icon: UserCheck, 
      iconBg: '#dbeafe', 
      iconColor: '#2563eb',
      change: '+5%',
      changeColor: '#2563eb',
      changeText: 'activados recientemente'
    },
    { 
      label: 'Perfiles inactivos', 
      value: inactiveProfiles, 
      icon: Clock, 
      iconBg: '#ffedd5', 
      iconColor: '#ea580c',
      change: '0',
      changeColor: '#ea580c',
      changeText: 'sin cambios'
    },
    { 
      label: 'Tasa de actividad', 
      value: `${Math.round((activeProfiles / totalFaculty) * 100)}%`, 
      icon: CheckCircle, 
      iconBg: 'rgba(196,14,47,0.1)', 
      iconColor: '#c40e2f',
      isProgress: true,
      progressValue: Math.round((activeProfiles / totalFaculty) * 100)
    }
  ]

  const quickActions = [
    {
      icon: UserPlus,
      iconColor: '#c40e2f',
      title: 'Agregar docente',
      description: 'Registrar un nuevo docente en el sistema',
      action: () => navigate('/faculty')
    },
    {
      icon: BarChart3,
      iconColor: '#2563eb',
      title: 'Generar reporte',
      description: 'Crear reporte de estado y análisis de docentes',
      action: () => navigate('/reports')
    },
    {
      icon: ClipboardCheck,
      iconColor: '#16a34a',
      title: 'Revisar perfiles',
      description: 'Verificar actualizaciones y validaciones pendientes',
      action: () => navigate('/validaciones-pendientes')
    }
  ]

  // Recent activity from faculty data
  const recentActivity = facultyMembers.slice(0, 5).map(f => ({
    name: getFullName(f),
    avatar: f.avatar,
    avatarColor: f.avatarColor,
    action: f.activo ? 'perfil activo' : 'perfil inactivo',
    time: f.fechaActualizacion
  }))

  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: '#181112' }}>Panel de Control</h1>
        <p className="mt-1" style={{ color: '#896169' }}>Bienvenido {user ? `${user.nombres} ${user.apellidoPaterno}` : 'Usuario'}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-xl bg-white p-6 shadow-sm" style={{ border: '1px solid #e6dbdd' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#896169' }}>{stat.label}</p>
                <p className="mt-2 text-3xl font-bold" style={{ color: '#181112' }}>{stat.value}</p>
              </div>
              <div className="rounded-lg p-2" style={{ backgroundColor: stat.iconBg, color: stat.iconColor }}>
                <stat.icon size={22} />
              </div>
            </div>
            {stat.isProgress ? (
              <div className="mt-4 w-full rounded-full h-1.5" style={{ backgroundColor: '#e5e7eb' }}>
                <div className="h-1.5 rounded-full" style={{ width: `${stat.progressValue}%`, backgroundColor: '#c40e2f' }}></div>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-1 text-sm">
                <span className="font-medium" style={{ color: stat.changeColor }}>{stat.change}</span>
                <span style={{ color: '#896169' }}>{stat.changeText}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 rounded-xl bg-white shadow-sm" style={{ border: '1px solid #e6dbdd' }}>
          <div className="p-6" style={{ borderBottom: '1px solid #e6dbdd' }}>
            <h2 className="text-lg font-bold" style={{ color: '#181112' }}>Acciones rápidas</h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="p-4 rounded-xl text-left transition-all hover:shadow-md group"
                style={{ border: '1px solid #e6dbdd' }}
              >
                <action.icon size={24} style={{ color: action.iconColor }} className="mb-3" />
                <p className="font-semibold mb-1" style={{ color: '#181112' }}>{action.title}</p>
                <p className="text-xs" style={{ color: '#896169' }}>{action.description}</p>
                <div className="flex items-center gap-1 mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#c40e2f' }}>
                  <span>Ir</span>
                  <ArrowRight size={12} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl bg-white shadow-sm" style={{ border: '1px solid #e6dbdd' }}>
          <div className="p-6" style={{ borderBottom: '1px solid #e6dbdd' }}>
            <h2 className="text-lg font-bold" style={{ color: '#181112' }}>Actividad reciente</h2>
          </div>
          <div className="p-4">
            {recentActivity.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`h-9 w-9 rounded-full ${item.avatarColor} flex items-center justify-center font-semibold text-xs flex-shrink-0`}>
                  {item.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate" style={{ color: '#181112' }}>{item.name}</p>
                  <p className="text-xs truncate" style={{ color: '#896169' }}>{item.action}</p>
                </div>
                <span className="text-[10px] flex-shrink-0" style={{ color: '#9ca3af' }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
