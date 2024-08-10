/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import Root from './root'

// TODO: PAGES
const NotFound = lazy(() => import('../pages/NotFound'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Detallado = lazy(() => import('../pages/Home'))
const BasesPage = lazy(() => import('../pages/BasesPage'))
const BasesDetalle = lazy(() => import('../pages/BasesDetalle'))
const AsignarNewBase = lazy(() => import('../pages/AsignarNewBase'))
const RecaudoDetail = lazy(() => import('../pages/RecaudoDetail'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
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
      },
      {
        path: 'recaudo/:id/:estado',
        element: <RecaudoDetail />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export default router
