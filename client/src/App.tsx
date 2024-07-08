import { ProtectedRoute } from './components/ProtectedRoutes'
import { authTokenServices } from './services/tokenServices'
import { AsignarNewBase } from './pages/AsignarNewBase'
import { BasesDetalle } from './pages/BasesDetalle'
import { Route, Routes } from 'react-router-dom'
import { BasesPage } from './pages/BasesPage'
import { useAuth } from './auth/AuthProvider'
import { NotFound } from './pages/NotFound'
import LoginPage from './pages/Login'
import { Detallado } from './pages/Home'
import { useEffect } from 'react'
import Dashboard from './pages/Dashboar'
import RecaudoDetail from './pages/RecaudoDetail'

export const HOST = 'http://172.20.1.70:4040/api/v1'

export function App (): JSX.Element {
  const { login, logout, isAuthenticated } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('cartera')
    if (token !== null) {
      authTokenServices({ token })
        .then(res => { if (res.status === 200) login(res.data) })
        .catch(error => {
          console.error(error.response.data.message)
          logout()
        })
    } else {
      console.log('No hay token')
      localStorage.removeItem('cartera')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} index />
        <Route element={<ProtectedRoute isAllowed={!isAuthenticated} redirectTo='/' />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path='/detallado' element={<Detallado />} />
          <Route path='/baseDetalle/:id' element={<BasesDetalle />} />
          <Route path='/recaudo/:id' element={<RecaudoDetail />} />
          <Route path='/Bases' element={<BasesPage />} />
          <Route path='/asignarNuevaBase' element={<AsignarNewBase />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
