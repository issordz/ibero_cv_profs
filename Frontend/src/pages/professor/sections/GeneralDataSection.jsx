import { useState } from 'react'
import { Building2, Edit3, Link as LinkIcon } from 'lucide-react'
import ReadOnlyField from '../../../components/ReadOnlyField'
import EditableField from '../../../components/EditableField'

const GeneralDataSection = ({ faculty, onChanges }) => {
  const [formData, setFormData] = useState({
    phone: faculty?.phone || '',
    alternateEmail: faculty?.email?.replace('@ibero.mx', '.personal@gmail.com') || '',
    officeLocation: faculty?.officeLocation || '',
    orcidId: faculty?.orcidId || '',
    linkedIn: faculty?.linkedIn || '',
    officeHours: faculty?.officeHours || '',
    summary: faculty?.summary || ''
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    onChanges()
  }

  return (
    <div className="space-y-6">
      {/* Institutional Information - Read Only */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Building2 className="text-slate-400" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Información Institucional</h2>
          </div>
          <span className="text-xs text-slate-400 uppercase tracking-wider">SOLO LECTURA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ReadOnlyField label="Número de empleado" value={faculty?.employeeId} />
          <ReadOnlyField label="Nombre completo" value={faculty?.name} />
          <ReadOnlyField label="Correo institucional" value={faculty?.email} />
          <ReadOnlyField label="Departamento" value={faculty?.department} />
          <ReadOnlyField label="Rango académico" value={faculty?.role} />
          <ReadOnlyField label="Fecha de ingreso" value="15 Ago, 2010" />
        </div>
      </div>

      {/* Contact & Profile - Editable */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Edit3 className="text-slate-400" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Contacto y Perfil</h2>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full uppercase">EDITABLE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <EditableField
            label="Teléfono personal"
            value={formData.phone}
            onChange={(val) => handleChange('phone', val)}
            placeholder="+52 (555) 000-0000"
          />
          <EditableField
            label="Correo alternativo"
            value={formData.alternateEmail}
            onChange={(val) => handleChange('alternateEmail', val)}
            type="email"
            placeholder="personal@email.com"
          />
          <EditableField
            label="Ubicación de oficina"
            value={formData.officeLocation}
            onChange={(val) => handleChange('officeLocation', val)}
            placeholder="Edificio, Sala #"
          />
          <EditableField
            label="ORCID ID"
            value={formData.orcidId}
            onChange={(val) => handleChange('orcidId', val)}
            placeholder="0000-0000-0000-0000"
          />
          <EditableField
            label="Perfil de LinkedIn"
            value={formData.linkedIn}
            onChange={(val) => handleChange('linkedIn', val)}
            placeholder="linkedin.com/in/username"
          />
          <EditableField
            label="Horario de oficina"
            value={formData.officeHours}
            onChange={(val) => handleChange('officeHours', val)}
            placeholder="Lun y Mié 10:00 - 12:00"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <EditableField
          label="Resumen profesional"
          value={formData.summary}
          onChange={(val) => handleChange('summary', val)}
          rows={4}
          placeholder="Escribe un breve resumen profesional..."
        />
      </div>
    </div>
  )
}

export default GeneralDataSection
