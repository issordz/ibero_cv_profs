import { useState } from 'react'
import { Building2, Edit3 } from 'lucide-react'
import ReadOnlyField from '../../../components/ReadOnlyField'
import EditableField from '../../../components/EditableField'
import { getFullName } from '../../../data/users'

const GeneralDataSection = ({ faculty, onChanges }) => {
  const [formData, setFormData] = useState({
    resumenProfesional: faculty?.resumenProfesional || ''
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    onChanges()
  }

  return (
    <div className="space-y-6">
      {/* Datos Generales - Read Only */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Building2 className="text-slate-400" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Datos Generales</h2>
          </div>
          <span className="text-xs text-slate-400 uppercase tracking-wider">SOLO LECTURA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ReadOnlyField label="Número docente" value={faculty?.idProfesor} />
          <ReadOnlyField label="Nombres" value={faculty?.nombres} />
          <ReadOnlyField label="Apellido paterno" value={faculty?.apellidoPaterno} />
          <ReadOnlyField label="Apellido materno" value={faculty?.apellidoMaterno || '—'} />
          <ReadOnlyField label="Fecha de nacimiento" value={faculty?.fechaDeNacimiento} />
          <ReadOnlyField label="Puesto en la institución" value={faculty?.puestoInstitucional} />
          <ReadOnlyField label="Estado" value={faculty?.activo ? 'Activo' : 'Inactivo'} />
        </div>
      </div>

      {/* Resumen Profesional - Editable */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Edit3 className="text-slate-400" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Resumen Profesional</h2>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full uppercase">EDITABLE</span>
        </div>

        <EditableField
          label="Resumen profesional"
          value={formData.resumenProfesional}
          onChange={(val) => handleChange('resumenProfesional', val)}
          rows={4}
          placeholder="Escribe un breve resumen profesional..."
        />
      </div>
    </div>
  )
}

export default GeneralDataSection
