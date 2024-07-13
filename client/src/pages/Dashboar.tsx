import { DonutChartHero } from '../components/Donut'
import { TableInfo } from '../components/TableInfo'
import { useEffect, useState } from 'react'
import { DatesI } from '../types/interface'
import { Card } from '@tremor/react'
import { HOST } from '../App'
import axios from 'axios'

export interface DataIU {
  Empresa: string;
  Caj_Comercial: number;
  Colo_Independiente: number;
  Caj_Tesoreria: number;
  Vendedor: number;
  No_Definido: number;
}

function Dashboard () {
  const [data, setData] = useState<DataIU[]>([])
  const [recaudo, setRecaudo] = useState<DatesI[]>([])

  useEffect(() => {
    axios.get(`${HOST}/resumenCartera`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    axios.get(`${HOST}/resumenRecaudo`)
      .then((res) => {
        setRecaudo(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <Card className='flex w-full gap-4'>
        <DonutChartHero data={data} />
        <TableInfo data={data} />
      </Card>

      <div>
        {recaudo.map((item, index) => {
          return (
            <div key={index} className='flex gap-4'>
              <p>{item.FECHA}</p>
              <p>{item.ESTADO}</p>
              <p>{item.ValorTotal}</p>
              <p>{item.Cantidad}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Dashboard
