import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { 
  ArrowLeft, 
  Save, 
  Building2, 
  User, 
  Mail, 
  Clock,
  Lock,
  Edit3,
  GraduationCap,
  BookOpen,
  FileText,
  Briefcase,
  Award,
  Trophy,
  Users,
} from 'lucide-react'
import { facultyMembers, getFullName } from '../data/users'
import Swal from 'sweetalert2'

const FacultyProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [faculty, setFaculty] = useState(null)
  const [formData, setFormData] = useState({})
  const [hasChanges, setHasChanges] = useState(false)

  const navItems = [
    { id: 'general', label: 'Datos Generales', icon: User, completed: true },
    { id: 'estudios', label: 'Estudios Académicos', icon: GraduationCap, completed: true },
    { id: 'experiencia', label: 'Experiencia Laboral', icon: Briefcase, completed: true },
    { id: 'capacitacion', label: 'Capacitación / Actualización', icon: BookOpen, completed: false },
    { id: 'logros', label: 'Logros Profesionales', icon: Award, completed: false },
    { id: 'organismos', label: 'Organismos', icon: Users, completed: false },
    { id: 'premios', label: 'Premios y Distinciones', icon: Trophy, completed: false },
    { id: 'productos', label: 'Productos Académicos', icon: FileText, completed: false }
  ]

  useEffect(() => {
    const found = facultyMembers.find(f => f.idProfesor === id)
    if (found) {
      setFaculty(found)
      setFormData({
        resumenProfesional: found.resumenProfesional || ''
      })
    }
  }, [id])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    await Swal.fire({
      icon: 'success',
      title: 'Cambios guardados',
      text: 'Los datos del perfil han sido actualizados correctamente',
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        popup: 'rounded-xl'
      }
    })
    setHasChanges(false)
  }

  if (!faculty) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/faculty')}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Datos Generales</h1>
            <p className="text-gray-500 mt-1">
              Administra tu información personal e institucional. Los elementos con ícono de candado están sincronizados con el sistema de RH y no pueden modificarse aquí.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <Button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 border-0"
            >
              <Save size={18} />
              Guardar cambios
            </Button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold">
              {faculty.avatar}
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{getFullName(faculty)}</p>
              <p className="text-xs text-gray-500">{faculty.puestoInstitucional}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">NAVEGACIÓN</p>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    item.id === 'general' 
                      ? 'bg-red-50 text-red-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    {item.label}
                  </div>
                  {item.completed && (
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                  {!item.completed && item.id !== 'general' && (
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Estado */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-red-600 font-medium">Estado del perfil</span>
              <span className={`text-sm font-bold ${faculty.activo ? 'text-green-600' : 'text-gray-500'}`}>
                {faculty.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Institutional Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Building2 className="text-gray-400" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">Información Institucional</h2>
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">SOLO LECTURA</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">NOMBRES</p>
                    <p className="font-medium text-gray-900">{faculty.nombres}</p>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">APELLIDO PATERNO</p>
                    <p className="font-medium text-gray-900">{faculty.apellidoPaterno}</p>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">APELLIDO MATERNO</p>
                    <p className="font-medium text-gray-900">{faculty.apellidoMaterno || '—'}</p>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">FECHA DE NACIMIENTO</p>
                    <p className="font-medium text-gray-900">{faculty.fechaDeNacimiento || '—'}</p>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 md:col-span-2 lg:col-span-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">PUESTO EN LA INSTITUCIÓN</p>
                    <p className="font-medium text-gray-900">{faculty.puestoInstitucional}</p>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Resumen Profesional */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Edit3 className="text-gray-400" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">Resumen Profesional</h2>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full uppercase">EDITABLE</span>
            </div>
            <Form.Control
              as="textarea"
              rows={4}
              value={formData.resumenProfesional || ''}
              onChange={(e) => handleInputChange('resumenProfesional', e.target.value)}
              className="border-gray-200 rounded-lg focus:border-red-500 focus:ring-red-500"
            />
          </div>

          {/* Last Updated */}
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Última actualización</p>
                <p className="text-sm text-gray-500">{faculty.fechaActualizacion}</p>
              </div>
            </div>
            {hasChanges && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Autoguardado activo - Tus cambios se están guardando localmente
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyProfile
