import { useState } from 'react'
import { GraduationCap } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import InstitucionSelect from '../../../components/InstitucionSelect'
import { getInstitucionNombre } from '../../../data/users'
import Swal from 'sweetalert2'

const AcademicDegreesSection = ({ degrees: initialDegrees, onSave }) => {
  const [degrees, setDegrees] = useState(initialDegrees)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingDegree, setEditingDegree] = useState(null)
  const [formData, setFormData] = useState({
    nivelEstudio: '', tituloEstudio: '', idInstitucion: '', pais: '', anioObtencion: '', cedula: ''
  })

  const handleAdd = () => {
    setEditingDegree(null)
    setFormData({ nivelEstudio: '', tituloEstudio: '', idInstitucion: '', pais: '', anioObtencion: '', cedula: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (degree) => {
    setEditingDegree(degree)
    setFormData({
      nivelEstudio: degree.nivelEstudio || '',
      tituloEstudio: degree.tituloEstudio,
      idInstitucion: degree.idInstitucion || '',
      pais: degree.pais || '',
      anioObtencion: degree.anioObtencion?.toString() || '',
      cedula: degree.cedula || ''
    })
    setIsPanelOpen(true)
  }

  const handleDelete = async (degreeId) => {
    const result = await Swal.fire({
      icon: 'warning', title: '¿Eliminar estudio?', text: 'Esta acción no se puede deshacer.',
      showCancelButton: true, confirmButtonColor: '#C41E3A', cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar', customClass: { popup: 'rounded-lg' }
    })
    if (result.isConfirmed) {
      setDegrees(prev => prev.filter(d => d.id !== degreeId))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.tituloEstudio) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'El título del estudio es obligatorio', confirmButtonColor: '#C41E3A' })
      return
    }
    if (editingDegree) {
      setDegrees(prev => prev.map(d => d.id === editingDegree.id ? { ...d, ...formData, anioObtencion: parseInt(formData.anioObtencion) || null } : d))
    } else {
      setDegrees(prev => [...prev, { id: Date.now(), ...formData, anioObtencion: parseInt(formData.anioObtencion) || null }])
    }
    setIsPanelOpen(false)
    Swal.fire({ icon: 'success', title: editingDegree ? 'Actualizado' : 'Agregado', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="text-slate-400" size={24} />
        <p className="text-slate-500">Lista todos tus estudios académicos, comenzando por el más alto.</p>
      </div>

      <div className="space-y-3">
        {degrees.map((d) => (
          <SummaryCard
            key={d.id}
            title={d.tituloEstudio}
            subtitle={`${d.nivelEstudio || ''} — ${getInstitucionNombre(d.idInstitucion)}`}
            details={[d.anioObtencion?.toString(), d.pais, d.cedula ? `Cédula: ${d.cedula}` : null].filter(Boolean)}
            onEdit={() => handleEdit(d)}
            onDelete={() => handleDelete(d.id)}
          />
        ))}
      </div>

      <AddItemButton label="Agregar estudio académico" onClick={handleAdd} />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title={editingDegree ? 'Editar estudio' : 'Agregar estudio académico'}>
        <div className="space-y-4">
          <EditableField label="Nivel de estudio" value={formData.nivelEstudio} onChange={(val) => setFormData(prev => ({ ...prev, nivelEstudio: val }))} placeholder="Ej., Doctorado, Maestría, Licenciatura" />
          <EditableField label="Título del estudio *" value={formData.tituloEstudio} onChange={(val) => setFormData(prev => ({ ...prev, tituloEstudio: val }))} placeholder="Ej., Doctorado en Ingeniería" />
          <InstitucionSelect value={formData.idInstitucion} onChange={(val) => setFormData(prev => ({ ...prev, idInstitucion: val }))} />
          <EditableField label="País" value={formData.pais} onChange={(val) => setFormData(prev => ({ ...prev, pais: val }))} placeholder="Ej., México" />
          <EditableField label="Año de obtención" value={formData.anioObtencion} onChange={(val) => setFormData(prev => ({ ...prev, anioObtencion: val }))} type="number" placeholder="Ej., 2020" />
          <EditableField label="Cédula profesional" value={formData.cedula} onChange={(val) => setFormData(prev => ({ ...prev, cedula: val }))} placeholder="Ej., 12345678" />
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editingDegree ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default AcademicDegreesSection
