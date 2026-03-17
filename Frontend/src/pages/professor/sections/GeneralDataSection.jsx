import { useState } from 'react'
import { Building2, Edit3 } from 'lucide-react'
import ReadOnlyField from '../../../components/ReadOnlyField'
import { apiPut } from '../../../services/api'
import Swal from 'sweetalert2'

const GeneralDataSection = ({ faculty, cuenta }) => {
  const [resumen, setResumen] = useState(faculty?.resumenProfesional || '')
  const [saving, setSaving] = useState(false)

  const handleSaveResumen = async () => {
    setSaving(true)
    try {
      await apiPut(`api/DatosGenerale/${cuenta}`, { resumenProfesional: resumen })
      Swal.fire({ icon: 'success', title: 'Resumen actualizado', timer: 1500, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo guardar el resumen profesional.', confirmButtonColor: '#C41E3A' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Building2 className="text-slate-400" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Datos Generales</h2>
          </div>
          <span className="text-xs text-slate-400 uppercase tracking-wider">SOLO LECTURA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ReadOnlyField label="Número de cuenta" value={cuenta} />
          <ReadOnlyField label="Nombres" value={faculty?.nombres} />
          <ReadOnlyField label="Apellido paterno" value={faculty?.apellidoPaterno} />
          <ReadOnlyField label="Apellido materno" value={faculty?.apellidoMaterno || '—'} />
          <ReadOnlyField label="Fecha de nacimiento" value={faculty?.fechaDeNacimiento} />
          <ReadOnlyField label="Puesto en la institución" value={faculty?.puestoInstitucional || '—'} />
          <ReadOnlyField label="Estado" value={faculty?.activo ? 'Activo' : 'Inactivo'} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Edit3 className="text-slate-400" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Resumen Profesional</h2>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full uppercase">EDITABLE</span>
        </div>

        <textarea
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
          rows={4}
          placeholder="Escribe un resumen ejecutivo de tu trayectoria profesional durante los últimos 5 años..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 resize-y"
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSaveResumen}
            disabled={saving}
            className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-lg disabled:opacity-50 transition-colors"
          >
            {saving ? 'Guardando...' : 'Guardar resumen'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GeneralDataSection
