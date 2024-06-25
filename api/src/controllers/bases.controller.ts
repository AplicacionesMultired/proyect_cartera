import { Bases } from "../model/bases.model";
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