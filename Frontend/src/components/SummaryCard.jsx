import { Edit2, Trash2, AlertTriangle } from 'lucide-react'

const SummaryCard = ({ title, subtitle, details, onEdit, onDelete, readOnly = false, hasWarning = false }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{title?.length > 49 ? title.substring(0, 49) + '...' : title}</h4>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
            {details && (
              <div className="mt-2 flex flex-wrap gap-2">
                {details.map((detail, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs text-slate-500 rounded"
                  >
                    {detail}
                  </span>
                ))}
              </div>
            )}
          </div>

          {!readOnly && (onEdit || onDelete) && (
            <div className="flex items-center gap-1 ml-4">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 size={16} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {hasWarning && (
        <div className="flex items-center gap-2 px-3 py-2 text-sm border-t border-yellow-200"
          style={{ backgroundColor: '#fefce8', color: '#854d0e' }}>
          <AlertTriangle size={14} className="flex-shrink-0" style={{ color: '#ca8a04' }} />
          <span>Este registro contiene campos sin identificar. Haz clic en <strong>Editar</strong> para actualizarlo.</span>
        </div>
      )}
    </div>
  )
}

export default SummaryCard
