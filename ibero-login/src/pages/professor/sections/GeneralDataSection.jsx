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
            <h2 className="text-lg font-semibold text-gray-900">Institutional Information</h2>
          </div>
          <span className="text-xs text-slate-400 uppercase tracking-wider">READ-ONLY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ReadOnlyField label="Employee ID" value={faculty?.employeeId} />
          <ReadOnlyField label="Full Legal Name" value={faculty?.name} />
          <ReadOnlyField label="University Email" value={faculty?.email} />
          <ReadOnlyField label="Department" value={faculty?.department} />
          <ReadOnlyField label="Academic Rank" value={faculty?.role} />
          <ReadOnlyField label="Hire Date" value="Aug 15, 2010" />
        </div>
      </div>

      {/* Contact & Profile - Editable */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Edit3 className="text-slate-400" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Contact & Profile</h2>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full uppercase">EDITABLE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <EditableField
            label="Personal Phone"
            value={formData.phone}
            onChange={(val) => handleChange('phone', val)}
            placeholder="+52 (555) 000-0000"
          />
          <EditableField
            label="Alternate Email"
            value={formData.alternateEmail}
            onChange={(val) => handleChange('alternateEmail', val)}
            type="email"
            placeholder="personal@email.com"
          />
          <EditableField
            label="Office Location"
            value={formData.officeLocation}
            onChange={(val) => handleChange('officeLocation', val)}
            placeholder="Building, Room #"
          />
          <EditableField
            label="ORCID ID"
            value={formData.orcidId}
            onChange={(val) => handleChange('orcidId', val)}
            placeholder="0000-0000-0000-0000"
          />
          <EditableField
            label="LinkedIn Profile"
            value={formData.linkedIn}
            onChange={(val) => handleChange('linkedIn', val)}
            placeholder="linkedin.com/in/username"
          />
          <EditableField
            label="Office Hours"
            value={formData.officeHours}
            onChange={(val) => handleChange('officeHours', val)}
            placeholder="Mon & Wed 10:00 - 12:00"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <EditableField
          label="Professional Summary"
          value={formData.summary}
          onChange={(val) => handleChange('summary', val)}
          rows={4}
          placeholder="Write a brief professional summary..."
        />
      </div>
    </div>
  )
}

export default GeneralDataSection
