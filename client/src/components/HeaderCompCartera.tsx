import { Card, Select, SelectItem, Switch, TextInput } from '@tremor/react'
import { BottonExporCartera } from './ExportCartera'
import { Button, Label } from './ui'
import { CarteraI } from '../types/cartera'

const fecha = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
}).format(new Date())

interface PropsCompo {
  data: CarteraI[]
  funSearch: (e: React.FormEvent<HTMLFormElement>) => void
}

export const HeaderCompCartera = ({ data, funSearch }: PropsCompo) => {
  return (
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
      <form className='flex gap-1 items-center' onSubmit={funSearch}>
        <Label className='text-sm font-semibold'>Vinculado</Label>
        <TextInput name='viculado' placeholder='1118111222 | 669102432' className='w-40' type='text' />
        <Button type='submit'>Buscar Vinculado</Button>
      </form>
      <div className='flex flex-col items-center'>
        <p className='text-center'>Filtro ABS {'>'} 100</p>
        <Switch id="switch" name="switch"/>
      </div>
      <p className='flex text-center items-center text-gray-600 dark:text-white'>N° Datos Mostrados:<span className='font-semibold pl-1'>{data.length}</span></p>
      <BottonExporCartera datos={data} />
    </Card>
  )
}
