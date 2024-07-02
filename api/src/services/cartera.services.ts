import { CarteraAttributes } from '../model/cartera.model';
import { SellerAttributes } from '../model/sellers.model';
import { BaseAtributes } from '../model/bases.model';
import { Bases, Cartera, Sellers } from '../model'
import { col, fn, Op, where } from 'sequelize';

const carAttr: (keyof CarteraAttributes)[] = ['EMPRESA', 'VINCULADO', 'SALDO_ANT', 'DEBITO', 'CREDITO', 'NUEVOSALDO', 'RECHAZADOS', 'ACEPTADOS', 'DIGITADOS', 'VTABNET', 'VTASIISS' ,'VTASFLEX', 'VTA_S1', 'PENDIENTES_CONT']
const sellAttr: (keyof SellerAttributes)[] = ['NOMBRES', 'NOMBRECARGO']
const baseAttr: (keyof BaseAtributes)[] = ['BASE', 'RASPE']

function absfilter(abs: boolean) {
  if (abs === false) {
    return [where(fn('ABS', col('SALDO_ANT')), '<>', 0)]
  } else {
    return [where(fn('ABS', col('SALDO_ANT')), { [Op.gt]: 100 })]
  }
}

function empFilter(empresa: string) {
  if (empresa === '101') {
    return { [Op.eq]: '101' }
  } else if (empresa === '102') {
    return { [Op.eq]: '102' }
  } else {
    return {
      [Op.in]: ['101', '102']
    }
  }
}

export async function CarteraDataServices(empresa: string, abs: boolean) {
  await Cartera.sync();
  return await Cartera.findAll({
    attributes: carAttr,
    where: {
      FECHA: fn('CURDATE'),
      EMPRESA: empFilter(empresa),
      [Op.and]: absfilter(abs),
    },
    include: [
      { attributes: sellAttr, model: Sellers, required: false, },
      { attributes: baseAttr, model: Bases, required: false, }
    ]
  });
}
