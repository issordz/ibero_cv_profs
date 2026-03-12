import { useState, useEffect } from 'react'
import { Briefcase, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SlideOverPanel from '../../../components/SlideOverPanel'
import SearchableSelect from '../../../components/SearchableSelect'
import { apiPost, apiPut, apiDelete, catalogoPost } from '../../../services/api'
import { fetchCatalog } from '../../../services/catalogService'
import Swal from 'sweetalert2'

const ExperienciaLaboralSection = ({ items, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ puestoId: '', institucionId: '', experienciaLaboralTipo: '', inicioMesAnio: '', finMesAnio: '', nivelExperiencia: '' })
  const [saving, setSaving] = useState(false)
  const [instituciones, setInstituciones] = useState([])
  const [tiposExperiencia, setTiposExperiencia] = useState([])
  const [puestosGenerales, setPuestosGenerales] = useState([])

  useEffect(() => {
    fetchCatalog('instituciones').then(setInstituciones)
    fetchCatalog('tipoExperiencia').then(setTiposExperiencia)
    fetchCatalog('puestoGeneral').then(setPuestosGenerales)
  }, [])

  const handleCreatePuesto = async (nombre) => {
    try {
      await catalogoPost('puesto-general', { descripcion: nombre })
      const updatedList = await fetchCatalog('puestoGeneral', true)
      setPuestosGenerales(updatedList)
      const found = updatedList.find(i =>
        (i.descripcion || '').toLowerCase() === nombre.toLowerCase()
      )
      if (found) {
        setForm(f => ({ ...f, puestoId: found.idPuestoGeneral }))
      }
      Swal.fire({ icon: 'success', title: 'Puesto creado', text: `"${nombre}" fue agregado al catálogo.`, timer: 1800, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo crear el puesto.', confirmButtonColor: '#C41E3A' })
    }
  }

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

  const handleCreateTipoExperiencia = async (nombre) => {
    try {
      await catalogoPost('experiencia-laboral', { descTipoExperiencia: nombre })
      const updatedList = await fetchCatalog('tipoExperiencia', true)
      setTiposExperiencia(updatedList)
      const found = updatedList.find(i =>
        (i.descTipoExperiencia || '').toLowerCase() === nombre.toLowerCase()
      )
      if (found) {
        setForm(f => ({ ...f, experienciaLaboralTipo: found.idTipoExperiencia }))
      }
      Swal.fire({ icon: 'success', title: 'Tipo creado', text: `"${nombre}" fue agregado al catálogo.`, timer: 1800, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo crear el tipo de experiencia.', confirmButtonColor: '#C41E3A' })
    }
  }

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
      puestoId: item.puesto?.id || item.puestoId || '',
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
    if (!form.puestoId) {
      Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'Selecciona el puesto o actividad.', confirmButtonColor: '#C41E3A' })
      return
    }
    setSaving(true)
    try {
      const body = {
        cuenta: parseInt(cuenta),
        puestoId: form.puestoId ? parseInt(form.puestoId) : null,
        actividadPuesto: form.puestoId ? parseInt(form.puestoId) : null,
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
              title={item.puesto?.descripcion || item.puesto?.nombre || 'Sin puesto'}
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
          <SearchableSelect
            items={puestosGenerales}
            idKey="idPuestoGeneral"
            nameKey="descripcion"
            value={form.puestoId}
            onChange={(v) => setForm(f => ({ ...f, puestoId: v }))}
            label="Puesto / Actividad"
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
            label="Institución"
            placeholder="Buscar o agregar institución..."
            disabled={false}
            onCreateNew={handleCreateInstitucion}
          />
          <SearchableSelect
            items={tiposExperiencia}
            idKey="idTipoExperiencia"
            nameKey="descTipoExperiencia"
            value={form.experienciaLaboralTipo}
            onChange={(v) => setForm(f => ({ ...f, experienciaLaboralTipo: v }))}
            label="Tipo de experiencia"
            placeholder="Buscar o agregar tipo de experiencia..."
            disabled={false}
            onCreateNew={handleCreateTipoExperiencia}
          />
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
