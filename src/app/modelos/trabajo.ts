export enum EstadoTrabajo {
  correcta = 'PLANEACION CORRECTA',
  desviada = 'PLANEACION DESVIADA',
}

export interface Trabajo {
  idProyecto: number;
  horizonteMinimo: number;
  horizonteMaximo: number;
  estado: EstadoTrabajo;
}

