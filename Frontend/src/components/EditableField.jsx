const EditableField = ({ label, value, onChange, type = 'text', placeholder = '', rows = 1 }) => {
  const baseClasses = `
    w-full px-4 py-3 bg-white border border-gray-200 rounded-lg
    text-gray-900 placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:border-transparent
    transition-all duration-200
  `

  return (
    <div>
      <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">
        {label}
      </label>
      {rows > 1 ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={baseClasses}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
    </div>
  )
}

export default EditableField
