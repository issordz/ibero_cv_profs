import { useState } from 'react'
import { FileText } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import CatalogoSelect from '../../../components/InstitucionSelect'
import { getInstitucionEducativaNombre } from '../../../data/users'
import Swal from 'sweetalert2'

const ProductosAcademicosSection = ({ items: initialItems, onSave }) => {
  const [items, setItems] = useState(initialItems)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    descripcionProductoAcademico: '', idInstitucionEducativa: '', anioProducto: ''
  })

  const handleAdd = () => {
    setEditing(null)
    setFormData({ descripcionProductoAcademico: '', idInstitucionEducativa: '', anioProducto: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (item) => {
    setEditing(item)
    setFormData({ descripcionProductoAcademico: item.descripcionProductoAcademico || '', idInstitucionEducativa: item.idInstitucionEducativa || '', anioProducto: item.anioProducto?.toString() || '' })
    setIsPanelOpen(true)
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({ icon: 'warning', title: '¿Eliminar producto?', text: 'Esta acción no se puede deshacer.', showCancelButton: true, confirmButtonColor: '#C41E3A', cancelButtonColor: '#6B7280', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' })
    if (result.isConfirmed) {
      setItems(prev => prev.filter(i => i.id !== id))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.descripcionProductoAcademico) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'La descripción es obligatoria', confirmButtonColor: '#C41E3A' })
      return
    }
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...formData } : i))
    } else {
      setItems(prev => [...prev, { id: Date.now(), ...formData }])
    }
    setIsPanelOpen(false)
    Swal.fire({ icon: 'success', title: editing ? 'Actualizado' : 'Agregado', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-slate-400" size={24} />
        <p className="text-slate-500">Registra tus publicaciones, investigaciones y productos académicos.</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <SummaryCard
            key={item.id}
            title={item.descripcionProductoAcademico?.substring(0, 80) || 'Sin descripción'}
            subtitle={getInstitucionEducativaNombre(item.idInstitucionEducativa)}
            details={[item.anioProducto?.toString()].filter(Boolean)}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      <AddItemButton label="Agregar producto académico" onClick={handleAdd} />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title={editing ? 'Editar producto' : 'Agregar producto académico'}>
        <div className="space-y-4">
          <EditableField label="Descripción del producto académico *" value={formData.descripcionProductoAcademico} onChange={(val) => setFormData(prev => ({ ...prev, descripcionProductoAcademico: val }))} rows={3} placeholder="Descripción completa del producto académico" />
          <CatalogoSelect label="Institución Educativa" value={formData.idInstitucionEducativa} onChange={(val) => setFormData(prev => ({ ...prev, idInstitucionEducativa: val }))} catalog="educativas" placeholder="Seleccionar institución educativa..." />
          <EditableField label="Año del producto" value={formData.anioProducto} onChange={(val) => setFormData(prev => ({ ...prev, anioProducto: val }))} type="number" placeholder="Ej., 2023" />
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editing ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default ProductosAcademicosSection
