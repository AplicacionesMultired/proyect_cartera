import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../auth/AuthProvider'
import { NavLink } from 'react-router-dom'
import { Switch } from '@tremor/react'
import { Button } from './ui'

const Links = [
  { link: '/home', name: 'Inicio' },
  { link: '/detalles', name: 'Detalles' }
]

const LinkComponent = ({ link, name }: { link: string, name: string }): JSX.Element => {
  return (
    <li>
      <NavLink to={`${link}`} className='text-gray-800 font-medium hover:text-rose-100 lg:text-xl dark:text-white'>{name}</NavLink>
    </li>
  )
}

function NavBar (): JSX.Element {
  const { darkMode, toggleTheme } = useTheme()
  const { logout } = useAuth()

  return (
    <>
      <ul className='flex justify-around items-center'>
        <figure className=''>
          <img src="/gane.webp" alt="logo de gane" className='w-20 py-2 lg:w-22 ' />
        </figure>

        <div className='flex gap-4'>
          {Links.map((link, index) => <LinkComponent key={index} link={link.link} name={link.name} />)}
        </div>

        <div className='flex flex-col items-center'>
          <p className='dark:text-white'>{darkMode ? 'Cambiar Modo Claro' : 'Cambiar Modo Oscuro'}</p>
          <Switch onChange={toggleTheme} />
        </div>

        <Button onClick={logout}>Cerrar Sesión</Button>
      </ul>
    </>
  )
}

export default NavBar
