export enum EstadoEquipo {
  formado = 'FORMADO',
  sembrado = 'SEMBRADO',
}

export interface Equipo {
  idProyecto: number;
  estado: EstadoEquipo;
  desviacionEstandar: number;
  porcentajeDesviacionEstandar: number;
}
