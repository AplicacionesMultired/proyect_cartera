import { ToggleDarkMode } from './ui/ToggleDarkMode'
import { useAuth } from '../auth/AuthProvider'
import { NavLink } from 'react-router-dom'
import { Button } from './ui'

const Links = [
  { link: '/home', name: 'Inicio' }
]

const LinkComponent = ({ link, name }: { link: string, name: string }): JSX.Element => {
  return (
    <li className='flex gap-4'>
      <NavLink to={`${link}`} className='text-gray-800 font-medium hover:text-blue-600 hover:underline lg:text-xl dark:text-white'>{name}</NavLink>
    </li>
  )
}

function NavBar (): JSX.Element {
  const { logout } = useAuth()

  return (
    <>
      <ul className='flex justify-around items-center'>
        <figure className=''>
          <img src="/gane.webp" alt="logo de gane" className='w-20 py-2 lg:w-22 ' loading='lazy' />
        </figure>

        {Links.map((link, index) => <LinkComponent key={index} link={link.link} name={link.name} />)}

        <div className='flex flex-col items-center'>
          <ToggleDarkMode />
        </div>

        <Button onClick={logout}>Cerrar Sesión</Button>
      </ul>
    </>
  )
}

export default NavBar
