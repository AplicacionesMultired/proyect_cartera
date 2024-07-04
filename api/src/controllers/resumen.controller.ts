import { calculateCartera, ReturCargo } from '../utils/funtions'
import { Cartera } from '../model/cartera.model'
import { Request, Response } from 'express'
import { fn } from 'sequelize'
import { Op } from 'sequelize'
import { Bases, Sellers } from '../model'

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
      include: [
        { attributes: ['BASE'], model: Bases, required: false, },
        { attributes: ['NOMBRECARGO'], model: Sellers, required: false, }
      ]
    }))

    const carteras = results.map((item: any) => ({
      Cartera: calculateCartera(item),
      Empresa: item.EMPRESA === '101' ? 'Servired' : 'Multired',
      Cargo: ReturCargo(item.Seller?.NOMBRECARGO),
    }))

    const mayorCero = carteras.filter((item) => item.Cartera > 0)

    // const totalCarteraxEmpresa = mayorCero.reduce((acc: any, item: any) => {
    //   if(acc[item.Empresa]) {
    //     acc[item.Empresa] += item.Cartera
    //   } else {
    //     acc[item.Empresa] = item.Cartera
    //   }
    //   return acc
    // })

    // const carteraPorEmpresa = Object.keys(totalCarteraxEmpresa).map((key) => ({
    //   name: key,
    //   value: totalCarteraxEmpresa[key]
    // }))

    return res.status(200).json(mayorCero)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error', error })
  }
}