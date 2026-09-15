/**
 * Cuentas del listado Ciencias Políticas (acreditación actual).
 * Usado para UI específica (p. ej. experiencia solo con años).
 * Override global: VITE_EXPERIENCIA_SOLO_ANIOS=true|false
 */
const CUENTAS_CIENCIAS_POLITICAS = new Set([
  '4160', '5239', '5385', '6435', '7049', '7543', '7546', '7982', '8999',
  '12707', '12939', '14093', '16142', '18297', '18861', '20862', '21128',
  '23023', '23873', '24128', '24535', '24921', '24992', '25017', '25653',
  '25972', '26338', '26574', '26903', '27311', '27904', '29669', '29929',
  '30352', '30855', '31411', '32090', '32231', '32602', '32835', '33050',
  '33334', '33367', '33429', '33518', '33524', '33548', '34371', '34792',
  '34882', '35044', '35374', '35528', '35989', '36134', '36370', '36543',
  '36570', '36886', '36962', '37313', '37419', '37443', '37579', '37730',
  '37994', '38764', '38886', '39011', '39022', '39057', '39137', '39187',
  '39308', '39604', '39618', '39843', '39988', '40174', '40255', '40436',
  '40460', '41083', '41160', '41179', '41574', '41618', '41906', '42163',
  '42486', '42498', '42537', '42538', '42733', '42843', '42844', '42859',
  '42888', '42896', '43106', '43151', '43204', '43502', '43549'
])

export function isCienciasPoliticasCuenta(cuenta) {
  if (cuenta === null || cuenta === undefined || cuenta === '') return false
  return CUENTAS_CIENCIAS_POLITICAS.has(String(cuenta).trim())
}

/** Experiencia laboral: ocultar inicio/fin y usar solo años. */
export function useExperienciaSoloAnios(cuenta) {
  const flag = import.meta.env.VITE_EXPERIENCIA_SOLO_ANIOS
  if (flag === 'true') return true
  if (flag === 'false') return false
  return isCienciasPoliticasCuenta(cuenta)
}

export const SECTOR_OPTIONS = [
  'Público',
  'Sociedad civil',
  'Iniciativa privada',
  'Organismos internacionales'
]

export const SNII_NIVELES = [
  { value: 'candidato', label: 'Candidato', stored: 'Sni candidato' },
  { value: '1', label: '1', stored: 'Sni 1' },
  { value: '2', label: '2', stored: 'Sni 2' },
  { value: '3', label: '3', stored: 'Sni 3' },
  { value: 'merito', label: 'Mérito', stored: 'Sni mérito' }
]

export function organismoEsSnii(nombre) {
  const n = String(nombre || '').toLowerCase()
  return (
    n.includes('sni') ||
    n.includes('snii') ||
    n.includes('sistema nacional de investigadora')
  )
}

export function parseSniiNivel(nivelExperiencia) {
  const raw = String(nivelExperiencia || '').trim().toLowerCase()
  // Acepta históricos "Snii …" y el formato actual "Sni …"
  if (!raw.startsWith('sni')) return ''
  if (raw.includes('candidato')) return 'candidato'
  if (raw.includes('mérito') || raw.includes('merito')) return 'merito'
  if (raw.includes('3')) return '3'
  if (raw.includes('2')) return '2'
  if (raw.includes('1')) return '1'
  return ''
}

export function sniiStoredFromValue(value) {
  const found = SNII_NIVELES.find((n) => n.value === value)
  return found ? found.stored : null
}
