import { createContext, useContext, useState, useEffect } from 'react'
import { loginService, restoreSession, clearSession } from '../services/authService'
import { isAccountAllowed } from '../data/allowedAccounts'
import Swal from 'sweetalert2'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Restaurar sesión al cargar la app
  useEffect(() => {
    const restored = restoreSession()
    if (restored) {
      setUser(restored)
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (account, password) => {
    // Validar que la cuenta esté en la lista de cuentas permitidas
    if (!isAccountAllowed(account)) {
      await Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'La cuenta ingresada no tiene acceso a este sistema.',
        confirmButtonColor: '#C41E3A',
        customClass: { popup: 'rounded-xl' }
      })
      return { success: false, error: 'Cuenta no autorizada' }
    }

    try {
      const loggedUser = await loginService(account, password)
      setUser(loggedUser)
      setIsAuthenticated(true)

      await Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: `Hola ${loggedUser.userName}`,
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: 'rounded-xl' }
      })

      return { success: true, user: loggedUser }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: error.message || 'Cuenta o contraseña incorrectos',
        confirmButtonColor: '#C41E3A',
        customClass: { popup: 'rounded-xl' }
      })
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    const result = await Swal.fire({
      icon: 'question',
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro que deseas salir?',
      showCancelButton: true,
      confirmButtonColor: '#C41E3A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      customClass: { popup: 'rounded-xl' }
    })

    if (result.isConfirmed) {
      clearSession()
      setUser(null)
      setIsAuthenticated(false)
      return true
    }
    return false
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
