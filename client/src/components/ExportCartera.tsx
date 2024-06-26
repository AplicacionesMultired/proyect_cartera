import { utils, ColInfo, writeFile } from 'xlsx'
import { CarteraI } from '../types/cartera'
import { Button } from './ui'

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
        L: 'P CONTEO',
        M: 'DIGITADOS',
        N: 'VENTA BNET',
        O: 'CUADRE WEB',
        P: 'ANULADOS'
      }
    ]

    datos.forEach((it) => {
      tabla.push(
        {
          A: it.EMPRESA === '102' ? 'Multired' : 'Servired',
          B: it.VINCULADO,
          C: it.Seller.NOMBRES,
          D: it.Basis?.BASE !== undefined && it.Basis.BASE > 0 ? it.Basis.BASE.toString() : '0',
          E: it.SALDO_ANT !== undefined ? it.SALDO_ANT.toString() : '0',
          F: it.DEBITO.toString(),
          G: it.CREDITO.toString(),
          H: (it.SALDO_ANT - it.CREDITO - it.DEBITO).toString(),
          I: (+it.SALDO_ANT - (it.Basis?.BASE !== undefined && it.Basis.BASE > 0 ? it.Basis.BASE : 0) - it.DEBITO - it.CREDITO).toString(),
          J: it.RECHAZADOS.toString(),
          K: it.ACEPTADOS.toString(),
          L: it.PENDIENTES_CONT.toString(),
          M: it.DIGITADOS.toString(),
          N: it.VTABNET.toString(),
          O: it.VTASIISS.toString(),
          P: it.VTA_S1.toString()

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
    <Button onClick={handleDownload} >
      Exportar a Excel
    </Button>
  )
}
