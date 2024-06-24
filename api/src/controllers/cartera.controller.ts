import { Sellers } from '../model/vendedores.model'
import { Cartera } from '../model/cartera.model'
import { fn, where, col, Op } from 'sequelize'
import { Request, Response } from 'express'

export const getCartera = async (_req: Request, res: Response) => {
  try {
    await Cartera.sync()

    const resulst = await Cartera.findAll({
      where: {
        FECHA: fn('CURDATE'),
        [Op.and]: where(fn('ABS', col('SALDO_ANT')), '>', 100),
      },
      include: [{
        attributes: ['NOMBRES'],
        model: Sellers,
        required: true,
      }]
    })

    console.log(resulst.length);

    return res.status(200).json(resulst)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}

export const getCarteraSinABS = async (_req: Request, res: Response) => {
  try {
    await Cartera.sync()

    const resulst = await Cartera.findAll({
      where: {
        FECHA: fn('CURDATE'),
        [Op.and]: where(fn('ABS', col('SALDO_ANT')), '<>', 0),
      },
      include: [{
        attributes: ['NOMBRES'],
        model: Sellers,
        required: true,
      }]
    })

    console.log(resulst.length);
    

    return res.status(200).json(resulst)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}