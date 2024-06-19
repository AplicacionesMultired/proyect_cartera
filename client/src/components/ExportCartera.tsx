import { utils, ColInfo, writeFile } from 'xlsx'
import { CarteraI } from '../types/cartera'


export const BottonExporCartera = ({ datos }: { datos: CarteraI[] }): JSX.Element => {
  const titulo = [{ A: 'Reporte Cartera ' }]

  const longitudes = [10, 10, 20, 10, 20, 10, 10, 20, 10, 10, 10, 10]

  const handleDownload = (): void => {
    const tabla = [
      {
        A: 'EMPRESA',
        B: 'CEDULA',
        C: 'NOMBRES',
        D: 'BASE',
        E: 'SALDO ANT',
        F: 'DÉBITO',
        G: 'CRÉDITO',
        H: 'NUEVO SALDO',
        I: 'CARTERA',
        J: 'RECHAZADOS',
        K: 'ACEPTADOS',
        L: 'DIGITADOS'
      }
    ]

    datos.forEach((it) => {
      tabla.push(
        {
          A: it.EMPRESA === '102' ? 'Multired' : 'Servired',
          B: it.VINCULADO,
          C: it.Seller.NOMBRES,
          D: it.BASE.toString(),
          E: it.SALDO_ANT !== undefined ? it.SALDO_ANT.toString() : "0",
          F: it.DEBITO.toString(),
          G: it.CREDITO.toString(),
          H: (it.SALDO_ANT - it.CREDITO - it.DEBITO).toString(),
          I: (+it.SALDO_ANT - it.BASE - it.DEBITO - it.CREDITO).toString(),
          J: it.RECHAZADOS.toString(),
          K: it.ACEPTADOS.toString(),
          L: it.DIGITADOS.toString()
        }
      )
    })

    const dataFinal = [...titulo, ...tabla]

    setTimeout(() => {
      creandoArchivo(dataFinal)
    }, 3000)
  }

  const creandoArchivo = (data: unknown[]): void => {
    const libro = utils.book_new()
    const hoja = utils.json_to_sheet(data, { skipHeader: true })

    hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

    const simpiedades: ColInfo[] | Array<{ width: number }> | undefined = []

    longitudes.forEach((col) => {
      simpiedades.push({ width: col })
    })

    hoja['!cols'] = simpiedades
    utils.book_append_sheet(libro, hoja, 'Cartera')
    writeFile(libro, 'ReporteCartera.xlsx')
  }

  return (
    <button onClick={handleDownload} className='text-white rounded-md px-2 bg-gradient-to-b from-punch-700 to-punch-800 hover:bg-gradient-to-b
      hover:from-punch-500 hover:to-punch-600 transition-all ease-in-out'>
      Exportar a Excel
    </button>)
}