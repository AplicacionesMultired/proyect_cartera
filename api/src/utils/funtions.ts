function ReturCargo(seller: string): string {
  const sellerRoles: { [key: string]: string } = {
    VENDEDOR: 'Vendedor',
    CAJERO_COMERCIAL: 'Cajero Comercial',
    COLOCADOR_INDEPENDIENTE: 'Colocador Independiente',
    CAJERO_TESORERIA: 'Cajero Tesoreria'
  };

  return sellerRoles[seller] || 'NO DEFINIDO';
}

function calculateCartera(item: any): number {
  return item.SALDO_ANT - (item.Basis?.BASE || 0) - item.CREDITO - item.DEBITO;
}

function calcularNuevoSaldo(item: any): number {
  return item.SALDO_ANT - item.CREDITO - item.DEBITO
}

export function mapCarteraResults(results: any) {
  return results.map((item: any) => ({
    Empresa: item.EMPRESA === '101' ? 'Servired' : 'Multired',
    Vinculado: item.VINCULADO,
    Nombres: item.Seller?.NOMBRES,
    Cargo: ReturCargo(item.Seller?.NOMBRECARGO),
    Base: item.Basis?.BASE || 0,
    Raspe: item.Basis?.RASPE || 0,
    SaldoAnt: item.SALDO_ANT,
    Debito: item.DEBITO,
    Credito: item.CREDITO,
    NuevoSaldo: calcularNuevoSaldo(item),
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
