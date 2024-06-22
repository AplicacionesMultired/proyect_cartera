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
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
