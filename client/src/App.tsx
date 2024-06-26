import { ProtectedRoute } from './components/ProtectedRoutes'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from './auth/AuthProvider'
import LoginPage from './pages/Login'
import { Home } from './pages/Home'
import { BasesDetalle } from './pages/BasesDetalle'

export const HOST = 'http://172.20.1.70:4040'

export function App (): JSX.Element {
  const { isAuthenticated } = useAuth()

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
