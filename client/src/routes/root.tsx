import { authTokenServices } from '../services/tokenServices'
import { useAuth } from '../auth/AuthProvider'
import { NavBar } from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

export const Root = () => {
  const token = localStorage.getItem('cartera')
  const { setUser } = useAuth()

  useEffect(() => {
    if (!token) {
      window.location.href = '/login'
    } else {
      authTokenServices({ token })
        .then(res => {
          if (res.status === 200) {
            setUser(res.data)
          }
        })
        .catch(error => {
          console.error(error)
          window.location.href = '/login'
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

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
