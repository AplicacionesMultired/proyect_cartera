import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { formatPesoColombia } from '../utils/funtions'
import { Input, Label } from '../components/ui'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { RiLockLine } from '@remixicon/react'
import { useEffect, useState } from 'react'
import { BasesI } from '../types/Bases'
import { HOST } from '../App'
import axios from 'axios'

export const BasesPage = () => {
  const [data, setData] = useState<BasesI[]>([])
  const { user } = useAuth()
  const navigate = useNavigate()

  const [vinculado, setVinculado] = useState<string>('')

  useEffect(() => {
    axios.get(`${HOST}/getAllBases`)
      .then(response => setData(response.data))
      .catch(error => console.log(error))
  }, [])

  const handleClick = (id: string) => {
    return () => navigate(`/baseDetalle/${id}`)
  }

  const handleCreateBase = () => {
    return navigate('/asignarNuevaBase')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVinculado(e.target.value)
  }

  const filterVinculado = (data: BasesI[]) => {
    if (!vinculado) return data // Si vinculado está vacío, retorna todos los datos
    return data.filter(item => item.VINCULADO.toLowerCase().includes(vinculado.toLowerCase())) // Usa includes para una búsqueda parcial
  }

  const filteredData = filterVinculado(data)

  return (
    <Card>
      <section className="flex items-center justify-around py-2 px-4 gap-2 bg-gray-300 rounded-lg">
        <div className='flex items-center gap-2 w-96'>
          <Label>Vinculado: </Label>
          <Input type="text" placeholder="Buscar por cédula" onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md" value={vinculado} />
        </div>
        {
          user.rol === 'Administrador'
            ? <Button color='emerald' onClick={handleCreateBase}>Asignar Nueva Base</Button>
            : <Button variant="secondary" color='red' size="sm" icon={RiLockLine}></Button>
        }
      </section>
      <Table className="max-h-[82vh]">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombres</TableHeaderCell>
            <TableHeaderCell>N° Cedula</TableHeaderCell>
            <TableHeaderCell>Base Asignada</TableHeaderCell>
            <TableHeaderCell>Opciones</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item.VINCULADO}>
              <TableCell>{item.Seller.NOMBRES}</TableCell>
              <TableCell>
                {item.VINCULADO}
              </TableCell>
              <TableCell>
                {formatPesoColombia(item.BASE)}
              </TableCell>
              <TableCell>
                {
                  user.rol === 'Administrador'
                    ? <Button variant="secondary" color='yellow' size="sm" onClick={handleClick(item.VINCULADO)}>Actualizar</Button>
                    : <Button variant="secondary" color='red' size="sm" icon={RiLockLine}></Button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Card>
  )
}
