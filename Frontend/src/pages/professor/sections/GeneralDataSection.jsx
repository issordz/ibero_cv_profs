import { useState, useEffect } from 'react'
import { Building2, Edit3 } from 'lucide-react'
import ReadOnlyField from '../../../components/ReadOnlyField'
import { apiPut } from '../../../services/api'
import Swal from 'sweetalert2'

const toOptionalInt = (value) => {
  if (value === '' || value === null || value === undefined) return null
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0 || !Number.isInteger(n)) return NaN
  return n
}

const GeneralDataSection = ({ faculty, cuenta }) => {
  const [resumen, setResumen] = useState(faculty?.resumenProfesional || '')
  const [aniosDocente, setAniosDocente] = useState(
    faculty?.aniosExperienciaDocente ?? ''
  )
  const [aniosProfesional, setAniosProfesional] = useState(
    faculty?.aniosExperienciaProfesional ?? ''
  )
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setResumen(faculty?.resumenProfesional || '')
    setAniosDocente(
      faculty?.aniosExperienciaDocente === null || faculty?.aniosExperienciaDocente === undefined
        ? ''
        : faculty.aniosExperienciaDocente
    )
    setAniosProfesional(
      faculty?.aniosExperienciaProfesional === null || faculty?.aniosExperienciaProfesional === undefined
        ? ''
        : faculty.aniosExperienciaProfesional
    )
  }, [faculty])

  const handleSaveEditable = async () => {
    const doc = toOptionalInt(aniosDocente)
    const pro = toOptionalInt(aniosProfesional)
    if (Number.isNaN(doc) || Number.isNaN(pro)) {
      Swal.fire({
        icon: 'warning',
        title: 'Años inválidos',
        text: 'Los años de experiencia deben ser enteros mayores o iguales a 0, o dejarse vacíos.',
        confirmButtonColor: '#C41E3A'
      })
      return
    }

    setSaving(true)
    try {
      await apiPut(`api/DatosGenerale/${cuenta}`, {
        resumenProfesional: resumen,
        aniosExperienciaDocente: doc,
        aniosExperienciaProfesional: pro
      })
      Swal.fire({ icon: 'success', title: 'Datos actualizados', timer: 1500, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo guardar.', confirmButtonColor: '#C41E3A' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="surface-card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Building2 className="text-ink-soft" size={20} />
            <h2 className="text-base font-semibold text-ink">Datos Generales</h2>
          </div>
          <span className="text-[11px] font-medium text-ink-soft tracking-wide">Solo lectura</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ReadOnlyField label="Número de cuenta" value={cuenta} />
          <ReadOnlyField label="Nombres" value={faculty?.nombres} />
          <ReadOnlyField label="Apellido paterno" value={faculty?.apellidoPaterno} />
          <ReadOnlyField label="Apellido materno" value={faculty?.apellidoMaterno || '—'} />
          <ReadOnlyField label="Fecha de nacimiento" value={faculty?.fechaDeNacimiento} />
          <ReadOnlyField label="Puesto en la institución" value={faculty?.puestoInstitucional || faculty?.puesto?.nombre || '—'} />
          <ReadOnlyField label="Estado" value={faculty?.activo ? 'Activo' : 'Inactivo'} />
        </div>
      </div>

      <div className="surface-card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Edit3 className="text-ink-soft" size={20} />
            <h2 className="text-base font-semibold text-ink">Experiencia y resumen</h2>
          </div>
          <span
            className="px-2.5 py-1 text-[11px] font-medium rounded-md"
            style={{ backgroundColor: 'rgba(196,30,58,0.08)', color: '#C41E3A' }}
          >
            Editable
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">
              Años de experiencia docente
            </label>
            <input
              type="number"
              min={0}
              step={1}
              inputMode="numeric"
              value={aniosDocente}
              onChange={(e) => setAniosDocente(e.target.value)}
              placeholder="Opcional"
              className="field-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">
              Años de experiencia profesional
            </label>
            <input
              type="number"
              min={0}
              step={1}
              inputMode="numeric"
              value={aniosProfesional}
              onChange={(e) => setAniosProfesional(e.target.value)}
              placeholder="Opcional"
              className="field-input"
            />
          </div>
        </div>

        <label className="block text-sm font-medium text-ink-muted mb-1.5">Resumen profesional</label>
        <textarea
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
          rows={4}
          placeholder="Escribe un resumen ejecutivo de tu trayectoria profesional durante los últimos 5 años..."
          className="field-input resize-y"
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSaveEditable}
            disabled={saving}
            className="btn-primary px-5 py-2.5 text-sm disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GeneralDataSection
