import './ToggleDarkMode.css' // Asegúrate de importar el CSS
import { MoonIcon, SunIcon } from '../icons'
import { useTheme } from '../../context/ThemeContext'

export const ToggleDarkMode = (): JSX.Element => {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <label className="toggle-label flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={darkMode} onChange={toggleTheme} />
        <div className={`block w-14 h-8 rounded-full transition-colors ${darkMode ? 'bg-gray-800' : 'bg-punch-300'}`}></div>
        <div className={`dot absolute top-1 bg-white w-6 h-6 rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}>
          {darkMode
            ? <p className='text-slate-700'><MoonIcon /></p>
            : <p className='text-yellow-500'><SunIcon /></p>
          }
        </div>
      </div>
    </label>
  )
}
