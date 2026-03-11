import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { fetchCatalog, addCatalogItem, getCatalogConfig } from '../services/catalogService'
import Swal from 'sweetalert2'

const CatalogoSelect = ({ value, onChange, label = 'Institución', catalog = 'instituciones', placeholder = 'Seleccionar...' }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddNew, setShowAddNew] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [adding, setAdding] = useState(false)

  const config = getCatalogConfig(catalog)

  useEffect(() => {
    let mounted = true
    const loadCatalog = async () => {
      setLoading(true)
      const data = await fetchCatalog(catalog)
      if (mounted) {
        setItems(data)
        setLoading(false)
      }
    }
    loadCatalog()
    return () => { mounted = false }
  }, [catalog])

  const handleAddNew = async () => {
    if (!newItemName.trim()) return
    setAdding(true)
    try {
      const payload = config ? { [config.nameKey]: newItemName.trim() } : { nombre: newItemName.trim() }
      await addCatalogItem(catalog, payload)
      // Recargar catálogo para obtener el nuevo item con su ID
      const updated = await fetchCatalog(catalog, true)
      setItems(updated)
      // Seleccionar automáticamente el nuevo item
      const newItem = updated.find(i => i[config.nameKey] === newItemName.trim())
      if (newItem && config) {
        onChange(newItem[config.idKey])
      }
      setNewItemName('')
      setShowAddNew(false)
      Swal.fire({ icon: 'success', title: 'Agregado al catálogo', timer: 1500, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo agregar el valor al catálogo', confirmButtonColor: '#C41E3A' })
    } finally {
      setAdding(false)
    }
  }

  if (!config) {
    return <div className="text-red-500 text-sm">Catálogo "{catalog}" no configurado</div>
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2">
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : '')}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          disabled={loading}
        >
          <option value="">{loading ? 'Cargando...' : placeholder}</option>
          {items.map((item) => (
            <option key={item[config.idKey]} value={item[config.idKey]}>
              {item[config.nameKey]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setShowAddNew(!showAddNew)}
          className="px-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-red-600 transition-colors"
          title="Agregar nuevo valor al catálogo"
        >
          <Plus size={18} />
        </button>
      </div>
      {showAddNew && (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Nuevo valor..."
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            onKeyDown={(e) => e.key === 'Enter' && handleAddNew()}
          />
          <button
            type="button"
            onClick={handleAddNew}
            disabled={adding || !newItemName.trim()}
            className="px-3 py-2 bg-red-700 hover:bg-red-800 text-white text-sm rounded-lg disabled:opacity-50"
          >
            {adding ? '...' : 'Agregar'}
          </button>
          <button
            type="button"
            onClick={() => { setShowAddNew(false); setNewItemName('') }}
            className="px-3 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}

export default CatalogoSelect
