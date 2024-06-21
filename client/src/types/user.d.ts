export type Empresa = 'Multired' | 'Servired' | 'Multired y Servired'

type Proceso = 'Técnología' |
'Contabilidad' |
'Comercial' |
'Administración' |
'Gestión Humana' |
'Gerencia' |
'Tesoreria' |
'Auditoria' |
'Cumplimiento'

export interface User {
  apellidos: string
  correo: string
  empresa: Empresa
  id: string
  nombres: string
  proceso?: Proceso
  rol: string
  username: string
}
