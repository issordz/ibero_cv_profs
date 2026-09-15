import { useState, useEffect } from 'react'
import { BookOpen, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SectionEmptyState from '../../../components/SectionEmptyState'
import SlideOverPanel from '../../../components/SlideOverPanel'
import SearchableSelect from '../../../components/SearchableSelect'
import { apiPost, apiPut, apiDelete, catalogoPost } from '../../../services/api'
import { fetchCatalog } from '../../../services/catalogService'
import Swal from 'sweetalert2'

const CapacitacionSection = ({ items, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ nombreCapacitacion: '', idTipoCapacitacion: '', institucionId: '', idTipoCurso: '', pais: '', anioObtencion: '', horas: '' })
  const [saving, setSaving] = useState(false)
  const [instituciones, setInstituciones] = useState([])
  const [tiposCapacitacion, setTiposCapacitacion] = useState([])
  const [tiposCurso, setTiposCurso] = useState([])
  const [paises, setPaises] = useState([])

  useEffect(() => {
    fetchCatalog('instituciones').then(setInstituciones)
    fetchCatalog('tipoCapacitacion').then(setTiposCapacitacion)
    fetchCatalog('tipoCurso').then(setTiposCurso)
    fetchCatalog('paises').then(setPaises)
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
        setForm(f => ({ ...f, institucionId: found.idInstitucion }))
      }
      Swal.fire({ icon: 'success', title: 'Institución creada', text: `"${nombre}" fue agregada al catálogo.`, timer: 1800, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo crear la institución.', confirmButtonColor: '#C41E3A' })
    }
  }

  const handleCreateTipoCapacitacion = async (nombre) => {
    try {
      await catalogoPost('capacitacion', { descTipoCapacitacion: nombre })
      const updatedList = await fetchCatalog('tipoCapacitacion', true)
      setTiposCapacitacion(updatedList)
      const found = updatedList.find(i =>
        (i.descTipoCapacitacion || '').toLowerCase() === nombre.toLowerCase()
      )
      if (found) {
        setForm(f => ({ ...f, idTipoCapacitacion: found.idTipoCapacitacion }))
      }
      Swal.fire({ icon: 'success', title: 'Tipo creado', text: `"${nombre}" fue agregado al catálogo.`, timer: 1800, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo crear el tipo de capacitación.', confirmButtonColor: '#C41E3A' })
    }
  }

  const openCreate = () => {
    setEditingItem(null)
    setForm({ nombreCapacitacion: '', idTipoCapacitacion: '', institucionId: '', idTipoCurso: '', pais: '484', anioObtencion: '', horas: '' })
    setPanelOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setForm({
      nombreCapacitacion: item.nombreCapacitacion || '',
      idTipoCapacitacion: item.capacitacion?.id || item.idTipoCapacitacion || '',
      institucionId: item.idInstitucionEducativa || '',
      idTipoCurso: item.tipoCurso?.id || item.idTipoCurso || '',
      pais: item.pais?.id || '',
      anioObtencion: item.anioObtencion || '',
      horas: item.horas || ''
    })
    setPanelOpen(true)
  }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar capacitación?',
      text: `"${item.nombreCapacitacion}" será eliminado permanentemente.`,
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!result.isConfirmed) return
    try {
      await apiDelete(`api/CapacitacionActualizacion/${item.id}`)
      Swal.fire({ icon: 'success', title: 'Capacitación eliminada', timer: 1500, showConfirmButton: false })
      if (onReload) onReload()
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo eliminar.', confirmButtonColor: '#C41E3A' })
    }
  }

  const handleSave = async () => {
    if (!form.nombreCapacitacion.trim()) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Ingresa el nombre de la capacitación disciplinar.', confirmButtonColor: '#C41E3A' })
      return
    }
    if (!form.idTipoCapacitacion) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Selecciona el tipo de capacitación.', confirmButtonColor: '#C41E3A' })
      return
    }
    if (!form.pais || parseInt(form.pais) === 0) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Selecciona el país.', confirmButtonColor: '#C41E3A' })
      return
    }
    if (!form.idTipoCurso) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Selecciona el tipo de curso.', confirmButtonColor: '#C41E3A' })
      return
    }
    if (!form.anioObtencion) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Ingresa el año de obtención del título.', confirmButtonColor: '#C41E3A' })
      return
    }
    setSaving(true)
    try {
      const body = {
        cuenta: parseInt(cuenta),
        nombreCapacitacion: form.nombreCapacitacion,
        idTipoCapacitacion: form.idTipoCapacitacion ? parseInt(form.idTipoCapacitacion) : null,
        idInstitucionEducativa: form.institucionId ? parseInt(form.institucionId) : null,
        idTipoCurso: form.idTipoCurso ? parseInt(form.idTipoCurso) : null,
        pais: form.pais || null,
        anioObtencion: form.anioObtencion ? parseInt(form.anioObtencion) : null,
        horas: form.horas ? parseInt(form.horas) : null,
        vigencia: null
      }
      if (editingItem) {
        await apiPut(`api/CapacitacionActualizacion/${editingItem.id}`, body)
        Swal.fire({ icon: 'success', title: 'Capacitación actualizada', timer: 1500, showConfirmButton: false })
      } else {
        await apiPost('api/CapacitacionActualizacion', body)
        Swal.fire({ icon: 'success', title: 'Capacitación creada', timer: 1500, showConfirmButton: false })
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
            <BookOpen className="text-ink-soft shrink-0" size={22} />
            <p className="text-sm text-ink-muted truncate">
              {items.length} {items.length === 1 ? 'registro' : 'registros'}
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
          icon={BookOpen}
          title="Sin capacitación ni actualización"
          description={
            <>
              Documenta cursos y actividades de los últimos 5 años.
              <br />
              <strong className="text-ink">Actualización</strong>: conocimientos disciplinarios (ciencias políticas).{' '}
              <strong className="text-ink">Capacitación</strong>: competencias pedagógicas y expresión frente al aula.
            </>
          }
          actionLabel="Agregar registro"
          onAction={openCreate}
        />
      ) : (
        <div className="space-y-3 stagger-children">
          {items.map((item, idx) => (
            <SummaryCard
              key={item.id || idx}
              title={item.nombreCapacitacion || 'Sin nombre'}
              subtitle={[
                item.capacitacion?.nombre || null,
                item.tipoCurso?.nombre || null
              ].filter(Boolean).join(' · ')}
              details={[
                instituciones.find(e => e.idInstitucion?.toString() === item.idInstitucionEducativa?.toString())?.nombreInstitucion || null,
                item.anioObtencion?.toString() || null,
                item.pais?.nombre || null
              ].filter(Boolean)}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDelete(item)}
              hasWarning={item.capacitacion?.id === 0 || item.tipoCurso?.id === 0 || parseInt(item.pais?.id) === 0}
            />
          ))}
        </div>
      )}

      <SlideOverPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editingItem ? 'Editar capacitación / actualización' : 'Nueva capacitación / actualización'}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Nombre<span className="text-primary ml-0.5">*</span></label>
            <input
              type="text"
              value={form.nombreCapacitacion}
              onChange={(e) => setForm(f => ({ ...f, nombreCapacitacion: e.target.value }))}
              placeholder="Ej: Diplomado en Inteligencia Artificial"
              className="field-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Tipo<span className="text-primary ml-0.5">*</span></label>
            <select
              value={form.idTipoCapacitacion}
              onChange={(e) => setForm(f => ({ ...f, idTipoCapacitacion: e.target.value }))}
              className="field-input"
            >
              <option value="">Seleccionar...</option>
              {tiposCapacitacion.filter(t => t.idTipoCapacitacion !== 0).map(t => (
                <option key={t.idTipoCapacitacion} value={t.idTipoCapacitacion}>{t.descTipoCapacitacion}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-ink-muted leading-relaxed">
              <strong className="text-ink">Actualización</strong> se refiere a conocimientos disciplinarios. En campo de ciencias políticas.
              <br />
              <strong className="text-ink">Capacitación</strong> se refiere a competencias pedagógicas. Expresión frente al aula.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Tipo de curso<span className="text-primary ml-0.5">*</span></label>
            <select
              value={form.idTipoCurso}
              onChange={(e) => setForm(f => ({ ...f, idTipoCurso: e.target.value }))}
              className="field-input"
            >
              <option value="">Seleccionar...</option>
              {tiposCurso.filter(t => t.idTipoCurso !== 0).map(t => (
                <option key={t.idTipoCurso} value={t.idTipoCurso}>{t.descTipoCurso}</option>
              ))}
            </select>
          </div>
          <SearchableSelect
            items={instituciones}
            idKey="idInstitucion"
            nameKey="nombreInstitucion"
            value={form.institucionId}
            onChange={(v) => setForm(f => ({ ...f, institucionId: v }))}
            label="Institución"
            placeholder="Buscar o agregar institución..."
            disabled={false}
            onCreateNew={handleCreateInstitucion}
          />
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">País<span className="text-primary ml-0.5">*</span></label>
            <select
              value={form.pais}
              onChange={(e) => setForm(f => ({ ...f, pais: e.target.value }))}
              className={`field-input ${parseInt(form.pais) === 0 ? 'border-amber-400 bg-amber-50' : ''}`}
            >
              <option value="">Seleccionar...</option>
              {paises.map(p => (
                <option key={p.idPais} value={p.idPais}>{p.nombrePais}</option>
              ))}
            </select>
            {parseInt(form.pais) === 0 && (
              <p className="mt-1 text-xs text-amber-600">El país de este registro no está identificado. Selecciona el país correcto.</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Año de obtención<span className="text-primary ml-0.5">*</span></label>
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
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">Horas</label>
              <input
                type="number"
                value={form.horas}
                onChange={(e) => setForm(f => ({ ...f, horas: e.target.value }))}
                placeholder="Ej: 120"
                min="1"
                className="field-input"
              />
            </div>
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

export default CapacitacionSection
