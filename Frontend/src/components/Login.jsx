import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'

const CAMPUS_IMG = '/campus-ibero.jpg'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [roleFilter, setRoleFilter] = useState('Profesor')
  const [showRoleMenu, setShowRoleMenu] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor ingresa tu cuenta y contraseña',
        confirmButtonColor: '#C41E3A',
        customClass: { popup: 'rounded-xl' }
      })
      return
    }

    setIsLoading(true)
    const result = await login(email, password)
    setIsLoading(false)

    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/profile/datos-generales')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Campus Photo */}
      <div className="relative w-full lg:w-[58%] min-h-[35vh] lg:min-h-screen">
        <img
          src={CAMPUS_IMG}
          alt="Campus Ibero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-[42%] flex flex-col bg-white min-h-screen">
        {/* IBERO logo top-right */}
        <div className="flex justify-end p-6">
          <img src="/ibero-logo.svg" alt="IBERO" className="h-10" />
        </div>

        {/* Form centered */}
        <div className="flex-1 flex items-center justify-center px-8 lg:px-14 pb-12">
          <div className="w-full max-w-sm">
            {/* Heading */}
            <p className="text-gray-500 text-lg mb-1" style={{ fontFamily: 'Georgia, serif' }}>Portal de gestión para acreditaciones</p>
            <h1 className="text-2xl font-bold italic text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>Iniciar Sesión</h1>

            {/* Role selector */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm text-gray-500">Ingresa con tu cuenta de</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-800 border-b border-gray-400 pb-0.5 bg-transparent cursor-pointer"
                >
                  {roleFilter}
                  <ChevronDown size={14} />
                </button>
                {showRoleMenu && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[140px]">
                    {['Profesor', 'Administrador'].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => { setRoleFilter(r); setShowRoleMenu(false) }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${roleFilter === r ? 'font-semibold text-red-700' : 'text-gray-700'}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Account field */}
              <div className="mb-5">
                <label className="block text-sm text-gray-600 mb-1.5">No. Cuenta</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  className="w-full px-4 py-2.5 bg-blue-50/60 border border-blue-100 rounded text-gray-900 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
                />
              </div>

              {/* Password field */}
              <div className="mb-8">
                <label className="block text-sm text-gray-600 mb-1.5">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                    className="w-full px-4 py-2.5 bg-blue-50/60 border border-blue-100 rounded text-gray-900 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-0 p-0"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-full transition-colors duration-200 text-sm disabled:opacity-60"
              >
                {isLoading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>

            {/* Forgot password */}
            <div className="text-center mt-5">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 no-underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
