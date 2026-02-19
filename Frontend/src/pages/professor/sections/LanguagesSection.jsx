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
      title: '¿Eliminar idioma?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      setLanguagesList(prev => prev.filter(l => l.id !== langId))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.language || !formData.level) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor completa todos los campos obligatorios',
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
    Swal.fire({ icon: 'success', title: editingLang ? 'Actualizado' : 'Agregado', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Languages className="text-slate-400" size={24} />
        <p className="text-slate-500">Lista los idiomas que hablas y tu nivel de dominio.</p>
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

      <AddItemButton label="Agregar idioma" onClick={handleAdd} />

      <SlideOverPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={editingLang ? 'Editar idioma' : 'Agregar idioma'}
      >
        <div className="space-y-4">
          <EditableField label="Idioma *" value={formData.language} onChange={(val) => setFormData(prev => ({ ...prev, language: val }))} placeholder="Ej., Inglés" />
          <EditableField label="Nivel de dominio *" value={formData.level} onChange={(val) => setFormData(prev => ({ ...prev, level: val }))} placeholder="Ej., Fluido (C2)" />

          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editingLang ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default LanguagesSection
