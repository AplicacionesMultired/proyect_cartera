import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BasesI } from '../types/Bases'
import { Card, Title } from '@tremor/react'
import axios from 'axios'
import { Button, Input, Label } from '../components/ui'

export const BasesDetalle = () => {
  const { id } = useParams()
  const [data, setData] = useState<BasesI>()

  useEffect(() => {
    // Llamada a la API
    axios.get(`http://172.20.1.110:3030/baseDetalle/${id}`)
      .then(response => setData(response.data))
      .catch(error => { console.log(error) })
  }, [id])

  function formatPesoColombia (value: number) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(value)
  }
  return (
    <>
      <section className='flex px-2'>
        <Card className='flex flex-col  gap-2'>
          <Title className='text-center'>Datos De Vinculado</Title>
          <p><span className='font-semibold'>Nombres: </span>{data?.Seller.NOMBRES}</p>
          <p><span className='font-semibold'>N° Documento: </span>{data?.VINCULADO}</p>
          <div className='h-full flex justify-around items-center'>
            <p className='p-2 rounded-md bg-yellow-200'>Valor Base: <span className='font-semibold'>{formatPesoColombia(data?.BASE as number)}</span></p>
            <p className='p-2 rounded-md bg-yellow-200'>Valor Raspe: <span className='font-semibold'>{data?.RASPE}</span> </p>
          </div>
        </Card>
        <Card className=''>
          <Title className='text-center pb-2'>Actualizar Base</Title>
          <form className='bg-slate-200 p-2 grid grid-cols-2 gap-2 rounded-md'>
            <div className='col-span-1'>
              <Label >Nuevo Valor Base </Label>
              <Input type='text' />
            </div>
            <div className='col-span-1'>
              <Label >Nueva Valor Raspe </Label>
              <Input type='text' />
            </div>
            <div className='col-span-2'>
              <Label>Observación</Label>
              <Input type='text'/>
            </div>
            <Button>Actualizar Base</Button>
          </form>
        </Card>
      </section>
      <section className='px-2'>
        <Card>
          <Title className='text-center'>Historial Actualización De Base</Title>
        </Card>
      </section>
    </>
  )
}
