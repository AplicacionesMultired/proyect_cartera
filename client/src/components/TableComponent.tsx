import {  /*Badge,*/  Card,  Table,  TableBody,  TableCell,  TableHead,  TableHeaderCell,  TableRow,} from '@tremor/react';
// 
import { CarteraI } from '../types/cartera';

const formatPesoColombia = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(value);
}

export function TableUsageExample({data}:{data: CarteraI[]}) {
  return (
    <Card>     
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Empresa</TableHeaderCell>
            <TableHeaderCell>Cedula</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell className=''>Saldo Ant</TableHeaderCell>
            <TableHeaderCell className='text-center'>Débito</TableHeaderCell>
            <TableHeaderCell className='text-center'>Crédito</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.VINCULADO}>
              <TableCell>{item.EMPRESA === '102' ? 'Multired' : 'Servired'}</TableCell>
              <TableCell>{item.VINCULADO}</TableCell>
              <TableCell>{item.Seller.NOMBRES}</TableCell>
              <TableCell className={`${item.SALDO_ANT > 0 ? 'bg-punch-200' : 'bg-green-200'}`}>
                {formatPesoColombia(item.SALDO_ANT)}
              </TableCell>
              <TableCell className='text-center'>
                {formatPesoColombia(item.DEBITO)}
              </TableCell>
              <TableCell className='text-center'>
                {formatPesoColombia(item.CREDITO)}
              </TableCell>
              {/* <TableCell>
                <Badge color="emerald" icon={RiFlag2Line}>
                  {item.RECHAZADOS}
                </Badge>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}