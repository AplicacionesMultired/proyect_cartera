import { useEffect, useState } from 'react'
import { CarteraI } from '../types/cartera'
import axios from 'axios'
import { HOST } from '../App'

export const useCartera = () => {
  const [empresa, setEmpresa] = useState<string>('0')
  const [abs, setAbs] = useState<boolean>(false)
  const [orden, setOrden] = useState<'asc' | 'desc' | ''>('')

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

  // Paso 2: Crear función de ordenamiento
  const ordenarCartera = (data: CarteraI[]) => {
    if (orden === '') {
      return [...data]
    }
    return [...data].sort((a, b) => {
      if (orden === 'asc') {
        return a.SaldoAnt - b.SaldoAnt
      } else {
        return b.SaldoAnt - a.SaldoAnt
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinculado(e.target.value)
  }

  const filterVinculado = (data: CarteraI[]) => {
    if (!vinculado) return data // Si vinculado está vacío, retorna todos los datos
    return data.filter(item => item.Vinculado.toLowerCase().includes(vinculado.toLowerCase())) // Usa includes para una búsqueda parcial
  }

  const dataOrdenadaYFiltrada = filterVinculado(orden === '' ? data : ordenarCartera(data))

  return { dataOrdenadaYFiltrada, handleChange, handleClickOrden, orden, setAbs, setEmpresa, vinculado }
}
