import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { User, Lock, Eye, EyeOff, HelpCircle, Facebook, Twitter, Instagram, GraduationCap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor ingresa tu email y contraseña',
        confirmButtonColor: '#C41E3A',
        customClass: {
          popup: 'rounded-xl'
        }
      })
      return
    }

    setIsLoading(true)
    const result = await login(email, password)
    setIsLoading(false)

    if (result.success) {
      // Redirect based on role
      if (result.user.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/profile/general')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Red Background with Pattern */}
      <div className="bg-pattern relative w-full lg:w-1/2 min-h-[40vh] lg:min-h-screen flex items-center justify-center p-8 lg:p-16">
        <div className="curved-edge hidden lg:block"></div>
        
        <div className="relative z-10 text-white max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-wider">IBERO - GDD</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            GESTOR DE DATOS<br />
            DEL DOCENTE
          </h1>

          {/* Description */}
          <p className="text-white/80 mb-8 text-sm lg:text-base">
            El gestor de datos del docente <br />es un portal que permite visualizar <br /> y gestionar los datos del colaborador.
          </p>

          {/* User Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-xs font-bold">
                JD
              </div>
              <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-xs font-bold">
                MK
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-xs font-bold">
                AS
              </div>
            </div>
            <span className="text-white/80 text-sm">+1,000 Docentes Activos </span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">UNIVERSIDAD IBEROAMERICANA</h2>
            <p className="text-gray-500 text-sm">CIUDAD DE MÉXICO</p>
          </div>

          {/* Login Form */}
          <Form onSubmit={handleSubmit}>
            {/* Email Field */}
            <Form.Group className="mb-4">
              <Form.Label className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2">
                cuenta o correo institucional
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-gray-50 border-gray-200">
                  <User size={18} className="text-gray-400" />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="e.g. j.doe@ibero.mx o 103-0527"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-200 py-3 focus:border-red-500 focus:ring-red-500"
                />
              </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <Form.Label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-0">
                  Contraseña
                </Form.Label>
                <a href="#" className="text-xs text-red-600 hover:text-red-700 font-medium no-underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <InputGroup>
                <InputGroup.Text className="bg-gray-50 border-gray-200">
                  <Lock size={18} className="text-gray-400" />
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-200 py-3 focus:border-red-500 focus:ring-red-500"
                />
                <InputGroup.Text 
                  className="bg-gray-50 border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Keep Signed In */}
            <Form.Group className="mb-6">
              <Form.Check
                type="checkbox"
                id="keepSignedIn"
                label="Mantenerme conectado en este dispositivo"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="text-sm text-gray-600"
              />
            </Form.Group>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 font-semibold text-white rounded-lg shadow-lg shadow-red-500/30 transition-all duration-300"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión →'}
            </Button>
          </Form>

          {/* Help Link */}
          <div className="text-center mt-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 no-underline">
              <HelpCircle size={16} />
              Apoyo al acceso 
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Twitter size={20} />
            </a>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-xs text-gray-400">
            <p>© 2026 Universidad Iberoamericana. Todos los datos son protegidos por las </p>
            <p>
              <a href="#" className="text-gray-500 hover:text-gray-700 no-underline">Políticas institucionales de privacidad</a>
              {' '}y{' '}
              <a href="#" className="text-gray-500 hover:text-gray-700 no-underline">Protocolos de reconocimiento de investigación</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
