import { formatPesoColombia } from '../utils/funtions'
import { BasesIUpdates } from '../types/Bases'
import { Card, Title } from '@tremor/react'

function UpdatesBasesInfo ({ data }: { data: BasesIUpdates[] }) {
  const reverseUpdates = data.reverse()

  return (
    <Card className=''>
      <Title className='text-center'>Historial Actualización Bases</Title>
      <div className='overflow-y-auto max-h-96 flex flex-col gap-2'>
        {
          reverseUpdates && (
            reverseUpdates.map((update, index) => (
              <div key={index} className='grid grid-cols-2 gap-1 px-4 py-2 bg-slate-200 rounded-md'>
                <p><span className='font-semibold'>Fecha: </span>{new Date(update.FECHA).toLocaleDateString()} <span>{new Date(update.FECHA).toLocaleTimeString()}</span></p>
                <p><span className='font-semibold'>Observación: </span>{update.OBSERVACION}</p>
                <p><span className='font-semibold'>Base Nueva: </span>{formatPesoColombia(update.BASE_NEW)}</p>
                <p><span className='font-semibold'>Raspe Anterior: </span>{formatPesoColombia(update.RASPE_ANT)}</p>
                <p><span className='font-semibold'>Base Anterior: </span>{formatPesoColombia(update.BASE_ANT)}</p>
                <p><span className='font-semibold'>Raspe Nuevo: </span>{formatPesoColombia(update.RASPE_NEW)}</p>
                <p><span className='font-semibold'>Responsable: </span>{update.LOGIN}</p>
              </div>
            ))
          )
        }
      </div>
    </Card>
  )
}

export default UpdatesBasesInfo
