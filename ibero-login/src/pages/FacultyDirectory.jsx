import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, Plus, Eye, Edit, TrendingUp, UserCheck, Clock, CheckCircle,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import { facultyMembers, departments, statuses } from '../data/users'
import Swal from 'sweetalert2'

const FacultyDirectory = () => {
  const navigate = useNavigate()
  const [filterText, setFilterText] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [selectedStatus, setSelectedStatus] = useState('All Statuses')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredData = useMemo(() => {
    return facultyMembers.filter((item) => {
      const matchesText = 
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(filterText.toLowerCase()) ||
        item.department.toLowerCase().includes(filterText.toLowerCase())
      
      const matchesDepartment = 
        selectedDepartment === 'All Departments' || 
        item.department === selectedDepartment

      let matchesStatus = true
      if (selectedStatus === 'Complete (100%)') {
        matchesStatus = item.profileProgress === 100
      } else if (selectedStatus === 'In Progress (50-99%)') {
        matchesStatus = item.profileProgress >= 50 && item.profileProgress < 100
      } else if (selectedStatus === 'Incomplete (<50%)') {
        matchesStatus = item.profileProgress < 50
      }

      return matchesText && matchesDepartment && matchesStatus
    })
  }, [filterText, selectedDepartment, selectedStatus])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleViewProfile = (row) => {
    navigate(`/faculty/${row.id}`)
  }

  const handleAddFaculty = () => {
    Swal.fire({
      icon: 'info',
      title: 'Agregar Docente',
      text: 'Esta funcionalidad estará disponible próximamente',
      confirmButtonColor: '#c40e2f',
      customClass: {
        popup: 'rounded-xl'
      }
    })
  }

  const getStatusBadge = (progress) => {
    if (progress === 100) {
      return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Active</span>
    } else if (progress >= 50) {
      return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">Pending Review</span>
    } else {
      return <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">On Leave</span>
    }
  }

  const getProgressColorHex = (progress) => {
    if (progress === 100) return '#22c55e'
    if (progress >= 75) return '#c40e2f'
    if (progress >= 50) return '#eab308'
    return '#f97316'
  }

  // Stats
  const totalFaculty = facultyMembers.length
  const activeProfiles = facultyMembers.filter(f => f.profileProgress >= 75).length
  const pendingReviews = facultyMembers.filter(f => f.profileProgress < 75 && f.profileProgress >= 25).length
  const avgCompletion = Math.round(facultyMembers.reduce((sum, f) => sum + f.profileProgress, 0) / totalFaculty)

  return (
    <div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-xl border border-[#e6dbdd] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#896169]">Total Faculty</p>
              <p className="mt-2 text-3xl font-bold text-[#181112]">{totalFaculty}</p>
            </div>
            <div className="rounded-lg bg-green-100 p-2 text-green-600">
              <TrendingUp size={22} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm">
            <span className="font-medium text-green-600">+12%</span>
            <span className="text-[#896169]">from last month</span>
          </div>
        </div>

        <div className="rounded-xl border border-[#e6dbdd] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#896169]">Active Profiles</p>
              <p className="mt-2 text-3xl font-bold text-[#181112]">{activeProfiles}</p>
            </div>
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <UserCheck size={22} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm">
            <span className="font-medium text-blue-600">+5%</span>
            <span className="text-[#896169]">newly activated</span>
          </div>
        </div>

        <div className="rounded-xl border border-[#e6dbdd] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#896169]">Pending Reviews</p>
              <p className="mt-2 text-3xl font-bold text-[#181112]">{pendingReviews}</p>
            </div>
            <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
              <Clock size={22} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm">
            <span className="font-medium text-orange-600">-2%</span>
            <span className="text-[#896169]">since last week</span>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm" style={{ border: '1px solid #e6dbdd' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: '#896169' }}>Completion Rate</p>
              <p className="mt-2 text-3xl font-bold" style={{ color: '#181112' }}>{avgCompletion}%</p>
            </div>
            <div className="rounded-lg p-2" style={{ backgroundColor: 'rgba(196,14,47,0.1)', color: '#c40e2f' }}>
              <CheckCircle size={22} />
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
            <div className="h-1.5 rounded-full" style={{ width: `${avgCompletion}%`, backgroundColor: '#c40e2f' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="flex flex-col rounded-xl border border-[#e6dbdd] bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-[#e6dbdd] p-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#896169]">
              <Search size={20} />
            </div>
            <input
              className="block w-full rounded-lg border-0 bg-[#f4f0f1] py-2.5 pl-10 text-sm text-[#181112] placeholder:text-[#896169] focus:ring-2 focus:ring-[#c40e2f]"
              placeholder="Search by name, ID, or department..."
              type="text"
              value={filterText}
              onChange={(e) => { setFilterText(e.target.value); setCurrentPage(1) }}
            />
          </div>
          {/* Filters & Action */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedDepartment}
              onChange={(e) => { setSelectedDepartment(e.target.value); setCurrentPage(1) }}
              className="rounded-lg border-0 bg-[#f4f0f1] py-2.5 pl-4 pr-10 text-sm font-medium text-[#181112] focus:ring-2 focus:ring-[#c40e2f]"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1) }}
              className="rounded-lg border-0 bg-[#f4f0f1] py-2.5 pl-4 pr-10 text-sm font-medium text-[#181112] focus:ring-2 focus:ring-[#c40e2f]"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <button
              onClick={handleAddFaculty}
              className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-md hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ backgroundColor: '#c40e2f' }}
            >
              <Plus size={20} />
              <span>Add Faculty</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fcfafa] text-xs uppercase text-[#896169]">
              <tr>
                <th className="px-6 py-4 font-semibold" scope="col">Employee</th>
                <th className="px-6 py-4 font-semibold" scope="col">ID</th>
                <th className="px-6 py-4 font-semibold" scope="col">Department</th>
                <th className="px-6 py-4 font-semibold" scope="col">Status</th>
                <th className="px-6 py-4 font-semibold w-1/5" scope="col">Profile Completion</th>
                <th className="px-6 py-4 font-semibold text-right" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dbdd] border-t border-[#e6dbdd]">
              {paginatedData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 overflow-hidden rounded-full ${row.avatarColor} flex items-center justify-center font-semibold text-sm flex-shrink-0`}>
                        {row.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-[#181112]">{row.name}</div>
                        <div className="text-xs text-[#896169]">Updated {row.lastUpdate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-[#181112] tabular-nums">{row.employeeId}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.departmentColor}`}>
                      {row.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(row.profileProgress)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 overflow-hidden rounded-full bg-gray-200 h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${row.profileProgress}%`, backgroundColor: getProgressColorHex(row.profileProgress) }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-[#181112] tabular-nums">{row.profileProgress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleViewProfile(row)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors"
                        title="Ver perfil"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleViewProfile(row)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                        title="Editar"
                      >
                        <Edit size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[#896169]">
                    No faculty members found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#e6dbdd] px-6 py-4">
          <p className="text-sm text-[#896169]">
            Showing <span className="font-medium text-[#181112]">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
            <span className="font-medium text-[#181112]">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{' '}
            <span className="font-medium text-[#181112]">{filteredData.length}</span> results
          </p>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-[#e6dbdd] hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-[#e6dbdd] ${
                  currentPage === page
                    ? 'z-10 text-white'
                    : 'text-[#181112] hover:bg-gray-50'
                }`}
                style={currentPage === page ? { backgroundColor: '#c40e2f' } : {}}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-[#e6dbdd] hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default FacultyDirectory
