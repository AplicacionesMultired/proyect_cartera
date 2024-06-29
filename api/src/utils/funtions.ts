type EmpresaKey = '102' | '101';

const empresaMapping = {
  '102': 'Multired',
  '101': 'Servired'
};

export function ReturnEmpresaObj(empresa: EmpresaKey) {
  return empresaMapping[empresa] || 'N/A';
}

function calculateCartera(item: any): number {
  return item.SALDO_ANT - (item.Basis?.BASE || 0) - item.CREDITO - item.DEBITO;
}

export function mapCarteraResults(results: any): any {
  return results.map((item: any )=> ({
    Empresa: ReturnEmpresaObj(item.EMPRESA),
    Vinculado: item.VINCULADO,
    Nombres: item.Seller?.NOMBRES,
    Cargo: item.Seller?.NOMBRECARGO,
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
