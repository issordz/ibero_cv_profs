import { useState, useEffect } from 'react'
import { GraduationCap, Plus } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import SlideOverPanel from '../../../components/SlideOverPanel'
import SearchableSelect from '../../../components/SearchableSelect'
import { apiPost, apiPut, apiDelete, catalogoPost } from '../../../services/api'
import { fetchCatalog } from '../../../services/catalogService'
import Swal from 'sweetalert2'

const AcademicDegreesSection = ({ degrees, cuenta, onReload }) => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ anioObtencion: '', cedula: '', pais: '484', idInstitucionEducativa: '', idNivelEstudio: '', carreraId: '' })
  const [saving, setSaving] = useState(false)
  const [educativas, setEducativas] = useState([])
  const [carreras, setCarreras] = useState([])
  const [nivelesEstudio, setNivelesEstudio] = useState([])
  const [paises, setPaises] = useState([])

  useEffect(() => {
    fetchCatalog('educativas').then(setEducativas)
    fetchCatalog('carreras').then(setCarreras)
    fetchCatalog('nivelEstudio').then(setNivelesEstudio)
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

  const handleCreateCarrera = async (nombre) => {
    try {
      await catalogoPost('carrera', { descripcion: nombre, nivel: null, idCoordinacion: 1, carrera: nombre, idGrado: null })
      const updatedList = await fetchCatalog('carreras', true)
      setCarreras(updatedList)
      const found = updatedList.find(i =>
        (i.descCarrera || '').toLowerCase() === nombre.toLowerCase()
      )
      if (found) {
        setForm(f => ({ ...f, carreraId: found.idCarrera }))
      }
      Swal.fire({ icon: 'success', title: 'Carrera creada', text: `"${nombre}" fue agregada al catálogo.`, timer: 1800, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo crear la carrera.', confirmButtonColor: '#C41E3A' })
    }
  }

  const openCreate = () => {
    setEditingItem(null)
    setForm({ anioObtencion: '', cedula: '', pais: '484', idInstitucionEducativa: '', idNivelEstudio: '', carreraId: '' })
    setPanelOpen(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setForm({
      anioObtencion: item.anioObtencion || '',
      cedula: item.cedula || '',
      pais: item.pais?.id || item.paisId || '484',
      idInstitucionEducativa: item.institucionEducativa?.id || item.institucionEducativaId || '',
      idNivelEstudio: item.nivelEstudio?.id || item.nivelEstudioId || '',
      carreraId: item.carrera?.id || item.carreraId || ''
    })
    setPanelOpen(true)
  }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar estudio académico?',
      text: `"${item.carrera?.nombre || 'Este estudio'}" será eliminado permanentemente.`,
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
    if (!result.isConfirmed) return
    try {
      await apiDelete(`api/EstudiosAcademico/${item.id}`)
      Swal.fire({ icon: 'success', title: 'Estudio eliminado', timer: 1500, showConfirmButton: false })
      if (onReload) onReload()
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo eliminar.', confirmButtonColor: '#C41E3A' })
    }
  }

  const handleSave = async () => {
    if (!form.idNivelEstudio) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Selecciona el nivel de estudio.', confirmButtonColor: '#C41E3A' })
      return
    }
    if (!form.carreraId) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Selecciona una carrera.', confirmButtonColor: '#C41E3A' })
      return
    }
    if (!form.idInstitucionEducativa) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Selecciona la institución educativa.', confirmButtonColor: '#C41E3A' })
      return
    }
    if (!form.pais || parseInt(form.pais) === 0) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Selecciona el país.', confirmButtonColor: '#C41E3A' })
      return
    }
    if (!form.anioObtencion) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Ingresa el año de obtención del título.', confirmButtonColor: '#C41E3A' })
      return
    }
    setSaving(true)
    try {
      const body = {
        tituloEstudio: 'NA',
        anioObtencion: form.anioObtencion ? parseInt(form.anioObtencion) : null,
        cedula: form.cedula || null,
        pais: form.pais || null,
        idInstitucionEducativa: form.idInstitucionEducativa ? parseInt(form.idInstitucionEducativa) : null,
        idNivelEstudio: form.idNivelEstudio ? parseInt(form.idNivelEstudio) : null,
        carreraId: parseInt(form.carreraId),
        cuenta: parseInt(cuenta)
      }
      if (editingItem) {
        await apiPut(`api/EstudiosAcademico/${editingItem.id}`, body)
        Swal.fire({ icon: 'success', title: 'Estudio actualizado', timer: 1500, showConfirmButton: false })
      } else {
        await apiPost('api/EstudiosAcademico', body)
        Swal.fire({ icon: 'success', title: 'Estudio creado', timer: 1500, showConfirmButton: false })
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
          <GraduationCap className="text-slate-400" size={24} />
          <p className="text-slate-500">Lista de estudios académicos registrados.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Agregar estudio
        </button>
      </div>

      {degrees.length === 0 ? (
        <p className="text-gray-400 italic">No hay estudios académicos registrados.</p>
      ) : (
        <div className="space-y-3">
          {degrees.map((d, idx) => {
            const hasWarning = d.carrera?.id === 0 || d.carrera?.idCarrera === 0
              || d.nivelEstudio?.id === 0
              || d.institucionEducativa?.id === 0
              || parseInt(d.pais?.id) === 0
            return (
              <SummaryCard
                key={d.id || idx}
                title={d.carrera?.nombre || 'Sin carrera'}
                subtitle={d.nivelEstudio?.nombre || ''}
                details={[
                  d.institucionEducativa?.nombre,
                  d.pais?.nombre,
                  d.anioObtencion?.toString(),
                  d.cedula ? `Cédula: ${d.cedula}` : null
                ].filter(Boolean)}
                onEdit={() => openEdit(d)}
                onDelete={() => handleDelete(d)}
                hasWarning={hasWarning}
              />
            )
          })}
        </div>
      )}

      <SlideOverPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editingItem ? 'Editar estudio académico' : 'Nuevo estudio académico'}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de estudio<span className="text-red-500 ml-0.5">*</span></label>
            <select
              value={form.idNivelEstudio}
              onChange={(e) => setForm(f => ({ ...f, idNivelEstudio: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Seleccionar...</option>
              {nivelesEstudio.filter(n => n.idNivelEstudio >= 4).map(n => (
                <option key={n.idNivelEstudio} value={n.idNivelEstudio}>{n.descNivelEstudio}</option>
              ))}
            </select>
          </div>
          <SearchableSelect
            items={carreras}
            idKey="idCarrera"
            nameKey="descCarrera"
            value={form.carreraId}
            onChange={(v) => setForm(f => ({ ...f, carreraId: v }))}
            label="Carrera"
            required
            placeholder="Buscar o agregar carrera..."
            disabled={false}
            onCreateNew={handleCreateCarrera}
          />
          <SearchableSelect
            items={educativas}
            idKey="idInstitucionEducativa"
            nameKey="nombreInstitucion"
            value={form.idInstitucionEducativa}
            onChange={(v) => setForm(f => ({ ...f, idInstitucionEducativa: v }))}
            label="Institución educativa"
            required
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Año de obtención del título<span className="text-red-500 ml-0.5">*</span></label>
              <input
                type="number"
                value={form.anioObtencion}
                onChange={(e) => setForm(f => ({ ...f, anioObtencion: e.target.value }))}
                placeholder="Ej: 2015"
                min="1950"
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cédula profesional</label>
              <input
                type="text"
                value={form.cedula}
                onChange={(e) => setForm(f => ({ ...f, cedula: e.target.value }))}
                placeholder="Ej: 12345678"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
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

export default AcademicDegreesSection
