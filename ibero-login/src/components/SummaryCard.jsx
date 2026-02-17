import { Edit2, Trash2 } from 'lucide-react'

const SummaryCard = ({ title, subtitle, details, onEdit, onDelete, readOnly = false }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{title}</h4>
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
        
        {!readOnly && (
          <div className="flex items-center gap-1 ml-4">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SummaryCard
