import { Cartera } from '../model/cartera.model';
import { fn, where, col, Op } from 'sequelize';
import { Request, Response } from 'express';
import { Sellers } from '../model/vendedores.model';

export const getCartera = async (req: Request, res: Response) => {
  try {
    await Cartera.sync()

    // SELECT * FROM CARTERA WHERE FECHA = CURDATE() AND EMPRESA = 102 AND ABS(SALDO_ANT) > 100
    const resulst = await Cartera.findAll({
      where: {
        FECHA: fn('CURDATE'),
        [Op.and]: where(fn('ABS', col('SALDO_ANT')), '>', 100)
      },
      include: [{
        attributes: ['NOMBRES'],
        model: Sellers,
        required: true,
      }]
    })

    

    return res.status(200).json(resulst)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}