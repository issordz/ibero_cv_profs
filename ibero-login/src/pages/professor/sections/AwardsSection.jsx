import { useState } from 'react'
import { Award } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import Swal from 'sweetalert2'

const AwardsSection = ({ awards: initialAwards, onSave }) => {
  const [awards, setAwards] = useState(initialAwards)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingAward, setEditingAward] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    year: ''
  })

  const handleAdd = () => {
    setEditingAward(null)
    setFormData({ title: '', organization: '', year: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (award) => {
    setEditingAward(award)
    setFormData({
      title: award.title,
      organization: award.organization,
      year: award.year.toString()
    })
    setIsPanelOpen(true)
  }

  const handleDelete = async (awardId) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete Award?',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      setAwards(prev => prev.filter(a => a.id !== awardId))
      Swal.fire({ icon: 'success', title: 'Deleted', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.title || !formData.organization) {
      Swal.fire({
        icon: 'warning',
        title: 'Required Fields',
        text: 'Please fill in all required fields',
        confirmButtonColor: '#C41E3A'
      })
      return
    }

    if (editingAward) {
      setAwards(prev => prev.map(a => 
        a.id === editingAward.id ? { ...a, ...formData, year: parseInt(formData.year) } : a
      ))
    } else {
      setAwards(prev => [...prev, { id: Date.now(), ...formData, year: parseInt(formData.year) }])
    }

    setIsPanelOpen(false)
    Swal.fire({ icon: 'success', title: editingAward ? 'Updated' : 'Added', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Award className="text-slate-400" size={24} />
        <p className="text-slate-500">List your awards, honors, and recognitions.</p>
      </div>

      <div className="space-y-3">
        {awards.map((award) => (
          <SummaryCard
            key={award.id}
            title={award.title}
            subtitle={award.organization}
            details={[award.year.toString()]}
            onEdit={() => handleEdit(award)}
            onDelete={() => handleDelete(award.id)}
          />
        ))}
      </div>

      <AddItemButton label="Add New Award" onClick={handleAdd} />

      <SlideOverPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={editingAward ? 'Edit Award' : 'Add New Award'}
      >
        <div className="space-y-4">
          <EditableField label="Award Title *" value={formData.title} onChange={(val) => setFormData(prev => ({ ...prev, title: val }))} placeholder="Award name" />
          <EditableField label="Granting Organization *" value={formData.organization} onChange={(val) => setFormData(prev => ({ ...prev, organization: val }))} placeholder="Organization name" />
          <EditableField label="Year" value={formData.year} onChange={(val) => setFormData(prev => ({ ...prev, year: val }))} type="number" placeholder="2023" />

          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editingAward ? 'Update' : 'Add'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default AwardsSection
