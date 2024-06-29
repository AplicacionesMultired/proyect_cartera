import { CarteraDataServices } from '../services/cartera.services'
import { mapCarteraResults } from '../utils/funtions';
import { Cartera } from '../model/cartera.model'
import { Request, Response } from 'express'

export const getCartera = async (req: Request, res: Response) => {
  const { empresa, abs } = req.query;

  try {
    const results = await CarteraDataServices(empresa as string, abs as string);
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
}
