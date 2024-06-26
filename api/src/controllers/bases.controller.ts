import { Aud_Bases } from '../model/aud_bases.model'
import { Sellers } from "../model/vendedores.model";
import { Bases } from "../model/bases.model";
import { Request, Response } from "express";

export const getBaseDatalle = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await Bases.sync()

    const result = await Bases.findOne({
      where: {
        VINCULADO: id
      },
      include: {
        attributes: ['NOMBRES'],
        model: Sellers,
        required: true,
      },

    })
    return res.status(200).json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}

export const updateBase = async (req: Request, res: Response) => {
  console.log(req.body);

  const { BASE, RASPE, OBS, VINCULADO, BASE_ACT, RASPE_ACT, LOGIN } = req.body

  if (BASE === null && RASPE === null) {
    return res.status(400).json({ msg: 'Mínimo se debe actualizar una base' })
  }

  if (OBS === '') {
    return res.status(400).json({ msg: 'La observación no puede estar vacía' })
  }

  if (BASE === BASE_ACT || RASPE === RASPE_ACT) {
    return res.status(400).json({ msg: 'No se puede actualizar con el mismo valor actual' })
  }

  try {

    await Bases.sync()

    const result = await Bases.update({
      BASE: BASE === null ? BASE_ACT : BASE,
      RASPE: RASPE === null ? RASPE_ACT : RASPE,
      OBSERVACION: OBS,
      LOGIN: LOGIN
    }, {
      where: {
        VINCULADO
      }
    })

    if (result[0] === 0) {
      return res.status(400).json({ msg: 'No se pudo actualizar la base' })
    }

    await Aud_Bases.sync()

    const result2 = await Aud_Bases.create({
      VINCULADO: VINCULADO,
      BASE_ANT: BASE_ACT === null ? BASE : BASE_ACT,
      BASE_NEW: BASE === null ? BASE_ACT : BASE,
      RASPE_ANT: RASPE_ACT === null ? RASPE : RASPE_ACT,
      RASPE_NEW: RASPE === null ? RASPE_ACT : RASPE,
      LOGIN: LOGIN,
      OBSERVACION: OBS,
      VERSION: '1'
    })

    console.log(result2);
    

    return res.status(200).json('Base actualizada correctamente')
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }

}


export const detalleUpdates = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await Aud_Bases.sync()

    const result = await Aud_Bases.findAll({
      where: {
        VINCULADO: id
      },
      limit: 20,
    })

    return res.status(200).json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
}