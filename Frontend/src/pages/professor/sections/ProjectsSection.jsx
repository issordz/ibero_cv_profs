import { useState, useEffect } from 'react'
import { Briefcase, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SectionEmptyState from '../../../components/SectionEmptyState'
import SlideOverPanel from '../../../components/SlideOverPanel'
import SearchableSelect from '../../../components/SearchableSelect'
import { apiPost, apiPut, apiDelete, catalogoPost } from '../../../services/api'
import { fetchCatalog } from '../../../services/catalogService'
import { homologarCatalogoTexto } from '../../../utils/textNormalize'
import { SECTOR_OPTIONS } from '../../../config/acreditacionUi'
import Swal from 'sweetalert2'

const ExperienciaLaboralSection = ({ items, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const emptyForm = {
    puestoId: '',
    institucionId: '',
    nivelExperiencia: '',
    aniosExperiencia: ''
  }
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [instituciones, setInstituciones] = useState([])
  const [puestosGenerales, setPuestosGenerales] = useState([])

  useEffect(() => {
    fetchCatalog('instituciones').then(setInstituciones)
    fetchCatalog('puestoGeneral').then(setPuestosGenerales)
  }, [])

  const handleCreatePuesto = async (nombre) => {
    try {
      const nombreNorm = homologarCatalogoTexto(nombre)
      await catalogoPost('puesto-general', { descripcion: nombreNorm })
      const updatedList = await fetchCatalog('puestoGeneral', true)
      setPuestosGenerales(updatedList)
      const found = updatedList.find(i =>
        homologarCatalogoTexto(i.descripcion || '') === nombreNorm
      )
      if (found) {
        setForm(f => ({ ...f, puestoId: found.idPuestoGeneral }))
      }
      Swal.fire({ icon: 'success', title: 'Puesto creado', text: `"${nombreNorm}" fue agregado al catálogo.`, timer: 1800, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo crear el puesto.', confirmButtonColor: '#C41E3A' })
    }
  }

  const handleCreateInstitucion = async (nombre) => {
    try {
      const nombreNorm = homologarCatalogoTexto(nombre)
      await catalogoPost('institucione', { descripcion: nombreNorm })
      const updatedList = await fetchCatalog('instituciones', true)
      setInstituciones(updatedList)
      const found = updatedList.find(i =>
        homologarCatalogoTexto(i.nombreInstitucion || '') === nombreNorm
      )
      if (found) {
        setForm(f => ({ ...f, institucionId: found.idInstitucion }))
      }
      Swal.fire({ icon: 'success', title: 'Institución creada', text: `"${nombreNorm}" fue agregada al catálogo.`, timer: 1800, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo crear la institución.', confirmButtonColor: '#C41E3A' })
    }
  }

  const openCreate = () => {
    setEditingItem(null)
    setForm({ ...emptyForm })
    setPanelOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setForm({
      puestoId: item.puesto?.id || item.puestoId || '',
      institucionId: item.institucion?.id || item.institucionId || '',
      nivelExperiencia: item.nivelExperiencia || '',
      aniosExperiencia:
        item.aniosExperiencia === null || item.aniosExperiencia === undefined
          ? ''
          : item.aniosExperiencia
    })
    setPanelOpen(true)
  }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar experiencia laboral?',
      text: `"${item.puesto?.nombre || item.puestoId || 'Esta experiencia'}" será eliminado permanentemente.`,
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!result.isConfirmed) return
    try {
      await apiDelete(`api/ExperienciaLaboral/${item.id}`)
      Swal.fire({ icon: 'success', title: 'Experiencia eliminada', timer: 1500, showConfirmButton: false })
      if (onReload) onReload()
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo eliminar.', confirmButtonColor: '#C41E3A' })
    }
  }

  const handleSave = async () => {
    if (!form.puestoId) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Selecciona el puesto o actividad.', confirmButtonColor: '#C41E3A' })
      return
    }
    if (!form.institucionId) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Selecciona la institución.', confirmButtonColor: '#C41E3A' })
      return
    }
    const n = Number(form.aniosExperiencia)
    if (form.aniosExperiencia === '' || !Number.isFinite(n) || n < 0 || !Number.isInteger(n)) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Ingresa los años de experiencia (entero mayor o igual a 0).',
        confirmButtonColor: '#C41E3A'
      })
      return
    }
    setSaving(true)
    try {
      const body = {
        cuenta: parseInt(cuenta),
        puestoId: form.puestoId ? parseInt(form.puestoId) : null,
        actividadPuesto: form.puestoId ? parseInt(form.puestoId) : null,
        InstitucionId: form.institucionId ? parseInt(form.institucionId) : null,
        ExperienciaLaboralTipo: 0,
        inicioMesAnio: '',
        finMesAnio: '',
        nivelExperiencia: form.nivelExperiencia || null,
        aniosExperiencia: n
      }
      if (editingItem) {
        await apiPut(`api/ExperienciaLaboral/${editingItem.id}`, body)
        Swal.fire({ icon: 'success', title: 'Experiencia actualizada', timer: 1500, showConfirmButton: false })
      } else {
        await apiPost('api/ExperienciaLaboral', body)
        Swal.fire({ icon: 'success', title: 'Experiencia creada', timer: 1500, showConfirmButton: false })
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
            <Briefcase className="text-ink-soft shrink-0" size={22} />
            <p className="text-sm text-ink-muted truncate">
              {items.length} {items.length === 1 ? 'experiencia registrada' : 'experiencias registradas'}
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
          icon={Briefcase}
          title="Sin experiencia laboral"
          description="Agrega puestos, instituciones, sector y años de experiencia para armar tu trayectoria."
          actionLabel="Agregar experiencia"
          onAction={openCreate}
        />
      ) : (
        <div className="space-y-3 stagger-children">
          {items.map((item, idx) => (
            <SummaryCard
              key={item.id || idx}
              title={item.puesto?.descripcion || item.puesto?.nombre || 'Sin puesto'}
              subtitle={item.nivelExperiencia ? `Sector: ${item.nivelExperiencia}` : ''}
              details={[
                item.institucion?.nombre,
                item.aniosExperiencia != null && item.aniosExperiencia !== ''
                  ? `${item.aniosExperiencia} año(s) de experiencia`
                  : null
              ].filter(Boolean)}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDelete(item)}
              hasWarning={item.puesto?.id === 0 || item.institucion?.id === 0}
            />
          ))}
        </div>
      )}

      <SlideOverPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editingItem ? 'Editar experiencia laboral' : 'Nueva experiencia laboral'}
      >
        <div className="space-y-5">
          <SearchableSelect
            items={puestosGenerales}
            idKey="idPuestoGeneral"
            nameKey="descripcion"
            value={form.puestoId}
            onChange={(v) => setForm(f => ({ ...f, puestoId: v }))}
            label="Puesto / Actividad"
            required
            placeholder="Buscar o agregar puesto..."
            disabled={false}
            onCreateNew={handleCreatePuesto}
          />
          <SearchableSelect
            items={instituciones}
            idKey="idInstitucion"
            nameKey="nombreInstitucion"
            value={form.institucionId}
            onChange={(v) => setForm(f => ({ ...f, institucionId: v }))}
            label="Nombre de empresa o institución"
            required
            placeholder="Buscar o agregar institución..."
            disabled={false}
            onCreateNew={handleCreateInstitucion}
          />
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Sector</label>
            <select
              value={form.nivelExperiencia}
              onChange={(e) => setForm(f => ({ ...f, nivelExperiencia: e.target.value }))}
              className="field-input"
            >
              <option value="">Seleccionar...</option>
              {SECTOR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">
              Años de experiencia<span className="text-primary ml-0.5">*</span>
            </label>
            <input
              type="number"
              min={0}
              step={1}
              inputMode="numeric"
              value={form.aniosExperiencia}
              onChange={(e) => setForm(f => ({ ...f, aniosExperiencia: e.target.value }))}
              placeholder="Ej: 5"
              className="field-input tabular-nums"
            />
          </div>
          <button
            type="button"
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

export default ExperienciaLaboralSection
