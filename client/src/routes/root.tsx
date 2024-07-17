import { Navigate, Outlet } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { useAuth } from '../auth/AuthProvider'

export const Root = () => {
  const { isAuthenticated } = useAuth()

  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <section className='fixed top-0 z-50 w-full bg-punch-400 dark:bg-dark-tremor-brand-muted h-14'>
        <NavBar />
      </section>
      <section className='h-[93vh] xl:h-[92vh] overflow-auto mt-14'>
        <Outlet />
      </section>
    </>
  )
}
