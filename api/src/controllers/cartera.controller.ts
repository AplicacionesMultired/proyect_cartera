import { Cartera } from '../model/cartera.model';
import { fn, where, col, Op } from 'sequelize';
import { Request, Response } from 'express';

export const getCartera = async (req: Request, res: Response) => {
  try {
    await Cartera.sync()

    // SELECT * FROM CARTERA WHERE FECHA = CURDATE() AND EMPRESA = 102 AND ABS(SALDO_ANT) > 100
    const resulst = await Cartera.findAll({
      where: {
        FECHA: fn('CURDATE'),
        EMPRESA: 102,
        [Op.and]: where(fn('ABS', col('SALDO_ANT')), '>', 100)
      }
    })

    console.log(resulst.length);

    return res.status(200).json(resulst)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}