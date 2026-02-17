import { Plus } from 'lucide-react'

const AddItemButton = ({ label, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-4 border-2 border-dashed rounded-lg
        flex items-center justify-center gap-2
        text-sm font-medium transition-all duration-200
        ${disabled 
          ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
          : 'border-gray-300 text-slate-500 hover:border-red-500 hover:text-red-600 hover:bg-red-50'
        }
      `}
    >
      <Plus size={18} />
      {label}
    </button>
  )
}

export default AddItemButton
