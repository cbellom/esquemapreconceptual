import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Proyecto} from '../modelos/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoDataService extends DataService<Proyecto[]> {

  protected initialize() {
    this.identificacdor = 'proyectos';
    this.load();
    if (this.datos === null) {
      this.setData([]);
    }
  }

}
