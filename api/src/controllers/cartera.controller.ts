import { CarteraDataServices } from '../services/CarteraServices'
import { mapCarteraResults } from '../utils/funtions';
import { Cartera } from '../model/cartera.model'
import { Request, Response } from 'express'

export const getCartera = async (req: Request, res: Response) => {
  const { empresa, abs } = req.query;

  try {
    await Cartera.sync();

    const results = await CarteraDataServices(empresa as string, abs as string);
    
    const mappedResults = mapCarteraResults(results);

    return res.status(200).json(mappedResults);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
}
