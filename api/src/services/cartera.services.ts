import { Bases, Cartera, Sellers } from '../model'
import { col, fn, where, Op } from 'sequelize';

// TODO: FUNCIONES UTILIZANDAS EN EL SERVICIO DE CARTERA
function ReturnEmpresa(empresa: string) {
  if (empresa === '0') {
    return [101, 102]
  } else if (empresa === '102') {
    return [102]
  } else if (empresa === '101') {
    return [101]
  }
}

function ReturnABS(abs: string) {
  if (abs === 'true') {
    return where(fn('ABS', col('SALDO_ANT')), '>', 100)
  } else {
    return where(fn('ABS', col('SALDO_ANT')), '<>', 0)
  }
}

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
