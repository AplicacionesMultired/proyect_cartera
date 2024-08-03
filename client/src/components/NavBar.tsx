import { ToggleDarkMode } from './ui/ToggleDarkMode'
import { NavLink } from 'react-router-dom'
import { Button } from './ui'
import axios from 'axios'

const Links = [
  { link: '/cartera', name: 'Inicio' },
  { link: '/cartera/detallado', name: 'Detallado' },
  { link: '/cartera/bases', name: 'Bases' }
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
    axios.get('/logout')
      .then((res) => {
        if (res.status === 200) {
          window.location.reload()
        }
      })
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
