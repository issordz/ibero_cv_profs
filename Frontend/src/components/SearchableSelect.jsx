import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'

const SearchableSelect = ({ items = [], idKey = 'id', nameKey = 'nombre', value, onChange, label, placeholder = 'Buscar...', disabled = false, onCreateNew }) => {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (items.length === 0) return
    if (value !== '' && value !== null && value !== undefined) {
      const found = items.find(i => i[idKey]?.toString() === value?.toString())
      if (found) setSearch(found[nameKey] || '')
    } else {
      setSearch('')
    }
  }, [value, items, idKey, nameKey])

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = items.filter(i =>
    i[nameKey]?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div ref={dropdownRef} className="relative">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); onChange('') }}
          onFocus={() => setShowDropdown(true)}
          placeholder={disabled ? 'Cargando...' : placeholder}
          disabled={disabled}
          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-50 disabled:text-gray-400"
        />
      </div>
      {showDropdown && !disabled && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filtered.length === 0 ? (
            onCreateNew && search.trim() ? (
              <button
                type="button"
                onClick={() => { onCreateNew(search.trim()); setShowDropdown(false) }}
                className="block w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-50 font-medium"
              >
                + Crear: "{search.trim()}"
              </button>
            ) : (
              <div className="px-3 py-2 text-sm text-gray-400">Sin resultados</div>
            )
          ) : (
            <>
              {filtered.map((item) => (
                <button
                  key={item[idKey]}
                  type="button"
                  onClick={() => { setSearch(item[nameKey]); onChange(item[idKey]); setShowDropdown(false) }}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-red-50 hover:text-red-700 ${
                    value?.toString() === item[idKey]?.toString() ? 'bg-red-50 text-red-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  {item[nameKey]}
                </button>
              ))}
              {onCreateNew && search.trim() && !filtered.some(i => i[nameKey]?.toLowerCase() === search.trim().toLowerCase()) && (
                <button
                  type="button"
                  onClick={() => { onCreateNew(search.trim()); setShowDropdown(false) }}
                  className="block w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-50 font-medium border-t border-gray-100"
                >
                  + Crear: "{search.trim()}"
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchableSelect
