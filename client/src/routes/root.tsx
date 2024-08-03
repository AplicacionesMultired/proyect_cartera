import { NavBar } from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import axios from 'axios'

const Root = () => {
  useEffect(() => {
    axios.get('/profile', { withCredentials: true })
      .then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
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
