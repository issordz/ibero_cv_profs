import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { 
  ArrowLeft, 
  Save, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Link as LinkIcon,
  Clock,
  Lock,
  Edit3,
  GraduationCap,
  BookOpen,
  FlaskConical,
  FileText,
  Briefcase,
  Award,
  BadgeCheck,
  Languages,
  Users
} from 'lucide-react'
import { facultyMembers } from '../data/users'
import Swal from 'sweetalert2'

const FacultyProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [faculty, setFaculty] = useState(null)
  const [formData, setFormData] = useState({})
  const [hasChanges, setHasChanges] = useState(false)

  const navItems = [
    { id: 'general', label: 'General Data', icon: User, completed: true },
    { id: 'degrees', label: 'Academic Degrees', icon: GraduationCap, completed: true },
    { id: 'research', label: 'Research', icon: FlaskConical, completed: false },
    { id: 'publications', label: 'Publications', icon: BookOpen, completed: true },
    { id: 'projects', label: 'Projects', icon: Briefcase, completed: true },
    { id: 'teaching', label: 'Teaching', icon: FileText, completed: false },
    { id: 'awards', label: 'Awards', icon: Award, completed: false },
    { id: 'certifications', label: 'Certifications', icon: BadgeCheck, completed: false },
    { id: 'languages', label: 'Languages', icon: Languages, completed: false },
    { id: 'committees', label: 'Committees', icon: Users, completed: false }
  ]

  useEffect(() => {
    const found = facultyMembers.find(f => f.id === parseInt(id))
    if (found) {
      setFaculty(found)
      setFormData({
        phone: found.phone,
        alternateEmail: found.email.replace('@ibero.mx', '.personal@gmail.com'),
        officeLocation: found.officeLocation,
        orcidId: found.orcidId,
        linkedIn: found.linkedIn,
        officeHours: found.officeHours,
        summary: found.summary
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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">General Data</h1>
            <p className="text-gray-500 mt-1">
              Manage your personal and institutional information. Elements marked with a lock icon are synchronized with the HR system and cannot be modified here.
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
              Save Changes
            </Button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold">
              {faculty.avatar}
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{faculty.name}</p>
              <p className="text-xs text-gray-500">{faculty.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">NAVIGATION</p>
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

          {/* Profile Completion */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-red-600 font-medium">Profile Completion</span>
              <span className="text-sm font-bold text-gray-900">{faculty.profileProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${faculty.profileProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {100 - faculty.profileProgress > 0 
                ? `${Math.ceil((100 - faculty.profileProgress) / 10)} sections left to complete`
                : 'Profile complete!'
              }
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Institutional Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Building2 className="text-gray-400" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">Institutional Information</h2>
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">READ-ONLY</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">EMPLOYEE ID</p>
                    <p className="font-medium text-gray-900">{faculty.employeeId}</p>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">FULL LEGAL NAME</p>
                    <p className="font-medium text-gray-900">{faculty.name}</p>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">UNIVERSITY EMAIL</p>
                    <p className="font-medium text-gray-900">{faculty.email}</p>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">DEPARTMENT</p>
                    <p className="font-medium text-gray-900">{faculty.department}</p>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">ACADEMIC RANK</p>
                    <p className="font-medium text-gray-900">{faculty.role}</p>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Profile */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Edit3 className="text-gray-400" size={20} />
                <h2 className="text-lg font-semibold text-gray-900">Contact & Profile</h2>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full uppercase">EDITABLE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">PERSONAL PHONE</p>
                <Form.Control
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="border-0 bg-transparent p-0 font-medium text-gray-900 focus:ring-0"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">ALTERNATE EMAIL</p>
                <Form.Control
                  type="email"
                  value={formData.alternateEmail || ''}
                  onChange={(e) => handleInputChange('alternateEmail', e.target.value)}
                  className="border-0 bg-transparent p-0 font-medium text-gray-900 focus:ring-0"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">OFFICE LOCATION</p>
                <Form.Control
                  type="text"
                  value={formData.officeLocation || ''}
                  onChange={(e) => handleInputChange('officeLocation', e.target.value)}
                  className="border-0 bg-transparent p-0 font-medium text-gray-900 focus:ring-0"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">ORCID ID</p>
                    <Form.Control
                      type="text"
                      value={formData.orcidId || ''}
                      onChange={(e) => handleInputChange('orcidId', e.target.value)}
                      className="border-0 bg-transparent p-0 font-medium text-gray-900 focus:ring-0"
                    />
                  </div>
                  <LinkIcon size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">LINKEDIN PROFILE</p>
                    <Form.Control
                      type="text"
                      value={formData.linkedIn || ''}
                      onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                      className="border-0 bg-transparent p-0 font-medium text-gray-900 focus:ring-0"
                    />
                  </div>
                  <LinkIcon size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">OFFICE HOURS</p>
                <Form.Control
                  type="text"
                  value={formData.officeHours || ''}
                  onChange={(e) => handleInputChange('officeHours', e.target.value)}
                  className="border-0 bg-transparent p-0 font-medium text-gray-900 focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">PROFESSIONAL SUMMARY</p>
            <Form.Control
              as="textarea"
              rows={4}
              value={formData.summary || ''}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              className="border-gray-200 rounded-lg focus:border-red-500 focus:ring-red-500"
            />
          </div>

          {/* Last Updated */}
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Last updated</p>
                <p className="text-sm text-gray-500">{faculty.lastUpdate} at 11:42 AM</p>
              </div>
            </div>
            {hasChanges && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Auto-save active - Your changes are being saved locally
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyProfile
