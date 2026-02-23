import { catalogoInstituciones } from '../data/users'

const InstitucionSelect = ({ value, onChange, label = 'Institución' }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : '')}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
      >
        <option value="">Seleccionar institución...</option>
        {catalogoInstituciones.map((inst) => (
          <option key={inst.idInstitucion} value={inst.idInstitucion}>
            {inst.nombreInstitucion}
          </option>
        ))}
      </select>
    </div>
  )
}

export default InstitucionSelect
