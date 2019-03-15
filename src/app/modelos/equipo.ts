export enum EstadoEquipo {
  formado = 'FORMADO',
  sembrado = 'SEMBRADO',
}

export interface Equipo {
  estado: EstadoEquipo;
  porcentajeDesviacionEstandar: number;
}
