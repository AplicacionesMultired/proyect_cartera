import { Bases } from "../model/bases.model";
import { Aud_Bases } from '../model/aud_bases.model'
import { Request, Response } from "express";
import { Sellers } from "../model/vendedores.model";

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
  const { NEW_BASE, NEW_RASPE, NEW_OBSERVACION, vinculado, user, obs_act, base_act, raspe_act } = req.body

  if (NEW_BASE === 0 && NEW_RASPE === 0) {
    return res.status(400).json({ msg: 'Mínimo se debe actualizar una base' })
  }
/*
  if(NEW_BASE === obs_act || NEW_RASPE === raspe_act){
    return res.status(400).json({ msg: 'No se puede actualizar la base con el mismo valor actual' })
  }
*/
  if(NEW_OBSERVACION === ''){
    return res.status(400).json({ msg: 'La observación no puede estar vacía' })
  }

  function ReturnQuery() {
    if (NEW_BASE !== 0 && NEW_RASPE !== 0) {
      return {
        BASE: NEW_BASE,
        RASPE: NEW_RASPE,
        OBSERVACION: NEW_OBSERVACION,
        LOGIN: user
      }
    } else if (NEW_BASE !== 0) {
      return {
        BASE: NEW_BASE,
        OBSERVACION: NEW_OBSERVACION,
        LOGIN: user
      }
    } else if (NEW_RASPE !== 0) {
      return {
        RASPE: NEW_RASPE,
        OBSERVACION: NEW_OBSERVACION,
        LOGIN: user
      }
    } else {
      return {}
    }
  }

  try {

    await Bases.sync()

    const result = await Bases.update(
      ReturnQuery(), {
      where: {
        VINCULADO: vinculado
      }
    })

    if (result[0] === 1) {
      await Aud_Bases.sync()

      const result_aud = await Aud_Bases.create({
        VINCULADO: vinculado,
        BASE_ANT: base_act,
        BASE_NEW: NEW_BASE === 0 ? base_act : NEW_BASE,
        RASPE_ANT: raspe_act,
        RASPE_NEW: NEW_RASPE === 0 ? raspe_act : NEW_RASPE,
        LOGIN: user,
        OBSERVACION: obs_act,
        VERSION: 0
      })

      console.log(result_aud);

    } else {
      return res.status(500).json({ msg: 'error al actualizar la base' })
    }

    return res.status(202).json({ msg: 'Base actualizada y Registro Creado' })
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }

}