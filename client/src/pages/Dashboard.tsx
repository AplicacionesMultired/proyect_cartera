import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from '@tremor/react'
import { formatPesoColombia } from '../utils/funtions'
import { TableInfo } from '../components/TableInfo'
import { RecaudoI } from '../types/interface'
import { useEffect, useState } from 'react'
import { API_URL } from '../utils/contanst'
import axios from 'axios'

export interface DataIU {
  Empresa: string;
  Caj_Comercial: number;
  Colo_Independiente: number;
  Caj_Tesoreria: number;
  Vendedor: number;
  No_Definido: number;
}

const estadoMap: { [key: string]: string } = {
  u: 'Aceptado',
  r: 'Rechazado',
  c: 'Liberado',
  p: 'Pendiente'
}

const getEstadoClass = (estado: string): string => {
  switch (estado) {
    case 'u':
      return 'text-green-600'
    case 'r':
      return 'text-red-600'
    case 'c':
      return 'text-blue-600'
    default:
      return 'text-yellow-600'
  }
}

const RenderEstado = ({ estado }: { estado: string }) => {
  return (
    <p className={getEstadoClass(estado)}>
      {estadoMap[estado] || 'Pendiente'}
    </p>
  )
}

function Dashboard () {
  const [data, setData] = useState<DataIU[]>([])
  const [recaudo, setRecaudo] = useState<RecaudoI>({ multired: [], servired: [] })

  useEffect(() => {
    axios.get(`${API_URL}/resumenCartera`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    axios.get(`${API_URL}/resumenRecaudo`)
      .then((res) => {
        setRecaudo(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <Card className='flex w-full gap-2'>
        <TableInfo data={data} />
      </Card>

      <Card className='flex justify-around'>
        {
          recaudo.multired.length > 0 && (
            <section className=''>
              <Title className='text-center py-2'>Resumen Recaudo Multired</Title>
              <Table className="mt-5">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Cantidad Recuado</TableHeaderCell>
                    <TableHeaderCell className='text-center'>Total</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    recaudo.multired.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className='text-center'>
                          <RenderEstado estado={item.ESTADO} />
                        </TableCell>
                        <TableCell className='text-center'>{item.Cantidad}</TableCell>
                        <TableCell className='text-center'>{formatPesoColombia(item.Total)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </section>
          )
        }

        {
          recaudo.multired.length > 0 && (
            <section className=''>
              <Title className='text-center py-2'>Resumen Recaudo Servired</Title>
              <Table className="mt-5">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Estado</TableHeaderCell>
                    <TableHeaderCell>Cantidad Recuado</TableHeaderCell>
                    <TableHeaderCell className='text-center'>Total</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    recaudo.servired.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className='text-center'>
                          <RenderEstado estado={item.ESTADO} />
                        </TableCell>
                        <TableCell className='text-center'>{item.Cantidad}</TableCell>
                        <TableCell className='text-center'>{formatPesoColombia(item.Total)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </section>
          )
        }
      </Card>

    </>
  )
}

export default Dashboard
