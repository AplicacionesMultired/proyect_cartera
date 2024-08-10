import { ResumenRecaudo } from '../components/ResumenRecaudo'
import { TableInfo } from '../components/TableInfo'
import { RecaudoI } from '../types/interface'
import { useEffect, useState } from 'react'
import { API_URL } from '../utils/contanst'
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
    axios.get(`${API_URL}/resumenCartera`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    axios.get(`${API_URL}/resumenRecaudo`)
      .then((res) => {
        setRecaudo(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <section className='flex w-full gap-2'>
        <TableInfo data={data} />
      </section>

      <section className='flex justify-around'>
        {
          <>
            <ResumenRecaudo datos={recaudo.multired} name='Multired'/>
            <ResumenRecaudo datos={recaudo.servired} name='Servired'/>
          </>
        }
      </section>

    </>
  )
}

export default Dashboard
