import { Cartera } from '../model/cartera.model'
import { calculateCartera } from '../utils/funtions'
import { Request, Response } from 'express'
import { fn } from 'sequelize'
import { Op } from 'sequelize'
import { Bases } from '../model'

export const getCarteraResumen = async (req: Request, res: Response) => {
  try {
    await Cartera.sync()

    const results = await Cartera.findAll(({
      attributes: ['EMPRESA', 'SALDO_ANT', 'CREDITO', 'DEBITO'],
      where: {
        FECHA: fn('CURDATE'),
        SALDO_ANT: { [Op.gt]: 0 },
        EMPRESA: { [Op.in]: ['101', '102'] }
      },
      include: { attributes: ['BASE'], model: Bases, required: false, }
    }))

    const carteras = results.map((item: any) => ({
      Cartera: calculateCartera(item),
      Empresa: item.EMPRESA
    }))

    const mayorCero = carteras.filter((item: any) => item.Cartera > 0 )

    const totalCarteraxEmpresa = mayorCero.reduce((acc: any, item: any) => {
      if (acc[item.Empresa]) {
        acc[item.Empresa] += item.Cartera; // Si la empresa ya existe en el acumulador, suma la cartera actual
      } else {
        acc[item.Empresa] = item.Cartera; // Si no, inicializa la empresa con la cartera actual
      }
      return acc;
    }, {}); // Inicializa el acumulador como un objeto vacío

    return res.status(200).json(totalCarteraxEmpresa)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error', error })
  }
}