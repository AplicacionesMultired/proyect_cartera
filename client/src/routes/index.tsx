import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/Login'
import { Root } from './root'

// TODO: PAGES
import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/home',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />
      }
    ]
  }
])

export { router }
