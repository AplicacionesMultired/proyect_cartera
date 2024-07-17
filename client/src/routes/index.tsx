/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../pages/Login'
import { lazy, Suspense } from 'react'
import { Root } from './root'

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
    element: <LoginPage />,
    errorElement: <Suspense fallback={<div>Cargando...</div>}><NotFound /></Suspense>
  },
  {
    path: '/cartera',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Cargando...</div>}><Dashboard /></Suspense>
      },
      {
        path: 'detallado',
        element: <Suspense fallback={<div>Cargando...</div>}><Detallado /></Suspense>
      },
      {
        path: 'bases',
        element: <Suspense fallback={<div>Cargando...</div>}><BasesPage /></Suspense>
      },
      {
        path: 'base/:id',
        element: <Suspense fallback={<div>Cargando...</div>}><BasesDetalle /></Suspense>
      },
      {
        path: 'asignarNuevaBase',
        element: <Suspense fallback={<div>Cargando...</div>}><AsignarNewBase /></Suspense>
      },
      {
        path: 'recaudo/:id/:estado',
        element: <Suspense fallback={<div>Cargando...</div>}><RecaudoDetail /></Suspense>
      },
      {
        path: '*',
        element: <Suspense fallback={<div>Cargando...</div>}><NotFound /></Suspense>
      }
    ]
  }
])

export default router
