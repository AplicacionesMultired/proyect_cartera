import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/Login'
import { Root } from './root'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/login',
    element: <LoginPage />
  }

])

export { router }
