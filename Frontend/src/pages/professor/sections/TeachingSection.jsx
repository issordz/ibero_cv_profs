import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import InstitucionSelect from '../../../components/InstitucionSelect'
import { getInstitucionNombre } from '../../../data/users'
import Swal from 'sweetalert2'

const CapacitacionSection = ({ items: initialItems, onSave }) => {
  const [items, setItems] = useState(initialItems)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    nombreCapacitacion: '', tipoCapacitacion: '', idInstitucion: '', pais: '', anioObtencion: '', horas: '', tipTipoCurso: '', vigencia: ''
  })

  const handleAdd = () => {
    setEditing(null)
    setFormData({ nombreCapacitacion: '', tipoCapacitacion: '', idInstitucion: '', pais: '', anioObtencion: '', horas: '', tipTipoCurso: '', vigencia: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (item) => {
    setEditing(item)
    setFormData({
      nombreCapacitacion: item.nombreCapacitacion || '', tipoCapacitacion: item.tipoCapacitacion || '', idInstitucion: item.idInstitucion || '',
      pais: item.pais || '', anioObtencion: item.anioObtencion?.toString() || '',
      horas: item.horas?.toString() || '', tipTipoCurso: item.tipTipoCurso || '', vigencia: item.vigencia || ''
    })
    setIsPanelOpen(true)
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({ icon: 'warning', title: '¿Eliminar registro?', text: 'Esta acción no se puede deshacer.', showCancelButton: true, confirmButtonColor: '#C41E3A', cancelButtonColor: '#6B7280', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' })
    if (result.isConfirmed) {
      setItems(prev => prev.filter(i => i.id !== id))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.nombreCapacitacion) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'El nombre es obligatorio', confirmButtonColor: '#C41E3A' })
      return
    }
    const parsed = { ...formData, anioObtencion: parseInt(formData.anioObtencion) || null, horas: parseInt(formData.horas) || null, idInstitucion: formData.idInstitucion || null }
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
        <BookOpen className="text-slate-400" size={24} />
        <p className="text-slate-500">Agrega capacitaciones, actualizaciones, diplomados, certificaciones y talleres.</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <SummaryCard
            key={item.id}
            title={item.nombreCapacitacion || item.tipoCapacitacion}
            subtitle={`${item.tipoCapacitacion || ''} — ${getInstitucionNombre(item.idInstitucion)}`}
            details={[item.tipTipoCurso, item.anioObtencion?.toString(), item.pais, item.horas ? `${item.horas} hrs` : null, item.vigencia ? `Vigencia: ${item.vigencia}` : null].filter(Boolean)}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      <AddItemButton label="Agregar capacitación / actualización" onClick={handleAdd} />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title={editing ? 'Editar registro' : 'Agregar capacitación / actualización'}>
        <div className="space-y-4">
          <EditableField label="Nombre *" value={formData.nombreCapacitacion} onChange={(val) => setFormData(prev => ({ ...prev, nombreCapacitacion: val }))} placeholder="Ej., Diplomado en Docencia Universitaria" />
          <EditableField label="Tipo de capacitación" value={formData.tipoCapacitacion} onChange={(val) => setFormData(prev => ({ ...prev, tipoCapacitacion: val }))} placeholder="Ej., Diplomado, Certificación, Taller" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de curso</label>
            <select value={formData.tipTipoCurso} onChange={(e) => setFormData(prev => ({ ...prev, tipTipoCurso: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option value="">Seleccionar...</option>
              <option value="Capacitación">Capacitación</option>
              <option value="Actualización">Actualización</option>
            </select>
          </div>
          <InstitucionSelect value={formData.idInstitucion} onChange={(val) => setFormData(prev => ({ ...prev, idInstitucion: val }))} />
          <EditableField label="País" value={formData.pais} onChange={(val) => setFormData(prev => ({ ...prev, pais: val }))} placeholder="Ej., México" />
          <EditableField label="Año de obtención" value={formData.anioObtencion} onChange={(val) => setFormData(prev => ({ ...prev, anioObtencion: val }))} type="number" placeholder="Ej., 2022" />
          <EditableField label="Horas" value={formData.horas} onChange={(val) => setFormData(prev => ({ ...prev, horas: val }))} type="number" placeholder="Ej., 120" />
          <EditableField label="Vigencia" value={formData.vigencia} onChange={(val) => setFormData(prev => ({ ...prev, vigencia: val }))} placeholder="Ej., Permanente, 2025" />
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editing ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default CapacitacionSection
