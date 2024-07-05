import { calculateCartera, ReturCargo, sumarCarteraPorEmpresaYCargo } from '../utils/funtions'
import { getResumenCartera } from '../services/resumen.services'
import { ObjectCartera } from '../types/interface'
import { Request, Response } from 'express'

export const getCarteraResumen = async (req: Request, res: Response) => {
  try {

    const results = await getResumenCartera()


    const carteras = results.map((item) => ({
      Cartera: calculateCartera(item),
      Empresa: item.EMPRESA === '101' ? 'Servired' : 'Multired',
      Cargo: item?.Seller?.NOMBRECARGO === 'COLOCADOR_INDEPENDIENTE'
        ? 'Col. Independiente' : item?.Seller?.NOMBRECARGO === 'VENDEDOR'
          ? 'Vendedor' : item?.Seller?.NOMBRECARGO === 'CAJERO_RESORERIA'
            ? 'Caj_ Tesoreria' : 'NO DEFINIDO'
    }))

    const mayorCero = carteras.filter((item) => item.Cartera > 0) as ObjectCartera[]
    const results2 = sumarCarteraPorEmpresaYCargo(mayorCero)

    return res.status(200).json(results2)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error', error })
  }
}