import { useState, useEffect } from 'react'
import { Briefcase, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SlideOverPanel from '../../../components/SlideOverPanel'
import SearchableSelect from '../../../components/SearchableSelect'
import { apiPost, apiPut, apiDelete } from '../../../services/api'
import { fetchCatalog } from '../../../services/catalogService'
import Swal from 'sweetalert2'

const ExperienciaLaboralSection = ({ items, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ puestoId: '', institucionId: '', experienciaLaboralTipo: '', inicioMesAnio: '', finMesAnio: '', nivelExperiencia: '' })
  const [saving, setSaving] = useState(false)
  const [instituciones, setInstituciones] = useState([])
  const [tiposExperiencia, setTiposExperiencia] = useState([])

  useEffect(() => {
    fetchCatalog('instituciones').then(setInstituciones)
    fetchCatalog('tipoExperiencia').then(setTiposExperiencia)
  }, [])

  const handleDateInput = (rawValue, field) => {
    const digits = rawValue.replace(/\D/g, '').substring(0, 6)
    if (digits.length === 0) { setForm(f => ({ ...f, [field]: '' })); return }
    if (parseInt(digits[0]) > 1) return
    if (digits.length >= 2 && (parseInt(digits.substring(0, 2)) < 1 || parseInt(digits.substring(0, 2)) > 12)) return
    const formatted = digits.length > 2 ? `${digits.substring(0, 2)}/${digits.substring(2)}` : digits
    setForm(f => ({ ...f, [field]: formatted }))
  }

  const openCreate = () => {
    setEditingItem(null)
    setForm({ puestoId: '', institucionId: '', experienciaLaboralTipo: '', inicioMesAnio: '', finMesAnio: '', nivelExperiencia: '' })
    setPanelOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setForm({
      puestoId: item.puestoId || '',
      institucionId: item.institucion?.id || item.institucionId || '',
      experienciaLaboralTipo: item.tipoExperiencia?.id || item.experienciaLaboralTipo || '',
      inicioMesAnio: item.inicioMesAnio || '',
      finMesAnio: item.finMesAnio || '',
      nivelExperiencia: item.nivelExperiencia || ''
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
    if (!form.puestoId.trim()) {
      Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'Ingresa el puesto o actividad.', confirmButtonColor: '#C41E3A' })
      return
    }
    setSaving(true)
    try {
      const body = {
        cuenta: parseInt(cuenta),
        puestoId: form.puestoId,
        actividadPuesto: form.puestoId,
        InstitucionId: form.institucionId ? parseInt(form.institucionId) : null,
        ExperienciaLaboralTipo: form.experienciaLaboralTipo ? parseInt(form.experienciaLaboralTipo) : null,
        inicioMesAnio: form.inicioMesAnio || null,
        finMesAnio: form.finMesAnio || null,
        nivelExperiencia: form.nivelExperiencia || null
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Briefcase className="text-slate-400" size={24} />
          <p className="text-slate-500">Trayectoria profesional y laboral.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar experiencia
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400 italic">No hay experiencia laboral registrada.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <SummaryCard
              key={item.id || idx}
              title={item.puesto?.nombre || item.puestoId || 'Sin puesto'}
              subtitle={item.tipoExperiencia?.nombre || item.nivelExperiencia || ''}
              details={[
                item.institucion?.nombre,
                `${item.inicioMesAnio || '?'} – ${item.finMesAnio || 'Actual'}`,
                item.nivelExperiencia
              ].filter(Boolean)}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDelete(item)}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Puesto / Actividad</label>
            <input
              type="text"
              value={form.puestoId}
              onChange={(e) => setForm(f => ({ ...f, puestoId: e.target.value }))}
              placeholder="Ej: Profesor Investigador"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <SearchableSelect
            items={instituciones}
            idKey="idInstitucion"
            nameKey="nombreInstitucion"
            value={form.institucionId}
            onChange={(v) => setForm(f => ({ ...f, institucionId: v }))}
            label="Institución"
            placeholder="Buscar institución..."
            disabled={instituciones.length === 0}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de experiencia</label>
            <select
              value={form.experienciaLaboralTipo}
              onChange={(e) => setForm(f => ({ ...f, experienciaLaboralTipo: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Seleccionar...</option>
              {tiposExperiencia.map(t => (
                <option key={t.idTipoExperiencia} value={t.idTipoExperiencia}>{t.descTipoExperiencia}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inicio</label>
              <input
                type="text"
                value={form.inicioMesAnio}
                onChange={(e) => handleDateInput(e.target.value, 'inicioMesAnio')}
                placeholder="MM/AAAA"
                maxLength={7}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
              <input
                type="text"
                value={form.finMesAnio}
                onChange={(e) => handleDateInput(e.target.value, 'finMesAnio')}
                placeholder="MM/AAAA"
                maxLength={7}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de experiencia</label>
            <input
              type="text"
              value={form.nivelExperiencia}
              onChange={(e) => setForm(f => ({ ...f, nivelExperiencia: e.target.value }))}
              placeholder="Ej: Senior"
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

export default ExperienciaLaboralSection
