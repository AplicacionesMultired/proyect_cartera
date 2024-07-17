import { NavBar } from '../components/NavBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'

export const Root = () => {
  const token = localStorage.getItem('cartera')

  useEffect(() => {
    console.log(token)
  }, [token])

  return (
    token !== null
      ? (
        <>
          <section className='fixed top-0 z-50 w-full bg-punch-400 dark:bg-dark-tremor-brand-muted h-14'>
            <NavBar />
          </section>
          <section className='h-[93vh] xl:h-[92vh] overflow-auto mt-14'>
            <Outlet />
          </section>
        </>
        )
      : (
        <Navigate to='/login' />
        )
  )
}
