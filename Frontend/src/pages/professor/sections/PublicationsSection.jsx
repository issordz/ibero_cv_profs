import { useState, useEffect } from 'react'
import { FileText, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SlideOverPanel from '../../../components/SlideOverPanel'
import SearchableSelect from '../../../components/SearchableSelect'
import { apiPost, apiPut, apiDelete } from '../../../services/api'
import { fetchCatalog } from '../../../services/catalogService'
import Swal from 'sweetalert2'

const ProductosAcademicosSection = ({ items, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ descripcionProductoAcademico: '', anioProducto: '', institucionEducativaId: '' })
  const [saving, setSaving] = useState(false)
  const [educativas, setEducativas] = useState([])

  useEffect(() => {
    fetchCatalog('educativas').then(setEducativas)
  }, [])

  const openCreate = () => {
    setEditingItem(null)
    setForm({ descripcionProductoAcademico: '', anioProducto: '', institucionEducativaId: '' })
    setPanelOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setForm({
      descripcionProductoAcademico: item.descripcionProductoAcademico || '',
      anioProducto: item.anioProducto || '',
      institucionEducativaId: item.institucion?.id || item.institucionEducativaId || ''
    })
    setPanelOpen(true)
  }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar producto académico?',
      text: 'El registro será eliminado permanentemente.',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!result.isConfirmed) return
    try {
      await apiDelete(`api/ProductosAcademicos/${item.id}`)
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
      if (onReload) onReload()
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo eliminar.', confirmButtonColor: '#C41E3A' })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = {
        descripcionProductoAcademico: form.descripcionProductoAcademico || null,
        anioProducto: form.anioProducto ? parseInt(form.anioProducto) : null,
        institucionEducativaId: form.institucionEducativaId || null,
        cuenta: parseInt(cuenta)
      }
      if (editingItem) {
        await apiPut(`api/ProductosAcademicos/${editingItem.id}`, body)
        Swal.fire({ icon: 'success', title: 'Producto actualizado', timer: 1500, showConfirmButton: false })
      } else {
        await apiPost('api/ProductosAcademicos', body)
        Swal.fire({ icon: 'success', title: 'Producto creado', timer: 1500, showConfirmButton: false })
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
          <FileText className="text-slate-400" size={24} />
          <p className="text-slate-500">Publicaciones, investigaciones y productos académicos.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar producto
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400 italic">No hay productos académicos registrados.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <SummaryCard
              key={item.id || idx}
              title={item.descripcionProductoAcademico?.substring(0, 80) || 'Sin descripción'}
              subtitle={item.institucion?.nombre || ''}
              details={[item.anioProducto?.toString()].filter(Boolean)}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDelete(item)}
            />
          ))}
        </div>
      )}

      <SlideOverPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editingItem ? 'Editar producto académico' : 'Nuevo producto académico'}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              value={form.descripcionProductoAcademico}
              onChange={(e) => setForm(f => ({ ...f, descripcionProductoAcademico: e.target.value }))}
              rows={4}
              placeholder="Describe el producto académico..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
            <input
              type="number"
              value={form.anioProducto}
              onChange={(e) => setForm(f => ({ ...f, anioProducto: e.target.value }))}
              placeholder="Ej: 2024"
              min="1950"
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <SearchableSelect
            items={educativas}
            idKey="idInstitucionEducativa"
            nameKey="nombreInstitucion"
            value={form.institucionEducativaId}
            onChange={(v) => setForm(f => ({ ...f, institucionEducativaId: v }))}
            label="Institución educativa"
            placeholder="Buscar institución..."
            disabled={educativas.length === 0}
          />
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

export default ProductosAcademicosSection
