import { findAllowedAccount } from '../data/allowedAccounts'

const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL

export const loginService = async (account, password) => {
  // Validar que la cuenta esté en la lista de cuentas permitidas
  const allowedAccount = findAllowedAccount(account)
  if (!allowedAccount) {
    throw new Error('La cuenta ingresada no tiene acceso a este sistema.')
  }

  const payload = {
    account: account.toString(),
    digit: '0',
    password: password,
    idDetApp: 395,
    profileId: 431,
    idTipoUsuario: allowedAccount.idTipoUsuario
  }

  const response = await fetch(API_AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Error al iniciar sesión. Verifique sus credenciales.')
  }

  const result = await response.json()

  if (result.success !== 1 || result.code !== 200) {
    throw new Error(result.message || 'Credenciales inválidas.')
  }

  const data = result.data

  // Guardar tokens en sessionStorage
  sessionStorage.setItem('token', data.token)
  sessionStorage.setItem('refreshToken', data.refreshToken)
  sessionStorage.setItem('account', data.accountNumber)

  // Construir objeto de usuario para el contexto
  const user = {
    id: data.userId,
    comunidadUserId: data.comunidadUserId,
    accountNumber: data.accountNumber,
    userName: data.userName,
    email: data.email,
    profile: data.profile,
    profileId: data.profileId,
    comunidadUsuario: data.comunidadUsuario,
    personId: data.personId,
    idTipoUsuario: allowedAccount.idTipoUsuario,
    role: 'professor'
  }

  // Guardar usuario en sessionStorage para persistencia
  sessionStorage.setItem('user', JSON.stringify(user))

  return user
}

export const restoreSession = () => {
  const token = sessionStorage.getItem('token')
  const userStr = sessionStorage.getItem('user')
  if (token && userStr) {
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }
  return null
}

export const clearSession = () => {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('refreshToken')
  sessionStorage.removeItem('account')
  sessionStorage.removeItem('user')
}
