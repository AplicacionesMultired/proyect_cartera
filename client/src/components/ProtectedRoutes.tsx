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
      <section className='fixed top-0 z-50 w-full bg-punch-400 dark:bg-dark-tremor-brand-muted h-14'>
        <NavBar />
      </section>
      <section className='dark:bg-slate-700 h-[100vh] overflow-auto pt-[3.6rem]'>
        <Outlet />
      </section>
    </>
  )
}
