import { Card, DonutChart, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { formatPesoColombia } from '../utils/funtions'
import { DataIU } from '../pages/Dashboard'

const dataFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('co-ES').format(number).toString()}`

export function TableInfo ({ data }: { data: DataIU[] }) {
  const dataUnifi = data.map((item) => ({
    name: item.Empresa,
    value: item.Caj_Comercial | 0 + item.Colo_Independiente | 0 + item.Caj_Tesoreria | 0 + item.Vendedor | 0 + item.No_Definido | 0
  }))

  return (
    <Card className='flex justify-around items-center'>
      <div className="space-y-4">
        <h2 className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Gráfica Cartera Pendiente
        </h2>
        <DonutChart
          colors={['yellow', 'blue']}
          data={dataUnifi}
          variant="pie"
          valueFormatter={dataFormatter}
          onValueChange={(v) => console.log(v)}
        />
      </div>

      <Table className="">
        <TableHead>
          <TableRow>
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
              <TableRow key={index}>
                <TableCell>{item.Empresa}</TableCell>
                <TableCell>{formatPesoColombia(item.Caj_Comercial)}</TableCell>
                <TableCell>{formatPesoColombia(item.Colo_Independiente)}</TableCell>
                <TableCell>{formatPesoColombia(item.Caj_Tesoreria)}</TableCell>
                <TableCell>{formatPesoColombia(item.Vendedor)}</TableCell>
                <TableCell>{formatPesoColombia(item.No_Definido)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <section className='flex flex-col gap-6 text-xl'>
        {dataUnifi.map((item, index) => {
          return (
            <div key={index} className='flex items-center'>
              <p className={`w-4 h-4 p-2 rounded-full ${item.name === 'Multired' ? 'bg-blue-500' : 'bg-yellow-500'} `}></p>
              <p className='px-2'>Total <span className='font-medium'>{item.name}:</span></p>
              <p>{formatPesoColombia(item.value)}</p>
            </div>
          )
        })}
      </section>
    </Card>
  )
}
