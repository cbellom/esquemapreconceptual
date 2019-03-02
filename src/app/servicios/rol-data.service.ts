import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Proyecto} from '../modelos/proyecto';
import {Miembro} from '../modelos/miembro';
import {Rol, TipoRol} from '../modelos/rol';

@Injectable({
  providedIn: 'root'
})
export class RolDataService extends DataService<Rol[]> {

  protected initialize() {
    this.identificacdor = 'rol';
    this.setData(this.obtenerDatosDefault());
  }

  obtenerDatosDefault(): Rol[] {
    return [
      {
        id: 1,
        nombre: TipoRol.gerente,
      },
      {
        id: 2,
        nombre: TipoRol.scrumMaster,
      },
      {
        id: 3,
        nombre: TipoRol.desarrollador,
      }
    ];
  }

}
