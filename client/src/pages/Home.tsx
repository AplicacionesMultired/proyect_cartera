import { HeaderCompCartera } from '../components/HeaderCompCartera'
import { TableDatos } from '../components/TableDatos'
import { useEffect, useState } from 'react'
import { CarteraI } from '../types/cartera'
import axios from 'axios'

export const Home = () => {
  const [data, setData] = useState<CarteraI[]>([])

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://172.20.1.110:3030/cartera')
        .then(res => {
          setData(res.data)
        })
        .catch(err => console.log(err))
    }

    fetchData()
    const interval = setInterval(fetchData, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new window.FormData(e.target as HTMLFormElement)
    const vinculado = data.get('viculado') as string

    axios.get(`http://172.20.1.110:3030/cartera/${vinculado}`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.log(err))
  }

  return (
    data && (
      <>
        <HeaderCompCartera data={data} funSearch={handleSearch} />
        <TableDatos data={data} />
      </>
    )
  )
}
