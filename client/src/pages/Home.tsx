import { HeaderCompCartera } from '../components/HeaderCompCartera'
import { TableDatos } from '../components/TableDatos'
import { useEffect, useState } from 'react'
import { CarteraI } from '../types/cartera'
import { HOST } from '../App'
import axios from 'axios'

export const Home = () => {
  const [empresa, setEmpresa] = useState<string>('0')
  const [data, setData] = useState<CarteraI[]>([])
  const [abs, setAbs] = useState<boolean>(false)
  const [vinculado, setVinculado] = useState<string>('')

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${HOST}/cartera?empresa=${empresa}&abs=${abs}`)
        .then(res => {
          setData(res.data)
        })
        .catch(err => console.log(err))
    }

    fetchData()
    const interval = setInterval(fetchData, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [empresa, abs])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinculado(e.target.value)
  }

  // Función para filtrar los datos basados en el estado vinculado
  const filterVinculado = (data: CarteraI[]) => {
    if (!vinculado) return data // Si vinculado está vacío, retorna todos los datos
    return data.filter(item => item.VINCULADO.toLowerCase().includes(vinculado.toLowerCase())) // Usa includes para una búsqueda parcial
  }

  const filteredData = filterVinculado(data)

  return (
    data && (
      <section className='relative'>
        <HeaderCompCartera data={filteredData} funEmpresa={setEmpresa} funABS={setAbs} funFilter={handleChange} vinculado={vinculado}/>
        <TableDatos data={filteredData} />
      </section>
    )
  )
}
