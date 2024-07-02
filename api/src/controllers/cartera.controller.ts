import { CarteraDataServices } from '../services/cartera.services'
import { Request, Response } from 'express'
import { mapCarteraResults } from '../utils/funtions';

export const getCartera = async (req: Request, res: Response) => {
  const body = req.body;

  const empresa = body.empresa as string;
  const abs = body.abs as boolean;

  if (!empresa || !abs) {
    return res.status(400).json({ message: 'Bad request, empresa & abs is required !!!' });
  }

  try {
    const results = await CarteraDataServices(empresa, abs);
    const mapeado = mapCarteraResults(results);
    return res.status(200).json(mapeado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
}
