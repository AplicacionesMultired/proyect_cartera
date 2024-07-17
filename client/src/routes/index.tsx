import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/Login'
import { Root } from './root'

// TODO: PAGES
import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboar'
import Detallado from '../pages/Home'
import BasesPage from '../pages/BasesPage'
import BasesDetalle from '../pages/BasesDetalle'
import AsignarNewBase from '../pages/AsignarNewBase'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <NotFound />
  },
  {
    path: '/cartera',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'detallado',
        element: <Detallado />
      },
      {
        path: 'bases',
        element: <BasesPage />
      },
      {
        path: 'base/:id',
        element: <BasesDetalle />
      },
      {
        path: 'asignarNuevaBase',
        element: <AsignarNewBase />
      }
    ]
  }
])

export { router }
