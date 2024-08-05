import { ToggleDarkMode } from './ui/ToggleDarkMode'
import { LOGIN_URL } from '../utils/contanst'
import { NavLink } from 'react-router-dom'
import { Button } from './ui'
import axios from 'axios'

const Links = [
  { link: '/', name: 'Inicio' },
  { link: '/detallado', name: 'Detallado' },
  { link: '/bases', name: 'Bases' }
]

const LinkComponent = ({ link, name }: { link: string, name: string }) => {
  return (
    <li className='dark:text-white font-medium hover:text-yellow-200 dark:hover:text-yellow-200 text-md xl:text-lg '>
      <NavLink to={link}>{name}</NavLink>
    </li>
  )
}

export function NavBar () {
  const handleLogout = () => {
    axios.post(`${LOGIN_URL}/logout`)
      .then(() => console.log('logout'))
      .catch(err => console.log(err))
  }

  return (
    <>
      <ul className='flex items-center justify-around py-1'>
        <figure className=''>
          <img src="/gane.webp" alt="logo de gane" className='w-24 py-2 lg:w-22 ' loading='lazy' />
        </figure>

        <div className='flex gap-4'>
          {Links.map((link, index) => <LinkComponent key={index} link={link.link} name={link.name} />)}
        </div>

        <div className='flex flex-col items-center'>
          <ToggleDarkMode />
        </div>

        <Button onClick={handleLogout}>Sing out</Button>
      </ul>
    </>
  )
}
