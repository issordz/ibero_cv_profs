import { useState, useEffect } from 'react'
import { FileText, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SectionEmptyState from '../../../components/SectionEmptyState'
import SlideOverPanel from '../../../components/SlideOverPanel'
import SearchableSelect from '../../../components/SearchableSelect'
import { apiPost, apiPut, apiDelete } from '../../../services/api'
import { fetchCatalog } from '../../../services/catalogService'
import Swal from 'sweetalert2'

const ProductosAcademicosSection = ({ items, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const parseDesc = (str) => {
    const parts = (str || '').split(';')
    return { tipo: parts[0] || '', titulo: parts[1] || '', publicacion: parts[2] || '', editorial: parts[3] || '' }
  }

  const [form, setForm] = useState({ tipo: '', titulo: '', publicacion: '', editorial: '', anioProducto: '', institucionEducativaId: '' })
  const [saving, setSaving] = useState(false)
  const [educativas, setEducativas] = useState([])

  useEffect(() => {
    fetchCatalog('educativas').then(setEducativas)
  }, [])

  const openCreate = () => {
    setEditingItem(null)
    setForm({ tipo: '', titulo: '', publicacion: '', editorial: '', anioProducto: '', institucionEducativaId: '' })
    setPanelOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    const parsed = parseDesc(item.descripcionProductoAcademico)
    setForm({
      tipo: parsed.tipo,
      titulo: parsed.titulo,
      publicacion: parsed.publicacion,
      editorial: parsed.editorial,
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
    if (!form.tipo) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Selecciona el tipo de producto.', confirmButtonColor: '#C41E3A' })
      return
    }
    if (!form.titulo.trim()) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Ingresa el título del producto académico.', confirmButtonColor: '#C41E3A' })
      return
    }
    setSaving(true)
    try {
      const descripcion = [form.tipo, form.titulo, form.publicacion, form.editorial].join(';')
      const body = {
        descripcionProductoAcademico: descripcion,
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
      {items.length > 0 && (
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="text-ink-soft shrink-0" size={22} />
            <p className="text-sm text-ink-muted truncate">
              {items.length} {items.length === 1 ? 'producto registrado' : 'productos registrados'}
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
          icon={FileText}
          title="Sin productos académicos"
          description="Registra publicaciones, investigaciones y proyectos de los últimos 5 años."
          actionLabel="Agregar producto"
          onAction={openCreate}
        />
      ) : (
        <div className="space-y-3 stagger-children">
          {items.map((item, idx) => (
            <SummaryCard
              key={item.id || idx}
              title={item.descripcionProductoAcademico?.split(';')[1] || item.descripcionProductoAcademico || 'Sin título'}
              subtitle={item.descripcionProductoAcademico?.split(';')[0] || ''}
              details={[item.institucion?.nombre, item.anioProducto?.toString()].filter(Boolean)}
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
        title={editingItem ? 'Editar producto académico' : 'Nuevo producto académico'}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Tipo<span className="text-primary ml-0.5">*</span></label>
            <select
              value={form.tipo}
              onChange={(e) => setForm(f => ({ ...f, tipo: e.target.value }))}
              className="field-input"
            >
              <option value="">Seleccionar...</option>
              <option value="Libro">Libro</option>
              <option value="Capítulo">Capítulo</option>
              <option value="Artículo">Artículo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Título<span className="text-primary ml-0.5">*</span></label>
            <input
              type="text"
              value={form.titulo}
              onChange={(e) => setForm(f => ({ ...f, titulo: e.target.value }))}
              placeholder="Título del libro, capítulo o artículo"
              className="field-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Publicación</label>
            <input
              type="text"
              value={form.publicacion}
              onChange={(e) => setForm(f => ({ ...f, publicacion: e.target.value }))}
              placeholder="Nombre de la revista o publicación académica (si aplica)"
              className="field-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Editorial</label>
            <input
              type="text"
              value={form.editorial}
              onChange={(e) => setForm(f => ({ ...f, editorial: e.target.value }))}
              placeholder="Nombre de la editorial (si aplica)"
              className="field-input"
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
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Año</label>
            <input
              type="number"
              value={form.anioProducto}
              onChange={(e) => setForm(f => ({ ...f, anioProducto: e.target.value }))}
              placeholder="Ej: 2024"
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

export default ProductosAcademicosSection
