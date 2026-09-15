// Cliente HTTP base con manejo de tokens
import { homologarCatalogoPayload } from '../utils/textNormalize'

const API_ACREDITACION_URL = import.meta.env.VITE_API_ACREDITACION_URL
const API_CATALOGO_URL = import.meta.env.VITE_API_CATALOGO_URL

const getToken = () => sessionStorage.getItem('token')

// Solo Authorization para GET (evita preflight CORS innecesario)
const getReadHeaders = () => ({
  'Authorization': `Bearer ${getToken()}`
})

// Authorization + Content-Type para POST/PUT (tienen body JSON)
const getWriteHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
})

const handleResponse = async (response) => {
  if (response.status === 401) {
    sessionStorage.clear()
    window.location.href = '/'
    throw new Error('Sesión expirada. Por favor, inicie sesión nuevamente.')
  }

  const contentType = response.headers.get('content-type') || ''
  const raw = await response.text()
  const looksLikeHtml = raw.trimStart().startsWith('<') || contentType.includes('text/html')

  let json = null
  if (!looksLikeHtml && raw) {
    try {
      json = JSON.parse(raw)
    } catch {
      json = null
    }
  }

  if (looksLikeHtml || (response.ok && json === null && raw)) {
    throw new Error(
      'La API devolvió HTML en lugar de JSON. En local verifica el proxy de Vite hacia /back (reinicia npm run dev).'
    )
  }

  if (!response.ok) {
    throw new Error(json?.message || `Error ${response.status}: ${response.statusText}`)
  }

  // La API envuelve las respuestas en { success, code, message, data }
  if (json && typeof json.success !== 'undefined') {
    if (!json.success) {
      throw new Error(json.message || 'Error en la operación')
    }
    return json.data
  }
  return json
}

// --- API de Acreditación (requiere Bearer token) ---

export const apiGet = async (endpoint) => {
  const url = `${API_ACREDITACION_URL}${endpoint}`
  const headers = getReadHeaders()
  console.log('[apiGet] URL:', url)
  console.log('[apiGet] Token:', headers.Authorization ? headers.Authorization.substring(0, 30) + '...' : 'NO TOKEN')
  try {
    const response = await fetch(url, { method: 'GET', headers })
    console.log('[apiGet] Status:', response.status, response.statusText)
    return handleResponse(response)
  } catch (err) {
    console.error('[apiGet] Fetch error:', err)
    throw err
  }
}

export const apiPost = async (endpoint, data) => {
  const response = await fetch(`${API_ACREDITACION_URL}${endpoint}`, {
    method: 'POST',
    headers: getWriteHeaders(),
    body: JSON.stringify(data)
  })
  return handleResponse(response)
}

export const apiPut = async (endpoint, data) => {
  const response = await fetch(`${API_ACREDITACION_URL}${endpoint}`, {
    method: 'PUT',
    headers: getWriteHeaders(),
    body: JSON.stringify(data)
  })
  return handleResponse(response)
}

export const apiDelete = async (endpoint) => {
  const response = await fetch(`${API_ACREDITACION_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getReadHeaders()
  })
  return handleResponse(response)
}

// --- API de Catálogos (requiere Bearer token) ---

export const catalogoGet = async (endpoint) => {
  const response = await fetch(`${API_CATALOGO_URL}${endpoint}`, {
    method: 'GET',
    headers: getReadHeaders()
  })
  return handleResponse(response)
}

export const catalogoPost = async (endpoint, data) => {
  const payload = homologarCatalogoPayload(data)
  const response = await fetch(`${API_CATALOGO_URL}${endpoint}`, {
    method: 'POST',
    headers: getWriteHeaders(),
    body: JSON.stringify(payload)
  })
  return handleResponse(response)
}
