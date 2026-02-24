import {
  catalogoInstituciones,
  catalogoInstitucionesEducativas,
  catalogoOrganismos,
  catalogoNivelEstudio,
  catalogoTipoCurso,
  catalogoCapacitacion,
  catalogoExperienciaLaboral
} from '../data/users'

const CATALOGS = {
  instituciones: { data: catalogoInstituciones, idKey: 'idInstitucion', nameKey: 'nombreInstitucion' },
  educativas: { data: catalogoInstitucionesEducativas, idKey: 'idInstitucionEducativa', nameKey: 'nombreInstitucion' },
  organismos: { data: catalogoOrganismos, idKey: 'idOrganismo', nameKey: 'nombreOrganismo' },
  nivelEstudio: { data: catalogoNivelEstudio, idKey: 'idNivelEstudio', nameKey: 'descNivelEstudio' },
  tipoCurso: { data: catalogoTipoCurso, idKey: 'idTipoCurso', nameKey: 'descTipoCurso' },
  tipoCapacitacion: { data: catalogoCapacitacion, idKey: 'idTipoCapacitacion', nameKey: 'descTipoCapacitacion' },
  tipoExperiencia: { data: catalogoExperienciaLaboral, idKey: 'idTipoExperiencia', nameKey: 'descTipoExperiencia' },
}

const CatalogoSelect = ({ value, onChange, label = 'Institución', catalog = 'instituciones', placeholder = 'Seleccionar...' }) => {
  const cat = CATALOGS[catalog] || CATALOGS.instituciones
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : '')}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
      >
        <option value="">{placeholder}</option>
        {cat.data.map((item) => (
          <option key={item[cat.idKey]} value={item[cat.idKey]}>
            {item[cat.nameKey]}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CatalogoSelect
