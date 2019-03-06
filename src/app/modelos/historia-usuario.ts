import {Miembro} from './miembro';

export enum EstadoHistoriaUsuario {
  pendiente = 'PENDIENTE',
  enProgreso = 'EN PROGRESO',
  finalizada = 'FINALIZADA'
}

export interface HistoriaUsuario {
  id: number;
  idProyecto: number;
  descripcion: string;
  estado: EstadoHistoriaUsuario;
  responsable: Miembro;
  tamaño: number;
  creador: number;
}
