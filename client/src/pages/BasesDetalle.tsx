import { Button as ButtonMe, Label } from '../components/ui'
import { Card, Switch, Title, Button } from '@tremor/react'
import { useNavigate, useParams } from 'react-router-dom'
import { BasesI, BasesIUpdates } from '../types/Bases'
import { formatPesoColombia } from '../utils/funtions'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { HOST } from '../utils/contanst'
import axios from 'axios'

const BasesDetalle = () => {
  const { id } = useParams()
  const [data, setData] = useState<BasesI>()
  const [updates, setUpdates] = useState<BasesIUpdates[]>([])
  const navigate = useNavigate()
  const { user } = useAuth()

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [isBaseEnabled, setIsBaseEnabled] = useState(false)
  const [isRaspeEnabled, setIsRaspeEnabled] = useState(false)

  const [pedirData, setPedirData] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    // Llamada a la API
    axios.get(`${HOST}/baseDetalle/${id}`)
      .then(response => setData(response.data))
      .catch(error => { console.log(error) })

    axios.get(`${HOST}/updatesBases/${id}`)
      .then(response => setUpdates(response.data))
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

    axios.post(`${HOST}/updateBase`, { ...newData, VINCULADO: id, BASE_ACT: data?.BASE, RASPE_ACT: data?.RASPE, LOGIN: user.username })
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
      <section className='flex'>
        <Card className='flex flex-col gap-2'>
          <div className='flex justify-end'>
            <Button variant='primary' color='red' onClick={() => navigate('/cartera/bases')}>Volver Bases</Button>
          </div>
          <Title className='text-center'>Datos De Vinculado</Title>
          <p><span className='font-semibold'>Nombres: </span>{data?.Seller.NOMBRES}</p>
          <p><span className='font-semibold'>N° Documento: </span>{data?.VINCULADO}</p>
          <div className='h-full flex justify-around items-center'>
            <p className='p-2 rounded-md bg-yellow-200'>Valor Base: <span className='font-semibold'>{formatPesoColombia(data?.BASE as number)}</span></p>
            <p className='p-2 rounded-md bg-yellow-200'>Valor Raspe: <span className='font-semibold'>{formatPesoColombia(data?.RASPE as number)}</span> </p>
          </div>
          <p className='max-h-10'>Observación Actual: <span className='font-semibold'>{data?.OBSERVACION}</span></p>
        </Card>
        <Card className='flex flex-col'>
          <Title className='text-center pb-2'>Actualizar Base</Title>
          <form ref={formRef} className='bg-slate-200 p-2 rounded-md flex flex-col gap-3' onSubmit={handleSubmit}>
            <div className='flex items-center justify-between px-4'>
              <Label>Nuevo Valor Base </Label>
              <input className='w-56 rounded-md border-none' name='base' disabled={!isBaseEnabled} />
              <div className='bg-punch-300 px-4 py-2 rounded-md'>
                <Switch color='red' checked={isBaseEnabled} onChange={() => setIsBaseEnabled(!isBaseEnabled)} />
              </div>
            </div>
            <div className='flex items-center justify-between px-4'>
              <Label>Nuevo Valor Raspe</Label>
              <input className='w-56 rounded-md border-none' name='raspe' disabled={!isRaspeEnabled} />
              <div className='bg-punch-300 px-4 py-2 rounded-md'>
                <Switch color='red' checked={isRaspeEnabled} onChange={() => setIsRaspeEnabled(!isRaspeEnabled)} />
              </div>
            </div>
            <Label>Observación:</Label>
            <input name='obs' placeholder='ej: Base incrementada por ventas acumuladas' type='text' className='border-none rounded-md max-h-10' />

            <div className='w-full flex justify-center py-2'>
              <ButtonMe>Actualizar Base</ButtonMe>
            </div>

          </form>
        </Card>
      </section>
      <Card className=''>
        <Title className='text-center'>Historial de Actualizaciones</Title>
        <div className='overflow-y-auto max-h-96 flex flex-col gap-2'>
          {updates.map((update, index) => (
            <div key={index} className='grid grid-cols-2 gap-1 px-4 py-2 bg-slate-200 rounded-md'>
              <p><span className='font-semibold'>Fecha: </span>{update.FECHA}</p>
              <p><span className='font-semibold'>Observación: </span>{update.OBSERVACION}</p>
              <p><span className='font-semibold'>Base Nueva: </span>{formatPesoColombia(update.BASE_NEW)}</p>
              <p><span className='font-semibold'>Raspe Anterior: </span>{formatPesoColombia(update.RASPE_ANT)}</p>
              <p><span className='font-semibold'>Base Anterior: </span>{formatPesoColombia(update.BASE_ANT)}</p>
              <p><span className='font-semibold'>Raspe Nuevo: </span>{formatPesoColombia(update.RASPE_NEW)}</p>
              <p><span className='font-semibold'>Responsable: </span>{update.LOGIN}</p>
            </div>
          ))}
        </div>
      </Card>

      {error && <p className='text-red-500 p-4 bg-slate-100 text-center'>{error}</p>}
      {message && <p className='text-green-500 p-4 bg-slate-100 text-center'>{message}</p>}
    </>
  )
}

export default BasesDetalle
