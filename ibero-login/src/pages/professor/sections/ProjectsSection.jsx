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
    status: 'Active'
  })

  const handleAdd = () => {
    setEditingProject(null)
    setFormData({ title: '', role: '', startDate: '', endDate: '', funding: '', status: 'Active' })
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
      title: 'Delete Project?',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      setProjects(prev => prev.filter(p => p.id !== projectId))
      Swal.fire({ icon: 'success', title: 'Deleted', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.title || !formData.role) {
      Swal.fire({
        icon: 'warning',
        title: 'Required Fields',
        text: 'Please fill in all required fields',
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
    Swal.fire({ icon: 'success', title: editingProject ? 'Updated' : 'Added', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="text-slate-400" size={24} />
        <p className="text-slate-500">List your research projects and grants.</p>
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

      <AddItemButton label="Add New Project" onClick={handleAdd} />

      <SlideOverPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
      >
        <div className="space-y-4">
          <EditableField label="Project Title *" value={formData.title} onChange={(val) => setFormData(prev => ({ ...prev, title: val }))} placeholder="Project name" />
          <EditableField label="Your Role *" value={formData.role} onChange={(val) => setFormData(prev => ({ ...prev, role: val }))} placeholder="e.g., Principal Investigator" />
          <EditableField label="Start Date" value={formData.startDate} onChange={(val) => setFormData(prev => ({ ...prev, startDate: val }))} placeholder="YYYY-MM" />
          <EditableField label="End Date" value={formData.endDate} onChange={(val) => setFormData(prev => ({ ...prev, endDate: val }))} placeholder="YYYY-MM" />
          <EditableField label="Funding Amount" value={formData.funding} onChange={(val) => setFormData(prev => ({ ...prev, funding: val }))} placeholder="$100,000 USD" />

          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editingProject ? 'Update' : 'Add'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default ProjectsSection
