import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, ChevronLeft, ChevronRight, LogOut, RotateCcw } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { fetchSectionData } from '../../services/acreditacionService'
import { formSections } from '../../data/users'
import Swal from 'sweetalert2'
import SectionSkeleton from '../../components/SectionSkeleton'

import GeneralDataSection from './sections/GeneralDataSection'
import AcademicDegreesSection from './sections/AcademicDegreesSection'
import ExperienciaLaboralSection from './sections/ProjectsSection'
import CapacitacionSection from './sections/TeachingSection'
import LogrosProfesionalesSection from './sections/LogrosProfesionalesSection'
import OrganismosSection from './sections/LanguagesSection'
import PremiosDistincionesSection from './sections/AwardsSection'
import ProductosAcademicosSection from './sections/PublicationsSection'
import PlaceholderSection from './sections/PlaceholderSection'

const SECTION_META = {
  'datos-generales': {
    title: 'Datos Generales',
    description: 'Administra tu información personal e institucional.',
    short: 'Generales',
  },
  'informacion-academica': {
    title: 'Estudios Académicos',
    description: 'Registra tus estudios académicos y formación.',
    short: 'Estudios',
  },
  'experiencia-laboral': {
    title: 'Experiencia Laboral',
    description: 'Detalla tu trayectoria profesional y laboral.',
    short: 'Experiencia',
  },
  'capacitacion-actualizacion': {
    title: 'Capacitación / Actualización',
    description: (
      <>
        <strong>Actualización</strong> se refiere a conocimientos disciplinarios. En campo de ciencias políticas.
        <br />
        <strong>Capacitación</strong> se refiere a competencias pedagógicas. Expresión frente al aula.
      </>
    ),
    short: 'Capacitación',
  },
  'logros-profesionales': {
    title: 'Logros Profesionales (No académicos)',
    description: 'Documenta tus logros y reconocimientos profesionales obtenidos en los últimos 5 años.',
    short: 'Logros',
  },
  'organismos': {
    title: 'Organismos',
    description: (
      <>
        Registro como miembro SNII.
        <br />
        Participación en Organismos o Gremios, por ejemplo la Asociación Mexicana de Ciencias Políticas (AMECIP).
      </>
    ),
    short: 'Organismos',
  },
  'premios-distinciones': {
    title: 'Premios y Distinciones',
    description: 'Registra tus premios, distinciones y reconocimientos.',
    short: 'Premios',
  },
  'productos-academicos': {
    title: 'Productos Académicos',
    description: 'Registra tus publicaciones, investigaciones y proyectos realizados en los últimos 5 años.',
    short: 'Productos',
  },
}

const countSectionRecords = (sectionId, data) => {
  if (sectionId === 'datos-generales') {
    if (!data || typeof data !== 'object') return 0
    return Object.keys(data).length > 0 ? 1 : 0
  }
  if (sectionId === 'informacion-academica') {
    if (Array.isArray(data)) return data.length
    if (data && typeof data === 'object' && data.id) return 1
    return 0
  }
  return Array.isArray(data) ? data.length : 0
}

const ProfileSection = () => {
  const { section } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [sectionData, setSectionData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sectionCounts, setSectionCounts] = useState({})
  const [finished, setFinished] = useState(false)

  const cuenta = user?.accountNumber
  const currentIndex = formSections.findIndex((s) => s.id === section)
  const safeIndex = currentIndex >= 0 ? currentIndex : 0
  const total = formSections.length
  const meta = SECTION_META[section] || {
    title: 'Perfil',
    description: 'Administra la información de tu perfil.',
    short: 'Perfil',
  }
  const prevSection = safeIndex > 0 ? formSections[safeIndex - 1] : null
  const nextSection = safeIndex < total - 1 ? formSections[safeIndex + 1] : null
  const progressPct = Math.round(((safeIndex + 1) / total) * 100)

  useEffect(() => {
    if (!cuenta || !section) return
    let mounted = true
    const loadData = async () => {
      setLoading(true)
      setSectionData(null)
      try {
        const data = await fetchSectionData(section, cuenta)
        if (mounted) {
          setSectionData(data)
          setSectionCounts((prev) => ({
            ...prev,
            [section]: countSectionRecords(section, data),
          }))
        }
      } catch (error) {
        console.error(`[ProfileSection] Error cargando sección "${section}":`, error)
        if (mounted) {
          const fallback = section === 'datos-generales' ? {} : []
          setSectionData(fallback)
          setSectionCounts((prev) => ({
            ...prev,
            [section]: 0,
          }))
        }
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar datos',
          text: error.message || 'No se pudieron obtener los datos de esta sección.',
          confirmButtonColor: '#C41E3A',
        })
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadData()
    return () => {
      mounted = false
    }
  }, [section, cuenta])

  useEffect(() => {
    setFinished(false)
    const main = document.getElementById('contenido-principal')
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [section])

  const reloadSection = async () => {
    if (!cuenta || !section) return
    setLoading(true)
    try {
      const data = await fetchSectionData(section, cuenta)
      setSectionData(data)
      setSectionCounts((prev) => ({
        ...prev,
        [section]: countSectionRecords(section, data),
      }))
    } catch (error) {
      console.error(`[ProfileSection] Error recargando sección "${section}":`, error)
    } finally {
      setLoading(false)
    }
  }

  const goTo = (id) => navigate(`/profile/${id}`)

  const handleLogout = async () => {
    const loggedOut = await logout()
    if (loggedOut) navigate('/')
  }

  const renderSection = () => {
    if (loading) return <SectionSkeleton />

    switch (section) {
      case 'datos-generales':
        return <GeneralDataSection faculty={sectionData} cuenta={cuenta} />
      case 'informacion-academica': {
        let degs = []
        if (Array.isArray(sectionData)) degs = sectionData
        else if (sectionData && typeof sectionData === 'object' && sectionData.id) degs = [sectionData]
        return (
          <AcademicDegreesSection degrees={degs} cuenta={cuenta} onReload={reloadSection} />
        )
      }
      case 'experiencia-laboral':
        return (
          <ExperienciaLaboralSection
            items={Array.isArray(sectionData) ? sectionData : []}
            cuenta={cuenta}
            onReload={reloadSection}
          />
        )
      case 'capacitacion-actualizacion':
        return (
          <CapacitacionSection
            items={Array.isArray(sectionData) ? sectionData : []}
            cuenta={cuenta}
            onReload={reloadSection}
          />
        )
      case 'logros-profesionales':
        return (
          <LogrosProfesionalesSection
            items={Array.isArray(sectionData) ? sectionData : []}
            cuenta={cuenta}
            onReload={reloadSection}
          />
        )
      case 'organismos':
        return (
          <OrganismosSection
            items={Array.isArray(sectionData) ? sectionData : []}
            cuenta={cuenta}
            onReload={reloadSection}
          />
        )
      case 'premios-distinciones':
        return (
          <PremiosDistincionesSection
            items={Array.isArray(sectionData) ? sectionData : []}
            cuenta={cuenta}
            onReload={reloadSection}
          />
        )
      case 'productos-academicos':
        return (
          <ProductosAcademicosSection
            items={Array.isArray(sectionData) ? sectionData : []}
            cuenta={cuenta}
            onReload={reloadSection}
          />
        )
      default:
        return <PlaceholderSection sectionName={meta.title || section} />
    }
  }

  if (finished) {
    return (
      <article className="mx-auto flex min-h-[calc(100dvh-10rem)] max-w-3xl items-center py-8">
        <section
          className="w-full overflow-hidden bg-white"
          style={{ border: '1px solid #e6dbdd', borderRadius: '0.9rem' }}
          aria-labelledby="completion-title"
        >
          <div className="h-1.5 w-full" style={{ backgroundColor: '#C41E3A' }} />
          <div className="px-6 py-10 text-center sm:px-12 sm:py-14">
            <div
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(196, 30, 58, 0.09)', color: '#C41E3A' }}
            >
              <CheckCircle2 size={30} strokeWidth={1.8} />
            </div>

            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: '#C41E3A' }}
            >
              Recorrido finalizado
            </p>
            <h1 id="completion-title" className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Gracias por actualizar tu currículum
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
              La información capturada permanece registrada en el portal y estará disponible para
              el proceso de acreditación institucional.
            </p>

            <div
              className="mx-auto mt-8 max-w-lg border-y py-4 text-left"
              style={{ borderColor: '#efe4e6' }}
            >
              <p className="text-sm font-medium text-ink">Antes de salir</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                Si necesitas corregir algún dato, puedes volver a revisar las ocho secciones.
              </p>
            </div>

            <div className="mt-8 flex flex-col-reverse justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setFinished(false)
                  navigate('/profile/datos-generales')
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-warm"
                style={{ borderColor: '#d9c9cc' }}
              >
                <RotateCcw size={16} />
                Revisar información
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-primary px-5 py-2.5 text-sm"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          </div>
        </section>
      </article>
    )
  }

  return (
    <article className="pb-8">
      <nav
        aria-label="Progreso del currículum"
        className="mb-7"
      >
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-sm text-ink-muted tabular-nums">
            Paso <span className="font-semibold text-ink">{safeIndex + 1}</span> de {total}
          </p>
        </div>

        <div
          className="h-0.5 w-full rounded-full overflow-hidden mb-3"
          style={{ backgroundColor: '#efe4e6' }}
          role="progressbar"
          aria-valuenow={safeIndex + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Paso ${safeIndex + 1} de ${total}`}
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progressPct}%`,
              backgroundColor: '#C41E3A',
            }}
          />
        </div>

        <ol className="flex gap-1 overflow-x-auto pb-0.5">
          {formSections.map((s, idx) => {
            const active = s.id === section
            const done = idx < safeIndex
            const hasData = (sectionCounts[s.id] || 0) > 0
            const label = SECTION_META[s.id]?.short || s.label
            return (
              <li key={s.id} className="shrink-0">
                <Link
                  to={`/profile/${s.id}`}
                  className="relative group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors duration-150"
                  style={{
                    backgroundColor: active ? 'rgba(196, 30, 58, 0.09)' : 'transparent',
                    color: active ? '#C41E3A' : done ? '#5c4a4e' : '#a3828a',
                    borderBottom: active ? '2px solid #C41E3A' : '2px solid transparent',
                  }}
                  aria-current={active ? 'step' : undefined}
                  title={hasData ? `${label}: con registros` : `${label}: sin datos cargados aún`}
                >
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums"
                    style={{
                      backgroundColor: active ? '#C41E3A' : done ? '#e8d4d8' : '#efe4e6',
                      color: active ? '#fff' : done ? '#8B0000' : '#896169',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span className="hidden sm:inline whitespace-nowrap">{label}</span>
                  {hasData && (
                    <span
                      className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: '#C41E3A' }}
                      aria-hidden
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ol>
      </nav>

      <header className="mb-5">
        <h1 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
          {meta.title}
        </h1>
        <p className="text-ink-muted mt-1 max-w-2xl text-sm leading-relaxed text-pretty">
          {meta.description}
        </p>
      </header>

      <section aria-labelledby="section-content-title" className="min-h-[12rem]">
        <h2 id="section-content-title" className="sr-only">
          Contenido de {meta.title}
        </h2>
        {renderSection()}
      </section>

      <footer
        className="mt-8 pt-5 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3"
        style={{ borderTop: '1px solid #e6dbdd' }}
      >
        {prevSection ? (
          <button
            type="button"
            onClick={() => goTo(prevSection.id)}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-[#f8e9ec]"
            style={{ color: '#C41E3A', border: '1px solid #e6dbdd' }}
          >
            <ChevronLeft size={16} />
            <span className="truncate">
              Anterior: {SECTION_META[prevSection.id]?.short || prevSection.label}
            </span>
          </button>
        ) : (
          <span />
        )}

        {nextSection ? (
          <button
            type="button"
            onClick={() => goTo(nextSection.id)}
            className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm"
          >
            <span className="truncate">
              Siguiente: {SECTION_META[nextSection.id]?.short || nextSection.label}
            </span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setFinished(true)}
            className="btn-primary px-5 py-2.5 text-sm"
          >
            Finalizar recorrido
            <CheckCircle2 size={17} />
          </button>
        )}
      </footer>
    </article>
  )
}

export default ProfileSection
