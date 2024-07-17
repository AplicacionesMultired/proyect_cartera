/*
import { ThemeProvider } from './context/ThemeContext.tsx'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'

import { AuthProvider } from './auth/AuthProvider.tsx'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
*/

import { AuthProvider } from './auth/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { router } from './routes'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
