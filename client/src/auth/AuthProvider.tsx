import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type User } from '../types/user'

interface IAuthContext {
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

const InitialUser: User = { apellidos: '', correo: '', id: '', nombres: '', rol: '', username: '', empresa: 'Multired y Servired' }

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User>(InitialUser)

  const navigate = useNavigate()

  const login = (user: User) => {
    setIsAuthenticated(true)
    setUser(user)
    navigate('/home')
  }
  const logout = (): void => {
    setIsAuthenticated(false)
    navigate('/')
    localStorage.removeItem('cartera')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
