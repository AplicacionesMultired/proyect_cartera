import {  Badge,  Card,  Table,  TableBody,  TableCell,  TableHead,  TableHeaderCell,  TableRow,} from '@tremor/react';
import { RiFlag2Line } from '@remixicon/react';
import { CarteraI } from '../types/cartera';

export function TableUsageExample({data}:{data: CarteraI[]}) {
  return (
    <Card>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">List of Swiss Federal Councillours</h3>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Cedula</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.VINCULADO}>
              <TableCell>{item.VINCULADO}</TableCell>
              <TableCell>
                {item.FECHA}
              </TableCell>
              <TableCell>
                {item.SALDO_ANT}
              </TableCell>
              <TableCell>
                <Badge color="emerald" icon={RiFlag2Line}>
                  {item.RECHAZADOS}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}