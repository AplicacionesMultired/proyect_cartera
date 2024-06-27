import { Sellers } from '../model/vendedores.model'
import { Cartera } from '../model/cartera.model'
import { fn, where, col, Op } from 'sequelize'
import { Request, Response } from 'express'
import { Bases } from '../model/bases.model'

function ReturnEmpresa (empresa: string) {
  if (empresa === '0') {
    return [101, 102]
  } else if (empresa === '102') {
    return  [102]
  } else if (empresa === '101') {
    return [101]
  }
}

function ReturnABS (abs: string) {
  if (abs === 'true') {
    return where(fn('ABS', col('SALDO_ANT')), '>', 100) 
  } else {
    return where(fn('ABS', col('SALDO_ANT')), '<>', 0) 
  }
}

export const getCartera = async (req: Request, res: Response) => {
  const { empresa, abs } = req.query
  
  try {
    await Cartera.sync()

    const resulst = await Cartera.findAll({
      where: {
        EMPRESA: ReturnEmpresa(empresa as string),
        FECHA: fn('CURDATE'),
        [Op.and]: ReturnABS(abs as string)
      },
      include: [
        {
          attributes: ['NOMBRES'],
          model: Sellers,
          required: true,
        },
        {
          attributes: ['BASE', 'RASPE'],
          model: Bases,
          required: false,
        }
      ],
    })

    return res.status(200).json(resulst)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}
