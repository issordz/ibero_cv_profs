import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  facultyMembers, 
  estudiosAcademicos, 
  experienciaLaboral, 
  capacitacionActualizacion, 
  logrosProfesionales, 
  organismos, 
  premiosDistinciones, 
  productosAcademicos 
} from '../../data/users'
import Swal from 'sweetalert2'

import GeneralDataSection from './sections/GeneralDataSection'
import AcademicDegreesSection from './sections/AcademicDegreesSection'
import ExperienciaLaboralSection from './sections/ProjectsSection'
import CapacitacionSection from './sections/TeachingSection'
import LogrosProfesionalesSection from './sections/LogrosProfesionalesSection'
import OrganismosSection from './sections/LanguagesSection'
import PremiosDistincionesSection from './sections/AwardsSection'
import ProductosAcademicosSection from './sections/PublicationsSection'
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
    'informacion-academica': 'Estudios Académicos',
    'experiencia-laboral': 'Experiencia Laboral',
    'capacitacion-actualizacion': 'Capacitación / Actualización',
    'logros-profesionales': 'Logros Profesionales',
    'organismos': 'Organismos',
    'premios-distinciones': 'Premios y Distinciones',
    'productos-academicos': 'Productos Académicos'
  }

  const sectionDescriptions = {
    'datos-generales': 'Administra tu información personal e institucional.',
    'informacion-academica': 'Registra tus estudios académicos y formación.',
    'experiencia-laboral': 'Detalla tu trayectoria profesional y laboral.',
    'capacitacion-actualizacion': 'Agrega cursos, talleres, diplomados, certificaciones y actualizaciones.',
    'logros-profesionales': 'Documenta tus logros y reconocimientos profesionales.',
    'organismos': 'Membresías y participación en organismos.',
    'premios-distinciones': 'Registra tus premios, distinciones y reconocimientos.',
    'productos-academicos': 'Registra tus publicaciones, investigaciones y proyectos.'
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
            degrees={estudiosAcademicos[facultyId] || []}
            onSave={handleSave}
          />
        )
      case 'experiencia-laboral':
        return (
          <ExperienciaLaboralSection 
            items={experienciaLaboral[facultyId] || []}
            onSave={handleSave}
          />
        )
      case 'capacitacion-actualizacion':
        return (
          <CapacitacionSection 
            items={capacitacionActualizacion[facultyId] || []}
            onSave={handleSave}
          />
        )
      case 'logros-profesionales':
        return (
          <LogrosProfesionalesSection 
            items={logrosProfesionales[facultyId] || []}
            onSave={handleSave}
          />
        )
      case 'organismos':
        return (
          <OrganismosSection 
            items={organismos[facultyId] || []}
            onSave={handleSave}
          />
        )
      case 'premios-distinciones':
        return (
          <PremiosDistincionesSection 
            items={premiosDistinciones[facultyId] || []}
            onSave={handleSave}
          />
        )
      case 'productos-academicos':
        return (
          <ProductosAcademicosSection 
            items={productosAcademicos[facultyId] || []}
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
