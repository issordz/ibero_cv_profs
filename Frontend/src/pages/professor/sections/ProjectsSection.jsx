import { useState } from 'react'
import { Briefcase } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import Swal from 'sweetalert2'

const ExperienciaLaboralSection = ({ items: initialItems, onSave }) => {
  const [items, setItems] = useState(initialItems)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    actividadPuesto: '', organizacionEmpresa: '', inicioMesAnio: '', finMesAnio: '', tipoExperiencia: '', nivelExperiencia: ''
  })

  const handleAdd = () => {
    setEditing(null)
    setFormData({ actividadPuesto: '', organizacionEmpresa: '', inicioMesAnio: '', finMesAnio: '', tipoExperiencia: '', nivelExperiencia: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (item) => {
    setEditing(item)
    setFormData({
      actividadPuesto: item.actividadPuesto, organizacionEmpresa: item.organizacionEmpresa || '',
      inicioMesAnio: item.inicioMesAnio || '', finMesAnio: item.finMesAnio || '',
      tipoExperiencia: item.tipoExperiencia || '', nivelExperiencia: item.nivelExperiencia || ''
    })
    setIsPanelOpen(true)
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({ icon: 'warning', title: '¿Eliminar experiencia?', text: 'Esta acción no se puede deshacer.', showCancelButton: true, confirmButtonColor: '#C41E3A', cancelButtonColor: '#6B7280', confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar' })
    if (result.isConfirmed) {
      setItems(prev => prev.filter(i => i.id !== id))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.actividadPuesto) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'La actividad/puesto es obligatorio', confirmButtonColor: '#C41E3A' })
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
        <Briefcase className="text-slate-400" size={24} />
        <p className="text-slate-500">Detalla tu trayectoria profesional y laboral.</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <SummaryCard
            key={item.id}
            title={item.actividadPuesto}
            subtitle={item.organizacionEmpresa}
            details={[`${item.inicioMesAnio} - ${item.finMesAnio}`, item.tipoExperiencia, item.nivelExperiencia].filter(Boolean)}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>

      <AddItemButton label="Agregar experiencia laboral" onClick={handleAdd} />

      <SlideOverPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} title={editing ? 'Editar experiencia' : 'Agregar experiencia laboral'}>
        <div className="space-y-4">
          <EditableField label="Actividad / Puesto *" value={formData.actividadPuesto} onChange={(val) => setFormData(prev => ({ ...prev, actividadPuesto: val }))} placeholder="Ej., Profesor de Tiempo Completo" />
          <EditableField label="Organización / Empresa / Escuela" value={formData.organizacionEmpresa} onChange={(val) => setFormData(prev => ({ ...prev, organizacionEmpresa: val }))} placeholder="Ej., Universidad Iberoamericana" />
          <EditableField label="Inicio (mes/año)" value={formData.inicioMesAnio} onChange={(val) => setFormData(prev => ({ ...prev, inicioMesAnio: val }))} placeholder="Ej., Ago 2010" />
          <EditableField label="Fin (mes/año)" value={formData.finMesAnio} onChange={(val) => setFormData(prev => ({ ...prev, finMesAnio: val }))} placeholder="Ej., Actual" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de experiencia</label>
            <select value={formData.tipoExperiencia} onChange={(e) => setFormData(prev => ({ ...prev, tipoExperiencia: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option value="">Seleccionar tipo...</option>
              <option value="Académica">Académica</option>
              <option value="Ingenieril">Ingenieril</option>
              <option value="Profesional">Profesional</option>
              <option value="Investigación">Investigación</option>
              <option value="Administrativa">Administrativa</option>
              <option value="Otra">Otra</option>
            </select>
          </div>
          <EditableField label="Nivel de experiencia" value={formData.nivelExperiencia} onChange={(val) => setFormData(prev => ({ ...prev, nivelExperiencia: val }))} placeholder="Ej., Senior, Intermedio, Junior" />
          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editing ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default ExperienciaLaboralSection
