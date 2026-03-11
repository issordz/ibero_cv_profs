import { apiGet, apiPost, apiPut } from './api'

// Mapeo de sección a endpoint de la API de acreditación
const SECTION_ENDPOINTS = {
  'datos-generales': 'api/DatosGenerale',
  'informacion-academica': 'api/EstudiosAcademico',
  'experiencia-laboral': 'api/ExperienciaLaboral',
  'capacitacion-actualizacion': 'api/CapacitacionActualizacion',
  'logros-profesionales': 'api/LogrosProfesionale',
  'organismos': 'api/Organismo',
  'premios-distinciones': 'api/PremiosDistinciones',
  'productos-academicos': 'api/ProductosAcademicos'
}

export const getEndpoint = (sectionKey) => {
  return SECTION_ENDPOINTS[sectionKey] || null
}

// GET: Obtener datos de una sección por cuenta
export const fetchSectionData = async (sectionKey, cuenta) => {
  const endpoint = SECTION_ENDPOINTS[sectionKey]
  if (!endpoint) {
    throw new Error(`Sección "${sectionKey}" no tiene endpoint configurado.`)
  }
  try {
    const result = await apiGet(`${endpoint}/${cuenta}`)
    return result ?? []
  } catch (error) {
    console.error(`Error al obtener datos de "${sectionKey}":`, error)
    throw error
  }
}

// POST: Crear un nuevo registro en una sección
export const createSectionItem = async (sectionKey, data) => {
  const endpoint = SECTION_ENDPOINTS[sectionKey]
  if (!endpoint) {
    throw new Error(`Sección "${sectionKey}" no tiene endpoint configurado.`)
  }
  try {
    const result = await apiPost(endpoint, data)
    return result
  } catch (error) {
    console.error(`Error al crear registro en "${sectionKey}":`, error)
    throw error
  }
}

// PUT: Actualizar un registro existente (incluye borrado lógico)
export const updateSectionItem = async (sectionKey, data) => {
  const endpoint = SECTION_ENDPOINTS[sectionKey]
  if (!endpoint) {
    throw new Error(`Sección "${sectionKey}" no tiene endpoint configurado.`)
  }
  try {
    const result = await apiPut(endpoint, data)
    return result
  } catch (error) {
    console.error(`Error al actualizar registro en "${sectionKey}":`, error)
    throw error
  }
}

// PUT para borrado lógico: marca el registro como inactivo
export const deleteSectionItem = async (sectionKey, data) => {
  const itemData = { ...data, activo: 0 }
  return updateSectionItem(sectionKey, itemData)
}
