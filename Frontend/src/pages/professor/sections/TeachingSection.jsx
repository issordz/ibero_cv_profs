import { useState, useEffect } from 'react'
import { BookOpen, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SlideOverPanel from '../../../components/SlideOverPanel'
import SearchableSelect from '../../../components/SearchableSelect'
import { apiPost, apiPut, apiDelete, catalogoPost } from '../../../services/api'
import { fetchCatalog } from '../../../services/catalogService'
import Swal from 'sweetalert2'

const CapacitacionSection = ({ items, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ nombreCapacitacion: '', idTipoCapacitacion: '', idInstitucionEducativa: '', idTipoCurso: '', pais: '', anioObtencion: '', horas: '', vigencia: '' })
  const [saving, setSaving] = useState(false)
  const [educativas, setEducativas] = useState([])
  const [tiposCapacitacion, setTiposCapacitacion] = useState([])
  const [tiposCurso, setTiposCurso] = useState([])
  const [paises, setPaises] = useState([])

  useEffect(() => {
    fetchCatalog('educativas').then(setEducativas)
    fetchCatalog('tipoCapacitacion').then(setTiposCapacitacion)
    fetchCatalog('tipoCurso').then(setTiposCurso)
    fetchCatalog('paises').then(setPaises)
  }, [])

  const handleCreateInstitucionEducativa = async (nombre) => {
    try {
      await catalogoPost('institucion-educativa', { nombreInstitucion: nombre })
      const updatedList = await fetchCatalog('educativas', true)
      setEducativas(updatedList)
      const found = updatedList.find(i =>
        (i.nombreInstitucion || '').toLowerCase() === nombre.toLowerCase()
      )
      if (found) {
        setForm(f => ({ ...f, idInstitucionEducativa: found.idInstitucionEducativa }))
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
    setForm({ nombreCapacitacion: '', idTipoCapacitacion: '', idInstitucionEducativa: '', idTipoCurso: '', pais: '484', anioObtencion: '', horas: '', vigencia: '' })
    setPanelOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setForm({
      nombreCapacitacion: item.nombreCapacitacion || '',
      idTipoCapacitacion: item.capacitacion?.id || item.idTipoCapacitacion || '',
      idInstitucionEducativa: item.idInstitucionEducativa || '',
      idTipoCurso: item.tipoCurso?.id || item.idTipoCurso || '',
      pais: item.pais?.id || '',
      anioObtencion: item.anioObtencion || '',
      horas: item.horas || '',
      vigencia: item.vigencia ? item.vigencia.substring(0, 10) : ''
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
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Ingresa el nombre de la capacitación.', confirmButtonColor: '#C41E3A' })
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
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Ingresa el año de obtención.', confirmButtonColor: '#C41E3A' })
      return
    }
    setSaving(true)
    try {
      const body = {
        cuenta: parseInt(cuenta),
        nombreCapacitacion: form.nombreCapacitacion,
        idTipoCapacitacion: form.idTipoCapacitacion ? parseInt(form.idTipoCapacitacion) : null,
        idInstitucionEducativa: form.idInstitucionEducativa ? parseInt(form.idInstitucionEducativa) : null,
        idTipoCurso: form.idTipoCurso ? parseInt(form.idTipoCurso) : null,
        pais: form.pais || null,
        anioObtencion: form.anioObtencion ? parseInt(form.anioObtencion) : null,
        horas: form.horas ? parseInt(form.horas) : null,
        vigencia: form.vigencia || null
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="text-slate-400" size={24} />
          <p className="text-slate-500">Capacitaciones, actualizaciones, diplomados, certificaciones y talleres.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar capacitación
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400 italic">No hay capacitaciones registradas.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <SummaryCard
              key={item.id || idx}
              title={item.nombreCapacitacion || 'Sin nombre'}
              subtitle={[
                item.capacitacion?.nombre || null,
                item.tipoCurso?.nombre || null
              ].filter(Boolean).join(' · ')}
              details={[
                educativas.find(e => e.idInstitucionEducativa === item.idInstitucionEducativa)?.nombreInstitucion || null,
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
        title={editingItem ? 'Editar capacitación' : 'Nueva capacitación'}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la capacitación<span className="text-red-500 ml-0.5">*</span></label>
            <input
              type="text"
              value={form.nombreCapacitacion}
              onChange={(e) => setForm(f => ({ ...f, nombreCapacitacion: e.target.value }))}
              placeholder="Ej: Diplomado en Inteligencia Artificial"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de capacitación<span className="text-red-500 ml-0.5">*</span></label>
            <select
              value={form.idTipoCapacitacion}
              onChange={(e) => setForm(f => ({ ...f, idTipoCapacitacion: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Seleccionar...</option>
              {tiposCapacitacion.filter(t => t.idTipoCapacitacion !== 0).map(t => (
                <option key={t.idTipoCapacitacion} value={t.idTipoCapacitacion}>{t.descTipoCapacitacion}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de curso<span className="text-red-500 ml-0.5">*</span></label>
            <select
              value={form.idTipoCurso}
              onChange={(e) => setForm(f => ({ ...f, idTipoCurso: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Seleccionar...</option>
              {tiposCurso.filter(t => t.idTipoCurso !== 0).map(t => (
                <option key={t.idTipoCurso} value={t.idTipoCurso}>{t.descTipoCurso}</option>
              ))}
            </select>
          </div>
          <SearchableSelect
            items={educativas}
            idKey="idInstitucionEducativa"
            nameKey="nombreInstitucion"
            value={form.idInstitucionEducativa}
            onChange={(v) => setForm(f => ({ ...f, idInstitucionEducativa: v }))}
            label="Institución educativa"
            placeholder="Buscar o agregar institución..."
            disabled={false}
            onCreateNew={handleCreateInstitucionEducativa}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">País<span className="text-red-500 ml-0.5">*</span></label>
            <select
              value={form.pais}
              onChange={(e) => setForm(f => ({ ...f, pais: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 ${parseInt(form.pais) === 0 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Año de obtención<span className="text-red-500 ml-0.5">*</span></label>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horas</label>
              <input
                type="number"
                value={form.horas}
                onChange={(e) => setForm(f => ({ ...f, horas: e.target.value }))}
                placeholder="Ej: 120"
                min="1"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de vigencia</label>
            <input
              type="date"
              value={form.vigencia}
              onChange={(e) => setForm(f => ({ ...f, vigencia: e.target.value }))}
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

export default CapacitacionSection
