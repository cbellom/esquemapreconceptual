export enum EstadoTrabajo {
  correcta = 'PREPARADO',
  desviada = 'INICIADO',
}

export interface Trabajo {
  idProyecto: number;
  horizonteMinimo: number;
  horizonteMaximo: number;
  estado: EstadoTrabajo;
}

