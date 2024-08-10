import { useAuth } from '../auth/AuthProvider'
import { NavBar } from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import LoginPage from '../pages/Login'
import { Suspense } from 'react'
import { Toaster } from 'sonner'

const Root = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <>
      <NavBar />
      <Suspense fallback={<div>Cargando ...</div>}>
        <section className='pt-1'>
          <Outlet />
        </section>
      </Suspense>
      <Toaster position='top-right' duration={3000} />
    </>
  )
}

export default Root
