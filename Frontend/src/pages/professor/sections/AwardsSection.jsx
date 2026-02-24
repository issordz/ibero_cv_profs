import { useState } from 'react'
import { Trophy } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import Swal from 'sweetalert2'

const PremiosDistincionesSection = ({ items: initialItems, onSave }) => {
  const [items, setItems] = useState(initialItems)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({ descPremio: '', anioObtencion: '' })

  const handleAdd = () => {
    setEditing(null)
    setFormData({ descPremio: '', anioObtencion: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (item) => {
    setEditing(item)
    setFormData({ descPremio: item.descPremio || '', anioObtencion: item.anioObtencion?.toString() || '' })
    setIsPanelOpen(true)
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({ icon: 'warning', title: '¿Eliminar premio?', text: 'Esta acción no se puede deshacer.', showCancelButton: true, confirmButtonColor: '#C41E3A', cancelButtonColor: '#6B7280', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' })
    if (result.isConfirmed) {
      setItems(prev => prev.filter(i => i.id !== id))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.descPremio) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'La descripción del premio es obligatoria', confirmButtonColor: '#C41E3A' })
      return
    }
    const parsed = { ...formData, anioObtencion: parseInt(formData.anioObtencion) || null }
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
        <Trophy className="text-slate-400" size={24} />
        <p className="text-slate-500">Registra tus premios, distinciones y reconocimientos.</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <SummaryCard
            key={item.id}
            title={item.descPremio}
            subtitle={item.anioObtencion?.toString() || ''}
            details={[]}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      <AddItemButton label="Agregar premio o distinción" onClick={handleAdd} />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title={editing ? 'Editar premio' : 'Agregar premio o distinción'}>
        <div className="space-y-4">
          <EditableField label="Descripción del premio / distinción *" value={formData.descPremio} onChange={(val) => setFormData(prev => ({ ...prev, descPremio: val }))} rows={3} placeholder="Descripción completa del premio o distinción" />
          <EditableField label="Año de obtención" value={formData.anioObtencion} onChange={(val) => setFormData(prev => ({ ...prev, anioObtencion: val }))} type="number" placeholder="Ej., 2023" />
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editing ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default PremiosDistincionesSection
