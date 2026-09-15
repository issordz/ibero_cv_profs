import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NotFound = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const handleBack = () => {
    if (!isAuthenticated) {
      navigate('/', { replace: true })
      return
    }
    if (user?.role === 'admin') {
      navigate('/dashboard')
    } else {
      navigate('/profile/datos-generales')
    }
  }

  return (
    <main className="min-h-dvh flex items-center justify-center bg-background-light px-4">
      <section
        className="text-center max-w-lg surface-card px-8 py-12 animate-fade-up"
        aria-labelledby="not-found-title"
      >
        <p
          className="font-display text-7xl font-semibold text-primary mb-3 tabular-nums"
          aria-hidden="true"
        >
          404
        </p>
        <h1 id="not-found-title" className="font-display text-2xl font-semibold text-ink mb-2">
          Página no encontrada
        </h1>
        <p className="text-ink-muted mb-8 leading-relaxed">
          La ruta no existe o no tienes acceso en el Portal de gestión para acreditaciones IBERO.
        </p>
        <button type="button" onClick={handleBack} className="btn-primary px-6 py-2.5">
          {isAuthenticated ? 'Volver al inicio' : 'Ir al inicio de sesión'}
        </button>
      </section>
    </main>
  )
}

export default NotFound
