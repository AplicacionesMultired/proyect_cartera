import { authTokenServices } from '../services/tokenServices'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { NavBar } from '../components/NavBar'
import { Suspense, useEffect } from 'react'

const Root = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('cartera')
    if (token) {
      authTokenServices({ token })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            setUser(res.data)
            navigate('/cartera')
          }
        })
        .catch(error => {
          console.error(error)
          if (error.response.status === 401) {
            localStorage.removeItem('cartera')
            navigate('/')
          }
        })
    } else {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
