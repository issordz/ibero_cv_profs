import { useState, useEffect } from 'react'
import { Users, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SlideOverPanel from '../../../components/SlideOverPanel'
import SearchableSelect from '../../../components/SearchableSelect'
import { apiPost, apiPut, apiDelete } from '../../../services/api'
import { fetchCatalog, addCatalogItem } from '../../../services/catalogService'
import Swal from 'sweetalert2'

const OrganismosSection = ({ items, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ organismoId: '', anioInicio: '', anioFin: '' })
  const [saving, setSaving] = useState(false)
  const [organismos, setOrganismos] = useState([])

  useEffect(() => {
    fetchCatalog('organismos').then(setOrganismos)
  }, [])

  const openCreate = () => {
    setEditingItem(null)
    setForm({ organismoId: '', anioInicio: '', anioFin: '' })
    setPanelOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setForm({
      organismoId: item.organismo?.id || item.organismoId || '',
      anioInicio: item.anioInicio || '',
      anioFin: item.anioFin || ''
    })
    setPanelOpen(true)
  }

  const handleCreateOrganismo = async (nombre) => {
    try {
      await addCatalogItem('organismos', { nombreOrganismo: nombre })
      const updatedList = await fetchCatalog('organismos', true)
      setOrganismos(updatedList)
      const found = updatedList.find(i =>
        (i.nombreOrganismo || '').toLowerCase() === nombre.toLowerCase()
      )
      if (found) {
        setForm(f => ({ ...f, organismoId: found.idOrganismo }))
      }
      Swal.fire({ icon: 'success', title: 'Organismo creado', text: `"${nombre}" fue agregado al catálogo.`, timer: 1800, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo crear el organismo.', confirmButtonColor: '#C41E3A' })
    }
  }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar organismo?',
      text: `"${item.organismo?.nombre || 'Este registro'}" será eliminado permanentemente.`,
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!result.isConfirmed) return
    try {
      await apiDelete(`api/Organismo/${item.id}`)
      Swal.fire({ icon: 'success', title: 'Organismo eliminado', timer: 1500, showConfirmButton: false })
      if (onReload) onReload()
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo eliminar.', confirmButtonColor: '#C41E3A' })
    }
  }

  const handleSave = async () => {
    if (!form.organismoId || !form.anioInicio) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Selecciona un organismo e ingresa el año de inicio.', confirmButtonColor: '#C41E3A' })
      return
    }
    setSaving(true)
    try {
      const body = {
        organismoId: parseInt(form.organismoId),
        anioInicio: parseInt(form.anioInicio),
        anioFin: form.anioFin ? parseInt(form.anioFin) : null,
        nivelExperiencia: null,
        cuenta: parseInt(cuenta)
      }
      if (editingItem) {
        await apiPut(`api/Organismo/${editingItem.id}`, body)
        Swal.fire({ icon: 'success', title: 'Organismo actualizado', timer: 1500, showConfirmButton: false })
      } else {
        await apiPost('api/Organismo', body)
        Swal.fire({ icon: 'success', title: 'Organismo creado', timer: 1500, showConfirmButton: false })
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
          <Users className="text-slate-400" size={24} />
          <p className="text-slate-500">Membresías y participación en organismos profesionales.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar organismo
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400 italic">No hay organismos registrados.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <SummaryCard
              key={item.id || idx}
              title={item.organismo?.nombre || 'Sin organismo'}
              subtitle={null}
              details={[`${item.anioInicio || '?'} – ${item.anioFin || 'Actual'}`]}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDelete(item)}
              hasWarning={item.organismo?.id === 0}
            />
          ))}
        </div>
      )}

      <SlideOverPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editingItem ? 'Editar organismo' : 'Nuevo organismo'}
      >
        <div className="space-y-5">
          <SearchableSelect
            items={organismos}
            idKey="idOrganismo"
            nameKey="nombreOrganismo"
            value={form.organismoId}
            onChange={(v) => setForm(f => ({ ...f, organismoId: v }))}
            label="Organismo"
            required
            placeholder="Buscar o agregar organismo..."
            disabled={false}
            onCreateNew={handleCreateOrganismo}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Año de inicio<span className="text-red-500 ml-0.5">*</span></label>
            <input
              type="number"
              value={form.anioInicio}
              onChange={(e) => setForm(f => ({ ...f, anioInicio: e.target.value }))}
              placeholder="Ej: 2018"
              min="1950"
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Año de fin <span className="text-gray-400 font-normal">(dejar vacío si vigente)</span></label>
            <input
              type="number"
              value={form.anioFin}
              onChange={(e) => setForm(f => ({ ...f, anioFin: e.target.value }))}
              placeholder="Ej: 2023"
              min="1950"
              max={new Date().getFullYear() + 10}
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

export default OrganismosSection
