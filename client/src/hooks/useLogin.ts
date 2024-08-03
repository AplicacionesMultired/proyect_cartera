import { useNavigate } from 'react-router-dom'
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
  const [errorString, setErrorString] = useState('')
  const [password, setPassword] = useState('')
  const { setIsAuthenticated } = useAuth()
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()

    axios.post('/login', { username: user, password })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
          navigate('/cartera')
        }
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error') {
          setErrorString('Error de conexión, y/o Red, contacte al administrador del sistema')
          return
        }
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
