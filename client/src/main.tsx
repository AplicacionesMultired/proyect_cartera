import { ThemeProvider } from './context/ThemeContext.tsx'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { route } from './routes/routes'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={route} />
    </ThemeProvider>
  </React.StrictMode>
)
