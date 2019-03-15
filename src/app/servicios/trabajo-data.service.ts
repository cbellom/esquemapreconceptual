import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Trabajo} from '../modelos/trabajo';

@Injectable({
  providedIn: 'root'
})
export class TrabajoDataService extends DataService<Trabajo[]> {

  protected initialize() {
    this.identificacdor = 'trabajos';
    this.load();
    if (this.datos === null) {
      this.setData([]);
    }
  }

}
