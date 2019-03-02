import {Trabajo} from './trabajo';

export interface Proyecto {
  id: number;
  nombre: string;
  trabajo: Trabajo;
}
