import { useState } from 'react'
import { FileText } from 'lucide-react'
import SummaryCard from '../../../components/SummaryCard'
import AddItemButton from '../../../components/AddItemButton'
import SlideOverPanel from '../../../components/SlideOverPanel'
import EditableField from '../../../components/EditableField'
import Swal from 'sweetalert2'

const TeachingSection = ({ courses: initialCourses, onSave }) => {
  const [courses, setCourses] = useState(initialCourses)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    semester: '',
    students: ''
  })

  const handleAdd = () => {
    setEditingCourse(null)
    setFormData({ code: '', name: '', semester: '', students: '' })
    setIsPanelOpen(true)
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
    setFormData({
      code: course.code,
      name: course.name,
      semester: course.semester,
      students: course.students.toString()
    })
    setIsPanelOpen(true)
  }

  const handleDelete = async (courseId) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar curso?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      setCourses(prev => prev.filter(c => c.id !== courseId))
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.code || !formData.name) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor completa todos los campos obligatorios',
        confirmButtonColor: '#C41E3A'
      })
      return
    }

    if (editingCourse) {
      setCourses(prev => prev.map(c => 
        c.id === editingCourse.id ? { ...c, ...formData, students: parseInt(formData.students) || 0 } : c
      ))
    } else {
      setCourses(prev => [...prev, { id: Date.now(), ...formData, students: parseInt(formData.students) || 0 }])
    }

    setIsPanelOpen(false)
    Swal.fire({ icon: 'success', title: editingCourse ? 'Actualizado' : 'Agregado', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-slate-400" size={24} />
        <p className="text-slate-500">Lista los cursos que impartes actualmente o que has impartido.</p>
      </div>

      <div className="space-y-3">
        {courses.map((course) => (
          <SummaryCard
            key={course.id}
            title={`${course.code} - ${course.name}`}
            subtitle={course.semester}
            details={[`${course.students} estudiantes`]}
            onEdit={() => handleEdit(course)}
            onDelete={() => handleDelete(course.id)}
          />
        ))}
      </div>

      <AddItemButton label="Agregar curso" onClick={handleAdd} />

      <SlideOverPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={editingCourse ? 'Editar curso' : 'Agregar curso'}
      >
        <div className="space-y-4">
          <EditableField label="Código del curso *" value={formData.code} onChange={(val) => setFormData(prev => ({ ...prev, code: val }))} placeholder="Ej., ING-501" />
          <EditableField label="Nombre del curso *" value={formData.name} onChange={(val) => setFormData(prev => ({ ...prev, name: val }))} placeholder="Título del curso" />
          <EditableField label="Semestre" value={formData.semester} onChange={(val) => setFormData(prev => ({ ...prev, semester: val }))} placeholder="Ej., Otoño 2023" />
          <EditableField label="Número de estudiantes" value={formData.students} onChange={(val) => setFormData(prev => ({ ...prev, students: val }))} type="number" placeholder="25" />

          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editingCourse ? 'Actualizar' : 'Agregar'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default TeachingSection
