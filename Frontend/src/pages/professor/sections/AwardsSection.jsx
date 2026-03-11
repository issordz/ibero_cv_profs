import { useState } from 'react'
import { Trophy, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SlideOverPanel from '../../../components/SlideOverPanel'
import { apiPost, apiPut, apiDelete } from '../../../services/api'
import Swal from 'sweetalert2'

const PremiosDistincionesSection = ({ items, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ descPremio: '', anioObtencion: '' })
  const [saving, setSaving] = useState(false)

  const openCreate = () => {
    setEditingItem(null)
    setForm({ descPremio: '', anioObtencion: '' })
    setPanelOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setForm({ descPremio: item.descPremio || '', anioObtencion: item.anioObtencion || '' })
    setPanelOpen(true)
  }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar premio?',
      text: `"${item.descPremio}" será eliminado permanentemente.`,
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!result.isConfirmed) return
    try {
      await apiDelete(`api/PremiosDistinciones/${item.id}`)
      Swal.fire({ icon: 'success', title: 'Premio eliminado', timer: 1500, showConfirmButton: false })
      if (onReload) onReload()
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo eliminar.', confirmButtonColor: '#C41E3A' })
    }
  }

  const handleSave = async () => {
    if (!form.descPremio.trim()) {
      Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'Ingresa la descripción del premio.', confirmButtonColor: '#C41E3A' })
      return
    }
    setSaving(true)
    try {
      const body = {
        descPremio: form.descPremio,
        anioObtencion: form.anioObtencion ? parseInt(form.anioObtencion) : null,
        cuenta: parseInt(cuenta)
      }
      if (editingItem) {
        await apiPut(`api/PremiosDistinciones/${editingItem.id}`, body)
        Swal.fire({ icon: 'success', title: 'Premio actualizado', timer: 1500, showConfirmButton: false })
      } else {
        await apiPost('api/PremiosDistinciones', body)
        Swal.fire({ icon: 'success', title: 'Premio creado', timer: 1500, showConfirmButton: false })
      }
      setPanelOpen(false)
      if (onReload) onReload()
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo guardar.', confirmButtonColor: '#C41E3A' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="text-slate-400" size={24} />
          <p className="text-slate-500">Premios, distinciones y reconocimientos.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar premio
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400 italic">No hay premios o distinciones registrados.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <SummaryCard
              key={item.id || idx}
              title={item.descPremio || 'Sin descripción'}
              subtitle={''}
              details={[item.anioObtencion?.toString()].filter(Boolean)}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDelete(item)}
            />
          ))}
        </div>
      )}

      <SlideOverPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editingItem ? 'Editar premio / distinción' : 'Nuevo premio / distinción'}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del premio</label>
            <textarea
              value={form.descPremio}
              onChange={(e) => setForm(f => ({ ...f, descPremio: e.target.value }))}
              rows={3}
              placeholder="Describe el premio o distinción..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Año de obtención</label>
            <input
              type="number"
              value={form.anioObtencion}
              onChange={(e) => setForm(f => ({ ...f, anioObtencion: e.target.value }))}
              placeholder="Ej: 2022"
              min="1950"
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
          >
            {saving ? 'Guardando...' : (editingItem ? 'Actualizar' : 'Crear')}
          </button>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default PremiosDistincionesSection
