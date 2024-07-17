import { PropsCrating } from '../types/interface'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Label } from './ui'
import { FormEvent, useState } from 'react'
import { API_URL } from '../utils/contanst'
import { Card } from '@tremor/react'
import axios from 'axios'

export function FormCreate ({ nombres, vinculado, funClose }: PropsCrating) {
  const [base, setBase] = useState<number>(0)
  const [raspa, setRaspa] = useState<number>(0)

  const navigate = useNavigate()

  const { user } = useAuth()

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    axios.post(`${API_URL}/asignar-base`, { base, raspa, vinculado, login: user.username })
      .then(res => {
        console.log(res.data)
        if (res.status === 201) {
          navigate('/cartera/bases')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <section className='flex items-center justify-center w-full h-[99.5vh] bg-slate-900 bg-opacity-50 z-20 absolute top-1'>
      <Card className="z-30 xl:w-[650px] max-w-[720px] px-5 flex flex-col items-center justify-center bg-punch-300">
        <Button onClick={funClose} color='red'>Cancelar</Button>
        <h3 className='text-center text-xl font-semibold my-4'>Asignación Nueva Base a Vinculado</h3>
        <form className='grid grid-cols-2 gap-4' onSubmit={ev => handleSubmit(ev)}>
          <div className="">
            <Label>Nombres</Label>
            <Input type="text" value={nombres} readOnly />
          </div>
          <div className="">
            <Label>N° Cédula</Label>
            <Input type="text" value={vinculado} readOnly />
          </div>
          <div className="">
            <Label>Valor Base</Label>
            <Input type='number' value={base} onChange={ev => setBase(parseInt(ev.target.value))} />
          </div>
          <div className="">
            <Label>Valor Raspa</Label>
            <Input type='number' value={raspa} onChange={ev => setRaspa(parseInt(ev.target.value))} />
          </div>
          <div/>
          <Button color='red'>Asignar Base</Button>
        </form>
      </Card>

    </section>
  )
}
