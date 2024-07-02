import { extensions } from "sequelize/types/utils/validator-extras";
import { Cartera } from "../model";

function calculateCartera(item): number {
  return item.SALDO_ANT - (item.Basis?.BASE || 0) - item.CREDITO - item.DEBITO;
}

export function mapCarteraResults(results: []) {
  return results.map((item) => ({
    Empresa: item.EMPRESA === '101' ? 'Multired' : 'Servired',
    Vinculado: item.VINCULADO,
    Nombres: item.Seller?.NOMBRES,
    Cargo: item.Seller.NOMBRECARGO,
    Base: item.Basis?.BASE || 0,
    Raspe: item.Basis?.RASPE || 0,
    SaldoAnt: item.SALDO_ANT,
    Debito: item.DEBITO,
    Credito: item.CREDITO,
    NuevoSaldo: item.NUEVOSALDO,
    Cartera: calculateCartera(item),
    Rechazados: item.RECHAZADOS,
    Aceptados: item.ACEPTADOS,
    PendientesCont: item.PENDIENTES_CONT,
    Digitados: item.DIGITADOS,
    Vtabnet: item.VTABNET,
    CuadreWeb: item.VTASIISS,
    Anulados: item.VTA_S1
  }));
}
