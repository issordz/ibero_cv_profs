import { useState } from 'react'
import { UserCog, Search, Plus, Eye, Pencil, Trash2, ChevronRight, Shield, GraduationCap } from 'lucide-react'
import { loginUsers, facultyMembers, getFullName } from '../data/users'

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  // Combinar todos los usuarios para gestión
  const allUsers = [
    ...loginUsers.map(u => ({
      id: u.id,
      name: `${u.nombres} ${u.apellidoPaterno}${u.apellidoMaterno ? ' ' + u.apellidoMaterno : ''}`,
      email: u.correo,
      role: u.role,
      puestoInstitucion: u.puestoInstitucion,
      avatar: u.avatar,
      activo: u.activo
    })),
    // Agregar faculty members que no están en loginUsers
    ...facultyMembers
      .filter(f => !loginUsers.find(u => u.facultyId === f.id))
      .map(f => ({
        id: f.id + 100,
        name: getFullName(f),
        email: '',
        role: 'professor',
        puestoInstitucion: f.puestoInstitucion,
        avatar: f.avatar,
        activo: f.activo
      }))
  ]

  const filteredUsers = allUsers
    .filter(u => filterRole === 'all' || u.role === filterRole)
    .filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.puestoInstitucion.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const adminCount = allUsers.filter(u => u.role === 'admin').length
  const professorCount = allUsers.filter(u => u.role === 'professor').length

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Inicio</span>
          <ChevronRight size={14} />
          <span className="text-red-600 font-medium">Gestión de usuarios</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de usuarios</h1>
            <p className="text-gray-500 mt-1">Gestión de usuarios del sistema (profesores y administradores).</p>
          </div>
          <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm">
            <Plus size={18} />
            Agregar Usuario
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Usuarios</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{allUsers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <UserCog className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Administradores</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{adminCount}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Shield className="text-purple-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Profesores</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{professorCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <GraduationCap className="text-green-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Usuarios</h2>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              {[
                { value: 'all', label: 'Todos' },
                { value: 'admin', label: 'Admin' },
                { value: 'professor', label: 'Profesores' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFilterRole(opt.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    filterRole === opt.value 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Usuario</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Rol</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Puesto</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">Estado</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-50 text-purple-600' 
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {user.role === 'admin' ? 'Administrador' : 'Profesor'}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-sm text-gray-600">{user.puestoInstitucion}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${user.activo ? 'text-green-600' : 'text-gray-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.activo ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {user.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors" title="Editar">
                        <Pencil size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <UserCog size={40} className="mx-auto mb-3 opacity-50" />
              <p className="font-medium">No se encontraron usuarios</p>
              <p className="text-sm mt-1">Intenta con otro término de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserManagement
