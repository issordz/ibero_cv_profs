import { catalogoGet, catalogoPost } from './api'

// Cache en memoria para catálogos (evita llamadas repetidas durante la sesión)
const catalogCache = {}

// Mapeo de nombre de catálogo a endpoint y sus keys de id/nombre
const CATALOG_CONFIG = {
  instituciones: {
    endpoint: 'institucione',
    idKey: 'idInstitucion',
    nameKey: 'nombreInstitucion'
  },
  educativas: {
    endpoint: 'institucione-educativa',
    idKey: 'idInstitucionEducativa',
    nameKey: 'nombreInstitucion'
  },
  nivelEstudio: {
    endpoint: 'nivel-estudio',
    idKey: 'idNivelEstudio',
    nameKey: 'descNivelEstudio'
  },
  paises: {
    endpoint: 'pais',
    idKey: 'idPais',
    nameKey: 'nombrePais'
  },
  tipoCurso: {
    endpoint: 'tipo-curso',
    idKey: 'idTipoCurso',
    nameKey: 'descTipoCurso'
  },
  tipoCapacitacion: {
    endpoint: 'tipo-capacitacion',
    idKey: 'idTipoCapacitacion',
    nameKey: 'descTipoCapacitacion'
  },
  tipoExperiencia: {
    endpoint: 'tipo-experiencia',
    idKey: 'idTipoExperiencia',
    nameKey: 'descTipoExperiencia'
  },
  organismos: {
    endpoint: 'organismo',
    idKey: 'idOrganismo',
    nameKey: 'nombreOrganismo'
  },
  puestoInstitucional: {
    endpoint: 'puesto-institucional',
    idKey: 'id',
    nameKey: 'nombre'
  },
  puestoGeneral: {
    endpoint: 'puesto-general',
    idKey: 'idPuestoGeneral',
    nameKey: 'descripcion'
  },
  carreras: {
    endpoint: 'carrera',
    idKey: 'idCarrera',
    nameKey: 'descCarrera'
  }
}

export const getCatalogConfig = (catalogName) => {
  return CATALOG_CONFIG[catalogName] || null
}

export const fetchCatalog = async (catalogName, forceRefresh = false) => {
  const config = CATALOG_CONFIG[catalogName]
  if (!config) {
    console.warn(`Catálogo "${catalogName}" no configurado.`)
    return []
  }

  if (!forceRefresh && catalogCache[catalogName]) {
    return catalogCache[catalogName]
  }

  try {
    const result = await catalogoGet(config.endpoint)
    catalogCache[catalogName] = Array.isArray(result) ? result : []
    return catalogCache[catalogName]
  } catch (error) {
    console.error(`Error al cargar catálogo "${catalogName}":`, error)
    return catalogCache[catalogName] || []
  }
}

export const addCatalogItem = async (catalogName, newItem) => {
  const config = CATALOG_CONFIG[catalogName]
  if (!config) {
    throw new Error(`Catálogo "${catalogName}" no configurado.`)
  }

  try {
    const result = await catalogoPost(config.endpoint, newItem)
    // Invalidar cache para que se recargue con el nuevo item
    delete catalogCache[catalogName]
    return result
  } catch (error) {
    console.error(`Error al agregar item al catálogo "${catalogName}":`, error)
    throw error
  }
}

export const getCatalogItemName = (catalogName, id, items) => {
  const config = CATALOG_CONFIG[catalogName]
  if (!config || !items) return ''
  const item = items.find(i => i[config.idKey] === id || i[config.idKey] === parseInt(id))
  return item ? item[config.nameKey] : ''
}

export const clearCatalogCache = () => {
  Object.keys(catalogCache).forEach(key => delete catalogCache[key])
}
