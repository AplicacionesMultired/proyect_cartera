import {  /*Badge,*/  Card, Select, SelectItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, TextInput } from '@tremor/react';
// 
import { CarteraI } from '../types/cartera';

const formatPesoColombia = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(value);
}

export function TableCartera({ data, fun }: { data: CarteraI[], fun: (ev: string) => void }) {
  return (
    <>
      <Card className='flex gap-4 mb-1'>
        <Select defaultValue="0" className='w-60' onValueChange={ev => fun(ev)}>
          <SelectItem value="0">Multired / Servired</SelectItem>
          <SelectItem value="102">Multired</SelectItem>
          <SelectItem value="101">Servired</SelectItem>
        </Select>
        <TextInput placeholder='Buscar vendedor...' className='w-60' />
        <p className='flex text-center items-center text-gray-600'>N° Datos Mostrados: { data.length }</p>
      </Card>

      <Card>
        <Table className='max-h-[75vh]'>
          <TableHead className='border-b-2 border-punch-300 sticky top-0 bg-white dark:bg-dark-tremor-brand-muted'>
            <TableRow>
              <TableHeaderCell>Empresa</TableHeaderCell>
              <TableHeaderCell>Cedula</TableHeaderCell>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Base</TableHeaderCell>
              <TableHeaderCell className=''>Saldo Ant</TableHeaderCell>
              <TableHeaderCell className='text-center'>Débito</TableHeaderCell>
              <TableHeaderCell className='text-center'>Crédito</TableHeaderCell>
              <TableHeaderCell className='text-center'>Nuevo Saldo</TableHeaderCell>
              <TableHeaderCell className='text-center'>Cartera</TableHeaderCell>
              <TableHeaderCell className='text-center'>Rechazados</TableHeaderCell>
              <TableHeaderCell className='text-center'>Aceptados</TableHeaderCell>
              <TableHeaderCell className='text-center'>Digitados</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.VINCULADO}>
                <TableCell>{item.EMPRESA === '102' ? 'Multired' : 'Servired'}</TableCell>
                <TableCell>{item.VINCULADO}</TableCell>
                <TableCell>{item.Seller.NOMBRES}</TableCell>
                <TableCell>{item.BASE}</TableCell>
                <TableCell className={`${item.SALDO_ANT > 0 ? 'bg-punch-200 dark:bg-punch-950 font-medium text-gray-800 dark:text-gray-300' : 'bg-green-200 dark:bg-punch-950 font-medium text-gray-800 dark:text-gray-300'}`}>
                  {formatPesoColombia(item.SALDO_ANT)}
                </TableCell>
                <TableCell className='text-center'>
                  {formatPesoColombia(item.DEBITO)}
                </TableCell>
                <TableCell className='text-center'>
                  {formatPesoColombia(item.CREDITO)}
                </TableCell>
                <TableCell className='text-center'>
                  {formatPesoColombia(item.SALDO_ANT - item.CREDITO - item.DEBITO)}
                </TableCell>
                <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                  {formatPesoColombia(+item.SALDO_ANT - item.BASE - item.DEBITO - item.CREDITO)}
                </TableCell>
                <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                  {item.RECHAZADOS}
                </TableCell>
                <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                  {item.ACEPTADOS}
                </TableCell>
                <TableCell className='text-center font-semibold text-black dark:text-gray-300'>
                  {item.DIGITADOS}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}