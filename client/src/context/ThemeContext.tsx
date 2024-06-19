import { createContext, useState, useEffect, ReactNode, useContext } from 'react'

// Define the interface for the context value
interface ThemeContextValue {
  darkMode: boolean;
  toggleTheme: () => void;
}

// Define the interface for the ThemeProvider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Provide a default value for the context
const ThemeContext = createContext<ThemeContextValue>({
  darkMode: false,
  toggleTheme: () => {}
})

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme (): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
