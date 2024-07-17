import { ToggleDarkMode } from './ui/ToggleDarkMode'
import { NavLink } from 'react-router-dom'
import { Button } from './ui'

const Links = [
  { link: '/cartera', name: 'Inicio' },
  { link: '/cartera/detallado', name: 'Detallado' },
  { link: '/cartera/bases', name: 'Bases' }
]

const LinkComponent = ({ link, name }: { link: string, name: string }): JSX.Element => {
  return (
    <li className='text-white font-medium hover:text-yellow-200 dark:hover:text-yellow-200'>
      <NavLink to={link}>{name}</NavLink>
    </li>
  )
}

function NavBar (): JSX.Element {
  const handleLogout = () => {
    localStorage.removeItem('cartera')
    window.location.href = '/'
  }

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

        <Button onClick={handleLogout}>Cerrar Sesión</Button>
      </ul>
    </>
  )
}

export { NavBar }
