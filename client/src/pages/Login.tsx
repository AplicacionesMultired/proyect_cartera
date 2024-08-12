/* eslint-disable react-hooks/exhaustive-deps */
import { UserIcon, LockIcon } from '../components/icons'
import { Input, Button, Label } from '../components/ui'
import { useAuth } from '../auth/AuthProvider'
import { toast, Toaster } from 'sonner'
import { useState } from 'react'
import axios from 'axios'

import { LOGIN_URL } from '../utils/contanst'

function LoginPage (): JSX.Element {
  const { setIsAuthenticated, setUser: setUserContext } = useAuth()
  const [errorString, setErrorString] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()

    axios.post(`${LOGIN_URL}/login`, { username: user, password, app: 'cartera' })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
          setUserContext(res.data.usuario)
        }
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error') {
          setErrorString('Error de conexión, y/o Red, contacte al administrador del sistema')
          return
        }
        setErrorString(error.response.data)
      })
      .finally(() => {
        setTimeout(() => {
          setErrorString('')
        }, 4000)
      })
  }

  return (
    <section className="w-screen h-screen flex bg-gradient-to-b from-gray-200 to-gray-300 relative">
      <figure className='w-full'>
        <img src="logo.webp" alt="logo para cartera" className='h-full' loading='lazy'/>
      </figure>

      <section className='w-full grid place-content-center'>
        <form className='min-w-96 flex flex-col gap-8' onSubmit={handleSubmit}>
          <figure className='flex items-center justify-center'>
            <img src="/gane.webp" alt="logo de gane" className='w-[220px] ' />
          </figure>
          <article className='flex flex-col gap-1 text-md lg:text-lg 2xl:text-2xl'>
            <Label>Usuario: </Label>
            <div className='flex items-center gap-2 w-full justify-around px-2'>
              <UserIcon />
              <Input name='username' type='text' placeholder='CP1118342523' required
                autoComplete='username' value={user} onChange={(ev) => { setUser(ev.target.value) }} />
            </div>
          </article>

          <article className='flex flex-col gap-1 text-md lg:text-lg 2xl:text-2xl'>
            <Label>Contraseña:</Label>
            <div className='flex items-center gap-2 w-full justify-around px-2'>
              <LockIcon />
              <Input name='contraseña' type='password' placeholder='***********' required
                autoComplete='contraseña' value={password} onChange={(ev) => { setPassword(ev.target.value) }} />
            </div>
          </article>

          <Button>Iniciar Sesión</Button>

        </form >
      </section>

      {errorString && toast.error(errorString, { description: 'Error al Iniciar Sesion', id: ' ', duration: 5000 })}

      <Toaster position='top-right' duration={4000} />

    </section >
  )
}

export default LoginPage
