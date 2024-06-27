import { authTokenServices } from '../services/tokenServices'
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

    axios.post('http://172.20.1.216:4000/api/login', { user, password })
      .then(res => {
        if (res.status === 200 && res.data.auth === true) {
          localStorage.setItem('cartera', res.data.token)
          authTokenServices({ token: res.data.token })
            .then(res => {
              if (res.status === 200) {
                login(res.data)
              }
            })
            .catch(error => {
              console.error(error.response.data.message)
            })
        }
      }
      )
      .catch(error => {
        const errorString: string = error.response.data.message
        setErrorString(errorString)
      })
      .finally(() => {
        setTimeout(() => {
          setErrorString('')
        }, 5000)
      })
  }
  return { user, setUser, password, errorString, setPassword, handleSubmit }
}
