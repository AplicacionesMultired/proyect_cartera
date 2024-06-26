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
  funEmpresa: (e: string) => void
  funABS: (e: boolean) => void
  funReset: () => void
}

export const HeaderCompCartera = ({ data, funSearch, funEmpresa, funABS, funReset }: PropsCompo) => {
  return (
    <Card className='flex gap-4 mb-1 justify-between text-xs py-2' decoration="top" decorationColor="rose">
      <div>
        <p className='text-center'>Fecha:</p>
        <p className='font-semibold'>{fecha}</p>
      </div>
      <button onClick={funReset} className='bg-gradient-to-b from-green-700 to-green-800 px-2 rounded-md text-white font-semibold hover:bg-gradient-to-b
      hover:from-green-500 hover:to-green-600 transition-all ease-in-out'>Reset Data</button>
      <form className='flex gap-1 items-center' onSubmit={funSearch}>
        <Label className='text-sm font-semibold'>Vinculado</Label>
        <TextInput name='viculado' placeholder='1118111222 | 669102432' className='w-40' type='text' required />
        <Button type='submit'>Buscar Vinculado</Button>
      </form>
      <Select defaultValue="0" className='w-60' onValueChange={funEmpresa}>
        <SelectItem value="0">Multired / Servired</SelectItem>
        <SelectItem value="102">Multired</SelectItem>
        <SelectItem value="101">Servired</SelectItem>
      </Select>
      <div className='flex flex-col items-center'>
        <p className='text-center'>Filtro ABS {'>'} 100</p>
        <Switch id="switch" name="switch" onChange={funABS} />
      </div>
      <p className='flex text-center items-center text-gray-600 dark:text-white'>N° Datos Mostrados:<span className='font-semibold pl-1'>{data.length}</span></p>
      <BottonExporCartera datos={data} />
    </Card>
  )
}
