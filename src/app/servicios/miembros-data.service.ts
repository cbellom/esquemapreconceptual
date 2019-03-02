import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Proyecto} from '../modelos/proyecto';
import {Miembro} from '../modelos/miembro';
import {TipoRol} from '../modelos/rol';

@Injectable({
  providedIn: 'root'
})
export class MiembrosDataService extends DataService<Miembro[]> {

  protected initialize() {
    this.identificacdor = 'miembros';
    this.setData(this.obtenerDatosDefault());
  }

  obtenerDatosDefault(): Miembro[] {
    return [
      {
        id: 1,
        nombre: 'Roberto Casas Blanco',
        rol: 1
      },
      {
        id: 2,
        nombre: 'Santiago Sanz Mora',
        rol: 2
      },
      {
        id: 3,
        nombre: 'Francisco Javier Mendez',
        rol: 3
      },
      {
        id: 4,
        nombre: 'Jorge Sanchez Gallardo',
        rol: 3
      },
      {
        id: 5,
        nombre: 'Daniel Segura Ruiz',
        rol: 3
      },
      {
        id: 6,
        nombre: 'Omar Castro Carmona',
        rol: 3
      },
      {
        id: 7,
        nombre: 'Saúl Ortega Campos',
        rol: 3
      },
    ];
  }

}
