import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {Proyecto} from '../modelos/proyecto';
import {Sprint} from '../modelos/sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintsDataService extends DataService<Sprint[]> {

  protected initialize() {
    this.identificacdor = 'sprints';
    this.load();
    if (this.datos === null) {
      this.setData([]);
    }
  }

}
