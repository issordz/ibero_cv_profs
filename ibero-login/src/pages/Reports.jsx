import { FileText, Download, Calendar } from 'lucide-react'

const Reports = () => {
  const reports = [
    { name: 'Estado de completitud de docentes', date: 'Dic 2023', type: 'PDF' },
    { name: 'Resumen por departamento', date: 'Nov 2023', type: 'Excel' },
    { name: 'Reporte de revisión anual', date: 'Oct 2023', type: 'PDF' }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Reportes</h1>
        <p className="text-gray-500 mt-1">Genera y descarga reportes de docentes</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Reportes disponibles</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {reports.map((report, index) => (
            <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <FileText className="text-red-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{report.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    {report.date}
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{report.type}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reports
