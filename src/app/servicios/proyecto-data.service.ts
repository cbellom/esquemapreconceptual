import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DataService} from './data.service';
import {Proyecto} from '../modelos/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoDataService extends DataService<Proyecto> {

  protected initialize() {
    this.identificacdor = 'proyecto';
    this.load();
  }

}
