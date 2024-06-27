import { Navigate, Outlet } from 'react-router-dom'
import { type FC } from 'react'
import NavBar from './NavBar'

interface ProtectedRouteProps {
  redirectTo?: string
  isAllowed: boolean
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ isAllowed, redirectTo = '/' }) => {
  if (isAllowed) {
    return <Navigate to={redirectTo} />
  }

  return (
    <>
      <section className='fixed top-0 z-50 w-full bg-punch-200 dark:bg-dark-tremor-brand-muted'>
        <NavBar />
      </section>
      <section className='dark:bg-slate-700 h-[100vh] overflow-auto pt-12'>
        <Outlet />
      </section>
    </>
  )
}
