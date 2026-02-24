import { useState } from 'react'
import { Users } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import CatalogoSelect from '../../../components/InstitucionSelect'
import { getOrganismoNombre } from '../../../data/users'
import Swal from 'sweetalert2'

const OrganismosSection = ({ items: initialItems, onSave }) => {
  const [items, setItems] = useState(initialItems)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    idOrganismo: '', anioInicio: '', anioFin: '', nivelExperiencia: ''
  })

  const handleAdd = () => {
    setEditing(null)
    setFormData({ idOrganismo: '', anioInicio: '', anioFin: '', nivelExperiencia: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (item) => {
    setEditing(item)
    setFormData({
      idOrganismo: item.idOrganismo || '', anioInicio: item.anioInicio?.toString() || '',
      anioFin: item.anioFin?.toString() || '', nivelExperiencia: item.nivelExperiencia || ''
    })
    setIsPanelOpen(true)
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({ icon: 'warning', title: '¿Eliminar organismo?', text: 'Esta acción no se puede deshacer.', showCancelButton: true, confirmButtonColor: '#C41E3A', cancelButtonColor: '#6B7280', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' })
    if (result.isConfirmed) {
      setItems(prev => prev.filter(i => i.id !== id))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.idOrganismo) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'La institución/organismo es obligatoria', confirmButtonColor: '#C41E3A' })
      return
    }
    const parsed = { ...formData, anioInicio: parseInt(formData.anioInicio) || null, anioFin: formData.anioFin ? parseInt(formData.anioFin) : null }
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
        <Users className="text-slate-400" size={24} />
        <p className="text-slate-500">Membresías y participación en organismos profesionales.</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <SummaryCard
            key={item.id}
            title={getOrganismoNombre(item.idOrganismo)}
            subtitle={item.nivelExperiencia}
            details={[`${item.anioInicio || '?'} - ${item.anioFin || 'Actual'}`]}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      <AddItemButton label="Agregar organismo" onClick={handleAdd} />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title={editing ? 'Editar organismo' : 'Agregar organismo'}>
        <div className="space-y-4">
          <CatalogoSelect value={formData.idOrganismo} onChange={(val) => setFormData(prev => ({ ...prev, idOrganismo: val }))} label="Organismo *" catalog="organismos" placeholder="Seleccionar organismo..." />
          <EditableField label="Año de inicio" value={formData.anioInicio} onChange={(val) => setFormData(prev => ({ ...prev, anioInicio: val }))} type="number" placeholder="Ej., 2015" />
          <EditableField label="Año de fin" value={formData.anioFin} onChange={(val) => setFormData(prev => ({ ...prev, anioFin: val }))} type="number" placeholder="Dejar vacío si es actual" />
          <EditableField label="Nivel de experiencia / Rol" value={formData.nivelExperiencia} onChange={(val) => setFormData(prev => ({ ...prev, nivelExperiencia: val }))} placeholder="Ej., Miembro Titular, Fellow" />
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editing ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default OrganismosSection
