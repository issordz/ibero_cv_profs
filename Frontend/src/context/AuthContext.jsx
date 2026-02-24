import { createContext, useContext, useState } from 'react'
import { loginUsers } from '../data/users'
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

  const login = async (email, password) => {
    const foundUser = loginUsers.find(
      (u) => u.correo === email && u.contrasena === password
    )

    if (foundUser) {
      setUser(foundUser)
      setIsAuthenticated(true)
      
      const fullName = `${foundUser.nombres} ${foundUser.apellidoPaterno}`
      await Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: `Hola ${fullName}`,
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: 'rounded-xl'
        }
      })
      
      return { success: true, user: foundUser }
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Email o contraseña incorrectos',
        confirmButtonColor: '#C41E3A',
        customClass: {
          popup: 'rounded-xl'
        }
      })
      
      return { success: false, error: 'Invalid credentials' }
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
      customClass: {
        popup: 'rounded-xl'
      }
    })

    if (result.isConfirmed) {
      setUser(null)
      setIsAuthenticated(false)
      return true
    }
    return false
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
