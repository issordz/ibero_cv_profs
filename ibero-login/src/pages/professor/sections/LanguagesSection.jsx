import { useState } from 'react'
import { Languages } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import Swal from 'sweetalert2'

const LanguagesSection = ({ languages: initialLanguages, onSave }) => {
  const [languagesList, setLanguagesList] = useState(initialLanguages)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingLang, setEditingLang] = useState(null)
  const [formData, setFormData] = useState({
    language: '',
    level: ''
  })

  const handleAdd = () => {
    setEditingLang(null)
    setFormData({ language: '', level: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (lang) => {
    setEditingLang(lang)
    setFormData({ language: lang.language, level: lang.level })
    setIsPanelOpen(true)
  }

  const handleDelete = async (langId) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete Language?',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      setLanguagesList(prev => prev.filter(l => l.id !== langId))
      Swal.fire({ icon: 'success', title: 'Deleted', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.language || !formData.level) {
      Swal.fire({
        icon: 'warning',
        title: 'Required Fields',
        text: 'Please fill in all required fields',
        confirmButtonColor: '#C41E3A'
      })
      return
    }

    if (editingLang) {
      setLanguagesList(prev => prev.map(l => l.id === editingLang.id ? { ...l, ...formData } : l))
    } else {
      setLanguagesList(prev => [...prev, { id: Date.now(), ...formData }])
    }

    setIsPanelOpen(false)
    Swal.fire({ icon: 'success', title: editingLang ? 'Updated' : 'Added', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Languages className="text-slate-400" size={24} />
        <p className="text-slate-500">List the languages you speak and your proficiency level.</p>
      </div>

      <div className="space-y-3">
        {languagesList.map((lang) => (
          <SummaryCard
            key={lang.id}
            title={lang.language}
            subtitle={lang.level}
            onEdit={() => handleEdit(lang)}
            onDelete={() => handleDelete(lang.id)}
          />
        ))}
      </div>

      <AddItemButton label="Add New Language" onClick={handleAdd} />

      <SlideOverPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={editingLang ? 'Edit Language' : 'Add New Language'}
      >
        <div className="space-y-4">
          <EditableField label="Language *" value={formData.language} onChange={(val) => setFormData(prev => ({ ...prev, language: val }))} placeholder="e.g., English" />
          <EditableField label="Proficiency Level *" value={formData.level} onChange={(val) => setFormData(prev => ({ ...prev, level: val }))} placeholder="e.g., Fluent (C2)" />

          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editingLang ? 'Update' : 'Add'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default LanguagesSection
