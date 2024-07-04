import { Button, Input, Label } from './ui'
import { Card } from '@tremor/react'
import { useState } from 'react'
import { PropsCrating } from '../types/interface'

export function FormCreate ({ nombres, vinculado, funClose }: PropsCrating) {
  const [base, setBase] = useState<number>(0)
  const [raspa, setRaspa] = useState<number>(0)

  return (
    <section className='flex items-center justify-center w-full h-[99.5vh] bg-slate-900 bg-opacity-50 z-20 absolute top-1'>
      <Card className="bg-punch-200 z-30 xl:w-[650px] max-w-[720px] p-5 flex flex-col items-center justify-center">
        <Button onClick={funClose} color='red'>Cancelar</Button>
        <h3 className='text-center text-xl font-semibold my-4'>Asignación Nueva Base a Vinculado</h3>
        <div className='w-full flex flex-col items-center'>
          <div className="w-full mb-4">
            <Label>Nombres</Label>
            <Input type="text" value={nombres} readOnly />
          </div>
          <div className="w-full mb-4">
            <Label>N° Cédula</Label>
            <Input type="text" value={vinculado} readOnly />
          </div>
          <div className="w-full mb-4">
            <Label>Valor Base</Label>
            <Input type='number' value={base} onChange={ev => setBase(parseInt(ev.target.value))} />
          </div>
          <div className="w-full mb-4">
            <Label>Valor Raspa</Label>
            <Input type='number' value={raspa} onChange={ev => setRaspa(parseInt(ev.target.value))} />
          </div>
          <Button color='red'>Asignar Base</Button>
        </div>
      </Card>
    </section>
  )
}
