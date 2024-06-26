import { Sellers } from '../model/vendedores.model'
import { Cartera } from '../model/cartera.model'
import { fn, where, col, Op } from 'sequelize'
import { Request, Response } from 'express'
import { Bases } from '../model/bases.model'

// !! unificar la query y hacer llegar por parametro el fitrl ABS (>100 <0>)
export const getCartera = async (_req: Request, res: Response) => {
  try {
    await Cartera.sync() // SINCRONIZA LA TABLE CON EL MODEL VERIFICAR QUE LOS CAMPON EN MODEL EXISTAN 

    const resulst = await Cartera.findAll({
      where: {
        EMPRESA: 101,
        FECHA: fn('CURDATE'),
        [Op.and]: where(fn('ABS', col('SALDO_ANT')), '>', 100),
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

// export const getCarteraSinABS = async (_req: Request, res: Response) => {
//   try {
//     await Cartera.sync()

//     const resulst = await Cartera.findAll({
//       where: {
//         FECHA: fn('CURDATE'),
//         [Op.and]: where(fn('ABS', col('SALDO_ANT')), '<>', 0),
//       },
//       include: [
//         {
//           attributes: ['NOMBRES'],
//           model: Sellers,
//           required: true,
//         },
//         {
//           attributes: ['BASE', 'RASPE'],
//           model: Bases,
//           required: false,
//         }
//       ],
//       // limit: 5
//     })

//     const fechaConsulta = conection.query('select curdate() from dual;')
//     console.log(resulst.length);

//     return res.status(200).json({ fechaConsulta, datos: resulst })
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error)
//   }
// }

export const getCarteraPorVendedor = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await Cartera.sync()

    const resulst = await Cartera.findOne({
      where: {
        FECHA: fn('CURDATE'),
        VINCULADO: id
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
    return res.status(200).json([resulst])
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}