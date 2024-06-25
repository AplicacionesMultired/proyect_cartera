import { Button, Input, Label } from '../components/ui'
import { Card, Switch, Title } from '@tremor/react'
import { useAuth } from '../auth/AuthProvider'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BasesI } from '../types/Bases'
import axios from 'axios'

export const BasesDetalle = () => {
  const { id } = useParams()
  const [data, setData] = useState<BasesI>()
  const [disabled, setDisabled] = useState(true)

  const { user } = useAuth()

  const [base, setBase] = useState({
    NEW_BASE: '',
    NEW_RASPE: '',
    NEW_OBSERVACION: ''
  })

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setBase((prevBase) => ({
      ...prevBase,
      [name]: value
    }))
  }

  function handleSwichtChange () {
    setDisabled(!disabled)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    axios.post('http://172.20.1.110:3030/updateBase', { ...base, vinculado: id, user: user.username, obs: data?.OBSERVACION, base: data?.BASE, raspe: data?.RASPE })
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
          <p className='max-h-10'>Observación Actual: <span className='font-semibold'>{data?.OBSERVACION}</span></p>
        </Card>
        <Card className=''>
          <Title className='text-center pb-2'>Actualizar Base</Title>
          <form className='bg-slate-200 p-2 grid grid-cols-2 gap-2 rounded-md' onSubmit={handleSubmit}>
            <div className='col-span-1'>
              <Label>Nuevo Valor Base</Label>
              <Input type='text' name='NEW_BASE' value={base.NEW_BASE} onChange={handleChange} />
            </div>
            <div className='col-span-1'>
              <Label>Nuevo Valor Raspe</Label>
              <Input type='text' name='NEW_RASPE' value={base.NEW_RASPE} onChange={handleChange} />
            </div>
            <div className='col-span-2'>
              <Label>Observación</Label>
              <Input type='text' name='NEW_OBSERVACION' value={base.NEW_OBSERVACION} onChange={handleChange} required />
            </div>
            <div className='text-xs flex items-center justify-around'>
              <Label>Confirmar Actualización</Label>
              <Switch onChange={handleSwichtChange} />
            </div>
            <Button disabled={disabled}>Actualizar Base</Button>
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
