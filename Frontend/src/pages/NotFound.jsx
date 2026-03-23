import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NotFound = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleBack = () => {
    if (user?.role === 'admin') {
      navigate('/dashboard')
    } else {
      navigate('/profile/datos-generales')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-8xl font-bold text-red-700 mb-4">404</p>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Página no encontrada</h1>
        <p className="text-gray-500 mb-8">La ruta que buscas no existe o no tienes acceso a ella.</p>
        <button
          onClick={handleBack}
          className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}

export default NotFound
