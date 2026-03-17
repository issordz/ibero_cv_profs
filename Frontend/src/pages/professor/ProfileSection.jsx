import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { fetchSectionData } from '../../services/acreditacionService'
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
  const [sectionData, setSectionData] = useState(null)
  const [loading, setLoading] = useState(true)

  const cuenta = user?.accountNumber

  useEffect(() => {
    if (!cuenta || !section) return
    let mounted = true
    const loadData = async () => {
      setLoading(true)
      setSectionData(null)
      console.log(`[ProfileSection] Loading section="${section}" cuenta="${cuenta}"`)
      try {
        const data = await fetchSectionData(section, cuenta)
        console.log(`[ProfileSection] Data received:`, data)
        if (mounted) setSectionData(data)
      } catch (error) {
        console.error(`[ProfileSection] Error cargando sección "${section}":`, error)
        if (mounted) setSectionData(section === 'datos-generales' ? {} : [])
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar datos',
          text: error.message || 'No se pudieron obtener los datos de esta sección.',
          confirmButtonColor: '#C41E3A'
        })
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadData()
    return () => { mounted = false }
  }, [section, cuenta])

  const reloadSection = async () => {
    if (!cuenta || !section) return
    setLoading(true)
    try {
      const data = await fetchSectionData(section, cuenta)
      setSectionData(data)
    } catch (error) {
      console.error(`[ProfileSection] Error recargando sección "${section}":`, error)
    } finally {
      setLoading(false)
    }
  }

  const sectionTitles = {
    'datos-generales': 'Datos Generales',
    'informacion-academica': 'Estudios Académicos',
    'experiencia-laboral': 'Experiencia Laboral',
    'capacitacion-actualizacion': 'Capacitación / Actualización',
    'logros-profesionales': 'Logros Profesionales (No académicos)',
    'organismos': 'Organismos',
    'premios-distinciones': 'Premios y Distinciones',
    'productos-academicos': 'Productos Académicos'
  }

  const sectionDescriptions = {
    'datos-generales': 'Administra tu información personal e institucional.',
    'informacion-academica': 'Registra tus estudios académicos y formación.',
    'experiencia-laboral': 'Detalla tu trayectoria profesional y laboral.',
    'capacitacion-actualizacion': 'Agrega cursos, talleres, diplomados, certificaciones y actualizaciones tomados en los últimos 5 años.',
    'logros-profesionales': 'Documenta tus logros y reconocimientos profesionales obtenidos en los últimos 5 años.',
    'organismos': 'Membresías y participación en organismos.',
    'premios-distinciones': 'Registra tus premios, distinciones y reconocimientos.',
    'productos-academicos': 'Registra tus publicaciones, investigaciones y proyectos realizados en los últimos 5 años.'
  }

  const renderSection = () => {
    if (loading) return <div className="text-slate-500">Cargando datos...</div>

    switch (section) {
      case 'datos-generales':
        return <GeneralDataSection faculty={sectionData} cuenta={cuenta} />
      case 'informacion-academica': {
        let degs = []
        if (Array.isArray(sectionData)) degs = sectionData
        else if (sectionData && typeof sectionData === 'object' && sectionData.id) degs = [sectionData]
        return <AcademicDegreesSection degrees={degs} cuenta={cuenta} onReload={reloadSection} />
      }
      case 'experiencia-laboral':
        return <ExperienciaLaboralSection items={Array.isArray(sectionData) ? sectionData : []} cuenta={cuenta} onReload={reloadSection} />
      case 'capacitacion-actualizacion':
        return <CapacitacionSection items={Array.isArray(sectionData) ? sectionData : []} cuenta={cuenta} onReload={reloadSection} />
      case 'logros-profesionales':
        return <LogrosProfesionalesSection items={Array.isArray(sectionData) ? sectionData : []} cuenta={cuenta} onReload={reloadSection} />
      case 'organismos':
        return <OrganismosSection items={Array.isArray(sectionData) ? sectionData : []} cuenta={cuenta} onReload={reloadSection} />
      case 'premios-distinciones':
        return <PremiosDistincionesSection items={Array.isArray(sectionData) ? sectionData : []} cuenta={cuenta} onReload={reloadSection} />
      case 'productos-academicos':
        return <ProductosAcademicosSection items={Array.isArray(sectionData) ? sectionData : []} cuenta={cuenta} onReload={reloadSection} />
      default:
        return <PlaceholderSection sectionName={sectionTitles[section] || section} />
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          {sectionTitles[section] || 'Perfil'}
        </h1>
        <p className="text-slate-500 mt-1">
          {sectionDescriptions[section] || `Administra la información de ${sectionTitles[section]?.toLowerCase() || 'tu perfil'}.`}
        </p>
      </div>

      {renderSection()}
    </div>
  )
}

export default ProfileSection
