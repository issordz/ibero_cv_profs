import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  facultyMembers, 
  academicDegrees, 
  publications, 
  projects, 
  awards, 
  teachingCourses, 
  languages 
} from '../../data/users'
import Swal from 'sweetalert2'

import GeneralDataSection from './sections/GeneralDataSection'
import AcademicDegreesSection from './sections/AcademicDegreesSection'
import PublicationsSection from './sections/PublicationsSection'
import ProjectsSection from './sections/ProjectsSection'
import AwardsSection from './sections/AwardsSection'
import TeachingSection from './sections/TeachingSection'
import LanguagesSection from './sections/LanguagesSection'
import PlaceholderSection from './sections/PlaceholderSection'

const ProfileSection = () => {
  const { section } = useParams()
  const { user } = useAuth()
  const [faculty, setFaculty] = useState(null)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (user?.facultyId) {
      const found = facultyMembers.find(f => f.id === user.facultyId)
      setFaculty(found)
    }
  }, [user])

  const handleSave = async () => {
    await Swal.fire({
      icon: 'success',
      title: 'Cambios guardados',
      text: 'Tu perfil ha sido actualizado correctamente',
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        popup: 'rounded-lg'
      }
    })
    setHasChanges(false)
  }

  const sectionTitles = {
    'datos-generales': 'Datos Generales',
    'informacion-academica': 'Información Académica',
    'experiencia-laboral': 'Experiencia Laboral',
    'capacitaciones': 'Capacitaciones y Actualizaciones',
    'productos-academicos': 'Productos Académicos',
    'logros-profesionales': 'Logros Profesionales',
    'organismos': 'Organismos',
    'premios-distinciones': 'Premios y Distinciones'
  }

  const sectionDescriptions = {
    'datos-generales': 'Administra tu información personal e institucional.',
    'informacion-academica': 'Registra tus grados académicos y formación.',
    'experiencia-laboral': 'Detalla tu trayectoria profesional y laboral.',
    'capacitaciones': 'Agrega cursos, talleres y actualizaciones profesionales.',
    'productos-academicos': 'Registra tus publicaciones, investigaciones y proyectos.',
    'logros-profesionales': 'Documenta tus logros y reconocimientos profesionales.',
    'organismos': 'Membresías y participación en organismos.',
    'premios-distinciones': 'Registra tus premios, distinciones y reconocimientos.'
  }

  const renderSection = () => {
    if (!faculty) return <div className="text-slate-500">Cargando...</div>

    const facultyId = user?.facultyId

    switch (section) {
      case 'datos-generales':
        return (
          <GeneralDataSection 
            faculty={faculty} 
            onSave={handleSave}
            onChanges={() => setHasChanges(true)}
          />
        )
      case 'informacion-academica':
        return (
          <AcademicDegreesSection 
            degrees={academicDegrees[facultyId] || []}
            onSave={handleSave}
          />
        )
      case 'productos-academicos':
        return (
          <PublicationsSection 
            publications={publications[facultyId] || []}
            onSave={handleSave}
          />
        )
      case 'logros-profesionales':
        return (
          <AwardsSection 
            awards={awards[facultyId] || []}
            onSave={handleSave}
          />
        )
      case 'premios-distinciones':
        return (
          <AwardsSection 
            awards={awards[facultyId] || []}
            onSave={handleSave}
          />
        )
      default:
        return <PlaceholderSection sectionName={sectionTitles[section] || section} />
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          {sectionTitles[section] || 'Perfil'}
        </h1>
        <p className="text-slate-500 mt-1">
          {sectionDescriptions[section] || `Administra la información de ${sectionTitles[section]?.toLowerCase() || 'tu perfil'}.`}
        </p>
      </div>

      {/* Section Content */}
      {renderSection()}

      {/* Save Button (floating) */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 z-20">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg shadow-lg transition-colors flex items-center gap-2"
          >
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileSection
