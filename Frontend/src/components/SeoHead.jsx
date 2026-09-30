import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_NAME = 'IBERO - Portal de gestión para acreditaciones'
const DEFAULT_DESCRIPTION =
  'Portal IBERO PGA para captura y gestión del currículum docente orientado a procesos de acreditación.'

const PAGE_META = {
  '/': {
    title: 'Iniciar sesión',
    description: 'Acceso al Portal de gestión para acreditaciones IBERO.'
  },
  '/dashboard': {
    title: 'Panel de control',
    description: 'Panel administrativo del portal de acreditaciones IBERO.'
  },
  '/faculty': {
    title: 'Búsqueda de docentes',
    description: 'Consulta y búsqueda de docentes en el portal de acreditaciones.'
  },
  '/reports': {
    title: 'Reportes',
    description: 'Reportes del portal de gestión para acreditaciones IBERO.'
  },
  '/validaciones-pendientes': {
    title: 'Validaciones pendientes',
    description: 'Validaciones pendientes de revisión en el portal IBERO.'
  },
  '/user-management': {
    title: 'Gestión de usuarios',
    description: 'Administración de usuarios del portal de acreditaciones.'
  },
  '/profile/datos-generales': {
    title: 'Datos generales',
    description: 'Datos generales del currículum docente para acreditación.'
  },
  '/profile/informacion-academica': {
    title: 'Estudios académicos',
    description: 'Estudios académicos del currículum docente.'
  },
  '/profile/experiencia-laboral': {
    title: 'Experiencia laboral',
    description: 'Experiencia laboral y profesional del docente.'
  },
  '/profile/capacitacion-actualizacion': {
    title: 'Capacitación y actualización',
    description:
      'Actualización: conocimientos disciplinarios en ciencias políticas. Capacitación: competencias pedagógicas y expresión frente al aula.'
  },
  '/profile/logros-profesionales': {
    title: 'Logros profesionales',
    description: 'Logros profesionales no académicos del docente.'
  },
  '/profile/organismos': {
    title: 'Organismos',
    description:
      'Registro como miembro SNII. Participación en organismos o gremios, por ejemplo AMECIP.'
  },
  '/profile/premios-distinciones': {
    title: 'Premios y distinciones',
    description: 'Premios y distinciones del currículum docente.'
  },
  '/profile/productos-academicos': {
    title: 'Productos académicos',
    description: 'Productos académicos y publicaciones del docente.'
  }
}

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function resolveMeta(pathname) {
  if (PAGE_META[pathname]) return PAGE_META[pathname]
  if (pathname.startsWith('/faculty/')) {
    return {
      title: 'Perfil docente',
      description: 'Perfil de docente en el portal de acreditaciones IBERO.'
    }
  }
  if (pathname.startsWith('/profile/')) {
    return {
      title: 'Currículum',
      description: DEFAULT_DESCRIPTION
    }
  }
  return {
    title: 'Página no encontrada',
    description: 'La ruta solicitada no existe en el portal de acreditaciones IBERO.'
  }
}

/**
 * Actualiza title, description, Open Graph, Twitter y canonical por ruta.
 */
const SeoHead = () => {
  const location = useLocation()

  useEffect(() => {
    const base =
      import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ||
      (typeof window !== 'undefined' ? window.location.origin : '')
    const path = location.pathname || '/'
    const meta = resolveMeta(path)
    const title = `${meta.title} | ${SITE_NAME}`
    const url = `${base}${path}`
    const image = `${base}/og-image.svg`

    document.title = title
    upsertMeta('name', 'description', meta.description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:locale', 'es_MX')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', meta.description)
    upsertMeta('name', 'twitter:image', image)
    upsertLink('canonical', url)
  }, [location.pathname])

  return null
}

export default SeoHead
