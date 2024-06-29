import { CarteraAttributes } from '../model/cartera.model';
import { SellerAttributes } from '../model/sellers.model';
import { BaseAtributes } from '../model/bases.model';
import { Bases, Cartera, Sellers } from '../model'
import { fn, Op } from 'sequelize';

const carAttr: (keyof CarteraAttributes)[] = ['EMPRESA', 'VINCULADO', 'SALDO_ANT', 'DEBITO', 'CREDITO', 'NUEVOSALDO', 'RECHAZADOS', 'ACEPTADOS', 'DIGITADOS', 'VTABNET', 'VTASFLEX', 'VTA_S1']
const sellAttr: (keyof SellerAttributes)[] = ['NOMBRES', 'NOMBRECARGO']
const baseAttr: (keyof BaseAtributes)[] = ['BASE', 'RASPE']

export async function CarteraDataServices(empresa: string, abs: string): Promise<any> {
  await Cartera.sync();
  return Cartera.findAll({
    attributes: carAttr,
    where: {
      FECHA: fn('CURDATE'),
      EMPRESA: empresa === '1' ? { [Op.eq]: '101' } : empresa === '2' ? { [Op.eq]: '102' } : { [Op.in]: ['101', '102'] },
      SALDO_ANT: abs === 'true' ? { [Op.gt]: 100 } : { [Op.ne]: 0 }
    },
    include: [
      {
        attributes: ['NOMBRES', 'NOMBRECARGO'],
        model: Sellers,
        required: true,
      },
      {
        attributes: ['BASE', 'RASPE'],
        model: Bases,
        required: false,
      }
    ]
  });
}
