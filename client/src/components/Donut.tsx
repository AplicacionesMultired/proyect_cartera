import { useEffect, useState } from 'react'
import { DonutChart } from '@tremor/react'
import { HOST } from '../App'
import axios from 'axios'

const dataFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('co-ES').format(number).toString()}`

export const DonutChartHero = () => {
  const [datahero, setDatahero] = useState([])

  useEffect(() => {
    axios.get(`${HOST}/resumenCartera`)
      .then(response => {
        setDatahero(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
  <div>
    <div className="space-y-3">
      <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Cartera Por Empresa
      </span>
      <div className="flex justify-center">
        <DonutChart
          colors={['yellow', 'blue']}
          data={datahero}
          variant="pie"
          valueFormatter={dataFormatter}
          onValueChange={(v) => console.log(v)}
        />
      </div>
    </div>
  </div>
  )
}
