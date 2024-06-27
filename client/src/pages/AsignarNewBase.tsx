import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from '@tremor/react'
import { Input, Label } from '../components/ui'
import { useEffect, useState } from 'react'
import { HOST } from '../App'
import axios from 'axios'

interface UserSinBase {
  EMPRESA: '101' | '102'
  CUENTA: string
  VINCULADO: string
  Seller: {
    NOMBRES: string
  }
  Basis: null
}

interface PropsCrating {
  nombres: string
  vinculado: string
  funClose?: () => void
}

function FormCreate ({ nombres, vinculado, funClose }: PropsCrating) {
  const [base, setBase] = useState<number>(0)

  return (
    <section className='flex items-center justify-center w-full h-full bg-slate-900 bg-opacity-50 z-20 absolute top-1'>
      <Card className="bg-blue-200 z-30 w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 p-5 flex flex-col items-center justify-center">
        <Button onClick={funClose} color='red'>Cerrar</Button>
        <h3 className='text-center text-xl font-semibold my-4'>Asignación Nueva Base a Vinculado</h3>
        <div className='w-full flex flex-col items-center'>
          <div className="w-full mb-4">
            <Label>Nombres</Label>
            <Input type="text" value={nombres} readOnly/>
          </div>
          <div className="w-full mb-4">
            <Label>N° Cédula</Label>
            <Input type="text" value={vinculado} readOnly/>
          </div>
          <div className="w-full mb-4">
            <Label>Valor Base</Label>
            <Input type='number' value={base} onChange={ev => setBase(parseInt(ev.target.value))}/>
          </div>
          <Button>Asignar Base</Button>
        </div>
      </Card>
    </section>
  )
}

export const AsignarNewBase = () => {
  const [data, setData] = useState<UserSinBase[]>([])
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState<PropsCrating | null>(null)

  useEffect(() => {
    axios.get(`${HOST}/usersSinBase`)
      .then(res => setData(res.data))
      .catch(error => console.error(error))
  }, [])

  const handleAssignClick = (item: UserSinBase) => {
    setSelectedItem({
      nombres: item.Seller.NOMBRES,
      vinculado: item.VINCULADO
    })
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedItem(null)
  }

  return (
    <section className='w-full relative'>
      <Card className='h-[94vh] overflow-y-auto '>
        <Title className='text-center'>Vinculado Sin Base Asingada </Title>
        <Table className="">
          <TableHead>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Nombres</TableHeaderCell>
              <TableHeaderCell>N° Cédula</TableHeaderCell>
              <TableHeaderCell>Empresa</TableHeaderCell>
              <TableHeaderCell>Opciones</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.Seller.NOMBRES}</TableCell>
                <TableCell>{item.VINCULADO}</TableCell>
                <TableCell>{item.EMPRESA === '101' ? 'Servired' : 'Multired'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleAssignClick(item)}>Asignar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {showForm && selectedItem && (<FormCreate nombres={selectedItem.nombres} vinculado={selectedItem.vinculado} funClose={handleCloseForm} />)}
    </section>
  )
}
