import { Card, DonutChart, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { DataIU } from '../pages/Dashboard'
import { formatPesoColombia } from '../utils/funtions'

const dataFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('co-ES').format(number).toString()}`

export const DonutChartHero = ({ data }: { data: DataIU[] }) => {
  const dataUnifi = data.map((item) => ({
    name: item.Empresa,
    value: item.Caj_Comercial | 0 + item.Colo_Independiente | 0 + item.Caj_Tesoreria | 0 + item.Vendedor | 0 + item.No_Definido | 0
  }))

  return (
    <Card className="">
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

      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Empresa</TableHeaderCell>
            <TableHeaderCell>Valor Total</TableHeaderCell>
            <TableHeaderCell>Color</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            dataUnifi.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{formatPesoColombia(item.value)}</TableCell>
                <TableCell>{item.name === 'Servired' ? <p className='w-4 h-4 p-2 rounded-full bg-yellow-500'></p> : <p className='w-4 h-4 p-2 rounded-full bg-blue-600'></p>}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

    </Card>
  )
}
