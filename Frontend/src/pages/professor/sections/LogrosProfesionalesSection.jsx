import { useState, useEffect } from 'react'
import { Award, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SectionEmptyState from '../../../components/SectionEmptyState'
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
      {items.length > 0 && (
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3 min-w-0">
            <Award className="text-ink-soft shrink-0" size={22} />
            <p className="text-sm text-ink-muted truncate">
              {items.length} {items.length === 1 ? 'logro registrado' : 'logros registrados'}
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
          icon={Award}
          title="Sin logros profesionales"
          description="Incluye reconocimientos no académicos de los últimos 5 años (institución y año)."
          actionLabel="Agregar logro"
          onAction={openCreate}
        />
      ) : (
        <div className="space-y-3 stagger-children">
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
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Descripción del logro<span className="text-primary ml-0.5">*</span></label>
            <textarea
              value={form.descLogro}
              onChange={(e) => setForm(f => ({ ...f, descLogro: e.target.value }))}
              rows={3}
              placeholder="Describe el logro profesional..."
              className="field-input resize-y"
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
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Año de obtención del logro</label>
            <input
              type="number"
              value={form.anioObtencion}
              onChange={(e) => setForm(f => ({ ...f, anioObtencion: e.target.value }))}
              placeholder="Ej: 2023"
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
            {saving ? 'Guardando...' : (editingItem ? 'Actualizar logro' : 'Crear logro')}
          </button>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default LogrosProfesionalesSection
