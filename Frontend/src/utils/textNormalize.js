/**
 * Homologación de textos para altas en catálogos:
 * mayúsculas, sin acentos, espacios colapsados.
 */
export function homologarCatalogoTexto(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .trim()
}

export function homologarCatalogoPayload(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return data
  const out = { ...data }
  for (const [key, value] of Object.entries(out)) {
    if (typeof value === 'string') {
      out[key] = homologarCatalogoTexto(value)
    }
  }
  return out
}
