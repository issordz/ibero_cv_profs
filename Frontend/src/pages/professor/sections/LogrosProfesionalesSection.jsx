import { useState } from 'react'
import { Award } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import InstitucionSelect from '../../../components/InstitucionSelect'
import { getInstitucionNombre } from '../../../data/users'
import Swal from 'sweetalert2'

const LogrosProfesionalesSection = ({ items: initialItems, onSave }) => {
  const [items, setItems] = useState(initialItems)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({ descLogro: '', idInstitucion: '', anioObtencion: '' })

  const handleAdd = () => {
    setEditing(null)
    setFormData({ descLogro: '', idInstitucion: '', anioObtencion: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (item) => {
    setEditing(item)
    setFormData({ descLogro: item.descLogro || '', idInstitucion: item.idInstitucion || '', anioObtencion: item.anioObtencion?.toString() || '' })
    setIsPanelOpen(true)
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({ icon: 'warning', title: '¿Eliminar logro?', text: 'Esta acción no se puede deshacer.', showCancelButton: true, confirmButtonColor: '#C41E3A', cancelButtonColor: '#6B7280', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' })
    if (result.isConfirmed) {
      setItems(prev => prev.filter(i => i.id !== id))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.descLogro) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'La descripción del logro es obligatoria', confirmButtonColor: '#C41E3A' })
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
        <Award className="text-slate-400" size={24} />
        <p className="text-slate-500">Documenta tus logros y reconocimientos profesionales.</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <SummaryCard
            key={item.id}
            title={item.descLogro}
            subtitle={getInstitucionNombre(item.idInstitucion)}
            details={[item.anioObtencion?.toString()].filter(Boolean)}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      <AddItemButton label="Agregar logro profesional" onClick={handleAdd} />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title={editing ? 'Editar logro' : 'Agregar logro profesional'}>
        <div className="space-y-4">
          <EditableField label="Descripción del logro *" value={formData.descLogro} onChange={(val) => setFormData(prev => ({ ...prev, descLogro: val }))} rows={3} placeholder="Descripción completa del logro profesional" />
          <InstitucionSelect value={formData.idInstitucion} onChange={(val) => setFormData(prev => ({ ...prev, idInstitucion: val }))} />
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

export default LogrosProfesionalesSection
