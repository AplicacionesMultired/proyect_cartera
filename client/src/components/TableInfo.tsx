import { Card, DonutChart, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from '@tremor/react'
import { formatPesoColombia } from '../utils/funtions'
import { DataIU } from '../pages/Dashboard'

const dataFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('co-ES').format(number).toString()}`

export function TableInfo ({ data }: { data: DataIU[] }) {
  const dataUnifi = data.map((item) => ({
    name: item.Empresa,
    value: item.Caj_Comercial | 0 + item.Colo_Independiente | 0 + item.Caj_Tesoreria | 0 + item.Vendedor | 0 + item.No_Definido | 0
  }))

  const total = dataUnifi.reduce((acc, item) => acc + item.value, 0)

  return (
    <Card className='grid grid-cols-12 place-content-between gap-2'>
      <section className='col-span-3 3xl:col-span-3'>
        <DonutChart colors={['yellow', 'blue']} data={dataUnifi} className=''
          variant="pie" valueFormatter={dataFormatter} onValueChange={(v) => console.log(v)} />
        <Title className='text-center pt-2 text-xs xl:text-sm 2xl:text-base'>Cartera Pendiente</Title>
        <p className='text-center text-xs xl:text-sm 2xl:text-base'>
          <span>Total Servired + Multired: </span>
          <span className='font-medium'>{formatPesoColombia(total)}</span>
        </p>
      </section>

      <Table className='col-span-9 3xl:col-span-6 flex flex-col justify-center'>
        <TableHead>
          <TableRow className='text-xs 2xl:text-base'>
            <TableHeaderCell>Empresa</TableHeaderCell>
            <TableHeaderCell>Caj comercial</TableHeaderCell>
            <TableHeaderCell>Col Independiente</TableHeaderCell>
            <TableHeaderCell>Caj Tesoreria</TableHeaderCell>
            <TableHeaderCell>Vendedor</TableHeaderCell>
            <TableHeaderCell>No Definido</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((item, index) => (
              <TableRow key={index} className='text-xs 2xl:text-base'>
                <TableCell>{item.Empresa}</TableCell>
                <TableCell>{formatPesoColombia(item.Caj_Comercial)}</TableCell>
                <TableCell>{formatPesoColombia(item.Colo_Independiente)}</TableCell>
                <TableCell>{formatPesoColombia(item.Caj_Tesoreria | 0)}</TableCell>
                <TableCell>{formatPesoColombia(item.Vendedor)}</TableCell>
                <TableCell>{formatPesoColombia(item.No_Definido | 0)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <section className='col-span-full 3xl:col-span-3 flex 2xl:flex-col 2xl:items-center 2xl:justify-center 2xl:gap-2 justify-around pt-4 2xl:text-base'>
        {dataUnifi.map((item, index) => {
          return (
            <section key={index} className='flex items-center'>
              <p className={`w-4 h-4 p-2 rounded-full ${item.name === 'Multired' ? 'bg-blue-500' : 'bg-yellow-500'} `}></p>
              <p className='px-2'>Total <span className='font-medium'>{item.name}:</span></p>
              <p>{formatPesoColombia(item.value)}</p>
            </section>
          )
        })}
      </section>

    </Card>
  )
}
