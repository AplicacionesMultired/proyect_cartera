import { createBrowserRouter } from 'react-router-dom'
import { Root } from './root'
import LoginPage from '../pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root isAllowed={false} redirectTo='/login' />
  },
  {
    path: '/login',
    element: <LoginPage />
  }

])

export { router }
