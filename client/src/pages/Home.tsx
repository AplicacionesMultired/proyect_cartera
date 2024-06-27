import { HeaderCompCartera } from '../components/HeaderCompCartera'
import { TableDatos } from '../components/TableDatos'
import { useEffect, useState } from 'react'
import { CarteraI } from '../types/cartera'
import { HOST } from '../App'
import axios from 'axios'

export const Home = () => {
  const [empresa, setEmpresa] = useState<string>('0')
  const [abs, setAbs] = useState<boolean>(false)

  const [orden, setOrden] = useState<'asc' | 'desc' | ''>('')

  const handleClickOrden = () => {
    setOrden(prevOrden => {
      switch (prevOrden) {
        case '':
          return 'asc'
        case 'asc':
          return 'desc'
        case 'desc':
          return ''
        default:
          return ''
      }
    })
  }

  const [data, setData] = useState<CarteraI[]>([])
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

  // Paso 2: Crear función de ordenamiento
  const ordenarCartera = (data: CarteraI[]) => {
    if (orden === '') {
      return [...data] // Retorna una copia de los datos sin ordenar si el estado es ''
    }
    return [...data].sort((a, b) => { // Crea una copia de la data antes de ordenar
      if (orden === 'asc') {
        return a.SALDO_ANT - b.SALDO_ANT
      } else {
        return b.SALDO_ANT - a.SALDO_ANT
      }
    })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinculado(e.target.value)
  }

  const filterVinculado = (data: CarteraI[]) => {
    if (!vinculado) return data // Si vinculado está vacío, retorna todos los datos
    return data.filter(item => item.VINCULADO.toLowerCase().includes(vinculado.toLowerCase())) // Usa includes para una búsqueda parcial
  }

  const dataOrdenadaYFiltrada = filterVinculado(orden === '' ? data : ordenarCartera(data))

  return (
    data && (
      <section className='relative'>
        <HeaderCompCartera data={dataOrdenadaYFiltrada} funEmpresa={setEmpresa} funABS={setAbs} funFilter={handleChange} vinculado={vinculado}/>
        <TableDatos data={dataOrdenadaYFiltrada} funSort={handleClickOrden} valueOrder={orden}/>
      </section>
    )
  )
}
