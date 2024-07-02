import { useEffect, useState } from 'react'
import { CarteraI } from '../types/cartera'
import axios from 'axios'
import { HOST } from '../App'

export const useCartera = () => {
  const [empresa, setEmpresa] = useState<string>('0')
  const [abs, setAbs] = useState<boolean>(false)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinculado(e.target.value)
  }

  const filterVinculado = () => {
    if (!vinculado) return data // Si vinculado está vacío, retorna todos los datos
    return data.filter(item => item.Vinculado.toLowerCase().includes(vinculado.toLowerCase())) // Usa includes para una búsqueda parcial
  }

  const handleClick = (ev: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
    console.log(ev.currentTarget.id)
  }

  return { filterVinculado, handleChange, setAbs, setEmpresa, vinculado, handleClick }
}
