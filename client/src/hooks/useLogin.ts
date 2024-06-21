import { useAuth } from '../auth/AuthProvider'
import { useState } from 'react'
import type React from 'react'
import axios from 'axios'

interface UseLoginReturn {
  user: string
  setUser: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  errorString: string
  handleSubmit: (ev: React.FormEvent) => void
}

export function useLogin (): UseLoginReturn {
  const { login } = useAuth()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errorString, setErrorString] = useState('')

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault()

    void axios.post('http://172.20.1.216:4000/api/login', { user, password })
      .then(res => {
        if (res.data?.auth === true) {
          login()
          // TODO: Montamos al local storage el token de la response, tener en cuenta el el nombre 'token'
          const token: string = res.data.token
          localStorage.setItem('cartera', token) // * <==============
        }
      })
      .catch(error => {
        const errorString: string = error.response.data.message
        setErrorString(errorString)
        setTimeout(() => {
          setErrorString('')
        }, 5000)
      })
  }
  return { user, setUser, password, errorString, setPassword, handleSubmit }
}
