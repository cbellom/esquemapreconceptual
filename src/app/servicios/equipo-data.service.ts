import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Equipo} from '../modelos/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquipoDataService extends DataService<Equipo> {

  protected initialize() {
    this.identificacdor = 'equipo';
    this.load();
    if (this.datos === null) {
      const equipo: Equipo = {
        estado: null,
        porcentajeDesviacionEstandar: null
      };
      this.setData(equipo);
    }
  }

}
