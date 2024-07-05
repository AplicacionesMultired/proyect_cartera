import { Bases, Cartera, Sellers } from "../model"
import { fn, Op } from "sequelize"

// * Constantes para códigos de empresa
const EMPRESAS_INCLUIDAS = ['101', '102']

/**
 * Obtiene un resumen de la cartera para las empresas especificadas.
 * El resumen incluye el saldo anterior, crédito y débito.
 * @returns {Promise<Cartera[]>} Resultados de la consulta.
 */

interface CarteraIR extends Cartera {
  Seller: Sellers | null
  Basis: Bases | null
}

export const getResumenCartera = async (): Promise<CarteraIR[]> => {
  try {
    await Cartera.sync()

    const condicionesDeFiltrado = {
      FECHA: fn('CURDATE'),
      SALDO_ANT: { [Op.gt]: 0 },
      EMPRESA: { [Op.in]: EMPRESAS_INCLUIDAS }
    }

    const queryOptions = {
      attributes: ['EMPRESA', 'SALDO_ANT', 'CREDITO', 'DEBITO'],
      where: condicionesDeFiltrado,
      include: [
        { attributes: ['BASE'], model: Bases, required: false },
        { attributes: ['NOMBRECARGO'], model: Sellers, required: false }
      ]
    }

    const results = await Cartera.findAll(queryOptions)

    return results as CarteraIR[]
  } catch (error) {
    console.error(error)
    throw error
  }
}