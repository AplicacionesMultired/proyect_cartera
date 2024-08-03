import { useAuth } from '../auth/AuthProvider'
import { NavBar } from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import LoginPage from '../pages/Login'
import { Suspense } from 'react'

const Root = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <>
      <section className='bg-punch-300 dark:bg-dark-tremor-brand-faint'>
        <NavBar />
      </section>
      <Suspense fallback={<div>Cargando ...</div>}>
        <section className='pt-1'>
          <Outlet />
        </section>
      </Suspense>
    </>

  )
}

export default Root
