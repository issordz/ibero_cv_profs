import { useState, useEffect } from 'react'
import { Award, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SlideOverPanel from '../../../components/SlideOverPanel'
import SearchableSelect from '../../../components/SearchableSelect'
import { apiPost, apiPut, apiDelete, catalogoPost } from '../../../services/api'
import { fetchCatalog } from '../../../services/catalogService'
import Swal from 'sweetalert2'

const LogrosProfesionalesSection = ({ items, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ descLogro: '', idInstitucion: '', anioObtencion: '' })
  const [saving, setSaving] = useState(false)
  const [instituciones, setInstituciones] = useState([])

  useEffect(() => {
    fetchCatalog('instituciones').then(setInstituciones)
  }, [])

  const handleCreateInstitucion = async (nombre) => {
    try {
      await catalogoPost('institucione', { descripcion: nombre })
      const updatedList = await fetchCatalog('instituciones', true)
      setInstituciones(updatedList)
      const found = updatedList.find(i =>
        (i.nombreInstitucion || '').toLowerCase() === nombre.toLowerCase()
      )
      if (found) {
        setForm(f => ({ ...f, idInstitucion: found.idInstitucion }))
      }
      Swal.fire({ icon: 'success', title: 'Institución creada', text: `"${nombre}" fue agregada al catálogo.`, timer: 1800, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo crear la institución.', confirmButtonColor: '#C41E3A' })
    }
  }

  const openCreate = () => {
    setEditingItem(null)
    setForm({ descLogro: '', idInstitucion: '', anioObtencion: '' })
    setPanelOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setForm({
      descLogro: item.descLogro || '',
      idInstitucion: item.idInstitucion || item.institucion?.id || '',
      anioObtencion: item.anioObtencion || ''
    })
    setPanelOpen(true)
  }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar logro?',
      text: `"${item.descLogro}" será eliminado permanentemente.`,
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!result.isConfirmed) return
    try {
      await apiDelete(`api/LogrosProfesionale/${item.id}`)
      Swal.fire({ icon: 'success', title: 'Logro eliminado', timer: 1500, showConfirmButton: false })
      if (onReload) onReload()
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo eliminar el logro.', confirmButtonColor: '#C41E3A' })
    }
  }

  const handleSave = async () => {
    if (!form.descLogro.trim()) {
      Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'Ingresa la descripción del logro.', confirmButtonColor: '#C41E3A' })
      return
    }
    setSaving(true)
    try {
      if (editingItem) {
        await apiPut(`api/LogrosProfesionale/${editingItem.id}`, {
          cuenta: parseInt(cuenta),
          descLogro: form.descLogro,
          idInstitucion: form.idInstitucion || null,
          anioObtencion: form.anioObtencion ? parseInt(form.anioObtencion) : null
        })
        Swal.fire({ icon: 'success', title: 'Logro actualizado', timer: 1500, showConfirmButton: false })
      } else {
        await apiPost('api/LogrosProfesionale', {
          Cuenta: parseInt(cuenta),
          descLogro: form.descLogro,
          idInstitucion: form.idInstitucion || null,
          anioObtencion: form.anioObtencion ? parseInt(form.anioObtencion) : null
        })
        Swal.fire({ icon: 'success', title: 'Logro creado', timer: 1500, showConfirmButton: false })
      }
      setPanelOpen(false)
      if (onReload) onReload()
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo guardar el logro.', confirmButtonColor: '#C41E3A' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Award className="text-slate-400" size={24} />
          <p className="text-slate-500">Logros y reconocimientos profesionales que no se encuentren dentro del ámbito académico.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar logro
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400 italic">No hay logros profesionales registrados.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <SummaryCard
              key={item.id || idx}
              title={item.descLogro || 'Sin descripción'}
              subtitle={item.institucion?.nombre || ''}
              details={[item.anioObtencion?.toString()].filter(Boolean)}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDelete(item)}
              hasWarning={item.institucion?.id === 0}
            />
          ))}
        </div>
      )}

      <SlideOverPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editingItem ? 'Editar logro profesional' : 'Nuevo logro profesional'}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del logro<span className="text-red-500 ml-0.5">*</span></label>
            <textarea
              value={form.descLogro}
              onChange={(e) => setForm(f => ({ ...f, descLogro: e.target.value }))}
              rows={3}
              placeholder="Describe el logro profesional..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-y"
            />
          </div>

          <SearchableSelect
            items={instituciones}
            idKey="idInstitucion"
            nameKey="nombreInstitucion"
            value={form.idInstitucion}
            onChange={(v) => setForm(f => ({ ...f, idInstitucion: v }))}
            label="Institución"
            placeholder="Buscar o agregar institución..."
            disabled={false}
            onCreateNew={handleCreateInstitucion}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Año de obtención</label>
            <input
              type="number"
              value={form.anioObtencion}
              onChange={(e) => setForm(f => ({ ...f, anioObtencion: e.target.value }))}
              placeholder="Ej: 2023"
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
            {saving ? 'Guardando...' : (editingItem ? 'Actualizar logro' : 'Crear logro')}
          </button>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default LogrosProfesionalesSection
