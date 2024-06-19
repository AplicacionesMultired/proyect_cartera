import { Card, Select, SelectItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, TextInput } from '@tremor/react';
import { BottonExporCartera } from './ExportCartera';
import { CarteraI } from '../types/cartera';
import { useEffect, useState } from 'react';
import axios from 'axios';

const formatPesoColombia = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(value);
}

export function TableCartera() {
  const [filterText, setFilterText] = useState('');
  const [originalData, setOriginalData] = useState<CarteraI[]>([])
  const [data, setData] = useState<CarteraI[]>([])

  useEffect(() => {
    axios.get('http://172.20.1.110:3000/cartera')
      .then(res => {
        // Actualiza ambos estados con los datos de la API
        setOriginalData(res.data)
        setData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const handleChange = (ev: string) => {
    if (ev === '0') {
      setData(originalData)
      return
    }

    const dataFiltrada = originalData.filter(item => item.EMPRESA === ev)

    setData(dataFiltrada)
  }

  const handleFilterChange = (ev: string) => {
    setFilterText(ev);
  }

  const filteredData = data.filter(item => {
    return item.Seller.NOMBRES.toLowerCase().includes(filterText.toLowerCase()) || item.VINCULADO.includes(filterText);
  });


  return (
    <>
      <Card className='flex gap-4 mb-1 justify-between' decoration="top" decorationColor="rose">
        <Select defaultValue="0" className='w-60' onValueChange={ev => handleChange(ev)}>
          <SelectItem value="0">Multired / Servired</SelectItem>
          <SelectItem value="102">Multired</SelectItem>
          <SelectItem value="101">Servired</SelectItem>
        </Select>
        <TextInput placeholder='Buscar vendedor...' className='w-60' type='text' onValueChange={handleFilterChange} />
        <p className='flex text-center items-center text-gray-600 dark:text-white'>N° Datos Mostrados:<span className='font-semibold pl-1'>{filteredData.length}</span></p>
        <BottonExporCartera datos={filteredData} />
      </Card>

      <Card decoration="top" decorationColor="rose">
        <Table className='max-h-[75vh]'>
          <TableHead className='border-b-2 border-punch-300 sticky top-0 bg-white dark:bg-dark-tremor-brand-muted'>
            <TableRow>
              <TableHeaderCell>Empresa</TableHeaderCell>
              <TableHeaderCell>N° Cédula</TableHeaderCell>
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
            {filteredData.map((item) => (
              <TableRow key={item.VINCULADO}>
                <TableCell>{item.EMPRESA === '102' ? 'Multired' : 'Servired'}</TableCell>
                <TableCell>{item.VINCULADO}</TableCell>
                <TableCell>{item.Seller.NOMBRES}</TableCell>
                <TableCell>{item.BASE}</TableCell>
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