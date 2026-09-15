import { useState } from 'react'
import { Trophy, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SectionEmptyState from '../../../components/SectionEmptyState'
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
      {items.length > 0 && (
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3 min-w-0">
            <Trophy className="text-ink-soft shrink-0" size={22} />
            <p className="text-sm text-ink-muted truncate">
              {items.length} {items.length === 1 ? 'premio registrado' : 'premios registrados'}
            </p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm shrink-0"
          >
            <Plus size={16} />
            Agregar
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <SectionEmptyState
          icon={Trophy}
          title="Sin premios ni distinciones"
          description="Añade premios y reconocimientos con su descripción y año de obtención."
          actionLabel="Agregar premio"
          onAction={openCreate}
        />
      ) : (
        <div className="space-y-3 stagger-children">
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
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Descripción del premio<span className="text-primary ml-0.5">*</span></label>
            <textarea
              value={form.descPremio}
              onChange={(e) => setForm(f => ({ ...f, descPremio: e.target.value }))}
              rows={3}
              placeholder="Describe el premio o distinción y especifica institución otorgante..."
              className="field-input resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Año de obtención</label>
            <input
              type="number"
              value={form.anioObtencion}
              onChange={(e) => setForm(f => ({ ...f, anioObtencion: e.target.value }))}
              placeholder="Ej: 2022"
              min="1950"
              max={new Date().getFullYear()}
              className="field-input"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary w-full py-2.5 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : (editingItem ? 'Actualizar' : 'Crear')}
          </button>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default PremiosDistincionesSection
