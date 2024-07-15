export interface PropsCrating {
  nombres: string
  vinculado: string
  funClose?: () => void
}

interface DatesI {
  ESTADO: string
  Total: number
  Cantidad: number
}

export interface RecaudoI {
  multired: DatesI[]
  servired: DatesI[]
}
