import { useState } from 'react'
import { ClipboardList, Search, AlertTriangle, Mail, ChevronRight } from 'lucide-react'
import { facultyMembers, getFullName } from '../data/users'

const ValidacionesPendientes = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Simular profesores con validaciones pendientes (inactivos o filtro de búsqueda)
  const pendingFaculty = facultyMembers
    .filter(f => 
      getFullName(f).toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.puestoInstitucional.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Inicio</span>
          <ChevronRight size={14} />
          <span className="text-red-600 font-medium">Validaciones Pendientes</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Validaciones Pendientes</h1>
        <p className="text-gray-500 mt-1">Profesores que aún no han completado su formulario de currículum.</p>
      </div>

      {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Profesores</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{pendingFaculty.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="text-red-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Activos</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {pendingFaculty.filter(f => f.activo).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
              <ClipboardList className="text-orange-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactivos</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {pendingFaculty.filter(f => !f.activo).length}
              </p>
              <p className="text-xs text-red-500 mt-1">Requieren atención</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="text-yellow-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Listado de Profesores</h2>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, correo o puesto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Profesor</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Puesto</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Últ. Actualización</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Estado</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pendingFaculty.map((faculty) => (
                <tr key={faculty.idProfesor} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${faculty.avatarColor} flex items-center justify-center text-xs font-bold`}>
                        {faculty.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{getFullName(faculty)}</p>
                        <p className="text-xs text-gray-400">{faculty.puestoInstitucional}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-sm text-gray-600">{faculty.puestoInstitucional}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-sm text-gray-600">{faculty.fechaActualizacion}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${faculty.activo ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                      {faculty.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="py-4">
                    <button 
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Enviar recordatorio"
                    >
                      <Mail size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pendingFaculty.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <ClipboardList size={40} className="mx-auto mb-3 opacity-50" />
              <p className="font-medium">No se encontraron resultados</p>
              <p className="text-sm mt-1">Intenta con otro término de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ValidacionesPendientes
