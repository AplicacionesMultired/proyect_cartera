import { utils, ColInfo, writeFile } from 'xlsx'
import { CarteraI } from '../types/cartera'
import { Button } from './ui'

export const BottonExporCartera = ({ datos }: { datos: CarteraI[] }): JSX.Element => {
  const titulo = [{ A: 'Reporte Cartera ' }]

  const longitudes = [10, 10, 30, 10, 20, 10, 10, 20, 10, 10, 10, 10, 10, 10, 10, 10, 10]

  const handleDownload = (): void => {
    const tabla = [
      {
        A: 'EMPRESA',
        B: 'CEDULA',
        C: 'NOMBRES',
        D: 'CARGO',
        E: 'BASE',
        F: 'SALDO ANT',
        G: 'DÉBITO',
        H: 'CRÉDITO',
        I: 'NUEVO SALDO',
        J: 'CARTERA',
        K: 'RECHAZADOS',
        L: 'ACEPTADOS',
        M: 'P CONTEO',
        N: 'DIGITADOS',
        O: 'VENTA BNET',
        P: 'CUADRE WEB',
        Q: 'ANULADOS'
      }
    ]

    datos.forEach((it) => {
      tabla.push(
        {
          A: it.Empresa,
          B: it.Vinculado,
          C: it.Nombres,
          D: it.Cargo,
          E: it.Base.toString(),
          F: it.SaldoAnt.toString(),
          G: it.Debito.toString(),
          H: it.Credito.toString(),
          I: it.NuevoSaldo.toString(),
          J: it.Cartera.toString(),
          K: it.Rechazados.toString(),
          L: it.Aceptados.toString(),
          M: it.PendientesCont.toString(),
          N: it.Digitados.toString(),
          O: it.Vtabnet.toString(),
          P: it.CuadreWeb.toString(),
          Q: it.Anulados.toString()

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
