import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Recaudo } from '../types/Recaudo'
import { HOST } from '../App'
import axios from 'axios'
import { Button, Card, Title } from '@tremor/react'
import { formatPesoColombia } from '../utils/funtions'

function RecaudoDetail () {
  const { id } = useParams<{ id: string }>()

  const [data, setData] = useState<Recaudo | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${HOST}/recaudo?id=29583747`)
      .then(res => setData(res.data))
      .catch(error => console.error(error))
  }, [id])

  return (
    <Card className="p-4 shadow-lg rounded-lg bg-white flex flex-col items-center gap-6">
      {
        data !== null
          ? (
            <>
              <Title className='text-center py-2 text-3xl'>Detalle Recaudo</Title>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4 text-xl">
                <h1 className="font-bold text-gray-700"> <span className="font-bold">Fecha:</span> {data.FECHA}</h1>
                <h2 className="font-medium text-gray-700"> <span className="font-bold">Recaudador:</span> {data.RECAUDADOR}</h2>
                <h4 className="font-medium text-gray-700"> <span className="font-bold">Caja:</span> {data.CAJADNO}</h4>
                <h5 className="font-medium text-gray-700"> <span className="font-bold">Vinculado:</span> {data.VINCULADO}</h5>
                <h6 className="font-medium text-gray-700"> <span className="font-bold">Valor:</span> {formatPesoColombia(data.VALOR)}</h6>
                <h6 className="font-medium text-gray-700"> <span className="font-bold">Estado:</span> {data.ESTADO}</h6>
                <h6 className="font-medium text-gray-700"> <span className="font-bold">Respaldo:</span> {data.RESPALDO}</h6>
                <h6 className="font-medium text-gray-700"> <span className="font-bold">Hora Sync:</span> {data.HORASYNC}</h6>
                <h6 className="font-medium text-gray-700"> <span className="font-bold">Hora Mov:</span> {data.HORAMOVI}</h6>
                <h6 className="font-medium text-gray-700"> <span className="font-bold">Usuario Conteo:</span> {data.USR_CONTEO}</h6>
                <h6 className="font-medium text-gray-700"> <span className="font-bold">Hora Conteo:</span> {data.HORA_CONTEO}</h6>
                <h6 className="font-medium text-gray-700"> <span className="font-bold">Nota Conteo:</span> {data.NOTA_CONTEO}</h6>
              </div>
            </>
            )
          : (
            <h1 className="font-medium text-center text-gray-700">Cargando...</h1>
            )
      }
      <Button color='red' onClick={() => navigate('/detallado')}>
        Volver a Reportes
      </Button>
    </Card>
  )
}

export default RecaudoDetail
