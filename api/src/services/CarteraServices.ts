import { ReturnABS, ReturnEmpresa } from '../utils/funtions';
import { Bases, Cartera, Sellers } from '../model'
import { fn, Op} from 'sequelize';

export async function CarteraDataServices(empresa: string, abs: string): Promise<any> {
  return Cartera.findAll({
    attributes: ['EMPRESA', 'VINCULADO', 'SALDO_ANT', 'DEBITO', 'CREDITO', 'NUEVOSALDO', 'VTABNET', 'VTASIISS', 'VTASFLEX', 'VTA_S1', 'RECHAZADOS', 'ACEPTADOS', 'DIGITADOS', 'PENDIENTES_CONT'],
    where: {
      EMPRESA: ReturnEmpresa(empresa),
      FECHA: fn('CURDATE'),
      [Op.and]: ReturnABS(abs)
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