import { useTheme } from '../context/ThemeContext'
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
      <NavLink to={`${link}`} className='text-gray-800 font-medium hover:text-rose-500 lg:text-xl dark:text-white'>{name}</NavLink>
    </li>
  )
}

function NavBar (): JSX.Element {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <nav className='border-t-4 mb-1 border-rose-500 rounded-lg bg-white dark:bg-dark-tremor-brand-faint'>
      <ul className='flex justify-around items-center'>

        <figure className=''>
          <img src="/gane.webp" alt="logo de gane" className='w-24 py-2 lg:w-20 xl:w-24 2xl:w-28 ' />
        </figure>

        <div className='flex gap-4'>
          {Links.map((link, index) => <LinkComponent key={index} link={link.link} name={link.name} />)}
        </div>

        <div className='flex flex-col items-center'>
          <p className='dark:text-white'>{darkMode ? 'Cambiar Modo Claro' : 'Cambiar Modo Oscuro'}</p>
          <Switch onChange={toggleTheme} />
        </div>

        <Button>Cerrar Sesión</Button>
      </ul>
    </nav>
  )
}

export default NavBar
