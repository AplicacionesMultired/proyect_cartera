import { ProtectedRoute } from './components/ProtectedRoutes'
import { BasesDetalle } from './pages/BasesDetalle'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from './auth/AuthProvider'
import LoginPage from './pages/Login'
import { Home } from './pages/Home'
import { useEffect } from 'react'
import { authTokenServices } from './services/tokenServices'

export const HOST = 'http://172.20.1.110:4040'

export function App (): JSX.Element {
  const { login, logout, isAuthenticated } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('cartera')
    if (token !== null) {
      authTokenServices({ token })
        .then(res => {
          if (res.status === 200) {
            login(res.data)
          }
        })
        .catch(error => {
          console.error(error.response.data.message)
          logout()
        })
    } else {
      console.log('No hay token')
      localStorage.removeItem('cartera')
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} index />
        <Route element={<ProtectedRoute isAllowed={!isAuthenticated} redirectTo='/' />}>
          <Route path="/home" element={<Home />} />
          <Route path='/baseDetalle/:id' element={<BasesDetalle />} />
        </Route>
      </Routes>
    </>
  )
}
