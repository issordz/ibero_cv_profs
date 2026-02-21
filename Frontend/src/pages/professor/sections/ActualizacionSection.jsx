import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import Swal from 'sweetalert2'

const ActualizacionSection = ({ items: initialItems, onSave }) => {
  const [items, setItems] = useState(initialItems)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    nombreActualizacion: '', tipoActualizacion: '', institucion: '', pais: '', anio: '', horas: ''
  })

  const handleAdd = () => {
    setEditing(null)
    setFormData({ nombreActualizacion: '', tipoActualizacion: '', institucion: '', pais: '', anio: '', horas: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (item) => {
    setEditing(item)
    setFormData({
      nombreActualizacion: item.nombreActualizacion || '', tipoActualizacion: item.tipoActualizacion || '',
      institucion: item.institucion || '', pais: item.pais || '', anio: item.anio?.toString() || '', horas: item.horas?.toString() || ''
    })
    setIsPanelOpen(true)
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({ icon: 'warning', title: '¿Eliminar actualización?', text: 'Esta acción no se puede deshacer.', showCancelButton: true, confirmButtonColor: '#C41E3A', cancelButtonColor: '#6B7280', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' })
    if (result.isConfirmed) {
      setItems(prev => prev.filter(i => i.id !== id))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.nombreActualizacion) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'El nombre de la actualización es obligatorio', confirmButtonColor: '#C41E3A' })
      return
    }
    const parsed = { ...formData, anio: parseInt(formData.anio) || null, horas: parseInt(formData.horas) || null }
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...parsed } : i))
    } else {
      setItems(prev => [...prev, { id: Date.now(), ...parsed }])
    }
    setIsPanelOpen(false)
    Swal.fire({ icon: 'success', title: editing ? 'Actualizado' : 'Agregado', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <RefreshCw className="text-slate-400" size={24} />
        <p className="text-slate-500">Registra tus cursos de actualización profesional.</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <SummaryCard
            key={item.id}
            title={item.nombreActualizacion}
            subtitle={`${item.tipoActualizacion || ''} — ${item.institucion || ''}`}
            details={[item.anio?.toString(), item.pais, item.horas ? `${item.horas} hrs` : null].filter(Boolean)}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      <AddItemButton label="Agregar actualización" onClick={handleAdd} />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title={editing ? 'Editar actualización' : 'Agregar actualización'}>
        <div className="space-y-4">
          <EditableField label="Nombre de la actualización *" value={formData.nombreActualizacion} onChange={(val) => setFormData(prev => ({ ...prev, nombreActualizacion: val }))} placeholder="Ej., Seminario de Nuevas Tecnologías" />
          <EditableField label="Tipo de actualización" value={formData.tipoActualizacion} onChange={(val) => setFormData(prev => ({ ...prev, tipoActualizacion: val }))} placeholder="Ej., Seminario, Curso, Taller, Certificación" />
          <EditableField label="Institución" value={formData.institucion} onChange={(val) => setFormData(prev => ({ ...prev, institucion: val }))} placeholder="Ej., Colegio de Ingenieros" />
          <EditableField label="País" value={formData.pais} onChange={(val) => setFormData(prev => ({ ...prev, pais: val }))} placeholder="Ej., México" />
          <EditableField label="Año" value={formData.anio} onChange={(val) => setFormData(prev => ({ ...prev, anio: val }))} type="number" placeholder="Ej., 2023" />
          <EditableField label="Horas" value={formData.horas} onChange={(val) => setFormData(prev => ({ ...prev, horas: val }))} type="number" placeholder="Ej., 40" />
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editing ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default ActualizacionSection
