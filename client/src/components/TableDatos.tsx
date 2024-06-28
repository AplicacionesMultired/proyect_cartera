import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react'
import { ArrowDown, ArrowUp, DotsIcon } from './icons/ArrowIcons'
import { formatPesoColombia } from '../utils/funtions'
import { CarteraI } from '../types/cartera'

function calculateBalance (item: CarteraI) {
  const base = item.Basis?.BASE || 0
  return +item.SALDO_ANT - base - item.DEBITO - item.CREDITO
}

export const TableDatos = ({ data, funSort, valueOrder }: { data: CarteraI[], funSort: () => void, valueOrder: 'asc' | 'desc' | '' }) => {
  return (
    <Card decoration="top" decorationColor="rose" className='p-2 mt-0.5'>
      <Table className='xl:max-h-[80vh] 3xl:max-h-[82vh]'>
        <TableHead className='border-b-2 border-punch-300 sticky top-0 bg-white dark:bg-dark-tremor-brand-muted'>
          <TableRow className='text-xs'>
            <TableHeaderCell>Empresa</TableHeaderCell>
            <TableHeaderCell>N° Cédula</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Cargo</TableHeaderCell>
            <TableHeaderCell className='text-center'>Base</TableHeaderCell>
            <TableHeaderCell className='flex items-center gap-2 text-xs cursor-pointer hover:text-blue-400' onClick={funSort}>
              <span>Saldo Ant</span>
              { valueOrder === '' ? <ArrowUp /> : valueOrder === 'asc' ? <ArrowDown /> : <DotsIcon />}
            </TableHeaderCell>
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
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.EMPRESA === '102' ? 'Multired' : 'Servired'}</TableCell>
              <TableCell>{item.VINCULADO}</TableCell>
              <TableCell className='text-clip text-[0.7rem]'>{item.Seller.NOMBRES}</TableCell>
              <TableCell>
                {

                  item.Seller?.NOMBRECARGO !== undefined && item.Seller.NOMBRECARGO !== null
                    ? item.Seller.NOMBRECARGO
                    : 'Sin cargo'
                }
              </TableCell>
              {
                item.Basis?.BASE !== undefined && item.Basis.BASE > 100
                  ? (<TableCell className=''>{item.Basis?.BASE !== undefined ? formatPesoColombia(item.Basis.BASE) : '0'}</TableCell>)
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
  )
}
