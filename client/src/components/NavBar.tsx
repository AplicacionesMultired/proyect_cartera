import { ToggleDarkMode } from './ui/ToggleDarkMode'
import { useAuth } from '../auth/AuthProvider'
import { NavLink } from 'react-router-dom'
import { Button } from './ui'

const Links = [
  { link: '/home', name: 'Inicio' },
  { link: '/bases', name: 'Bases' },
  { link: '/reportes', name: 'Reportes' }
]

const LinkComponent = ({ link, name }: { link: string, name: string }): JSX.Element => {
  return (
    <li className='text-white font-medium hover:text-yellow-200 dark:hover:text-yellow-200'>
      <NavLink to={link}>{name}</NavLink>
    </li>
  )
}

function NavBar (): JSX.Element {
  const { logout } = useAuth()

  return (
    <>
      <ul className='flex justify-around items-center mt-1'>
        <figure className=''>
          <img src="/gane.webp" alt="logo de gane" className='w-20 py-2 lg:w-22 ' loading='lazy' />
        </figure>

        <div className='flex gap-4'>
          {Links.map((link, index) => <LinkComponent key={index} link={link.link} name={link.name} />)}
        </div>

        <div className='flex flex-col items-center'>
          <ToggleDarkMode />
        </div>

        <Button onClick={logout}>Cerrar Sesión</Button>
      </ul>
    </>
  )
}

export default NavBar
