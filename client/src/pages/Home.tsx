import { HeaderCompCartera } from '../components/HeaderCompCartera'
import { TableDatos } from '../components/TableDatos'
import { useEffect, useState } from 'react'
import { CarteraI } from '../types/cartera'
import axios from 'axios'

export const Home = () => {
  const [data, setData] = useState<CarteraI[]>([])
  const [error, setError] = useState<string | null>(null)

  const [empresa, setEmpresa] = useState<string>('0')
  const [abs, setAbs] = useState<boolean>(false)

  const [reset, setReset] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://172.20.1.110:3030/cartera?empresa=${empresa}&abs=${abs}`)
        .then(res => {
          setData(res.data)
        })
        .catch(err => console.log(err))
    }

    fetchData()
    const interval = setInterval(fetchData, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [empresa, abs, reset])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new window.FormData(e.target as HTMLFormElement)
    const vinculado = data.get('viculado') as string

    axios.get(`http://172.20.1.110:3030/cartera/${vinculado}`)
      .then(res => {
        if (res.status === 200) {
          setData(res.data)
        }
      })
      .catch(err => {
        console.log(err)
        setError('No se encontraron datos para el vinculado ingresado, por favor verifique e intente de nuevo...')
      })
      .finally(() => {
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }

  const handleReset = () => {
    setReset(!reset)
  }

  return (
    data && (
      <section className='relative'>
        <HeaderCompCartera data={data} funSearch={handleSearch} funEmpresa={setEmpresa} funABS={setAbs} funReset={handleReset}/>
        <TableDatos data={data} />

        {
          error && (
            <div className='absolute bottom-2 right-2 z-20 bg-yellow-200 rounded-lg'>
              <p className='p-4 text-lg font-semibold'>{error}</p>
            </div>
          )
        }

      </section>
    )
  )
}
