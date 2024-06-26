import { Card, Switch, Title } from '@tremor/react'
import { formatPesoColombia } from '../utils/funtions'
import { Button, Label } from '../components/ui'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { BasesI } from '../types/Bases'
import axios from 'axios'
import { useAuth } from '../auth/AuthProvider'

export const BasesDetalle = () => {
  const { id } = useParams()
  const [data, setData] = useState<BasesI>()
  const { user } = useAuth()

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [isBaseEnabled, setIsBaseEnabled] = useState(false)
  const [isRaspeEnabled, setIsRaspeEnabled] = useState(false)

  const [pedirData, setPedirData] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    // Llamada a la API
    axios.get(`http://172.20.1.110:3030/baseDetalle/${id}`)
      .then(response => setData(response.data))
      .catch(error => { console.log(error) })
  }, [id, pedirData])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fields = Object.fromEntries(new window.FormData(e.currentTarget))
    const newData = {
      BASE: parseInt(fields.base as string),
      RASPE: parseInt(fields.raspe as string),
      OBS: fields.obs as string
    }

    axios.post('http://172.20.1.110:3030/updateBase', { ...newData, VINCULADO: id, BASE_ACT: data?.BASE, RASPE_ACT: data?.RASPE, LOGIN: user.username })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          formRef.current?.reset()
          setIsBaseEnabled(false)
          setIsRaspeEnabled(false)
          setPedirData(!pedirData)
          setMessage(response.data)
        }
      })
      .catch(error => {
        console.log(error)
        const msg = error.response.data.msg
        setError(msg)
      })
      .finally(() => {
        setTimeout(() => {
          setError('')
          setMessage('')
        }, 5000)
      })
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
            <p className='p-2 rounded-md bg-yellow-200'>Valor Raspe: <span className='font-semibold'>{formatPesoColombia(data?.RASPE as number)}</span> </p>
          </div>
          <p className='max-h-10'>Observación Actual: <span className='font-semibold'>{data?.OBSERVACION}</span></p>
        </Card>
        <Card className=''>
          <Title className='text-center pb-2'>Actualizar Base</Title>
          <form ref={formRef} className='bg-slate-200 p-2 rounded-md flex flex-col gap-3' onSubmit={handleSubmit}>
            <div className='flex items-center justify-between px-4'>
              <Label>Nuevo Valor Base </Label>
              <input className='w-56 rounded-md border-none' name='base' disabled={!isBaseEnabled} />
              <Switch checked={isBaseEnabled} onChange={() => setIsBaseEnabled(!isBaseEnabled)} />
            </div>
            <div className='flex items-center justify-between px-4'>
              <Label>Nuevo Valor Raspe</Label>
              <input className='w-56 rounded-md border-none' name='raspe' disabled={!isRaspeEnabled} />
              <Switch checked={isRaspeEnabled} onChange={() => setIsRaspeEnabled(!isRaspeEnabled)} />
            </div>
            <Label>Observación:</Label>
            <input name='obs' placeholder='ej: Base incrementada por ventas acumuladas' type='text' className='border-none rounded-md max-h-10'/>

            <Button>Actualizar Base</Button>

          </form>
        </Card>

      </section>

      {error && <p className='text-red-500 p-4 bg-slate-100 text-center'>{error}</p>}
      {message && <p className='text-green-500 p-4 bg-slate-100 text-center'>{message}</p>}
    </>
  )
}
