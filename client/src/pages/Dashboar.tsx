import { DonutChartHero } from '../components/Donut'
import { TableInfo } from '../components/TableInfo'
import { RecaudoI } from '../types/interface'
import { useEffect, useState } from 'react'
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
  const [recaudo, setRecaudo] = useState<RecaudoI>({ multired: [], servired: [] })

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

      <div className='flex gap-4'>
        {
          recaudo.multired.length > 0 && (
            <div>
              <h1>Multired</h1>
              {
                recaudo.multired.map((item, index) => {
                  return (
                    <div key={index} className='flex w-full gap-4'>
                      <p>{item.ESTADO}</p>
                      <p>{item.Cantidad}</p>
                      <p>{item.ValorTotal}</p>
                    </div>
                  )
                })
              }
            </div>
          )
        }
        {
          recaudo.servired.length > 0 && (
            <div>
              <h1>Servired</h1>
              {
                recaudo.servired.map((item, index) => {
                  return (
                    <div key={index} className='flex w-full gap-4'>
                      <p>{item.ESTADO}</p>
                      <p>{item.Cantidad}</p>
                      <p>{item.ValorTotal}</p>
                    </div>
                  )
                })
              }
            </div>
          )
        }

      </div>

    </>
  )
}

export default Dashboard
