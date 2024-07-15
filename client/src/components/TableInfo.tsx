import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from '@tremor/react'
import { formatPesoColombia } from '../utils/funtions'
import { DataIU } from '../pages/Dashboar'

export function TableInfo ({ data }: {data: DataIU[]}) {
  return (
    <Card className='flex flex-col'>
      <Title className='text-center'>Detalle x Cargo Cartera Pendiente</Title>
      <Table className="mt-5">
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
    </Card>
  )
}
