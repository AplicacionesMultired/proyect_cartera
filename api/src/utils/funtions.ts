import { ObjectCartera } from "../types/interface";

export function ReturCargo(seller: string): string {
  const sellerRoles: { [key: string]: string } = {
    VENDEDOR: 'Vendedor',
    CAJERO_COMERCIAL: 'Caj_Comercial',
    COLOCADOR_INDEPENDIENTE: 'Colo_Independiente',
    CAJERO_TESORERIA: 'Caj_Tesoreria'
  };

  return sellerRoles[seller] || 'No_Definido';
}

export function calculateCartera(item: any): number {
  return item.SALDO_ANT - (item.Basis?.BASE || 0) - item.CREDITO - item.DEBITO;
}

export function calcularNuevoSaldo(item: any): number {
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

export interface Resumen {
  [key: string]: {
    [key: string]: number;
  };
}

export const sumarCarteraPorEmpresaYCargo = (carteras: ObjectCartera[]) => {
  const resumen = carteras.reduce((acc, { Empresa, Cargo, Cartera }) => {
    // Verificar si la empresa es "Servired" o "Multired"
    if (Empresa === "Servired" || Empresa === "Multired") {
      // Inicializar la empresa si no existe
      if (!acc[Empresa]) {
        acc[Empresa] = {};
      }

      // Inicializar el cargo si no existe dentro de la empresa
      if (!acc[Empresa][Cargo]) {
        acc[Empresa][Cargo] = 0;
      }

      // Sumar la cartera al cargo correspondiente
      acc[Empresa][Cargo] += Cartera;
    }

    return acc;
  }, {} as Resumen); // Inicializar el acumulador como un objeto vacío

  return resumen;
};
