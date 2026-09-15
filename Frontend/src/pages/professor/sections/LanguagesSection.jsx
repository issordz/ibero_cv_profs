import { useState, useEffect, useMemo } from 'react'
import { Users, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SectionEmptyState from '../../../components/SectionEmptyState'
import SlideOverPanel from '../../../components/SlideOverPanel'
import SearchableSelect from '../../../components/SearchableSelect'
import { apiPost, apiPut, apiDelete } from '../../../services/api'
import { fetchCatalog, addCatalogItem } from '../../../services/catalogService'
import { homologarCatalogoTexto } from '../../../utils/textNormalize'
import {
  organismoEsSnii,
  parseSniiNivel,
  sniiStoredFromValue,
  SNII_NIVELES
} from '../../../config/acreditacionUi'
import Swal from 'sweetalert2'

const OrganismosSection = ({ items, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ organismoId: '', anioInicio: '', anioFin: '', sniiNivel: '' })
  const [saving, setSaving] = useState(false)
  const [organismos, setOrganismos] = useState([])

  useEffect(() => {
    fetchCatalog('organismos').then(setOrganismos)
  }, [])

  const selectedOrganismo = useMemo(
    () => organismos.find((o) => String(o.idOrganismo) === String(form.organismoId)),
    [organismos, form.organismoId]
  )
  const showSnii = organismoEsSnii(selectedOrganismo?.nombreOrganismo)

  const openCreate = () => {
    setEditingItem(null)
    setForm({ organismoId: '', anioInicio: '', anioFin: '', sniiNivel: '' })
    setPanelOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setForm({
      organismoId: item.organismo?.id || item.organismoId || '',
      anioInicio: item.anioInicio || '',
      anioFin: item.anioFin || '',
      sniiNivel: parseSniiNivel(item.nivelExperiencia)
    })
    setPanelOpen(true)
  }

  const handleCreateOrganismo = async (nombre) => {
    try {
      const nombreNorm = homologarCatalogoTexto(nombre)
      await addCatalogItem('organismos', { nombreOrganismo: nombreNorm })
      const updatedList = await fetchCatalog('organismos', true)
      setOrganismos(updatedList)
      const found = updatedList.find(i =>
        homologarCatalogoTexto(i.nombreOrganismo || '') === nombreNorm
      )
      if (found) {
        setForm(f => ({ ...f, organismoId: found.idOrganismo }))
      }
      Swal.fire({ icon: 'success', title: 'Organismo creado', text: `"${nombreNorm}" fue agregado al catálogo.`, timer: 1800, showConfirmButton: false })
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
    if (showSnii && !form.sniiNivel) {
      Swal.fire({
        icon: 'warning',
        title: 'Nivel SNI requerido',
        text: 'Selecciona el nivel SNI (Candidato, 1, 2, 3 o Mérito).',
        confirmButtonColor: '#C41E3A'
      })
      return
    }
    setSaving(true)
    try {
      const body = {
        organismoId: parseInt(form.organismoId),
        anioInicio: parseInt(form.anioInicio),
        anioFin: form.anioFin ? parseInt(form.anioFin) : null,
        nivelExperiencia: showSnii ? sniiStoredFromValue(form.sniiNivel) : null,
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
      {items.length > 0 && (
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3 min-w-0">
            <Users className="text-ink-soft shrink-0" size={22} />
            <p className="text-sm text-ink-muted truncate">
              {items.length} {items.length === 1 ? 'organismo registrado' : 'organismos registrados'}
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
          icon={Users}
          title="Sin organismos"
          description={
            <>
              Registro como miembro SNI.
              <br />
              Participación en Organismos o Gremios, por ejemplo la Asociación Mexicana de Ciencias Políticas (AMECIP).
            </>
          }
          actionLabel="Agregar organismo"
          onAction={openCreate}
        />
      ) : (
        <div className="space-y-3 stagger-children">
          {items.map((item, idx) => (
            <SummaryCard
              key={item.id || idx}
              title={item.organismo?.nombre || 'Sin organismo'}
              subtitle={item.nivelExperiencia || null}
              details={[
                `${item.anioInicio || '?'} – ${item.anioFin || 'Actual'}`,
                item.nivelExperiencia
              ].filter(Boolean)}
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
            onChange={(v) => setForm(f => ({ ...f, organismoId: v, sniiNivel: '' }))}
            label="Organismo"
            required
            placeholder="Buscar o agregar organismo..."
            disabled={false}
            onCreateNew={handleCreateOrganismo}
          />
          {showSnii && (
            <div>
              <label className="block text-sm font-medium text-ink-muted mb-1.5">
                Nivel SNI<span className="text-primary ml-0.5">*</span>
              </label>
              <select
                value={form.sniiNivel}
                onChange={(e) => setForm(f => ({ ...f, sniiNivel: e.target.value }))}
                className="field-input"
              >
                <option value="">Seleccionar...</option>
                {SNII_NIVELES.map((n) => (
                  <option key={n.value} value={n.value}>{n.label}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-400">
                Se guardará como Sni candidato, Sni 1, Sni 2, Sni 3 o Sni mérito.
              </p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Año de inicio<span className="text-primary ml-0.5">*</span></label>
            <input
              type="number"
              value={form.anioInicio}
              onChange={(e) => setForm(f => ({ ...f, anioInicio: e.target.value }))}
              placeholder="Ej: 2018"
              min="1950"
              max={new Date().getFullYear()}
              className="field-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-muted mb-1.5">Año de fin <span className="text-gray-400 font-normal">(dejar vacío si vigente)</span></label>
            <input
              type="number"
              value={form.anioFin}
              onChange={(e) => setForm(f => ({ ...f, anioFin: e.target.value }))}
              placeholder="Ej: 2023"
              min="1950"
              max={new Date().getFullYear() + 10}
              className="field-input"
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

export default OrganismosSection
