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
      title: 'Delete Course?',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      setCourses(prev => prev.filter(c => c.id !== courseId))
      Swal.fire({ icon: 'success', title: 'Deleted', timer: 1500, showConfirmButton: false })
    }
  }

  const handleSaveForm = () => {
    if (!formData.code || !formData.name) {
      Swal.fire({
        icon: 'warning',
        title: 'Required Fields',
        text: 'Please fill in all required fields',
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
    Swal.fire({ icon: 'success', title: editingCourse ? 'Updated' : 'Added', timer: 1500, showConfirmButton: false })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-slate-400" size={24} />
        <p className="text-slate-500">List the courses you are currently teaching or have taught.</p>
      </div>

      <div className="space-y-3">
        {courses.map((course) => (
          <SummaryCard
            key={course.id}
            title={`${course.code} - ${course.name}`}
            subtitle={course.semester}
            details={[`${course.students} students`]}
            onEdit={() => handleEdit(course)}
            onDelete={() => handleDelete(course.id)}
          />
        ))}
      </div>

      <AddItemButton label="Add New Course" onClick={handleAdd} />

      <SlideOverPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={editingCourse ? 'Edit Course' : 'Add New Course'}
      >
        <div className="space-y-4">
          <EditableField label="Course Code *" value={formData.code} onChange={(val) => setFormData(prev => ({ ...prev, code: val }))} placeholder="e.g., ING-501" />
          <EditableField label="Course Name *" value={formData.name} onChange={(val) => setFormData(prev => ({ ...prev, name: val }))} placeholder="Course title" />
          <EditableField label="Semester" value={formData.semester} onChange={(val) => setFormData(prev => ({ ...prev, semester: val }))} placeholder="e.g., Fall 2023" />
          <EditableField label="Number of Students" value={formData.students} onChange={(val) => setFormData(prev => ({ ...prev, students: val }))} type="number" placeholder="25" />

          <div className="pt-4 flex gap-3">
            <button onClick={() => setIsPanelOpen(false)} className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleSaveForm} className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg">{editingCourse ? 'Update' : 'Add'}</button>
          </div>
        </div>
      </SlideOverPanel>
    </div>
  )
}

export default TeachingSection
