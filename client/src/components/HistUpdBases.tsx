import { BasesIUpdates } from '../types/Bases'

export const HistUpdBases = ({ data }:{ data: BasesIUpdates[] }) => {
  return (
    <div>
      {
        data.map((item, index) => {
          return (
            <div key={index} className="bg-gray-100 p-2 my-2 rounded-md">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600">Fecha</span>
                  <span>{item.FECHA}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600">Usuario</span>
                  <span>{item.LOGIN}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600">Observación</span>
                  <span>{item.OBSERVACION}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600">Base Anterior</span>
                  <span>{item.BASE_ANT}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600">Base Nueva</span>
                  <span>{item.BASE_NEW}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600">Raspe Anterior</span>
                  <span>{item.RASPE_ANT}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-600">Raspe Nuevo</span>
                  <span>{item.RASPE_NEW}</span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
