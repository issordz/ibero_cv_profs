import { useState } from 'react'
import { Briefcase } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import Swal from 'sweetalert2'

const ProjectsSection = ({ projects: initialProjects, onSave }) => {
  const [projects, setProjects] = useState(initialProjects)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    startDate: '',
    endDate: '',
    funding: '',
    status: 'Activo'
  })

  const handleAdd = () => {
    setEditingProject(null)
    setFormData({ title: '', role: '', startDate: '', endDate: '', funding: '', status: 'Activo' })
    setIsPanelOpen(true)
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({ ...project })
    setIsPanelOpen(true)
  }

  const handleDelete = async (projectId) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar proyecto?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      setProjects(prev => prev.filter(p => p.id !== projectId))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.title || !formData.role) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor completa todos los campos obligatorios',
        confirmButtonColor: '#C41E3A'
      })
      return
    }

    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...formData } : p))
    } else {
      setProjects(prev => [...prev, { id: Date.now(), ...formData }])
    }

    setIsPanelOpen(false)
    Swal.fire({ icon: 'success', title: editingProject ? 'Actualizado' : 'Agregado', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="text-slate-400" size={24} />
        <p className="text-slate-500">Lista tus proyectos de investigación y financiamientos.</p>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <SummaryCard
            key={project.id}
            title={project.title}
            subtitle={`${project.role} • ${project.funding}`}
            details={[`${project.startDate} - ${project.endDate}`, project.status]}
            onEdit={() => handleEdit(project)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>

      <AddItemButton label="Agregar proyecto" onClick={handleAdd} />

      <SlideOverPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={editingProject ? 'Editar proyecto' : 'Agregar proyecto'}
      >
        <div className="space-y-4">
          <EditableField label="Título del proyecto *" value={formData.title} onChange={(val) => setFormData(prev => ({ ...prev, title: val }))} placeholder="Nombre del proyecto" />
          <EditableField label="Tu rol *" value={formData.role} onChange={(val) => setFormData(prev => ({ ...prev, role: val }))} placeholder="Ej., Investigador Principal" />
          <EditableField label="Fecha de inicio" value={formData.startDate} onChange={(val) => setFormData(prev => ({ ...prev, startDate: val }))} placeholder="AAAA-MM" />
          <EditableField label="Fecha de fin" value={formData.endDate} onChange={(val) => setFormData(prev => ({ ...prev, endDate: val }))} placeholder="AAAA-MM" />
          <EditableField label="Monto de financiamiento" value={formData.funding} onChange={(val) => setFormData(prev => ({ ...prev, funding: val }))} placeholder="$100,000 USD" />

          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editingProject ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default ProjectsSection
