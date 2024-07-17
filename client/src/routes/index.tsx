import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/Login'
import { Root } from './root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/home',
    element: <Root />
  }
])

export { router }
