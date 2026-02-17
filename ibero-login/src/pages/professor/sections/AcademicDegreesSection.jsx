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
      title: 'Delete Degree?',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      customClass: { popup: 'rounded-lg' }
    })

    if (result.isConfirmed) {
      setDegrees(prev => prev.filter(d => d.id !== degreeId))
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        timer: 1500,
        showConfirmButton: false
      })
    }
  }

  const handleSaveForm = () => {
    if (!formData.degree || !formData.institution || !formData.year) {
      Swal.fire({
        icon: 'warning',
        title: 'Required Fields',
        text: 'Please fill in all required fields',
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
      title: editingDegree ? 'Updated' : 'Added',
      timer: 1500,
      showConfirmButton: false
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="text-slate-400" size={24} />
        <p className="text-slate-500">
          List all your academic degrees, starting with the highest level.
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
        label="Add New Degree" 
        onClick={handleAdd}
      />

      {/* Slide Over Panel */}
      <SlideOverPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={editingDegree ? 'Edit Degree' : 'Add New Degree'}
      >
        <div className="space-y-4">
          <EditableField
            label="Degree Title *"
            value={formData.degree}
            onChange={(val) => setFormData(prev => ({ ...prev, degree: val }))}
            placeholder="e.g., PhD in Engineering"
          />
          <EditableField
            label="Institution *"
            value={formData.institution}
            onChange={(val) => setFormData(prev => ({ ...prev, institution: val }))}
            placeholder="e.g., MIT"
          />
          <EditableField
            label="Year *"
            value={formData.year}
            onChange={(val) => setFormData(prev => ({ ...prev, year: val }))}
            type="number"
            placeholder="e.g., 2020"
          />
          <EditableField
            label="Country"
            value={formData.country}
            onChange={(val) => setFormData(prev => ({ ...prev, country: val }))}
            placeholder="e.g., USA"
          />

          <div className="pt-4 flex gap-3">
            <button
              onClick={() => setIsPanelOpen(false)}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveForm}
              className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg transition-colors"
            >
              {editingDegree ? 'Update' : 'Add'} Degree
            </button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default AcademicDegreesSection
