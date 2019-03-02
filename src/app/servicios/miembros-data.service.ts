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
        rol: {
          id: 1,
          nombre: TipoRol.scrumMaster
        }
      },
      {
        id: 2,
        nombre: 'Santiago Sanz Mora',
        rol: {
          id: 2,
          nombre: TipoRol.gerente
        }
      },
      {
        id: 3,
        nombre: 'Francisco Javier Mendez',
        rol: {
          id: 3,
          nombre: TipoRol.desarrollador
        }
      },
      {
        id: 4,
        nombre: 'Jorge Sanchez Gallardo',
        rol: {
          id: 3,
          nombre: TipoRol.desarrollador
        }
      },
      {
        id: 5,
        nombre: 'Daniel Segura Ruiz',
        rol: {
          id: 3,
          nombre: TipoRol.desarrollador
        }
      },
      {
        id: 6,
        nombre: 'Omar Castro Carmona',
        rol: {
          id: 3,
          nombre: TipoRol.desarrollador
        }
      },
      {
        id: 7,
        nombre: 'Saúl Ortega Campos',
        rol: {
          id: 3,
          nombre: TipoRol.desarrollador
        }
      },
    ];
  }

}
