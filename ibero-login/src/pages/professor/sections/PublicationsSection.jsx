import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import Swal from 'sweetalert2'

const PublicationsSection = ({ publications: initialPubs, onSave }) => {
  const [publications, setPublications] = useState(initialPubs)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingPub, setEditingPub] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    journal: '',
    year: '',
    doi: ''
  })

  const handleAdd = () => {
    setEditingPub(null)
    setFormData({ title: '', journal: '', year: '', doi: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (pub) => {
    setEditingPub(pub)
    setFormData({
      title: pub.title,
      journal: pub.journal,
      year: pub.year.toString(),
      doi: pub.doi
    })
    setIsPanelOpen(true)
  }

  const handleDelete = async (pubId) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar publicación?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      setPublications(prev => prev.filter(p => p.id !== pubId))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.title || !formData.journal || !formData.year) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor completa todos los campos obligatorios',
        confirmButtonColor: '#C41E3A'
      })
      return
    }

    if (editingPub) {
      setPublications(prev => prev.map(p => 
        p.id === editingPub.id ? { ...p, ...formData, year: parseInt(formData.year) } : p
      ))
    } else {
      setPublications(prev => [...prev, { id: Date.now(), ...formData, year: parseInt(formData.year) }])
    }

    setIsPanelOpen(false)
    Swal.fire({ icon: 'success', title: editingPub ? 'Actualizado' : 'Agregado', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-slate-400" size={24} />
        <p className="text-slate-500">Agrega tus artículos publicados, libros y otras publicaciones académicas.</p>
      </div>

      <div className="space-y-3">
        {publications.map((pub) => (
          <SummaryCard
            key={pub.id}
            title={pub.title}
            subtitle={pub.journal}
            details={[pub.year.toString(), pub.doi]}
            onEdit={() => handleEdit(pub)}
            onDelete={() => handleDelete(pub.id)}
          />
        ))}
      </div>

      <AddItemButton label="Agregar publicación" onClick={handleAdd} />

      <SlideOverPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={editingPub ? 'Editar publicación' : 'Agregar publicación'}
      >
        <div className="space-y-4">
          <EditableField label="Título *" value={formData.title} onChange={(val) => setFormData(prev => ({ ...prev, title: val }))} placeholder="Título de la publicación" />
          <EditableField label="Revista/Editorial *" value={formData.journal} onChange={(val) => setFormData(prev => ({ ...prev, journal: val }))} placeholder="Nombre de la revista" />
          <EditableField label="Año *" value={formData.year} onChange={(val) => setFormData(prev => ({ ...prev, year: val }))} type="number" placeholder="2023" />
          <EditableField label="DOI" value={formData.doi} onChange={(val) => setFormData(prev => ({ ...prev, doi: val }))} placeholder="10.1234/ejemplo" />

          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editingPub ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default PublicationsSection
