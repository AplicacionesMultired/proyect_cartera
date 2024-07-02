import { CarteraDataServices } from '../services/cartera.services'
import { Request, Response } from 'express'
import { mapCarteraResults } from '../utils/funtions';

export const getCartera = async (req: Request, res: Response) => {
  const { empresa, abs } = req.query;

  try {
    const results = await CarteraDataServices(empresa as string, abs as string);
    // const mapeado = mapCarteraResults(results);
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
}
