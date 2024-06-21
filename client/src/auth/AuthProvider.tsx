import { createContext, useContext, useEffect, useState } from 'react'
import { autentificaToken } from '../services/tokenServices'
import { useNavigate } from 'react-router-dom'
import { type User } from '../types/user'

interface IAuthContext {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

interface Props {
  children: React.ReactNode
}

const InitialUser: User = { apellidos: '', correo: '', id: '', nombres: '', rol: '', username: '', empresa: 'Multired y Servired' }

// * Creación del contexto de autenticación
const AuthContext = createContext<IAuthContext | undefined>(undefined)

// * Definición del componente AuthProvider que provee el contexto de autenticación
export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User>(InitialUser)

  const navigate = useNavigate()

  useEffect(() => {
    // TODO: Verifica El token si existe en el local storage
    const token = localStorage.getItem('token')
    if (token !== null) {
      void autentificaToken({ token }) // * ESTA FUNCION PIDE LA API VALIDAR EL TOKEN
        .then(res => {
          if (res.status === 200) {
            login() // * Autentica al usuario si el token es válido
            setUser(res.data as User)
          }
        })
        .catch(error => {
          console.error(error.response.data.message)
          logout()
        })
    } else {
      console.log('No hay token')
    }
  }, [isAuthenticated])

  const login = (): void => {
    setIsAuthenticated(true)

    navigate('/home') // * Redirige a la ruta '/home' al autenticarse
  }
  const logout = (): void => {
    setIsAuthenticated(false)
    navigate('/') // * Redirige a la ruta '/' al cerrar sesión
    localStorage.removeItem('token') // * Elimina el token del local storage al cerrar sesión cuando expira el token ó se cierra la sesión
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// * Hook que permite acceder al contexto de autenticación
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
