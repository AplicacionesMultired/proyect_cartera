function calculateCartera(item: any): number {
  return item.SALDO_ANT - (item.Basis?.BASE || 0) - item.CREDITO - item.DEBITO;
}

function ReturCargo(seller: any): string {
  if (seller === 'VENDEDOR') {
    return 'Vendedor'
  } else if (seller === 'CAJERO_COMERCIAL') {
    return 'Cajero Comercial'
  } else if (seller === 'COLOCADOR_INDEPENDIENTE') {
    return 'Colocador Independiente'
  } else if (seller === 'CAJERO_TESORERIA') {
    return 'Cajero Tesoreria'
  } else {
    return 'NO DEFINIDO'
  }

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
