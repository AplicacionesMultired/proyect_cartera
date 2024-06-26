import { Button, Card, Select, SelectItem, Switch, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, TextInput } from '@tremor/react'
import { formatPesoColombia } from '../utils/funtions'
import { BottonExporCartera } from './ExportCartera'
import { CarteraI } from '../types/cartera'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Label } from './ui'
import axios from 'axios'

export function TableCartera () {
  const [data, setData] = useState<CarteraI[]>([])
  const [active, setActive] = useState(false)

  const handleSwichtChange = () => {
    setActive(!active)
  }

  useEffect(() => {
    const fetchData = () => {
      axios.get(`http://172.20.1.110:3030/${active ? 'cartera' : 'carteraSinABS'}`)
        .then(res => {
          setData(res.data.datos)
        })
        .catch(err => console.log(err))
    }

    fetchData()
    const interval = setInterval(fetchData, 15 * 60 * 1000)

    return () => clearInterval(interval)
  }, [active])

  const fecha = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
  }).format(new Date())

  function calculateBalance (item: CarteraI) {
    const base = item.Basis?.BASE || 0
    return +item.SALDO_ANT - base - item.DEBITO - item.CREDITO
  }

  return (
    data && (
      <>
        <Card className='flex gap-4 mb-1 justify-between text-xs py-2' decoration="top" decorationColor="rose">
          <div>
            <p className='text-center'>Fecha:</p>
            <p className='font-semibold'>{fecha}</p>
          </div>
          <Select defaultValue="0" className='w-60'>
            <SelectItem value="0">Multired / Servired</SelectItem>
            <SelectItem value="102">Multired</SelectItem>
            <SelectItem value="101">Servired</SelectItem>
          </Select>
          <div className='flex gap-1 items-center'>
            <Label className='text-sm font-semibold'>Vinculado</Label>
            <TextInput placeholder='1118111222 | 669102432' className='w-60' type='text' />
            <Button>Buscar Vinculado</Button>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-center'>Filtro ABS {'>'} 100</p>
            <Switch id="switch" name="switch" checked={active} onChange={handleSwichtChange} />
          </div>
          <p className='flex text-center items-center text-gray-600 dark:text-white'>N° Datos Mostrados:<span className='font-semibold pl-1'>{data.length}</span></p>
          <BottonExporCartera datos={data} />
        </Card>

        <Card decoration="top" decorationColor="rose" className='p-2'>
          <Table className='max-h-[84vh]'>
            <TableHead className='border-b-2 border-punch-300 sticky top-0 bg-white dark:bg-dark-tremor-brand-muted'>
              <TableRow className='text-xs'>
                <TableHeaderCell>Empresa</TableHeaderCell>
                <TableHeaderCell>N° Cédula</TableHeaderCell>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell className='text-center'>Base</TableHeaderCell>
                <TableHeaderCell className=''>Saldo Ant</TableHeaderCell>
                <TableHeaderCell className='text-center'>Débito</TableHeaderCell>
                <TableHeaderCell className='text-center'>Crédito</TableHeaderCell>
                <TableHeaderCell className='text-center'>Nuevo Saldo</TableHeaderCell>
                <TableHeaderCell className='text-center'>Cartera</TableHeaderCell>
                <TableHeaderCell className='text-center'>Rechazados</TableHeaderCell>
                <TableHeaderCell className='text-center'>Aceptados</TableHeaderCell>
                <TableHeaderCell className='text-center'>Pendiente Conteo</TableHeaderCell>
                <TableHeaderCell className='text-center'>Digitados</TableHeaderCell>
                <TableHeaderCell className='text-center'>Venta Bnet</TableHeaderCell>
                <TableHeaderCell className='text-center'>Cuadre Web</TableHeaderCell>
                <TableHeaderCell className='text-center'>Anulados</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody className='text-xs'>
              {data.map((item) => (
                <TableRow key={item.VINCULADO}>
                  <TableCell>{item.EMPRESA === '102' ? 'Multired' : 'Servired'}</TableCell>
                  <TableCell>{item.VINCULADO}</TableCell>
                  <TableCell>{item.Seller.NOMBRES}</TableCell>
                  {
                    item.Basis?.BASE !== undefined && item.Basis.BASE > 100
                      ? (
                        <Link className='' to={`/baseDetalle/${item.VINCULADO}`}>
                          <TableCell className='hover:cursor-pointer hover:text-blue-600 hover:font-semibold hover:transition-all hover:bg-yellow-200'>
                            {item.Basis?.BASE !== undefined ? formatPesoColombia(item.Basis.BASE) : '0'}
                          </TableCell>
                        </Link>
                        )
                      : <TableCell className='text-center'>0</TableCell>
                  }
                  <TableCell className={`${item.SALDO_ANT > 0
                    ? 'bg-punch-200 dark:bg-punch-950 font-medium text-gray-800 dark:text-gray-300'
                    : 'bg-green-200 dark:bg-green-950 font-medium text-gray-800 dark:text-gray-300'}`}>
                    {formatPesoColombia(item.SALDO_ANT)}
                  </TableCell>
                  <TableCell className='text-center'>
                    {formatPesoColombia(item.DEBITO)}
                  </TableCell>
                  <TableCell className='text-center'>
                    {formatPesoColombia(item.CREDITO)}
                  </TableCell>
                  <TableCell className='text-center' id='nuevo saldo'>
                    {formatPesoColombia(item.SALDO_ANT - item.CREDITO - item.DEBITO)}
                  </TableCell>
                  <TableCell className='text-center font-semibold text-black dark:text-gray-300' id='cartera'>
                    {formatPesoColombia(calculateBalance(item))}
                  </TableCell>
                  <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                    {formatPesoColombia(item.RECHAZADOS)}
                  </TableCell>
                  <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                    {formatPesoColombia(item.ACEPTADOS)}
                  </TableCell>
                  <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                    {formatPesoColombia(item.PENDIENTES_CONT)}
                  </TableCell>
                  <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                    {formatPesoColombia(item.DIGITADOS)}
                  </TableCell>
                  <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                    {formatPesoColombia(item.VTABNET)}
                  </TableCell>
                  <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                    {formatPesoColombia(item.VTASIISS)}
                  </TableCell>
                  <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                    {formatPesoColombia(item.VTA_S1)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </>

    )
  )
}
