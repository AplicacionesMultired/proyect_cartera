import { useEffect, useState } from 'react'
import { Card } from '@tremor/react'
import { HOST } from '../App'
import axios from 'axios'

interface UserSinBase {
  EMPRESA: '101' | '102'
  CUENTA: string
  VINCULADO: string
  Seller: {
    NOMBRES: string
  }
  Basis: null
}

export const AsignarNewBase = () => {
  const [data, setData] = useState<UserSinBase[]>([])

  useEffect(() => {
    axios.get(`${HOST}/usersSinBase`)
      .then(res => setData(res.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <Card className=''>
      <h1>Viculados Sin Base</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Empresa</th>
            <th>Cuenta</th>
            <th>Vinculado</th>
            <th>Vendedor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.EMPRESA}</td>
              <td>{item.CUENTA}</td>
              <td>{item.VINCULADO}</td>
              <td>{item.Seller.NOMBRES}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
