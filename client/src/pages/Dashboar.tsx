import { DonutChartHero } from '../components/Donut'
import { TableInfo } from '../components/TableInfo'
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

  useEffect(() => {
    axios.get(`${HOST}/resumenCartera`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  console.log(data)

  return (
    <Card className='flex w-full gap-4'>
      <DonutChartHero data={data}/>
      <TableInfo data={data}/>
    </Card>
  )
}

export default Dashboard
