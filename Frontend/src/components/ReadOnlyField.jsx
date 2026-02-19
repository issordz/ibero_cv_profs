import { Lock } from 'lucide-react'

const ReadOnlyField = ({ label, value }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</p>
          <p className="font-medium text-gray-900">{value || '-'}</p>
        </div>
        <Lock size={16} className="text-gray-400" />
      </div>
    </div>
  )
}

export default ReadOnlyField
