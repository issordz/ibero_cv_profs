import { useState } from 'react'
import { GraduationCap } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import Swal from 'sweetalert2'

const AcademicDegreesSection = ({ degrees: initialDegrees, onSave }) => {
  const [degrees, setDegrees] = useState(initialDegrees)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingDegree, setEditingDegree] = useState(null)
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    year: '',
    country: ''
  })

  const handleAdd = () => {
    setEditingDegree(null)
    setFormData({ degree: '', institution: '', year: '', country: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (degree) => {
    setEditingDegree(degree)
    setFormData({
      degree: degree.degree,
      institution: degree.institution,
      year: degree.year.toString(),
      country: degree.country
    })
    setIsPanelOpen(true)
  }

  const handleDelete = async (degreeId) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar grado?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: { popup: 'rounded-lg' }
    })

    if (result.isConfirmed) {
      setDegrees(prev => prev.filter(d => d.id !== degreeId))
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        timer: 1500,
        showConfirmButton: false
      })
    }
  }

  const handleSaveForm = () => {
    if (!formData.degree || !formData.institution || !formData.year) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor completa todos los campos obligatorios',
        confirmButtonColor: '#C41E3A'
      })
      return
    }

    if (editingDegree) {
      setDegrees(prev => prev.map(d => 
        d.id === editingDegree.id 
          ? { ...d, ...formData, year: parseInt(formData.year) }
          : d
      ))
    } else {
      const newDegree = {
        id: Date.now(),
        ...formData,
        year: parseInt(formData.year)
      }
      setDegrees(prev => [...prev, newDegree])
    }

    setIsPanelOpen(false)
    Swal.fire({
      icon: 'success',
      title: editingDegree ? 'Actualizado' : 'Agregado',
      timer: 1500,
      showConfirmButton: false
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="text-slate-400" size={24} />
        <p className="text-slate-500">
          Lista todos tus grados académicos, comenzando por el más alto.
        </p>
      </div>

      {/* Degree Cards */}
      <div className="space-y-3">
        {degrees.map((degree) => (
          <SummaryCard
            key={degree.id}
            title={degree.degree}
            subtitle={degree.institution}
            details={[degree.year.toString(), degree.country]}
            onEdit={() => handleEdit(degree)}
            onDelete={() => handleDelete(degree.id)}
          />
        ))}
      </div>

      {/* Add Button */}
      <AddItemButton 
        label="Agregar grado académico" 
        onClick={handleAdd}
      />

      {/* Slide Over Panel */}
      <SlideOverPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={editingDegree ? 'Editar grado' : 'Agregar grado académico'}
      >
        <div className="space-y-4">
          <EditableField
            label="Título del grado *"
            value={formData.degree}
            onChange={(val) => setFormData(prev => ({ ...prev, degree: val }))}
            placeholder="Ej., Doctorado en Ingeniería"
          />
          <EditableField
            label="Institución *"
            value={formData.institution}
            onChange={(val) => setFormData(prev => ({ ...prev, institution: val }))}
            placeholder="Ej., UNAM"
          />
          <EditableField
            label="Año *"
            value={formData.year}
            onChange={(val) => setFormData(prev => ({ ...prev, year: val }))}
            type="number"
            placeholder="Ej., 2020"
          />
          <EditableField
            label="País"
            value={formData.country}
            onChange={(val) => setFormData(prev => ({ ...prev, country: val }))}
            placeholder="Ej., México"
          />

          <div className="pt-4 flex gap-3">
            <button
              onClick={() => setIsPanelOpen(false)}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveForm}
              className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg transition-colors"
            >
              {editingDegree ? 'Actualizar' : 'Agregar'} grado
            </button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default AcademicDegreesSection
