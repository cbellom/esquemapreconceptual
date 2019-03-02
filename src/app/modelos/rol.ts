export enum TipoRol {
  scrumMaster = 'SCRUM MASTER',
  desarrollador = 'DESARROLLADOR',
  gerente = 'GERENTE'
}

export interface Rol {
  id: number;
  nombre: TipoRol;
}
